const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    location: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    stipend: {
      type: String,
      default: "Unpaid",
    },

    mode: {
      type: String,
      enum: ["Remote", "Onsite", "Hybrid"],
      default: "Onsite",
    },

    lastDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Internship", internshipSchema);