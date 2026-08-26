const express = require("express");

const {
    createJob,
    getJobs,
    getJobById
} = require("../controllers/jobController");

const router = express.Router();


// GET all jobs
router.get("/", getJobs);


// GET single job
router.get("/:id", getJobById);


// CREATE job
router.post("/", createJob);


module.exports = router;