require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");

const app = express();

// Ensure uploads dir exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/universities", require("./routes/universityRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/documents", require("./routes/documentRoutes"));
app.use("/api/scholarships", require("./routes/scholarshipRoutes"));
app.use("/api/visas", require("./routes/visaRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/public-inquiries", require("./routes/publicInquiryRoutes"));

app.get("/", (req, res) => res.json({ status: "EduAdmin API running" }));

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error", error: err.message });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
