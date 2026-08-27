const Application = require("../models/Application");
const Job = require("../models/Job");


// =====================================================
// APPLY FOR A JOB
// =====================================================

const applyForJob = async (req, res) => {

    try {

        const { jobId } = req.body;

        // Check job ID
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required"
            });
        }


        // Check whether job exists
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }


        // Check duplicate application
        const existingApplication =
            await Application.findOne({
                job: jobId,
                candidate: req.user._id
            });

        if (existingApplication) {

            return res.status(400).json({
                message: "You have already applied for this job"
            });

        }


        // Create application
        const application = await Application.create({

            job: jobId,

            candidate: req.user._id,

            status: "Pending"

        });


        res.status(201).json({

            message: "Application submitted successfully",

            application

        });


    } catch (error) {

        console.error(
            "Apply Job Error:",
            error
        );

        res.status(500).json({

            message: "Server error",

            error: error.message

        });

    }

};



// =====================================================
// GET MY APPLICATIONS
// =====================================================

const getMyApplications = async (req, res) => {

    try {

        const applications =
            await Application.find({
                candidate: req.user._id
            })
            .populate(
                "job",
                "title company location type salary"
            )
            .sort({
                createdAt: -1
            });


        res.status(200).json({

            applications

        });


    } catch (error) {

        console.error(
            "Get Applications Error:",
            error
        );

        res.status(500).json({

            message: "Server error",

            error: error.message

        });

    }

};



// =====================================================
// GET SINGLE APPLICATION
// =====================================================

const getApplicationById = async (req, res) => {

    try {

        const application =
            await Application.findById(
                req.params.id
            )
            .populate(
                "job"
            )
            .populate(
                "candidate",
                "name email"
            );


        if (!application) {

            return res.status(404).json({

                message: "Application not found"

            });

        }


        // Candidate can only view own application
        if (
            application.candidate._id.toString()
            !== req.user._id.toString()
        ) {

            return res.status(403).json({

                message: "Access denied"

            });

        }


        res.status(200).json({

            application

        });


    } catch (error) {

        console.error(
            "Get Application Error:",
            error
        );

        res.status(500).json({

            message: "Server error",

            error: error.message

        });

    }

};



module.exports = {
    applyForJob,
    getMyApplications,
    getApplicationById
};