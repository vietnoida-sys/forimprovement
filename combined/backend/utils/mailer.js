const nodemailer = require("nodemailer");
const Settings = require("../models/Settings");

// Builds a transporter from whatever SMTP config is saved in Settings.
// Throws a clear error if admin hasn't configured SMTP yet, so callers
// can catch it , decide whether to fail loudly or just log it.
const getTransporter = async () => {
  const settings = await Settings.findOne({ singleton: "main" }).select("+smtp.password");

  if (!settings || !settings.smtp?.host || !settings.smtp?.username || !settings.smtp?.password) {
    throw new Error("SMTP is not configured yet. Set it up in Settings > SMTP Email.");
  }

  const transporter = nodemailer.createTransport({
    host: settings.smtp.host,
    port: settings.smtp.port || 587,
    secure: !!settings.smtp.secure, // true for port 465, false for others
    auth: {
      user: settings.smtp.username,
      pass: settings.smtp.password,
    },
  });

  return { transporter, settings };
};

// sendEmail({ to, subject, html, text })
exports.sendEmail = async ({ to, subject, html, text }) => {
  const { transporter, settings } = await getTransporter();

  const fromName = settings.smtp.fromName || settings.siteName || "Student Portal";
  const fromEmail = settings.smtp.fromEmail || settings.smtp.username;
  const from = `"${fromName}" <${fromEmail}>`;

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};
