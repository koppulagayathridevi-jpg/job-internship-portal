// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // 1. Validate input
//         if (!name || !email || !password) {
//             return res.status(400).json({
//                 message: "All fields are required"
//             });
//         }

//         // 2. Check whether email already exists
//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(400).json({
//                 message: "User already exists with this email"
//             });
//         }

//         // 3. Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // 4. Create candidate
//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//             role: "candidate",
//             isActive: true
//         });

//         // 5. Send response
//         res.status(201).json({
//             message: "Registration successful",
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role
//             }
//         });

//     } catch (error) {
//         console.error("Registration Error:", error);

//         res.status(500).json({
//             message: "Server error during registration"
//         });
//     }
// };
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // 1. Validate input
//         if (!email || !password) {
//             return res.status(400).json({
//                 message: "Email and password are required"
//             });
//         }

//         // 2. Find user
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(401).json({
//                 message: "Invalid email or password"
//             });
//         }

//         // 3. Check account status
//         if (!user.isActive) {
//             return res.status(403).json({
//                 message: "Your account has been deactivated"
//             });
//         }

//         // 4. Compare password
//         const isPasswordMatch = await bcrypt.compare(
//             password,
//             user.password
//         );

//         if (!isPasswordMatch) {
//             return res.status(401).json({
//                 message: "Invalid email or password"
//             });
//         }

//         // 5. Generate JWT
//         const token = jwt.sign(
//             {
//                 id: user._id,
//                 role: user.role
//             },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: "1d"
//             }
//         );

//         // 6. Send response
//         res.status(200).json({
//             message: "Login successful",
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role
//             }
//         });

//     } catch (error) {
//         console.error("Login Error:", error);

//         res.status(500).json({
//             message: "Server error during login"
//         });
//     }
// };

// module.exports = {
//     registerUser,
//     loginUser
// };


const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================
// REGISTER
// ==========================
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "candidate"
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==========================
// LOGIN
// ==========================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==========================
// EXPORT
// ==========================
module.exports = {
    register,
    login
};