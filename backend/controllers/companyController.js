const Company = require("../models/Company");


// =====================================================
// CREATE COMPANY
// =====================================================

const createCompany = async (req, res) => {

    try {

        const {
            name,
            email,
            location,
            website,
            description
        } = req.body;


        // Validate required fields

        if (
            !name ||
            !email ||
            !location
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Name, email and location are required"
            });

        }


        // Check duplicate company

        const existingCompany =
            await Company.findOne({
                email
            });

        if (existingCompany) {

            return res.status(400).json({
                success: false,
                message:
                    "Company with this email already exists"
            });

        }


        // Create company

        const company =
            await Company.create({
                name,
                email,
                location,
                website,
                description
            });


        res.status(201).json({

            success: true,

            message:
                "Company created successfully",

            company

        });


    } catch (error) {

        console.error(
            "Create Company Error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to create company",

            error:
                error.message

        });

    }
};


// =====================================================
// GET ALL COMPANIES
// =====================================================

const getCompanies = async (req, res) => {

    try {

        const companies =
            await Company.find()
                .sort({
                    createdAt: -1
                });


        res.status(200).json({

            success: true,

            count:
                companies.length,

            companies

        });


    } catch (error) {

        console.error(
            "Get Companies Error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch companies",

            error:
                error.message

        });

    }
};


// =====================================================
// DELETE COMPANY
// =====================================================

const deleteCompany = async (req, res) => {

    try {

        const company =
            await Company.findById(
                req.params.id
            );


        if (!company) {

            return res.status(404).json({

                success: false,

                message:
                    "Company not found"

            });

        }


        await Company.findByIdAndDelete(
            req.params.id
        );


        res.status(200).json({

            success: true,

            message:
                "Company deleted successfully"

        });


    } catch (error) {

        console.error(
            "Delete Company Error:",
            error.message
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to delete company",

            error:
                error.message

        });

    }
};


module.exports = {
    createCompany,
    getCompanies,
    deleteCompany
};