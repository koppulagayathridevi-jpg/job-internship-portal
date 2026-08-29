const express = require("express");
const router = express.Router();

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// =====================================================
// ADMIN CHECK
// =====================================================

const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only."
        });
    }

    next();
};


// =====================================================
// GET ALL USERS - ADMIN
// =====================================================

router.get(
    "/admin/users",
    authMiddleware,
    adminOnly,
    async (req, res) => {

        try {

            const users = await User.find()
                .select("-password")
                .sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                count: users.length,
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
    "/admin/users/:id/status",
    authMiddleware,
    adminOnly,
    async (req, res) => {

        try {

            const { isActive } = req.body;

            // -----------------------------------------
            // Validate isActive
            // -----------------------------------------

            if (typeof isActive !== "boolean") {

                return res.status(400).json({
                    success: false,
                    message: "isActive must be true or false"
                });

            }


            // -----------------------------------------
            // Find user
            // -----------------------------------------

            const user = await User.findById(
                req.params.id
            );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });

            }


            // -----------------------------------------
            // Prevent admin from changing own status
            // -----------------------------------------

            if (
                user._id.toString() ===
                req.user.id.toString()
            ) {

                return res.status(400).json({
                    success: false,
                    message:
                        "You cannot change your own account status"
                });

            }


            // -----------------------------------------
            // Prevent changing another admin
            // -----------------------------------------

            if (user.role === "admin") {

                return res.status(403).json({
                    success: false,
                    message:
                        "Admin account status cannot be changed"
                });

            }


            // -----------------------------------------
            // Update status
            // -----------------------------------------

            user.isActive = isActive;

            await user.save();


            // -----------------------------------------
            // Response
            // -----------------------------------------

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
                "Update User Status Error:",
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


// =====================================================
// DELETE USER - ADMIN
// =====================================================

router.delete(
    "/admin/users/:id",
    authMiddleware,
    adminOnly,
    async (req, res) => {

        try {

            const user = await User.findById(
                req.params.id
            );

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });

            }


            // -----------------------------------------
            // Prevent deleting admin
            // -----------------------------------------

            if (user.role === "admin") {

                return res.status(403).json({
                    success: false,
                    message:
                        "Admin users cannot be deleted"
                });

            }


            await User.findByIdAndDelete(
                req.params.id
            );


            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });

        } catch (error) {

            console.error(
                "Delete User Error:",
                error
            );

            res.status(500).json({
                success: false,
                message: "Failed to delete user",
                error: error.message
            });
        }
    }
);


// =====================================================
// GET LOGGED-IN USER PROFILE
// =====================================================

router.get(
    "/profile",
    authMiddleware,
    async (req, res) => {

        try {

            console.log("========== GET PROFILE ==========");
            console.log("Logged in user:", req.user);

            const user = await User.findById(req.user.id)
                .select("-password");

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            res.status(200).json({
                success: true,
                user
            });

        } catch (error) {

            console.error(
                "Get Profile Error:",
                error
            );

            res.status(500).json({
                success: false,
                message: "Failed to fetch profile",
                error: error.message
            });
        }
    }
);


// =====================================================
// UPDATE LOGGED-IN USER PROFILE
// =====================================================

router.put(
    "/profile",
    authMiddleware,
    async (req, res) => {

        try {

            console.log("========== UPDATE PROFILE ==========");
            console.log("User ID:", req.user.id);
            console.log("Request body:", req.body);

            const {
                name,
                phone,
                location,
                education,
                skills
            } = req.body;


            // -----------------------------------------
            // Find logged-in user
            // -----------------------------------------

            const user = await User.findById(req.user.id);

            if (!user) {

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });

            }


            // -----------------------------------------
            // Update allowed fields only
            // -----------------------------------------

            if (name !== undefined) {
                user.name = name;
            }

            if (phone !== undefined) {
                user.phone = phone;
            }

            if (location !== undefined) {
                user.location = location;
            }

            if (education !== undefined) {
                user.education = education;
            }

            if (skills !== undefined) {
                user.skills = skills;
            }


            // -----------------------------------------
            // DO NOT allow these fields
            // role
            // isActive
            // email
            // password
            // -----------------------------------------


            await user.save();


            // -----------------------------------------
            // Return updated user
            // -----------------------------------------

            const updatedUser = await User.findById(
                req.user.id
            ).select("-password");


            res.status(200).json({

                success: true,

                message: "Profile updated successfully",

                user: updatedUser

            });

        } catch (error) {

            console.error(
                "Update Profile Error:",
                error
            );

            res.status(500).json({

                success: false,

                message: "Failed to update profile",

                error: error.message

            });

        }
    }
);

// =====================================================
// DELETE LOGGED-IN USER ACCOUNT
// =====================================================

router.delete(
    "/profile",
    authMiddleware,
    async (req, res) => {

        try {

            console.log("========== DELETE PROFILE ==========");
            console.log("User ID:", req.user.id);


            const user = await User.findById(
                req.user.id
            );


            if (!user) {

                return res.status(404).json({

                    success: false,

                    message: "User not found"

                });

            }


            // -----------------------------------------
            // Prevent admin from deleting own account
            // -----------------------------------------

            if (user.role === "admin") {

                return res.status(403).json({

                    success: false,

                    message:
                        "Admin accounts cannot be deleted from here"

                });

            }


            await User.findByIdAndDelete(
                req.user.id
            );


            res.status(200).json({

                success: true,

                message: "Account deleted successfully"

            });

        } catch (error) {

            console.error(
                "Delete Profile Error:",
                error
            );

            res.status(500).json({

                success: false,

                message: "Failed to delete account",

                error: error.message

            });

        }
    }
);

module.exports = router;