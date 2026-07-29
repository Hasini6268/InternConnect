const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "company", "admin"],
      default: "student",
    },

    phone: {
      type: String,
      default: "",
    },

    college: {
      type: String,
      default: "",
    },

    companyName: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    savedInternships: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Internship",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);