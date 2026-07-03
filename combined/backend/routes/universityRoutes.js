const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/universityController");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", authorize("admin", "counsellor"), ctrl.create);
router.put("/:id", authorize("admin", "counsellor"), ctrl.update);
router.delete("/:id", authorize("admin"), ctrl.remove);

module.exports = router;
