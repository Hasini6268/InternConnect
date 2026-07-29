const express = require("express");

const {
  getDashboardStats,
  getAllStudents,
  getAllCompanies,
  getAllInternshipsAdmin,
  deleteUser,
  deleteInternshipAdmin,
} = require("../controllers/adminController");

// Correct middleware imports
const protect = require("../middleware/authmiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");

const router = express.Router();

// ======================
// Admin Authentication
// ======================
router.use(protect);
router.use(authorizeRoles("admin"));

// ======================
// Dashboard
// ======================
router.get("/dashboard", getDashboardStats);

// ======================
// Student Management
// ======================
router.get("/students", getAllStudents);

// ======================
// Company Management
// ======================
router.get("/companies", getAllCompanies);

// ======================
// Internship Management
// ======================
router.get("/internships", getAllInternshipsAdmin);

// ======================
// User Management
// ======================
router.delete("/user/:id", deleteUser);

// ======================
// Internship Management
// ======================
router.delete("/internship/:id", deleteInternshipAdmin);

module.exports = router;