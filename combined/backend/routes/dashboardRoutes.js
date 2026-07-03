const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/dashboardController");
const { protect } = require("../middleware/auth");

router.use(protect);
router.get("/stats", ctrl.getStats);
router.get("/lead-status-breakdown", ctrl.leadStatusBreakdown);

module.exports = router;
