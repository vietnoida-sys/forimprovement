const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, trim: true, default: "" },
    excerpt: { type: String, trim: true, default: "" },
    content: { type: String, default: "" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    date: { type: String, required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);