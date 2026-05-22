const Staff = require("../models/Staff");


exports.createStaff = async (req, res) => {

    try {

        const {
            fullName,
            email,
            phone,
            role,
            status,
            skillset
        } = req.body;

        if (
            !fullName ||
            !email ||
            !phone ||
            !role ||
            !status ||
            !skillset
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields must be filled"
            });
        }

        const staff = await Staff.create({

            fullName,
            email,
            phone,
            role,
            status,
            skillset,

            attendance: [
                {
                    status: "present"
                }
            ]

        });

        res.status(201).json({
            success: true,
            message: "Staff created successfully",
            staff
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};
exports.getAllStaff = async (req, res) => {

    try {

        const staff = await Staff.find();

        res.status(200).json({
            success: true,
            count: staff.length,
            staff
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};