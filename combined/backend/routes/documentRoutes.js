const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ctrl = require("../controllers/documentController");
const { protect, authorize } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "uploads")),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.use(protect);

router.get("/", ctrl.getAll);
router.post("/upload", upload.single("file"), ctrl.upload);
router.post("/share", authorize("admin", "counsellor"), upload.single("file"), ctrl.shareWithStudents);
router.delete("/:id", ctrl.remove);
router.patch("/:id/verify", authorize("admin", "counsellor"), ctrl.verify);
router.patch("/:id/reject", authorize("admin", "counsellor"), ctrl.reject);

module.exports = router;
