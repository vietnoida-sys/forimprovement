const express = require("express");
const router = express.Router();
const Visa = require("../models/Visa");
const crudFactory = require("../controllers/crudFactory");
const { protect, authorize } = require("../middleware/auth");

const ctrl = crudFactory(Visa, ["student", "application"]);

router.use(protect);

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", authorize("admin", "counsellor"), ctrl.create);
router.put("/:id", authorize("admin", "counsellor"), ctrl.update);
router.delete("/:id", authorize("admin"), ctrl.remove);

module.exports = router;
