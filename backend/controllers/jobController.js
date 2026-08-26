const Job = require("../models/Job");

// ===============================
// CREATE JOB
// ===============================
const createJob = async (req, res) => {
    try {
        const {
            title,
            company,
            location,
            type,
            salary,
            skills,
            eligibility,
            experience,
            deadline,
            description
        } = req.body;

        // Validate required fields
        if (
            !title ||
            !company ||
            !location ||
            !type ||
            !salary ||
            !skills ||
            !eligibility ||
            !experience ||
            !deadline ||
            !description
        ) {
            return res.status(400).json({
                message: "Please provide all job details"
            });
        }

        const job = await Job.create({
            title,
            company,
            location,
            type,
            salary,
            skills,
            eligibility,
            experience,
            deadline,
            description
        });

        res.status(201).json({
            message: "Job created successfully",
            job
        });

    } catch (error) {
        console.error("Create Job Error:", error.message);

        res.status(500).json({
            message: "Failed to create job",
            error: error.message
        });
    }
};


// ===============================
// GET ALL JOBS
// ===============================
const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            message: "Jobs fetched successfully",
            jobs
        });

    } catch (error) {
        console.error("Get Jobs Error:", error.message);

        res.status(500).json({
            message: "Failed to fetch jobs",
            error: error.message
        });
    }
};


// ===============================
// GET SINGLE JOB
// ===============================
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            message: "Job fetched successfully",
            job
        });

    } catch (error) {
        console.error("Get Job Error:", error.message);

        res.status(500).json({
            message: "Failed to fetch job",
            error: error.message
        });
    }
};


module.exports = {
    createJob,
    getJobs,
    getJobById
};