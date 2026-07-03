const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
    // Owner of the document. Required for a student's own uploads and for a
    // staff upload targeted at ONE specific student. Left empty when a staff
    // member shares a document with ALL students (audience === "all").
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, required: true }, // e.g. Passport, Transcript, SOP, IELTS, Circular
    title: { type: String }, // optional short label, mainly used for staff-shared documents
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
    rejectionReason: { type: String },

    // Set when an admin/counsellor uploads this document FOR student(s),
    // as opposed to a student uploading their own document for verification.
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    audience: { type: String, enum: ["single", "all"], default: "single" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
