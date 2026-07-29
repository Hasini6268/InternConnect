const express = require("express");

const {
  applyInternship,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
} = require("../controllers/applicationController");

// Correct middleware imports
const protect = require("../middleware/authmiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");
const uploadResume = require("../middleware/uploadresume");

const router = express.Router();

// ======================
// Student Routes
// ======================

// Apply for Internship
router.post(
  "/apply",
  protect,
  authorizeRoles("student"),
  uploadResume.single("resume"),
  applyInternship
);

// View Student Applications
router.get(
  "/my-applications",
  protect,
  authorizeRoles("student"),
  getMyApplications
);

// ======================
// Company Routes
// ======================

// View Applicants
router.get(
  "/applicants/:id",
  protect,
  authorizeRoles("company"),
  getApplicants
);

// Update Application Status
router.put(
  "/status/:id",
  protect,
  authorizeRoles("company"),
  updateApplicationStatus
);

module.exports = router;