const express = require("express");

// Correct middleware imports
const protect = require("../middleware/authmiddleware");
const uploadResumeMiddleware = require("../middleware/uploadresume");

const {
  getProfile,
  updateProfile,
  uploadResume,
  saveInternship,
  getSavedInternships,
  removeSavedInternship,
} = require("../controllers/userController");

const router = express.Router();

// ======================
// Profile Routes
// ======================

// Get Logged-in User Profile
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

// Upload Resume
router.post(
  "/upload-resume",
  protect,
  uploadResumeMiddleware.single("resume"),
  uploadResume
);

// ======================
// Saved Internship Routes
// ======================

// Save an Internship
router.post("/save/:id", protect, saveInternship);

// Get All Saved Internships
router.get("/saved", protect, getSavedInternships);

// Remove Saved Internship
router.delete("/saved/:id", protect, removeSavedInternship);

module.exports = router;