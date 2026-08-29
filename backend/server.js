

// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const jobRoutes = require("./routes/jobRoutes");
// const applicationRoutes = require("./routes/applicationRoutes");
// const companyRoutes = require("./routes/companyRoutes");

// const app = express();


// // =====================================================
// // CORS
// // =====================================================

// app.use(
//     cors({
//         origin: [
//             "http://localhost:5173",
//             "https://job-internship-portal-red.vercel.app"
//         ],
//         credentials: true
//     })
// );

// // =====================================================
// // BODY PARSER
// // =====================================================

// app.use(express.json());


// // =====================================================
// // UPLOADS
// // =====================================================

// app.use(
//     "/uploads",
//     express.static(
//         path.join(__dirname, "uploads")
//     )
// );


// // =====================================================
// // API ROUTES
// // =====================================================

// app.use("/api/auth", authRoutes);

// app.use("/api", userRoutes);

// app.use("/api/admin", adminRoutes);

// app.use("/api/jobs", jobRoutes);

// app.use("/api/applications", applicationRoutes);

// app.use("/api/companies", companyRoutes);


// // =====================================================
// // MONGODB
// // =====================================================

// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log(
//             "MongoDB Connected Successfully"
//         );
//     })
//     .catch((error) => {
//         console.error(
//             "MongoDB Connection Error:",
//             error.message
//         );
//     });


// // =====================================================
// // TEST ROUTE
// // =====================================================

// app.get("/", (req, res) => {
//     res.send(
//         "Job Portal Backend Running"
//     );
// });


// // =====================================================
// // SERVER
// // =====================================================

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(
//         `Server running on port ${PORT}`
//     );
// });


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

const allowedOrigins = [
    "http://localhost:5173",
    "https://job-internship-portal-red.vercel.app"
];

app.use(
    cors({
        origin: function (origin, callback) {

            // Allow requests without an origin
            // such as Postman or server-to-server requests
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.log("Blocked by CORS:", origin);

            return callback(
                new Error("Not allowed by CORS")
            );
        },

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
// HANDLE PREFLIGHT REQUESTS
// =====================================================

app.options("*", cors());

// =====================================================
// BODY PARSER
// =====================================================

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

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
// MONGODB CONNECTION
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