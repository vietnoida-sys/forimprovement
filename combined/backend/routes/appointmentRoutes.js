const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const crudFactory = require("../controllers/crudFactory");
const { protect, authorize } = require("../middleware/auth");

const ctrl = crudFactory(Appointment, ["student", "counsellor"]);

router.use(protect);

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", authorize("admin"), ctrl.remove);

module.exports = router;
