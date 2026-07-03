const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// POST /api/auth/register  (admin creates users; first admin can self-register if no admin exists)
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone, country } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const adminCount = await User.countDocuments({ role: "admin" });
    // Allow open self-registration only for the very first admin account (bootstrap).
    let finalRole = role || "student";
    if (adminCount === 0 && finalRole === "admin") {
      finalRole = "admin";
    } else if (req.user?.role !== "admin" && finalRole !== "student") {
      // Non-admins hitting a public endpoint can only create student accounts
      finalRole = "student";
    }

    const user = await User.create({ name, email, password, role: finalRole, phone, country });
    const token = signToken(user);
    res.status(201).json({ user: user.toSafeObject(), token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });
    if (user.status === "inactive") return res.status(403).json({ message: "Account is inactive" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: "Invalid email or password" });

    const token = signToken(user);
    res.json({ user: user.toSafeObject(), token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/auth/me
exports.me = async (req, res) => {
  res.json({ user: req.user.toSafeObject() });
};

// PATCH /api/auth/change-password  (any logged-in user changes their own password)
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }
    const user = await User.findById(req.user.id);
    const match = await user.comparePassword(currentPassword || "");
    if (!match) return res.status(401).json({ message: "Current password is incorrect" });
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
