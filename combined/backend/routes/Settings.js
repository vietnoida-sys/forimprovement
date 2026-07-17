const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/Settingscontroller");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.get("/", authorize("admin"), ctrl.get);
router.get("/secrets", authorize("admin"), ctrl.getWithSecrets);
router.put("/", authorize("admin"), ctrl.update);

module.exports = router;