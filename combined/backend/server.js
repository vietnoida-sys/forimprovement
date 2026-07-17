require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");

// CMS routers
const bannersRouter = require("./routes/Banners");
const blogPostsRouter = require("./routes/Blogposts");
const testimonialsRouter = require("./routes/Testimonials");
const faqsRouter = require("./routes/Faqs");
const newsEventsRouter = require("./routes/NewsEvents");

const app = express();

// Ensure uploads dir exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// CORS - supports comma-separated origins via CORS_ORIGIN, falls back to CLIENT_URL, then "*"
const allowedOrigins = (process.env.CORS_ORIGIN || process.env.CLIENT_URL || "*")
  .split(",")
  .map((origin) => origin.trim());
app.use(cors({ origin: allowedOrigins }));

app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Root status endpoint
app.get("/", (req, res) => res.json({ status: "VietWorldGate + EduAdmin API running" }));

// EduAdmin / VietWorldGate routes
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
// Public, unauthenticated endpoints used by the VietWorldGate marketing site
// — these feed straight into the same CRM/Leads + notification system as
// everything else here.
app.use("/api/public-inquiries", require("./routes/publicInquiryRoutes"));
app.use("/api/consultations", require("./routes/consultationRoutes"));
app.use("/api/settings", require("./routes/settings"));

// CMS routes
app.use("/api/banners", bannersRouter);
app.use("/api/blog-posts", blogPostsRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/faqs", faqsRouter);
app.use("/api/news-events", newsEventsRouter);

// 404 fallback for unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global fallback 404 for any other unmatched route
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Central/global error handler (catches anything thrown/rejected in routes)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Unexpected server error", error: err.message });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Combined API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  });