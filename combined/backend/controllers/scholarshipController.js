const { Scholarship, ScholarshipApplication } = require("../models/Scholarship");
const { notifyRole, notifyUsers } = require("../utils/notify");

exports.getAll = async (req, res) => {
  try {
    const items = await Scholarship.find().populate("university").sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Scholarship.findById(req.params.id).populate("university");
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/scholarships  (admin / counsellor)
exports.create = async (req, res) => {
  try {
    const item = await Scholarship.create(req.body);
    const populated = await item.populate("university");

    const uniPart = populated.university?.name ? ` at ${populated.university.name}` : "";
    await notifyRole("student", {
      type: "scholarship_added",
      title: "New scholarship available",
      message: `${item.name}${uniPart} — up to ${item.amount} ${item.currency}. Check eligibility.`,
      link: "/scholarships",
      relatedId: item._id,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Scholarship.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await Scholarship.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---- Scholarship applications sub-resource ----

exports.getAllApplications = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role === "student") filter.student = req.user.id;
    const apps = await ScholarshipApplication.find(filter)
      .populate("scholarship")
      .populate("student", "name email")
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/scholarships/applications  (student applies)
exports.applyForScholarship = async (req, res) => {
  try {
    const studentId = req.user.role === "student" ? req.user.id : req.body.student;
    const app = await ScholarshipApplication.create({
      scholarship: req.body.scholarship,
      student: studentId,
    });
    const populated = await app.populate(["scholarship", "student"]);

    await notifyRole(["admin", "counsellor"], {
      type: "application_status",
      title: "New scholarship application",
      message: `${populated.student?.name || "A student"} applied for ${populated.scholarship?.name || "a scholarship"}.`,
      link: "/scholarships",
      relatedId: app._id,
    });

    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const app = await ScholarshipApplication.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate(["scholarship", "student"]);
    if (!app) return res.status(404).json({ message: "Not found" });

    if (req.body.status) {
      await notifyUsers([app.student?._id || app.student], {
        type: "application_status",
        title: "Scholarship application updated",
        message: `Your application for ${app.scholarship?.name || "a scholarship"} is now "${req.body.status}".`,
        link: "/scholarships",
        relatedId: app._id,
      });
    }

    res.json(app);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.removeApplication = async (req, res) => {
  try {
    const app = await ScholarshipApplication.findByIdAndDelete(req.params.id);
    if (!app) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
