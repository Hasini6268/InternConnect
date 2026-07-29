const Application = require("../models/Application");
const Internship = require("../models/Internship");


// ======================
// Apply for Internship
// ======================

const applyInternship = async (req, res) => {

  try {


    if (req.user.role !== "student") {

      return res.status(403).json({

        success: false,

        message: "Only students can apply for internships",

      });

    }



    const {
      internshipId,
      coverLetter,
      phone,
      college,
      skills
    } = req.body;



    // Check uploaded file type

    if (req.file) {


      const allowedTypes = [

        "application/pdf",

        "application/msword",

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

      ];



      if (!allowedTypes.includes(req.file.mimetype)) {


        return res.status(400).json({

          success: false,

          message: "Only PDF, DOC and DOCX files are allowed",

        });


      }


    }




    // Check internship exists

    const internship = await Internship.findById(internshipId);



    if (!internship) {


      return res.status(404).json({

        success: false,

        message: "Internship not found",

      });


    }




    // Check duplicate application

    const alreadyApplied = await Application.findOne({

      student: req.user.id,

      internship: internshipId,

    });



    if (alreadyApplied) {


      return res.status(400).json({

        success: false,

        message: "You have already applied for this internship",

      });


    }





    // Create Application

    const application = await Application.create({

      student: req.user.id,

      internship: internshipId,

      resume: req.file ? req.file.path : "",

      coverLetter,

      phone,

      college,

      skills,

    });





    res.status(201).json({

      success: true,

      message: "Application Submitted Successfully",

      application,

    });



  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};




// ======================
// Student Applications
// ======================

const getMyApplications = async (req, res) => {


  try {


    const applications = await Application.find({

      student: req.user.id,

    })

    .populate("internship")

    .populate("student", "fullName email");





    res.status(200).json({

      success: true,

      count: applications.length,

      applications,

    });





  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }


};





// ======================
// Company View Applicants
// ======================

const getApplicants = async (req, res) => {


  try {


    const internship = await Internship.findById(req.params.id);




    if (!internship) {


      return res.status(404).json({

        success: false,

        message: "Internship not found",

      });


    }




    if (internship.company.toString() !== req.user.id) {


      return res.status(403).json({

        success: false,

        message: "You are not authorized to view applicants",

      });


    }





    const applications = await Application.find({

      internship: req.params.id,

    })

    .populate(

      "student",

      "fullName email phone college"

    )

    .populate(

      "internship",

      "title companyName"

    );





    res.status(200).json({

      success: true,

      count: applications.length,

      applications,

    });





  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }


};





// ======================
// Update Application Status
// ======================

const updateApplicationStatus = async (req, res) => {


  try {


    const application = await Application.findById(req.params.id)

      .populate("internship");





    if (!application) {


      return res.status(404).json({

        success: false,

        message: "Application not found",

      });


    }





    if (application.internship.company.toString() !== req.user.id) {


      return res.status(403).json({

        success: false,

        message: "You are not authorized to update this application",

      });


    }





    application.status = req.body.status;



    await application.save();





    res.status(200).json({

      success: true,

      message: "Application Status Updated Successfully",

      application,

    });





  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }


};





module.exports = {

  applyInternship,

  getMyApplications,

  getApplicants,

  updateApplicationStatus,

};