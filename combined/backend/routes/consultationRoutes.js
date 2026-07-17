const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

const {
  createConsultation,
  getAllConsultations,
  getSingleConsultation,
  deleteConsultation,
  acceptConsultation,
  rejectConsultation,
  bulkDeleteConsultations,
  
} = require("../controllers/consultationController");

// Public — the website's "Consultation Details" form posts here directly,
// no login required.
router.post("/", createConsultation);


// Staff-only from here on — this is CRM data, not public data.
router.use(protect, authorize("admin", "counsellor"));
router.get("/", getAllConsultations);
router.get("/:id", getSingleConsultation);

router.put("/:id/accept", acceptConsultation);
router.put("/:id/reject", rejectConsultation);
router.delete("/bulk-delete", bulkDeleteConsultations); // ye upar rakhna
router.delete("/:id", deleteConsultation); // ye niche

module.exports = router;
