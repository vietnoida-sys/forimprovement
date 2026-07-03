const PublicInquiry = require("../models/PublicInquiry");
const sendMail = require("../utils/sendMail");
const { notifyRole } = require("../utils/notify");

// POST /api/public-inquiries/book  (public — no auth, called from the website)
exports.bookAppointment = async (req, res) => {
  try {
    const { name, email, mobile, city, message } = req.body;

    const inquiry = await PublicInquiry.create({ name, email, mobile, city, message });

    // Best-effort email to the consultancy inbox.
    sendMail({ name, email, mobile, city, message });

    // Also surface it inside EduAdmin so counsellors see it as an in-app notification.
    await notifyRole(["admin", "counsellor"], {
      type: "application_status",
      title: "New website inquiry",
      message: `${name} requested a callback from the website (${city || "location not given"}).`,
      link: "/leads",
      relatedId: inquiry._id,
    });

    res.status(201).json({ success: true, message: "Appointment Submitted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/public-inquiries  (admin/counsellor — view website inquiries)
exports.getAll = async (req, res) => {
  try {
    const items = await PublicInquiry.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
