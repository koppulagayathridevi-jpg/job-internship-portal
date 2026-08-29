require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// =====================================================
// ROUTES
// =====================================================

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const companyRoutes = require("./routes/companyRoutes");

// =====================================================
// APP
// =====================================================

const app = express();

// =====================================================
// CORS
// =====================================================

app.use(
    cors({
        origin: true,
        credentials: true,
        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);

// =====================================================
// BODY PARSER
// =====================================================

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

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
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Job Portal Backend Running"
    });
});

// =====================================================
// API ROUTES
// =====================================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api",
    userRoutes
);

app.use(
    "/api/admin",
    adminRoutes
);

app.use(
    "/api/jobs",
    jobRoutes
);

app.use(
    "/api/applications",
    applicationRoutes
);

app.use(
    "/api/companies",
    companyRoutes
);

// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});

// =====================================================
// ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {

    console.error("Server Error:", err.message);

    if (err.message === "Not allowed by CORS") {
        return res.status(403).json({
            success: false,
            message: "CORS Error: Origin not allowed"
        });
    }

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

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
// SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});