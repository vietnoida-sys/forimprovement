const nodemailer = require("nodemailer");
const Settings = require("../models/Settings");

// Builds a transporter from SMTP config stored in environment variables.
// Throws a clear error if the .env isn't configured yet, so callers
// can catch it and decide whether to fail loudly or just log it.
const getTransporter = async () => {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USERNAME,
    SMTP_PASSWORD,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USERNAME || !SMTP_PASSWORD) {
    throw new Error(
      "SMTP is not configured yet. Set SMTP_HOST, SMTP_USERNAME, and SMTP_PASSWORD in your .env file."
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT ? parseInt(SMTP_PORT, 10) : 587,
    secure: SMTP_SECURE === "true", // true for port 465, false for others
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  });

  // Optional fallback for site name if SMTP_FROM_NAME isn't set
  const settings = await Settings.findOne({ singleton: "main" });

  return { transporter, settings };
};

// sendEmail({ to, subject, html, text })
exports.sendEmail = async ({ to, subject, html, text }) => {
  const { transporter, settings } = await getTransporter();

  const fromName = process.env.SMTP_FROM_NAME || settings?.siteName || "Student Portal";
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USERNAME;
  const from = `"${fromName}" <${fromEmail}>`;

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};