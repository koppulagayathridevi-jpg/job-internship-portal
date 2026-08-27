// const express = require("express");
// const router = express.Router();

// const Application = require("../models/Application");
// const Job = require("../models/Job");

// const authMiddleware = require("../middleware/authMiddleware");


// // =====================================================
// // POST - APPLY FOR JOB
// // =====================================================

// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { jobId } = req.body;

//     // Check job ID
//     if (!jobId) {
//       return res.status(400).json({
//         success: false,
//         message: "Job ID is required",
//       });
//     }

//     // Check job exists
//     const job = await Job.findById(jobId);

//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }

//     // Check duplicate application
//     const existingApplication =
//       await Application.findOne({
//         candidate: req.user.id,
//         job: jobId,
//       });

//     if (existingApplication) {
//       return res.status(400).json({
//         success: false,
//         message: "You have already applied for this job",
//       });
//     }

//     // Create application
//     const application =
//       await Application.create({
//         candidate: req.user.id,
//         job: jobId,
//         status: "Applied",
//       });

//     res.status(201).json({
//       success: true,
//       message: "Application submitted successfully",
//       application,
//     });

//   } catch (error) {
//     console.error(
//       "Application Create Error:",
//       error
//     );

//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// });
// // =====================================================
// // GET - CANDIDATE'S OWN APPLICATIONS
// // =====================================================

// router.get("/my", authMiddleware, async (req, res) => {
//   try {

//     console.log("Candidate applications request");
//     console.log("Logged-in user:", req.user);

//     const applications = await Application.find({
//       candidate: req.user.id,
//     })
//       .populate(
//         "job",
//         "title company location salary type experience"
//       )
//       .sort({
//         createdAt: -1,
//       });

//     res.status(200).json({
//       success: true,
//       count: applications.length,
//       applications,
//     });

//   } catch (error) {

//     console.error(
//       "Candidate Applications Error:",
//       error
//     );

//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });

//   }
// });


// // =====================================================
// // GET - ADMIN VIEW ALL APPLICATIONS
// // =====================================================

// router.get("/", authMiddleware, async (req, res) => {
//   try {

//     console.log("Admin applications request");
//     console.log("User:", req.user);

//     // Only admin
//     if (req.user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. Admins only.",
//       });
//     }

//     // Get applications
//     const applications =
//       await Application.find()
//         .populate(
//           "candidate",
//           "name email"
//         )
//         .populate(
//           "job",
//           "title company location salary"
//         )
//         .sort({
//           createdAt: -1,
//         });

//     res.status(200).json({
//       success: true,
//       count: applications.length,
//       applications,
//     });

//   } catch (error) {

//     console.error(
//       "Get Applications Error:",
//       error
//     );

//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// });


// module.exports = router;

const express = require("express");
const router = express.Router();

const Application = require("../models/Application");
const Job = require("../models/Job");

const authMiddleware = require("../middleware/authMiddleware");


// =====================================================
// POST - APPLY FOR JOB
// =====================================================

router.post("/", authMiddleware, async (req, res) => {

  try {

    const { jobId } = req.body;


    // Check Job ID
    if (!jobId) {

      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });

    }


    // Check whether Job exists
    const job = await Job.findById(jobId);

    if (!job) {

      return res.status(404).json({
        success: false,
        message: "Job not found",
      });

    }


    // Check duplicate application
    const existingApplication =
      await Application.findOne({
        candidate: req.user.id,
        job: jobId,
      });


    if (existingApplication) {

      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });

    }


    // Create application
    const application =
      await Application.create({

        candidate: req.user.id,

        job: jobId,

        status: "Pending",

      });


    res.status(201).json({

      success: true,

      message: "Application submitted successfully",

      application,

    });


  } catch (error) {

    console.error(
      "Application Create Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message,

    });

  }

});



// =====================================================
// GET - CANDIDATE'S OWN APPLICATIONS
// =====================================================

router.get("/my", authMiddleware, async (req, res) => {

  try {

    console.log(
      "Candidate applications request"
    );

    console.log(
      "Logged-in user:",
      req.user
    );


    const applications =
      await Application.find({

        candidate: req.user.id,

      })

      .populate(
        "job",
        "title company location salary type experience description skills deadline"
      )

      .sort({
        createdAt: -1,
      });


    res.status(200).json({

      success: true,

      count: applications.length,

      applications,

    });


  } catch (error) {

    console.error(
      "Candidate Applications Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message,

    });

  }

});



// =====================================================
// GET - SINGLE APPLICATION
// =====================================================

router.get("/:id", authMiddleware, async (req, res) => {

  try {

    const application =
      await Application.findById(req.params.id)

        .populate(
          "candidate",
          "name email"
        )

        .populate(
          "job",
          "title company location salary type experience description skills deadline"
        );


    // Application not found
    if (!application) {

      return res.status(404).json({

        success: false,

        message: "Application not found",

      });

    }


    // Candidate can only see own application
    if (
      req.user.role !== "admin" &&
      application.candidate._id.toString() !==
      req.user.id.toString()
    ) {

      return res.status(403).json({

        success: false,

        message: "Access denied",

      });

    }


    res.status(200).json({

      success: true,

      application,

    });


  } catch (error) {

    console.error(
      "Get Single Application Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message,

    });

  }

});



// =====================================================
// GET - ADMIN VIEW ALL APPLICATIONS
// =====================================================

router.get("/", authMiddleware, async (req, res) => {

  try {

    console.log(
      "Admin applications request"
    );

    console.log(
      "User:",
      req.user
    );


    // Admin only
    if (req.user.role !== "admin") {

      return res.status(403).json({

        success: false,

        message: "Access denied. Admins only.",

      });

    }


    // Get all applications
    const applications =
      await Application.find()

        .populate(
          "candidate",
          "name email"
        )

        .populate(
          "job",
          "title company location salary type experience"
        )

        .sort({
          createdAt: -1,
        });


    res.status(200).json({

      success: true,

      count: applications.length,

      applications,

    });


  } catch (error) {

    console.error(
      "Get Applications Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message,

    });

  }

});



// =====================================================
// PATCH - ADMIN UPDATE APPLICATION STATUS
// =====================================================

router.patch("/:id/status", authMiddleware, async (req, res) => {

  try {

    // Admin only
    if (req.user.role !== "admin") {

      return res.status(403).json({

        success: false,

        message: "Access denied. Admins only.",

      });

    }


    const { status } = req.body;


    // Allowed statuses
    const allowedStatuses = [
      "Pending",
      "Shortlisted",
      "Rejected",
      "Accepted",
    ];


    if (!allowedStatuses.includes(status)) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid status. Use Pending, Shortlisted, Rejected, or Accepted.",

      });

    }


    const application =
      await Application.findByIdAndUpdate(

        req.params.id,

        {
          status: status,
        },

        {
          new: true,
          runValidators: true,
        }

      )

      .populate(
        "candidate",
        "name email"
      )

      .populate(
        "job",
        "title company location salary"
      );


    if (!application) {

      return res.status(404).json({

        success: false,

        message: "Application not found",

      });

    }


    res.status(200).json({

      success: true,

      message:
        "Application status updated successfully",

      application,

    });


  } catch (error) {

    console.error(
      "Update Application Status Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message,

    });

  }

});


module.exports = router;