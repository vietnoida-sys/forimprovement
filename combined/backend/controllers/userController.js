const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET /api/users?role=student|counsellor|admin
exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;
    if (req.query.status) filter.status = req.query.status;
    const users = await User.find(filter).sort({ createdAt: -1 });
    res.json(users.map((u) => u.toSafeObject()));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.toSafeObject());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/users  (admin creates student/counsellor/admin accounts)
exports.create = async (req, res) => {
  try {
    const { name, email, password, role, phone, country } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });
    const user = await User.create({
      name,
      email,
      password: password || "changeme123",
      role: role || "student",
      phone,
      country,
    });
    res.status(201).json(user.toSafeObject());
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/users/:id
exports.update = async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.password; // password changes go through resetPassword
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.toSafeObject());
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/users/:id
exports.remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/users/:id/status
exports.toggleStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.status = user.status === "active" ? "inactive" : "active";
    await user.save();
    res.json(user.toSafeObject());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/users/:id/reset-password
exports.resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.password = newPassword; // pre-save hook hashes it
    await user.save();
    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
