

const express = require("express");
const router = express.Router();

const User = require("../models/User");
const adminOnly = require("../middleware/adminMiddleware");

const authMiddleware = require("../middleware/authMiddleware");

const {
    deleteApplication
} = require("../controllers/adminController");


// =====================================================
// GET ALL USERS
// =====================================================

router.get(
    "/users",
    authMiddleware,
    async (req, res) => {

        try {

            if (req.user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Access denied. Admins only."
                });
            }

            const users = await User.find()
                .select("-password")
                .sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                users
            });

        } catch (error) {

            console.error(
                "Get Admin Users Error:",
                error
            );

            res.status(500).json({
                success: false,
                message: "Failed to fetch users",
                error: error.message
            });
        }
    }
);


// =====================================================
// ACTIVATE / DEACTIVATE USER
// =====================================================

router.patch(
    "/users/:id/status",
    authMiddleware,
    async (req, res) => {

        try {

            console.log("STATUS ROUTE HIT");
            console.log("User ID:", req.params.id);
            console.log("Body:", req.body);

            // Admin only
            if (!req.user || req.user.role !== "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Access denied. Admins only."
                });
            }

            const { isActive } = req.body;

            if (typeof isActive !== "boolean") {
                return res.status(400).json({
                    success: false,
                    message: "isActive must be true or false"
                });
            }

            const user = await User.findById(
                req.params.id
            );

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            // Don't allow admin account to be deactivated
            if (user.role === "admin") {
                return res.status(403).json({
                    success: false,
                    message: "Admin account cannot be deactivated"
                });
            }

            user.isActive = isActive;

            await user.save();

            res.status(200).json({
                success: true,

                message: isActive
                    ? "User activated successfully"
                    : "User deactivated successfully",

                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isActive: user.isActive
                }
            });

        } catch (error) {

            console.error(
                "Toggle User Status Error:",
                error
            );

            res.status(500).json({
                success: false,
                message: "Failed to update user status",
                error: error.message
            });
        }
    }
);


// // =====================================================
// // DELETE APPLICATION
// // =====================================================

// router.delete(
//     "/applications/:id",
//     authMiddleware,
//     async (req, res) => {

//         try {

//             // Admin only
//             if (!req.user || req.user.role !== "admin") {
//                 return res.status(403).json({
//                     success: false,
//                     message: "Access denied. Admins only."
//                 });
//             }

//             // Call controller
//             return deleteApplication(req, res);

//         } catch (error) {

//             console.error(
//                 "Delete Application Route Error:",
//                 error
//             );

//             res.status(500).json({
//                 success: false,
//                 message: "Failed to delete application"
//             });
//         }
//     }
// );

// =====================================================
// DELETE APPLICATION
// =====================================================

router.delete(
    "/applications/:id",
    authMiddleware,
    adminOnly,
    deleteApplication
);


module.exports = router;