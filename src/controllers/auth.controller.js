const Admin = require("../models/Admin")
const bcrypt = require("bcrypt")
exports.signup = async (req, res) => {
    try {
        const { userName, password } = req.body
        if (!userName || !password) {
            res.status(400).json({
                success: false,
                message: "All field must be filled"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        //  password = hashedPassword
        const admin = await Admin.create({ userName, hashedPassword })
        if (admin) {
            res.status(201).json({
                success: true,
                message: "Admin created successfully",
                admin
            })
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }

}
exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            res.status(400).json({
                success: false,
                message: "All field must be filled"
            })
        }
        const checkUserName = await Admin.findOne({ userName: userName })

        if (!checkUserName) {
            res.status(404).json({
                success: false,
                message: "admin not found"
            })
        }
        const hashedPassword = checkUserName.hashedPassword;
        const comparePassword = await bcrypt.compare(password, hashedPassword)
        if (comparePassword) {
            res.status(200).json({
                success: true,
                message: "Login Successfully",
            })
        }
        res.status(400).json({
            success: false,
            message: "Password mismatch"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
