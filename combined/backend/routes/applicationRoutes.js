const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/applicationController");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", ctrl.create);
router.put("/:id", authorize("admin", "counsellor"), ctrl.update);
router.patch("/:id/status", authorize("admin", "counsellor"), ctrl.updateStatus);
router.delete("/:id", authorize("admin"), ctrl.remove);

module.exports = router;
