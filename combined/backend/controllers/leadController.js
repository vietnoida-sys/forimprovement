const Lead = require("../models/Lead");

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate("assignedTo", "name email");
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("assignedTo", "name email");
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/leads/:id/assign
exports.assign = async (req, res) => {
  try {
    const { counsellorId } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { assignedTo: counsellorId },
      { new: true }
    ).populate("assignedTo", "name email");
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PATCH /api/leads/:id/status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate(
      "assignedTo",
      "name email"
    );
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/leads/followups/due  (reminders: due today or overdue)
exports.dueFollowUps = async (req, res) => {
  try {
    const leads = await Lead.find({
      followUpDate: { $lte: new Date() },
      status: { $nin: ["Enrolled"] },
    })
      .populate("assignedTo", "name email")
      .sort({ followUpDate: 1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
