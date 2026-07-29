const Internship = require("../models/Internship");
const User = require("../models/User");

// ======================
// Create Internship
// ======================
const createInternship = async (req, res) => {
  try {
    const company = await User.findById(req.user.id);

    if (!company || company.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "Only companies can post internships",
      });
    }

    const {
      title,
      description,
      skills,
      location,
      duration,
      stipend,
      mode,
      lastDate,
    } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      !duration ||
      !stipend ||
      !mode ||
      !lastDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const internship = await Internship.create({
      title: title.trim(),
      company: company._id,
      companyName: company.companyName,
      description,
      skills,
      location: location.trim(),
      duration,
      stipend,
      mode,
      lastDate,
    });

    res.status(201).json({
      success: true,
      message: "Internship Created Successfully",
      internship,
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
// Search + Filter + Pagination
// ======================
const getAllInternships = async (req, res) => {
  try {
    const {
      search,
      location,
      mode,
      skill,
      duration,
      stipend,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { companyName: { $regex: search.trim(), $options: "i" } },
        { skills: { $regex: search.trim(), $options: "i" } },
      ];
    }

    if (location) {
      query.location = {
        $regex: location.trim(),
        $options: "i",
      };
    }

    if (mode) {
      query.mode = mode;
    }

    if (skill) {
      query.skills = {
        $regex: skill.trim(),
        $options: "i",
      };
    }

    if (duration) {
      query.duration = {
        $regex: duration.trim(),
        $options: "i",
      };
    }

    if (stipend) {
      query.stipend = {
        $regex: stipend.trim(),
        $options: "i",
      };
    }

    const currentPage = Number(page);
    const pageSize = Number(limit);

    const totalInternships = await Internship.countDocuments(query);

    const internships = await Internship.find(query)
      .populate("company", "fullName email companyName")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    res.status(200).json({
      success: true,
      currentPage,
      totalPages: Math.ceil(totalInternships / pageSize),
      totalInternships,
      count: internships.length,
      hasNextPage: currentPage < Math.ceil(totalInternships / pageSize),
      hasPreviousPage: currentPage > 1,
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
// Get My Internships
// ======================
const getMyInternships = async (req, res) => {
  try {
    const internships = await Internship.find({
      company: req.user.id,
    }).populate("company", "fullName email companyName");

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
// Get Internship By ID
// ======================
const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate("company", "fullName email companyName");

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship Not Found",
      });
    }

    res.status(200).json({
      success: true,
      internship,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Update Internship
// ======================
const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship Not Found",
      });
    }

    if (internship.company.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this internship",
      });
    }

    const updatedInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Internship Updated Successfully",
      internship: updatedInternship,
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
const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship Not Found",
      });
    }

    if (internship.company.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this internship",
      });
    }

    await internship.deleteOne();

    res.status(200).json({
      success: true,
      message: "Internship Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createInternship,
  getAllInternships,
  getMyInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
};