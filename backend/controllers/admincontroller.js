const User = require("../models/User");
const Internship = require("../models/Internship");
const Application = require("../models/Application");

// ======================
// Dashboard Statistics
// ======================
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalStudents,
      totalCompanies,
      totalAdmins,
      totalInternships,
      totalApplications,
      pendingApplications,
      shortlistedApplications,
      selectedApplications,
      rejectedApplications,
    ] = await Promise.all([
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: "company" }),
      User.countDocuments({ role: "admin" }),
      Internship.countDocuments(),
      Application.countDocuments(),
      Application.countDocuments({ status: "Pending" }),
      Application.countDocuments({ status: "Shortlisted" }),
      Application.countDocuments({ status: "Selected" }),
      Application.countDocuments({ status: "Rejected" }),
    ]);

    res.status(200).json({
      success: true,
      dashboard: {
        totalStudents,
        totalCompanies,
        totalAdmins,
        totalInternships,
        totalApplications,
        pendingApplications,
        shortlistedApplications,
        selectedApplications,
        rejectedApplications,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get All Students
// ======================
const getAllStudents = async (req, res) => {
  try {

    const students = await User.find({
      role: "student",
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get All Companies
// ======================
const getAllCompanies = async (req, res) => {
  try {

    const companies = await User.find({
      role: "company",
    })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get All Internships
// ======================
const getAllInternshipsAdmin = async (req, res) => {
  try {

    const internships = await Internship.find()
      .populate("company", "companyName fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: internships.length,
      internships,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Delete User
// ======================
const deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent deleting the last admin
    if (user.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });

      if (adminCount <= 1) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete the last admin account",
        });
      }
    }

    // Delete internships posted by company
    if (user.role === "company") {
      const internships = await Internship.find({
        company: user._id,
      });

      const internshipIds = internships.map(
        (internship) => internship._id
      );

      await Application.deleteMany({
        internship: { $in: internshipIds },
      });

      await Internship.deleteMany({
        company: user._id,
      });
    }

    // Delete applications submitted by student
    if (user.role === "student") {
      await Application.deleteMany({
        student: user._id,
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Delete Internship
// ======================
const deleteInternshipAdmin = async (req, res) => {
  try {

    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    // Delete all applications for this internship
    await Application.deleteMany({
      internship: internship._id,
    });

    await internship.deleteOne();

    res.status(200).json({
      success: true,
      message: "Internship deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllStudents,
  getAllCompanies,
  getAllInternshipsAdmin,
  deleteUser,
  deleteInternshipAdmin,
};