const Document = require("../models/Document");
const User = require("../models/User");
const { notifyRole, notifyUsers } = require("../utils/notify");

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.student) filter.student = req.query.student;

    if (req.user.role === "student") {
      // A student sees: their own submitted documents, staff documents shared
      // with them specifically, and documents broadcast to all students.
      delete filter.student;
      filter.$or = [{ student: req.user.id }, { audience: "all" }];
    }

    const docs = await Document.find(filter)
      .populate("student", "name email")
      .populate("uploadedBy", "name email role")
      .populate("application")
      .sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/documents/upload  (student uploads their own document)
exports.upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // A student can only ever upload for themselves; staff can upload on
    // behalf of a chosen student (kept for backwards compatibility — the
    // dedicated /documents/share endpoint is the primary staff-upload flow).
    const studentId = req.user.role === "student" ? req.user.id : req.body.student;

    const doc = await Document.create({
      student: studentId,
      application: req.body.application || undefined,
      type: req.body.type,
      fileName: req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`,
    });

    const populated = await doc.populate("student", "name email");

    // Notify admins & counsellors that a document needs review.
    await notifyRole(["admin", "counsellor"], {
      type: "document_uploaded",
      title: "New document uploaded",
      message: `${populated.student?.name || "A student"} uploaded a ${doc.type} for review.`,
      link: "/documents",
      relatedId: doc._id,
    });

    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// POST /api/documents/share  (admin/counsellor shares a document WITH student(s))
// audience: "single" -> req.body.student required, "all" -> broadcast to every active student
exports.shareWithStudents = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const audience = req.body.audience === "all" ? "all" : "single";
    if (audience === "single" && !req.body.student) {
      return res.status(400).json({ message: "Select a student to share this document with" });
    }

    const doc = await Document.create({
      student: audience === "all" ? undefined : req.body.student,
      type: req.body.type || "Shared Document",
      title: req.body.title || req.body.type || "Shared Document",
      fileName: req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`,
      status: "Verified", // staff-shared documents don't need self-verification
      uploadedBy: req.user.id,
      audience,
    });

    if (audience === "all") {
      await notifyRole("student", {
        type: "document_shared",
        title: "New document shared with you",
        message: `${req.user.name} shared "${doc.title}" with all students.`,
        link: "/documents",
        relatedId: doc._id,
      });
    } else {
      await notifyUsers([req.body.student], {
        type: "document_shared",
        title: "New document shared with you",
        message: `${req.user.name} shared "${doc.title}" with you.`,
        link: "/documents",
        relatedId: doc._id,
      });
    }

    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    // Students may only delete documents they personally submitted, never
    // documents shared with them by staff.
    if (req.user.role === "student") {
      filter.student = req.user.id;
      filter.uploadedBy = { $exists: false };
    }
    const doc = await Document.findOneAndDelete(filter);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json({ message: "Document deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/documents/:id/verify
exports.verify = async (req, res) => {
  try {
    const doc = await Document.findByIdAndUpdate(
      req.params.id,
      { status: "Verified", rejectionReason: "" },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: "Document not found" });

    await notifyUsers([doc.student], {
      type: "document_verified",
      title: "Document verified",
      message: `Your ${doc.type} has been verified.`,
      link: "/documents",
      relatedId: doc._id,
    });

    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/documents/:id/reject
exports.reject = async (req, res) => {
  try {
    const { reason } = req.body;
    const doc = await Document.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected", rejectionReason: reason || "Re-upload required" },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: "Document not found" });

    await notifyUsers([doc.student], {
      type: "document_rejected",
      title: "Document needs re-upload",
      message: `Your ${doc.type} was rejected: ${doc.rejectionReason}`,
      link: "/documents",
      relatedId: doc._id,
    });

    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
