

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const companyRoutes = require("./routes/companyRoutes");

const app = express();


// =====================================================
// CORS
// =====================================================

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://job-internship-portal-red.vercel.app",
            "https://job-internship-portal-iuvnukrri.vercel.app"
        ],
        credentials: true
    })
);

// =====================================================
// BODY PARSER
// =====================================================

app.use(express.json());


// =====================================================
// UPLOADS
// =====================================================

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


// =====================================================
// API ROUTES
// =====================================================

app.use("/api/auth", authRoutes);

app.use("/api", userRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/companies", companyRoutes);


// =====================================================
// MONGODB
// =====================================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log(
            "MongoDB Connected Successfully"
        );
    })
    .catch((error) => {
        console.error(
            "MongoDB Connection Error:",
            error.message
        );
    });


// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
    res.send(
        "Job Portal Backend Running"
    );
});


// =====================================================
// SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});