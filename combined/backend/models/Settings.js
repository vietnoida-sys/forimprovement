const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    // Ensures only one settings document ever exists
    singleton: { type: String, default: "main", unique: true },

    siteName: { type: String, default: "Student Portal" },

    website: {
      logoUrl: { type: String, default: "" },
      supportEmail: { type: String, default: "" },
      contactPhone: { type: String, default: "" },
      address: { type: String, default: "" },
    },

    smtp: {
      host: { type: String, default: "" },
      port: { type: Number, default: 587 },
      secure: { type: Boolean, default: false }, // true for 465, false for other ports
      username: { type: String, default: "" },
      password: { type: String, default: "", select: false }, // hidden by default on reads
      fromName: { type: String, default: "" },
      fromEmail: { type: String, default: "" },
    },

    paymentGateway: {
      provider: { type: String, enum: ["stripe", "razorpay", "paypal", "none"], default: "none" },
      publicKey: { type: String, default: "" },
      secretKey: { type: String, default: "", select: false }, // hidden by default on reads
      webhookSecret: { type: String, default: "", select: false },
      currency: { type: String, default: "USD" },
    },

    notifications: {
      emailOnNewApplication: { type: Boolean, default: true },
      emailOnStatusChange: { type: Boolean, default: true },
      emailOnNewUniversity: { type: Boolean, default: true },
      smsEnabled: { type: Boolean, default: false },
      inAppEnabled: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);