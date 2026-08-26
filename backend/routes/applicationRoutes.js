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

    // Check job ID
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    // Check job exists
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
        status: "Applied",
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
    });
  }
});
// =====================================================
// GET - CANDIDATE'S OWN APPLICATIONS
// =====================================================

router.get("/my", authMiddleware, async (req, res) => {
  try {

    console.log("Candidate applications request");
    console.log("Logged-in user:", req.user);

    const applications = await Application.find({
      candidate: req.user.id,
    })
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
      "Candidate Applications Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }
});


// =====================================================
// GET - ADMIN VIEW ALL APPLICATIONS
// =====================================================

router.get("/", authMiddleware, async (req, res) => {
  try {

    console.log("Admin applications request");
    console.log("User:", req.user);

    // Only admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    // Get applications
    const applications =
      await Application.find()
        .populate(
          "candidate",
          "name email"
        )
        .populate(
          "job",
          "title company location salary"
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
    });
  }
});


module.exports = router;