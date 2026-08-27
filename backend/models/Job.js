const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            required: true,
            enum: ["Full-Time", "Part-Time", "Internship"]
        },

        salary: {
            type: String,
            required: true,
            trim: true
        },

        skills: {
            type: [String],
            required: true
        },

        eligibility: {
            type: String,
            required: true,
            trim: true
        },

        experience: {
            type: String,
            required: true,
            trim: true
        },

        deadline: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Job", jobSchema);