// // // const express = require("express");

// // // const {
// // //     registerUser,
// // //     loginUser
// // // } = require("../controllers/authController");

// // // const router = express.Router();

// // // router.post("/register", registerUser);
// // // router.post("/login", loginUser)

// // // module.exports = router;
// // const express = require("express");

// // const {
// //     registerUser,
// //     loginUser
// // } = require("../controllers/authController");

// // const protect = require("../middleware/authMiddleware");

// // const router = express.Router();

// // router.post("/register", registerUser);

// // router.post("/login", loginUser);

// // router.get("/profile", protect, (req, res) => {
// //     res.status(200).json({
// //         message: "Protected route accessed successfully",
// //         user: req.user
// //     });
// // });

// // module.exports = router;

// // const express = require("express");
// // const router = express.Router();

// // const protect = require("../middleware/authMiddleware");
// // const adminOnly = require("../middleware/adminMiddleware");

// // router.get("/dashboard", protect, adminOnly, (req, res) => {
// //     res.json({
// //         message: "Welcome to Admin Dashboard"
// //     });
// // });

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// const {
//     register,
//     login
// } = require("../controllers/authController");

// const protect = require("../middleware/authMiddleware");
// const adminOnly = require("../middleware/adminMiddleware");

// // ===============================
// // PUBLIC ROUTES
// // ===============================

// // Register
// router.post("/register", register);

// // Login
// router.post("/login", login);


// // ===============================
// // PROTECTED ADMIN ROUTE
// // ===============================

// router.get("/dashboard", protect, adminOnly, (req, res) => {
//     res.json({
//         success: true,
//         message: "Welcome to Admin Dashboard",
//         user: req.user
//     });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");

const User = require("../models/User");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");


// =====================================================
// PUBLIC ROUTES
// =====================================================

// Register
router.post("/register", register);

// Login
router.post("/login", login);


// =====================================================
// GET MY PROFILE
// =====================================================

router.get("/profile", protect, async (req, res) => {

    try {

        console.log("========== PROFILE REQUEST ==========");
        console.log("Logged-in user:", req.user);

        // Get user ID from authentication middleware
        const userId = req.user.id || req.user._id;

        if (!userId) {

            return res.status(401).json({
                success: false,
                message: "User ID not found in token"
            });

        }


        // Find user in MongoDB
        const user = await User.findById(userId)
            .select("-password");


        // User not found
        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        // Send profile
        res.status(200).json({

            success: true,

            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
                createdAt: user.createdAt
            }

        });

    } catch (error) {

        console.error(
            "Get Profile Error:",
            error
        );

        res.status(500).json({

            success: false,

            message: "Failed to load profile",

            error: error.message

        });

    }

});


// =====================================================
// PROTECTED ADMIN ROUTE
// =====================================================

router.get(
    "/dashboard",
    protect,
    adminOnly,
    (req, res) => {

        res.json({

            success: true,

            message: "Welcome to Admin Dashboard",

            user: req.user

        });

    }
);


module.exports = router;