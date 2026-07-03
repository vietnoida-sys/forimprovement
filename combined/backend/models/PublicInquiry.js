const mongoose = require("mongoose");

// Public "book an appointment / talk to a counsellor" form submitted from the
// VietWorldGate marketing website. No login required to submit this.
const publicInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String },
    city: { type: String },
    message: { type: String },
    status: { type: String, enum: ["New", "Contacted", "Converted", "Closed"], default: "New" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PublicInquiry", publicInquirySchema);
