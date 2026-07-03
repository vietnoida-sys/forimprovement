const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/publicInquiryController");
const { protect, authorize } = require("../middleware/auth");

// Public — anyone visiting the website can submit this, no login needed.
router.post("/book", ctrl.bookAppointment);

// Staff-only — view submitted inquiries inside EduAdmin.
router.get("/", protect, authorize("admin", "counsellor"), ctrl.getAll);

module.exports = router;
