const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendEmail } = require("../utils/mailer");
const Settings = require("../models/Settings");

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

    // 1) Welcome email to the USER — non-blocking, never fails the request.
   /*    try {
      await sendEmail({
        to: user.email,
        subject: "Welcome! Your account has been created",
        html: `
          <div style="font-family: sans-serif; line-height: 1.6;">
            <h2>Hi ${user.name},</h2>
            <p>Your account has been created successfully as a <b>${user.role}</b>.</p>
            <p><b>Login email:</b> ${user.email}</p>
            <p>You can now log in and start using the portal.</p>
            <p>Best regards,<br>The Admissions Team</p>
          </div>
        `,
        text: `Hi ${user.name}, your account has been created successfully as a ${user.role}. Login email: ${user.email}. You can now log in and start using the portal.`,
      });
    } catch (emailErr) {
      console.error("Welcome email failed:", emailErr.message);
    }  */
    // 2) Notification email to ADMIN — non-blocking, never fails the request.
    /*
    try {
      const settings = await Settings.findOne({ singleton: "main" });
      const adminEmail = settings?.smtp?.adminEmail || process.env.ADMIN_NOTIFY_EMAIL;

      if (adminEmail) {
        await sendEmail({
          to: adminEmail,
          subject: `New ${user.role} registered: ${user.name}`,
          html: `
            <div style="font-family: sans-serif; border: 1px solid #eee; padding: 20px; max-width: 600px;">
              <h2 style="color: #333;">New User Registration</h2>
              <p>A new user has registered on the portal with the following details:</p>
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
          text: `New user registered:\n\nName: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nPhone: ${user.phone || "N/A"}\nCountry: ${user.country || "N/A"}\nID: ${user._id}`,
        });
      } else {
        console.warn("Admin notification email skipped: No admin email configured in settings or environment variables.");
      }
    } catch (emailErr) {
      console.error("Admin notification email failed:", emailErr.message);
    }
      */

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