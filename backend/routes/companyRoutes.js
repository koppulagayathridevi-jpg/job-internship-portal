const express = require("express");

const router = express.Router();

const {
    createCompany,
    getCompanies,
    deleteCompany
} = require("../controllers/companyController");

const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");


// =====================================================
// GET ALL COMPANIES
// =====================================================

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getCompanies
);


// =====================================================
// CREATE COMPANY
// =====================================================

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createCompany
);


// =====================================================
// DELETE COMPANY
// =====================================================

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteCompany
);


module.exports = router;