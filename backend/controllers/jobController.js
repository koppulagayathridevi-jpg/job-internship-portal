// const Job = require("../models/Job");

// // ===============================
// // CREATE JOB
// // ===============================
// const createJob = async (req, res) => {
//     try {
//         const {
//             title,
//             company,
//             location,
//             type,
//             salary,
//             skills,
//             eligibility,
//             experience,
//             deadline,
//             description
//         } = req.body;

//         // Validate required fields
//         if (
//             !title ||
//             !company ||
//             !location ||
//             !type ||
//             !salary ||
//             !skills ||
//             !eligibility ||
//             !experience ||
//             !deadline ||
//             !description
//         ) {
//             return res.status(400).json({
//                 message: "Please provide all job details"
//             });
//         }

//         const job = await Job.create({
//             title,
//             company,
//             location,
//             type,
//             salary,
//             skills,
//             eligibility,
//             experience,
//             deadline,
//             description
//         });

//         res.status(201).json({
//             message: "Job created successfully",
//             job
//         });

//     } catch (error) {
//         console.error("Create Job Error:", error.message);

//         res.status(500).json({
//             message: "Failed to create job",
//             error: error.message
//         });
//     }
// };


// // ===============================
// // GET ALL JOBS
// // ===============================
// const getJobs = async (req, res) => {
//     try {
//         const jobs = await Job.find().sort({
//             createdAt: -1
//         });

//         res.status(200).json({
//             message: "Jobs fetched successfully",
//             jobs
//         });

//     } catch (error) {
//         console.error("Get Jobs Error:", error.message);

//         res.status(500).json({
//             message: "Failed to fetch jobs",
//             error: error.message
//         });
//     }
// };


// // ===============================
// // GET SINGLE JOB
// // ===============================
// const getJobById = async (req, res) => {
//     try {
//         const job = await Job.findById(req.params.id);

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found"
//             });
//         }

//         res.status(200).json({
//             message: "Job fetched successfully",
//             job
//         });

//  } catch (error) {
//     console.error("========== CREATE JOB ERROR ==========");
//     console.error(error);
//     console.error("Error Message:", error.message);
//     console.error("======================================");

//     res.status(500).json({
//         success: false,
//         message: "Failed to create job",
//         error: error.message,
//         details: error.errors
//             ? Object.keys(error.errors).map((key) => ({
//                 field: key,
//                 message: error.errors[key].message
//             }))
//             : null
//     });
// }
// };

// // ===============================
// // UPDATE JOB
// // ===============================
// const updateJob = async (req, res) => {
//     try {
//         const {
//             title,
//             company,
//             location,
//             type,
//             salary,
//             skills,
//             eligibility,
//             experience,
//             deadline,
//             description,
//             responsibilities,
//             requirements
//         } = req.body;

//         // Check required fields
//         if (
//             !title ||
//             !company ||
//             !location ||
//             !type ||
//             !salary ||
//             !skills ||
//             !eligibility ||
//             !experience ||
//             !deadline ||
//             !description ||
//             !responsibilities ||
//             !requirements
//         ) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please provide all job details"
//             });
//         }

//         const job = await Job.findByIdAndUpdate(
//             req.params.id,
//             {
//                 title,
//                 company,
//                 location,
//                 type,
//                 salary,
//                 skills,
//                 eligibility,
//                 experience,
//                 deadline,
//                 description,
//                 responsibilities,
//                 requirements
//             },
//             {
//                 new: true,
//                 runValidators: true
//             }
//         );

//         if (!job) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Job not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Job updated successfully",
//             job
//         });

//     } catch (error) {
//         console.error("Update Job Error:", error);

//         res.status(500).json({
//             success: false,
//             message: "Failed to update job",
//             error: error.message
//         });
//     }
// };


// module.exports = {
//     createJob,
//     getJobs,
//     getJobById,
//     updateJob
// };


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
            description,
            responsibilities,
            requirements
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
            description,
            responsibilities,
            requirements
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            job
        });

    } catch (error) {
        console.error("Create Job Error:", error);

        res.status(500).json({
            success: false,
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
            success: true,
            message: "Jobs fetched successfully",
            jobs
        });

    } catch (error) {
        console.error("Get Jobs Error:", error);

        res.status(500).json({
            success: false,
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
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Job fetched successfully",
            job
        });

    } catch (error) {
        console.error("Get Job Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch job",
            error: error.message
        });
    }
};


// ===============================
// UPDATE JOB
// ===============================
const updateJob = async (req, res) => {
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
            description,
            responsibilities,
            requirements
        } = req.body;

        // Check required fields
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
            !description ||
            !responsibilities ||
            !requirements
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all job details"
            });
        }

        const job = await Job.findByIdAndUpdate(
            req.params.id,
            {
                title,
                company,
                location,
                type,
                salary,
                skills,
                eligibility,
                experience,
                deadline,
                description,
                responsibilities,
                requirements
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job
        });

    } catch (error) {
        console.error("Update Job Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update job",
            error: error.message
        });
    }
};


// ===============================
// DELETE JOB
// ===============================
const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Deleting Job ID:", id);

        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        console.log("Job deleted successfully:", job._id);

        res.status(200).json({
            success: true,
            message: "Job deleted successfully",
            job
        });

    } catch (error) {
        console.error("Delete Job Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete job",
            error: error.message
        });
    }
};


// ===============================
// EXPORT CONTROLLERS
// ===============================
module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
};