const express = require("express");

const router = express.Router();

const {
  createInternship,
  getAllInternships,
  getMyInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
} = require("../controllers/internshipController");

// Correct middleware imports
const protect = require("../middleware/authmiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");

// ==============================
// Public Routes
// ==============================

// Get all internships
router.get("/", getAllInternships);

// Get internship by ID
router.get("/:id", getInternshipById);

// ==============================
// Company Routes
// ==============================

// Create internship
router.post(
  "/",
  protect,
  authorizeRoles("company"),
  createInternship
);

// Get company's internships
router.get(
  "/my/internships",
  protect,
  authorizeRoles("company"),
  getMyInternships
);

// Update internship
router.put(
  "/:id",
  protect,
  authorizeRoles("company"),
  updateInternship
);

// Delete internship
router.delete(
  "/:id",
  protect,
  authorizeRoles("company"),
  deleteInternship
);

module.exports = router;