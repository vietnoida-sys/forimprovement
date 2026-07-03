const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/notificationController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/", ctrl.getMine);
router.get("/unread-count", ctrl.unreadCount);
router.patch("/:id/read", ctrl.markRead);
router.patch("/read-all", ctrl.markAllRead);

module.exports = router;
