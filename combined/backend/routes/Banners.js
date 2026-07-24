const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Banner = require("../models/Banner");
const createCrudRouter = require("../utils/crudRouter");

// Make sure the upload folder exists
const uploadDir = path.join(__dirname, "..", "uploads", "banners");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  },
});

const fileFilter = (req, file, cb) => {
  if (/^image\/(jpeg|jpg|png|webp|gif)$/.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, WEBP or GIF images are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Base CRUD routes (GET/POST/PUT/DELETE)
const router = createCrudRouter(Banner, { sortBy: "order -createdAt" });

// Image upload route — POST /api/banners/upload (field name: "image")
router.post("/upload", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    const url = `${req.protocol}://${req.get("host")}/uploads/banners/${req.file.filename}`;
    res.status(201).json({ url });
  });
});

module.exports = router;