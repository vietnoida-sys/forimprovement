const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/leadController");
const { protect, authorize } = require("../middleware/auth");

router.use(protect, authorize("admin", "counsellor"));

router.get("/followups/due", ctrl.dueFollowUps);
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", authorize("admin"), ctrl.remove);
router.patch("/:id/assign", authorize("admin"), ctrl.assign);
router.patch("/:id/status", ctrl.updateStatus);

module.exports = router;
