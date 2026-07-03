const nodemailer = require("nodemailer");

// Best-effort email notification for public website inquiries. Never throws —
// a mail failure should not block saving the inquiry to the database.
const sendMail = async (data) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("sendMail skipped: EMAIL_USER/EMAIL_PASS not configured");
    return false;
  }
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
      subject: "New Appointment Form — VietWorldGate",
      html: `
        <div style="font-family: Arial; padding:20px; background:#f4f4f4;">
          <div style="max-width:600px; margin:auto; background:white; padding:25px; border-radius:10px;">
            <h2 style="color:#1e3a8a; margin-bottom:20px;">New Appointment Received</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Mobile:</strong> ${data.mobile}</p>
            <p><strong>City:</strong> ${data.city}</p>
            <p><strong>Message:</strong> ${data.message}</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent:", info.response);
    return true;
  } catch (error) {
    console.log("Mail Error:", error.message);
    return false;
  }
};

module.exports = sendMail;
