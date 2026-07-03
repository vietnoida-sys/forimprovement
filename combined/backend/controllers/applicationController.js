const Application = require("../models/Application");
const { notifyRole, notifyUsers } = require("../utils/notify");

const POPULATE = ["student", "university", "course"];

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.student) filter.student = req.query.student;
    if (req.user.role === "student") filter.student = req.user.id;
    const apps = await Application.find(filter)
      .populate("student", "name email")
      .populate("university", "name country")
      .populate("course", "name tuitionFee")
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id)
      .populate("student", "name email")
      .populate("university", "name country")
      .populate("course", "name tuitionFee");
    if (!app) return res.status(404).json({ message: "Application not found" });
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const studentId = req.user.role === "student" ? req.user.id : req.body.student;
    const app = await Application.create({ ...req.body, student: studentId });
    const populated = await app.populate("student", "name email");

    await notifyRole(["admin", "counsellor"], {
      type: "application_status",
      title: "New application submitted",
      message: `${populated.student?.name || "A student"} submitted a new application.`,
      link: "/applications",
      relatedId: app._id,
    });

    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!app) return res.status(404).json({ message: "Application not found" });
    res.json(app);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const app = await Application.findByIdAndDelete(req.params.id);
    if (!app) return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/applications/:id/status  (Approve / Reject / move through pipeline)
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!app) return res.status(404).json({ message: "Application not found" });

    await notifyUsers([app.student], {
      type: "application_status",
      title: "Application status updated",
      message: `Your application status changed to "${status}".`,
      link: "/applications",
      relatedId: app._id,
    });

    res.json(app);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
