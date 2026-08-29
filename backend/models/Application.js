
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true
        },

        candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Shortlisted",
                "Rejected",
                "Accepted"
            ],
            default: "Pending"
        },

        // ===============================
        // RESUME
        // ===============================

        resume: {
            type: String,
            default: null
        },

        resumeOriginalName: {
            type: String,
            default: null
        },

        appliedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Application",
    applicationSchema
);