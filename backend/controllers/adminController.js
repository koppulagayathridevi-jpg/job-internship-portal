

const User = require("../models/User");
const Application = require("../models/Application");


// =====================================================
// GET ALL USERS
// =====================================================

const getAllUsers = async (req, res) => {
    try {

        const users = await User.find()
            .select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {

        console.error("Get All Users Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
};


// =====================================================
// DELETE USER
// =====================================================

const deleteUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {

        console.error("Delete User Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete user"
        });
    }
};


// =====================================================
// DELETE APPLICATION
// =====================================================

const deleteApplication = async (req, res) => {
    try {

        console.log("DELETE APPLICATION ROUTE HIT");
        console.log("Application ID:", req.params.id);

        const application = await Application.findById(
            req.params.id
        );

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        await Application.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Application deleted successfully"
        });

    } catch (error) {

        console.error(
            "Delete Application Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to delete application",
            error: error.message
        });
    }
};


module.exports = {
    getAllUsers,
    deleteUser,
    deleteApplication
};