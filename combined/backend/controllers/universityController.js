const University = require("../models/University");
const { notifyRole } = require("../utils/notify");

exports.getAll = async (req, res) => {
  try {
    const unis = await University.find().sort({ createdAt: -1 });
    res.json(unis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const uni = await University.findById(req.params.id);
    if (!uni) return res.status(404).json({ message: "Not found" });
    res.json(uni);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/universities  (admin / counsellor)
exports.create = async (req, res) => {
  try {
    const uni = await University.create(req.body);

    await notifyRole("student", {
      type: "university_added",
      title: "New university added",
      message: `${uni.name} (${uni.country}) is now listed — check it out.`,
      link: "/universities",
      relatedId: uni._id,
    });

    res.status(201).json(uni);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const uni = await University.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!uni) return res.status(404).json({ message: "Not found" });
    res.json(uni);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const uni = await University.findByIdAndDelete(req.params.id);
    if (!uni) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
