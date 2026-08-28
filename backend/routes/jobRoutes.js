const express = require("express");

const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
} = require("../controllers/jobController");

const router = express.Router();


// GET all jobs
router.get("/", getJobs);


// GET single job
router.get("/:id", getJobById);


// CREATE job
router.post("/", createJob);
// UPDATE JOB
router.patch("/:id", updateJob);



// ===============================
// DELETE JOB
// ===============================
router.delete("/:id", deleteJob);

module.exports = router;