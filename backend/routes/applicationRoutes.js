const express = require("express");

const {
  applyInternship,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
} = require("../controllers/applicationController");


const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const uploadResume = require("../middleware/uploadResume");


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