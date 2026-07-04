const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

const {
  createConsultation,
  getAllConsultations,
  getSingleConsultation,
  deleteConsultation,
} = require("../controllers/consultationController");

// Public — the website's "Consultation Details" form posts here directly,
// no login required.
router.post("/", createConsultation);

// Staff-only from here on — this is CRM data, not public data.
router.use(protect, authorize("admin", "counsellor"));
router.get("/", getAllConsultations);
router.get("/:id", getSingleConsultation);
router.delete("/:id", deleteConsultation);

module.exports = router;
