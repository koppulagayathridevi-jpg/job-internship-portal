// const mongoose = require("mongoose");

// const applicationSchema = new mongoose.Schema(
//   {
//     candidate: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     job: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Job",
//       required: true,
//     },

//     status: {
//       type: String,

//       enum: [
//         "Applied",
//         "Under Review",
//         "Shortlisted",
//         "Rejected",
//         "Selected",
//       ],

//       default: "Applied",
//     },
//   },

//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model(
//   "Application",
//   applicationSchema
// );

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