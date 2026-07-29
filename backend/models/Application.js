const mongoose = require("mongoose");


const applicationSchema = new mongoose.Schema(

  {

    student: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

    },


    internship: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "Internship",

      required: true,

    },


    phone: {

      type: String,

      default: "",

    },


    college: {

      type: String,

      default: "",

    },


    skills: {

      type: String,

      default: "",

    },


    resume: {

      type: String,

      default: "",

    },


    coverLetter: {

      type: String,

      default: "",

    },


    status: {

      type: String,

      enum: [

        "Pending",

        "Reviewed",

        "Shortlisted",

        "Interview Scheduled",

        "Selected",

        "Rejected",

      ],

      default: "Pending",

    },

  },


  {

    timestamps: true,

  }

);


module.exports = mongoose.model("Application", applicationSchema);