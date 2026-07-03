const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/scholarshipController");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", authorize("admin", "counsellor"), ctrl.create);
router.put("/:id", authorize("admin", "counsellor"), ctrl.update);
router.delete("/:id", authorize("admin"), ctrl.remove);

// Scholarship applications sub-resource
router.get("/applications/all", ctrl.getAllApplications);
router.post("/applications", ctrl.applyForScholarship);
router.put("/applications/:id", authorize("admin", "counsellor"), ctrl.updateApplication);
router.delete("/applications/:id", authorize("admin"), ctrl.removeApplication);

module.exports = router;
