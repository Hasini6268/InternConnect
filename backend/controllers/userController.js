const User = require("../models/User");

// ======================
// Get Profile
// ======================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("savedInternships");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Update Profile
// ======================
const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      college,
      companyName,
      location,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;

    if (user.role === "student" && college !== undefined) {
      user.college = college;
    }

    if (user.role === "company" && companyName !== undefined) {
      user.companyName = companyName;
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Upload Resume
// ======================
const uploadResume = async (req, res) => {
  try {

    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can upload resumes",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Save uploaded resume path
    user.resume = req.file.path;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Resume Uploaded Successfully",
      resume: user.resume,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Save Internship
// ======================
const saveInternship = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can save internships",
      });
    }

    const internshipId = req.params.id;

    const alreadySaved = user.savedInternships.some(
      (id) => id.toString() === internshipId
    );

    if (alreadySaved) {
      return res.status(400).json({
        success: false,
        message: "Internship already saved",
      });
    }

    user.savedInternships.push(internshipId);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Internship saved successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get Saved Internships
// ======================
const getSavedInternships = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .populate("savedInternships");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      count: user.savedInternships.length,
      internships: user.savedInternships,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Remove Saved Internship
// ======================
const removeSavedInternship = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.savedInternships = user.savedInternships.filter(
      (id) => id.toString() !== req.params.id
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Internship removed successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadResume,
  saveInternship,
  getSavedInternships,
  removeSavedInternship,
};