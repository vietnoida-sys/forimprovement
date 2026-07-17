const Consultation = require("../models/Consultation");
const { sendEmail } = require("../utils/mailer");

// Create Consultation
exports.createConsultation = async (req, res) => {
  try {
    const {
      fullName,
      email,
      whatsappNumber,
      targetCountry,
      consultationType,
    } = req.body;

    // Validation
    const errors = {};
    if (!fullName?.trim()) errors.fullName = "Full name is required";
    if (!email?.trim()) errors.email = "Email is required";
    if (!targetCountry) errors.targetCountry = "Target country is required";
    if (!consultationType) errors.consultationType = "Consultation type is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Save to DB
    const consultation = await Consultation.create({
      fullName,
      email,
      whatsappNumber,
      targetCountry,
      consultationType,
    });

    // 1) Confirmation email to the USER
    try {
      await sendEmail({
        to: email,
        subject: "We've received your consultation request",
        html: `
          <div style="font-family: sans-serif; line-height: 1.6;">
            <h2>Hi ${fullName},</h2>
            <p>Thank you for reaching out! We have successfully received your consultation request for <b>${targetCountry}</b> (${consultationType}).</p>
            <p>Our advisory team will review your details and get in touch with you shortly ${whatsappNumber ? "on WhatsApp or email" : "via email"}.</p>
            <p>Best regards,<br>The Admissions Team</p>
          </div>
        `,
        text: `Hi ${fullName}, thank you for reaching out! We've received your consultation request for ${targetCountry} (${consultationType}). Our team will get in touch with you shortly.`,
      });
    } catch (emailErr) {
      console.error("User confirmation email failed:", emailErr.message);
    }

    // 2) Notification email to ADMIN
    try {
      const adminEmail = process.env.ADMIN_NOTIFY_EMAIL;

      if (adminEmail) {
        await sendEmail({
          to: adminEmail,
          subject: `New Lead: ${fullName} (${targetCountry})`,
          html: `
            <div style="font-family: sans-serif; border: 1px solid #eee; padding: 20px; max-width: 600px;">
              <h2 style="color: #333;">New Consultation Request Received</h2>
              <p>A new lead has submitted a consultation form with the following details:</p>
              <ul style="list-style: none; padding: 0;">
                <li><b>Name:</b> ${fullName}</li>
                <li><b>Email:</b> ${email}</li>
                <li><b>WhatsApp:</b> ${whatsappNumber || "Not provided"}</li>
                <li><b>Target Country:</b> ${targetCountry}</li>
                <li><b>Consultation Type:</b> ${consultationType}</li>
              </ul>
              <p style="font-size: 0.9em; color: #777;">Consultation ID: ${consultation._id}</p>
            </div>
          `,
          text: `New consultation request received:\n\nName: ${fullName}\nEmail: ${email}\nWhatsApp: ${whatsappNumber || "N/A"}\nTarget Country: ${targetCountry}\nConsultation Type: ${consultationType}\nID: ${consultation._id}`,
        });
      } else {
        console.warn("Admin notification email skipped: ADMIN_NOTIFY_EMAIL is not set in .env.");
      }
    } catch (emailErr) {
      console.error("Admin notification email failed:", emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: "Consultation request submitted successfully",
      consultation,
    });
  } catch (error) {
    console.error("Create Consultation Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// --- Other controller methods (getAll, getSingle, delete) remain unchanged ---
exports.getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: consultations.length, consultations });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getSingleConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, consultation });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndDelete(req.params.id);
    if (!consultation) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// Accept Consultation - sends confirmation email to user
exports.acceptConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({ success: false, message: "Consultation not found" });
    }

    // Update status
    consultation.status = "accepted";
    await consultation.save();

    // Send acceptance email to user
    try {
      await sendEmail({
        to: consultation.email,
        subject: "Your consultation request has been accepted!",
        html: `
          <div style="font-family: sans-serif; line-height: 1.6;">
            <h2>Hi ${consultation.fullName},</h2>
            <p>Good news! Your consultation request for <b>${consultation.targetCountry}</b> (${consultation.consultationType}) has been <b>accepted</b>.</p>
            <p>Our advisory team will reach out to you shortly ${consultation.whatsappNumber ? "on WhatsApp or email" : "via email"} to schedule the next steps.</p>
            <p>Best regards,<br>The Admissions Team</p>
          </div>
        `,
        text: `Hi ${consultation.fullName}, your consultation request for ${consultation.targetCountry} (${consultation.consultationType}) has been accepted. Our team will reach out to you shortly.`,
      });
    } catch (emailErr) {
      console.error("Acceptance email failed:", emailErr.message);
      return res.status(200).json({
        success: true,
        message: "Consultation accepted but email failed to send",
        consultation,
      });
    }

    res.status(200).json({
      success: true,
      message: "Consultation accepted and email sent successfully",
      consultation,
    });
  } catch (error) {
    console.error("Accept Consultation Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Reject Consultation - sends rejection email to user
exports.rejectConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({ success: false, message: "Consultation not found" });
    }

    consultation.status = "rejected";
    await consultation.save();

    try {
      await sendEmail({
        to: consultation.email,
        subject: "Update on your consultation request",
        html: `
          <div style="font-family: sans-serif; line-height: 1.6;">
            <h2>Hi ${consultation.fullName},</h2>
            <p>Thank you for your interest in <b>${consultation.targetCountry}</b> (${consultation.consultationType}).</p>
            <p>After reviewing your request, we're unable to proceed with this consultation at this time.</p>
            <p>Feel free to reach out if you have any questions.</p>
            <p>Best regards,<br>The Admissions Team</p>
          </div>
        `,
        text: `Hi ${consultation.fullName}, after reviewing your consultation request for ${consultation.targetCountry} (${consultation.consultationType}), we're unable to proceed at this time.`,
      });
    } catch (emailErr) {
      console.error("Rejection email failed:", emailErr.message);
      return res.status(200).json({
        success: true,
        message: "Consultation rejected but email failed to send",
        consultation,
      });
    }

    res.status(200).json({
      success: true,
      message: "Consultation rejected and email sent successfully",
      consultation,
    });
  } catch (error) {
    console.error("Reject Consultation Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
exports.deleteConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndDelete(req.params.id);
    if (!consultation) return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
// Bulk delete - deletes multiple consultations by array of IDs
exports.bulkDeleteConsultations = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "No IDs provided" });
    }

    const result = await Consultation.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} consultation(s) deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Bulk Delete Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};