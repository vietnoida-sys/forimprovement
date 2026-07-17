const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../utils/mailer");
const Settings = require("../models/Settings");

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

    const finalPassword = password || "changeme123";

    const user = await User.create({
      name,
      email,
      password: finalPassword,
      role: role || "student",
      phone,
      country,
    });

    // Welcome email with login credentials — non-blocking, never fails the request.
    try {
      await sendEmail({
        to: user.email,
        subject: "Your account has been created",
        html: `
          <p>Hi ${user.name},</p>
          <p>An account has been created for you as a <b>${user.role}</b>.</p>
          <p><b>Login email:</b> ${user.email}<br/>
          <b>Temporary password:</b> ${finalPassword}</p>
          <p>Please log in and change your password as soon as possible.</p>
        `,
        text: `Hi ${user.name}, an account has been created for you as a ${user.role}. Login email: ${user.email}, Temporary password: ${finalPassword}. Please log in and change your password as soon as possible.`,
      });
    } catch (emailErr) {
      console.error("Welcome email failed:", emailErr.message);
    }

    // Admin notification email — non-blocking, never fails the request.
    try {
      const settings = await Settings.findOne({ singleton: "main" });
      const adminEmail = settings?.smtp?.adminEmail || process.env.ADMIN_NOTIFY_EMAIL;

      if (adminEmail) {
        await sendEmail({
          to: adminEmail,
          subject: `New ${user.role} account created: ${user.name}`,
          html: `
            <div style="font-family: sans-serif; border: 1px solid #eee; padding: 20px; max-width: 600px;">
              <h2 style="color: #333;">New User Account Created</h2>
              <ul style="list-style: none; padding: 0;">
                <li><b>Name:</b> ${user.name}</li>
                <li><b>Email:</b> ${user.email}</li>
                <li><b>Role:</b> ${user.role}</li>
                <li><b>Phone:</b> ${user.phone || "Not provided"}</li>
                <li><b>Country:</b> ${user.country || "Not provided"}</li>
              </ul>
              <p style="font-size: 0.9em; color: #777;">User ID: ${user._id}</p>
            </div>
          `,
          text: `New user account created:\n\nName: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nPhone: ${user.phone || "N/A"}\nCountry: ${user.country || "N/A"}\nID: ${user._id}`,
        });
      } else {
        console.warn("Admin notification email skipped: No admin email configured.");
      }
    } catch (emailErr) {
      console.error("Admin notification email failed:", emailErr.message);
    }

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

    // Notify the user their password was reset — non-blocking.
    try {
      await sendEmail({
        to: user.email,
        subject: "Your password has been reset",
        html: `
          <p>Hi ${user.name},</p>
          <p>Your account password was just reset by an administrator.</p>
          <p><b>New password:</b> ${newPassword}</p>
          <p>If you did not expect this change, please contact support immediately.</p>
        `,
        text: `Hi ${user.name}, your account password was just reset by an administrator. New password: ${newPassword}. If you did not expect this change, please contact support immediately.`,
      });
    } catch (emailErr) {
      console.error("Password reset email failed:", emailErr.message);
    }

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};