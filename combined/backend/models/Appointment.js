const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    counsellor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dateTime: { type: Date, required: true },
    status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
    meetingLink: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
