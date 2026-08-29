

const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs");



const Application = require("../models/Application");
const Job = require("../models/Job");

const authMiddleware = require("../middleware/authMiddleware");
const uploadResume = require("../middleware/uploadResume");




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




// =====================================================
// DELETE - ADMIN DELETE APPLICATION
// =====================================================

router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    console.log("Delete Application Request");
    console.log("Application ID:", req.params.id);
    console.log("Admin User:", req.user);

    // Admin only
    if (req.user.role !== "admin") {

      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only."
      });

    }

    // Find application
    const application = await Application.findById(
      req.params.id
    );

    if (!application) {

      return res.status(404).json({
        success: false,
        message: "Application not found"
      });

    }

    // Delete application
    await Application.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      success: true,

      message: "Application deleted successfully",

      applicationId: req.params.id

    });

  } catch (error) {

    console.error(
      "Delete Application Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: "Server error",

      error: error.message

    });

  }

});

// =====================================================
// POST - UPLOAD RESUME FOR APPLICATION
// =====================================================

router.patch(
  "/:id/resume",
  authMiddleware,
  uploadResume.single("resume"),
  async (req, res) => {
    try {
      console.log("========== RESUME UPLOAD ==========");
      console.log("Application ID:", req.params.id);
      console.log("User:", req.user);
      console.log("File:", req.file);

      // Resume required
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload a resume"
        });
      }

      // Find application
      const application = await Application.findById(
        req.params.id
      );

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found"
        });
      }

      // Candidate can update only own application
      if (
        req.user.role !== "admin" &&
        application.candidate.toString() !==
          req.user.id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }

      // Save resume information
      application.resume = req.file.filename;
      application.resumeOriginalName = req.file.originalname;

      await application.save();

      res.status(200).json({
        success: true,
        message: "Resume uploaded successfully",
        application
      });

    } catch (error) {
      console.error(
        "Resume Upload Error:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Failed to upload resume",
        error: error.message
      });
    }
  }
);

// =====================================================
// GET - VIEW / DOWNLOAD RESUME
// ADMIN + APPLICATION OWNER
// =====================================================

// const path = require("path");
// const fs = require("fs");

router.get(
  "/:id/resume",
  authMiddleware,
  async (req, res) => {
    try {
      console.log("========== RESUME ACCESS ==========");
      console.log("Application ID:", req.params.id);
      console.log("User:", req.user);

      // Find application
      const application =
        await Application.findById(req.params.id);

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }

      // ============================================
      // AUTHORIZATION
      // ============================================

      if (
        req.user.role !== "admin" &&
        application.candidate.toString() !==
          req.user.id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      // ============================================
      // CHECK RESUME
      // ============================================

      if (!application.resume) {
        return res.status(404).json({
          success: false,
          message: "Resume not uploaded",
        });
      }

      // ============================================
      // RESUME PATH
      // ============================================

      const resumePath = path.join(
        __dirname,
        "../uploads/resumes",
        application.resume
      );

      console.log(
        "Resume Path:",
        resumePath
      );

      // ============================================
      // CHECK FILE EXISTS
      // ============================================

      if (!fs.existsSync(resumePath)) {
        console.error(
          "Resume file not found:",
          resumePath
        );

        return res.status(404).json({
          success: false,
          message: "Resume file not found on server",
        });
      }

      // ============================================
      // VIEW OR DOWNLOAD
      // ============================================

      const download =
        req.query.download === "true";

      if (download) {
        return res.download(
          resumePath,
          application.resumeOriginalName ||
            application.resume
        );
      }

      // View resume in browser
      return res.sendFile(
        resumePath
      );

    } catch (error) {
      console.error(
        "Resume Access Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to access resume",
        error: error.message,
      });
    }
  }
);
// =====================================================
// GET - VIEW / DOWNLOAD RESUME
// =====================================================

router.get(
  "/:id/resume",
  authMiddleware,
  async (req, res) => {
    try {
      console.log("========== RESUME ACCESS ==========");
      console.log("Application ID:", req.params.id);
      console.log("User:", req.user);

      // -----------------------------------------
      // Find application
      // -----------------------------------------

      const application =
        await Application.findById(req.params.id);

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }

      // -----------------------------------------
      // Admin can access any resume
      // Candidate can access only own resume
      // -----------------------------------------

      if (
        req.user.role !== "admin" &&
        application.candidate.toString() !==
          req.user.id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      // -----------------------------------------
      // Check resume exists
      // -----------------------------------------

      if (!application.resume) {
        return res.status(404).json({
          success: false,
          message: "Resume not uploaded",
        });
      }

      // -----------------------------------------
      // Resume path
      // -----------------------------------------

      const path = require("path");
      const fs = require("fs");

      const resumePath = path.join(
        __dirname,
        "..",
        "uploads",
        "resumes",
        application.resume
      );

      console.log(
        "Resume Path:",
        resumePath
      );

      // -----------------------------------------
      // Check file exists
      // -----------------------------------------

      if (!fs.existsSync(resumePath)) {
        console.error(
          "Resume file does not exist:",
          resumePath
        );

        return res.status(404).json({
          success: false,
          message: "Resume file not found on server",
        });
      }

      // -----------------------------------------
      // Send resume
      // -----------------------------------------

      const originalName =
        application.resumeOriginalName ||
        application.resume;

      res.setHeader(
        "Content-Disposition",
        `inline; filename="${originalName}"`
      );

      res.sendFile(resumePath);

    } catch (error) {

      console.error(
        "Resume Access Error:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Failed to access resume",
        error: error.message,
      });
    }
  }
);


// // =====================================================
// // GET - VIEW RESUME
// // =====================================================

// router.get(
//     "/:id/resume/view",
//     authMiddleware,
//     async (req, res) => {

//         try {

//             const application =
//                 await Application.findById(
//                     req.params.id
//                 );

//             if (!application) {

//                 return res.status(404).json({
//                     success: false,
//                     message: "Application not found"
//                 });

//             }

//             // Candidate can only access own resume
//             if (
//                 req.user.role !== "admin" &&
//                 application.candidate.toString() !==
//                 req.user.id.toString()
//             ) {

//                 return res.status(403).json({
//                     success: false,
//                     message: "Access denied"
//                 });

//             }

//             // Resume does not exist
//             if (!application.resume) {

//                 return res.status(404).json({
//                     success: false,
//                     message: "Resume not found"
//                 });

//             }

//             const resumePath = path.join(
//                 __dirname,
//                 "../uploads/resumes",
//                 application.resume
//             );

//             console.log(
//                 "Resume View Path:",
//                 resumePath
//             );

//             if (!fs.existsSync(resumePath)) {

//                 console.log(
//                     "Resume file does not exist:",
//                     resumePath
//                 );

//                 return res.status(404).json({
//                     success: false,
//                     message: "Resume file not found on server"
//                 });

//             }

//             // Open inside browser
//             res.setHeader(
//                 "Content-Disposition",
//                 "inline"
//             );

//             res.sendFile(
//                 path.resolve(resumePath)
//             );

//         } catch (error) {

//             console.error(
//                 "View Resume Error:",
//                 error
//             );

//             res.status(500).json({
//                 success: false,
//                 message: "Failed to access resume",
//                 error: error.message
//             });

//         }

//     }
// );

// // =====================================================
// // GET - DOWNLOAD RESUME
// // =====================================================

// router.get(
//     "/:id/resume/download",
//     authMiddleware,
//     async (req, res) => {

//         try {

//             const application =
//                 await Application.findById(
//                     req.params.id
//                 );

//             if (!application) {

//                 return res.status(404).json({
//                     success: false,
//                     message: "Application not found"
//                 });

//             }

//             // Candidate can only download own resume
//             if (
//                 req.user.role !== "admin" &&
//                 application.candidate.toString() !==
//                 req.user.id.toString()
//             ) {

//                 return res.status(403).json({
//                     success: false,
//                     message: "Access denied"
//                 });

//             }

//             if (!application.resume) {

//                 return res.status(404).json({
//                     success: false,
//                     message: "Resume not found"
//                 });

//             }

//             const resumePath = path.join(
//                 __dirname,
//                 "../uploads/resumes",
//                 application.resume
//             );

//             console.log(
//                 "Resume Download Path:",
//                 resumePath
//             );

//             if (!fs.existsSync(resumePath)) {

//                 return res.status(404).json({
//                     success: false,
//                     message: "Resume file not found on server"
//                 });

//             }

//             const downloadName =
//                 application.resumeOriginalName ||
//                 application.resume;

//             res.download(
//                 path.resolve(resumePath),
//                 downloadName
//             );

//         } catch (error) {

//             console.error(
//                 "Download Resume Error:",
//                 error
//             );

//             res.status(500).json({
//                 success: false,
//                 message: "Failed to download resume",
//                 error: error.message
//             });

//         }

//     }
// );

// =====================================================
// GET - VIEW / DOWNLOAD RESUME
// =====================================================

router.get(
  "/:id/resume",
  authMiddleware,
  async (req, res) => {
    try {
      console.log("========== RESUME ACCESS ==========");
      console.log("Application ID:", req.params.id);
      console.log("User:", req.user);

      // -----------------------------------------
      // Find application
      // -----------------------------------------

      const application = await Application.findById(
        req.params.id
      );

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found"
        });
      }

      // -----------------------------------------
      // Resume exists?
      // -----------------------------------------

      if (!application.resume) {
        return res.status(404).json({
          success: false,
          message: "Resume not found for this application"
        });
      }

      // -----------------------------------------
      // Admin OR application owner
      // -----------------------------------------

      if (
        req.user.role !== "admin" &&
        application.candidate.toString() !==
          req.user.id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied"
        });
      }

      // -----------------------------------------
      // Resume file path
      // -----------------------------------------

      const resumePath = path.join(
        __dirname,
        "..",
        "uploads",
        "resumes",
        application.resume
      );

      console.log(
        "Resume file path:",
        resumePath
      );

      // -----------------------------------------
      // Check file exists
      // -----------------------------------------

      if (!fs.existsSync(resumePath)) {
        console.error(
          "Resume file does not exist:",
          resumePath
        );

        return res.status(404).json({
          success: false,
          message: "Resume file not found on server"
        });
      }

      // -----------------------------------------
      // Determine view/download
      // -----------------------------------------

      const download =
        req.query.download === "true";

      // -----------------------------------------
      // Set PDF content type
      // -----------------------------------------

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      // -----------------------------------------
      // VIEW
      // -----------------------------------------

      if (!download) {
        res.setHeader(
          "Content-Disposition",
          `inline; filename="${application.resumeOriginalName || application.resume}"`
        );
      }

      // -----------------------------------------
      // DOWNLOAD
      // -----------------------------------------

      if (download) {
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${application.resumeOriginalName || application.resume}"`
        );
      }

      // -----------------------------------------
      // Send file
      // -----------------------------------------

      return res.sendFile(
        resumePath
      );

    } catch (error) {
      console.error(
        "Resume Access Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message: "Failed to access resume",
        error: error.message
      });
    }
  }
);


module.exports = router;