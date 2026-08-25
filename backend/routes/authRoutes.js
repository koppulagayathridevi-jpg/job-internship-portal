// // const express = require("express");

// // const {
// //     registerUser,
// //     loginUser
// // } = require("../controllers/authController");

// // const router = express.Router();

// // router.post("/register", registerUser);
// // router.post("/login", loginUser)

// // module.exports = router;
// const express = require("express");

// const {
//     registerUser,
//     loginUser
// } = require("../controllers/authController");

// const protect = require("../middleware/authMiddleware");

// const router = express.Router();

// router.post("/register", registerUser);

// router.post("/login", loginUser);

// router.get("/profile", protect, (req, res) => {
//     res.status(200).json({
//         message: "Protected route accessed successfully",
//         user: req.user
//     });
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();

// const protect = require("../middleware/authMiddleware");
// const adminOnly = require("../middleware/adminMiddleware");

// router.get("/dashboard", protect, adminOnly, (req, res) => {
//     res.json({
//         message: "Welcome to Admin Dashboard"
//     });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// ===============================
// PUBLIC ROUTES
// ===============================

// Register
router.post("/register", register);

// Login
router.post("/login", login);


// ===============================
// PROTECTED ADMIN ROUTE
// ===============================

router.get("/dashboard", protect, adminOnly, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Admin Dashboard",
        user: req.user
    });
});

module.exports = router;