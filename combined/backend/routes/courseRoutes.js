const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const crudFactory = require("../controllers/crudFactory");
const { protect, authorize } = require("../middleware/auth");

const ctrl = crudFactory(Course, ["university"]);

router.use(protect);

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", authorize("admin"), ctrl.create);
router.put("/:id", authorize("admin"), ctrl.update);
router.delete("/:id", authorize("admin"), ctrl.remove);

module.exports = router;
