const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.get("/", authorize("admin", "counsellor"), ctrl.getAll);
router.get("/:id", authorize("admin", "counsellor"), ctrl.getOne);
router.post("/", authorize("admin"), ctrl.create);
router.put("/:id", authorize("admin"), ctrl.update);
router.delete("/:id", authorize("admin"), ctrl.remove);
router.patch("/:id/status", authorize("admin"), ctrl.toggleStatus);
router.patch("/:id/reset-password", authorize("admin"), ctrl.resetPassword);

module.exports = router;
