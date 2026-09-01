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

        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required"
            });
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        const existingApplication = await Application.findOne({
            candidate: req.user.id,
            job: jobId
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        }

        const application = await Application.create({
            candidate: req.user.id,
            job: jobId,
            status: "Pending"
        });

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application
        });

    } catch (error) {
        console.error("Application Create Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});


// =====================================================
// GET - CANDIDATE'S OWN APPLICATIONS
// =====================================================

router.get("/my", authMiddleware, async (req, res) => {
    try {

        const applications = await Application.find({
            candidate: req.user.id
        })
        .populate(
            "job",
            "title company location salary type experience description skills deadline"
        )
        .sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });

    } catch (error) {

        console.error(
            "Candidate Applications Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});


// =====================================================
// GET - SINGLE APPLICATION
// =====================================================

router.get("/:id", authMiddleware, async (req, res) => {
    try {

        const application = await Application.findById(
            req.params.id
        )
        .populate(
            "candidate",
            "name email"
        )
        .populate(
            "job",
            "title company location salary type experience description skills deadline"
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        if (
            req.user.role !== "admin" &&
            application.candidate._id.toString() !==
            req.user.id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        return res.status(200).json({
            success: true,
            application
        });

    } catch (error) {

        console.error(
            "Get Single Application Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});


// =====================================================
// GET - ADMIN VIEW ALL APPLICATIONS
// =====================================================

router.get("/", authMiddleware, async (req, res) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only."
            });
        }

        const applications = await Application.find()
            .populate(
                "candidate",
                "name email"
            )
            .populate(
                "job",
                "title company location salary type experience"
            )
            .sort({
                createdAt: -1
            });

        return res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });

    } catch (error) {

        console.error(
            "Get Applications Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});


// =====================================================
// PATCH - ADMIN UPDATE APPLICATION STATUS
// =====================================================

router.patch(
    "/:id/status",
    authMiddleware,
    async (req, res) => {

        try {

            if (req.user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Access denied. Admins only."
                });
            }

            const { status } = req.body;

            const allowedStatuses = [
                "Pending",
                "Shortlisted",
                "Rejected",
                "Accepted"
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid status. Use Pending, Shortlisted, Rejected, or Accepted."
                });
            }

            const application =
                await Application.findByIdAndUpdate(
                    req.params.id,
                    {
                        status
                    },
                    {
                        new: true,
                        runValidators: true
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
                    message: "Application not found"
                });
            }

            return res.status(200).json({
                success: true,
                message:
                    "Application status updated successfully",
                application
            });

        } catch (error) {

            console.error(
                "Update Application Status Error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Server error",
                error: error.message
            });
        }
    }
);


// =====================================================
// DELETE - ADMIN DELETE APPLICATION
// =====================================================

router.delete(
    "/:id",
    authMiddleware,
    async (req, res) => {

        try {

            if (req.user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Access denied. Admins only."
                });
            }

            const application =
                await Application.findById(
                    req.params.id
                );

            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: "Application not found"
                });
            }

            await Application.findByIdAndDelete(
                req.params.id
            );

            return res.status(200).json({
                success: true,
                message:
                    "Application deleted successfully",
                applicationId: req.params.id
            });

        } catch (error) {

            console.error(
                "Delete Application Error:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Server error",
                error: error.message
            });
        }
    }
);


// =====================================================
// PATCH - UPLOAD RESUME
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
            console.log("Uploaded File:", req.file);

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "Please upload a resume"
                });
            }

            const application =
                await Application.findById(
                    req.params.id
                );

            if (!application) {

                if (req.file.path) {
                    fs.unlink(
                        req.file.path,
                        () => {}
                    );
                }

                return res.status(404).json({
                    success: false,
                    message: "Application not found"
                });
            }

            const isAdmin =
                req.user.role === "admin";

            const isOwner =
                application.candidate.toString() ===
                req.user.id.toString();

            if (!isAdmin && !isOwner) {

                if (req.file.path) {
                    fs.unlink(
                        req.file.path,
                        () => {}
                    );
                }

                return res.status(403).json({
                    success: false,
                    message: "Access denied"
                });
            }


            // Delete old resume
            if (application.resume) {

                const oldResumePath =
                    path.resolve(
                        __dirname,
                        "..",
                        "uploads",
                        "resumes",
                        application.resume
                    );

                if (fs.existsSync(oldResumePath)) {
                    fs.unlinkSync(oldResumePath);
                }
            }


            // Save new resume
            application.resume =
                req.file.filename;

            application.resumeOriginalName =
                req.file.originalname;

            await application.save();


            console.log(
                "Resume saved:",
                application.resume
            );

            return res.status(200).json({
                success: true,
                message:
                    "Resume uploaded successfully",
                application
            });

        } catch (error) {

            console.error(
                "Resume Upload Error:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Failed to upload resume",
                error: error.message
            });
        }
    }
);


// =====================================================
// GET - VIEW / DOWNLOAD RESUME
// ADMIN + APPLICATION OWNER
// =====================================================

router.get(
    "/:id/resume",
    authMiddleware,
    async (req, res) => {

        try {

            console.log(
                "========== RESUME ACCESS =========="
            );

            console.log(
                "Application ID:",
                req.params.id
            );

            console.log(
                "User:",
                req.user
            );


            // -----------------------------------------
            // FIND APPLICATION
            // -----------------------------------------

            const application =
                await Application.findById(
                    req.params.id
                );

            if (!application) {

                return res.status(404).json({
                    success: false,
                    message: "Application not found"
                });
            }


            // -----------------------------------------
            // CHECK RESUME
            // -----------------------------------------

            if (!application.resume) {

                return res.status(404).json({
                    success: false,
                    message:
                        "Resume not uploaded"
                });
            }


            // -----------------------------------------
            // AUTHORIZATION
            // -----------------------------------------

            const isAdmin =
                req.user.role === "admin";

            const isOwner =
                application.candidate.toString() ===
                req.user.id.toString();

            if (!isAdmin && !isOwner) {

                return res.status(403).json({
                    success: false,
                    message: "Access denied"
                });
            }


            // -----------------------------------------
            // BUILD ABSOLUTE FILE PATH
            // -----------------------------------------

            const resumePath =
                path.resolve(
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

            console.log(
                "Resume Exists:",
                fs.existsSync(resumePath)
            );


            // -----------------------------------------
            // FILE DOES NOT EXIST
            // -----------------------------------------

            if (!fs.existsSync(resumePath)) {

                console.error(
                    "❌ RESUME FILE NOT FOUND"
                );

                console.error(
                    "Expected path:",
                    resumePath
                );

                return res.status(404).json({
                    success: false,
                    message:
                        "Resume file not found on server",
                    filename:
                        application.resume
                });
            }


            // -----------------------------------------
            // ORIGINAL FILE NAME
            // -----------------------------------------

            const originalName =
                application.resumeOriginalName ||
                application.resume;


            // -----------------------------------------
            // CONTENT TYPE
            // -----------------------------------------

            res.setHeader(
                "Content-Type",
                "application/pdf"
            );


            // -----------------------------------------
            // VIEW / DOWNLOAD
            // -----------------------------------------

            const download =
                req.query.download === "true";

            if (download) {

                res.setHeader(
                    "Content-Disposition",
                    `attachment; filename="${originalName}"`
                );

            } else {

                res.setHeader(
                    "Content-Disposition",
                    `inline; filename="${originalName}"`
                );
            }


            // -----------------------------------------
            // SEND FILE
            // -----------------------------------------

            return res.sendFile(
                resumePath,
                (error) => {

                    if (error) {

                        console.error(
                            "sendFile Error:",
                            error
                        );

                        if (!res.headersSent) {

                            return res.status(500).json({
                                success: false,
                                message:
                                    "Failed to send resume"
                            });
                        }
                    }

                }
            );

        } catch (error) {

            console.error(
                "Resume Access Error:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Failed to access resume",
                error: error.message
            });
        }
    }
);


module.exports = router;