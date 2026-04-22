const Payment = require("../models/Payment")
const Student = require("../models/Student")

exports.createStudent = async (req, res) => {
    try {
        const { fullName, email, course, level, payments } = req.body

        if (!fullName || !email || !course || !level) {
            res.status(404).json({
                success: false,
                message: "All fields must be filled"
            })
        }
        const student = await Student.create({ fullName, email, course, level, payments })
        if (student) {
            res.status(201).json({
                success: true,
                message: "Student created successfully",
                student
            })
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
exports.getAllStudent = async (req, res) => {
    try {
        const students = await Student.find()
        if (students) {
            res.status(200).json({
                success: true,
                students,
                count: students.length
            })
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.messsage
        })
    }
}

exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!student) {
            res.status(404).json({ message: "Student not found" })
        }
        res.status(200).json({
            success: true,
            student
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
exports.addPayment = async (req, res) => {
    try {
        const { studentId, amount, status } = req.body;

        const payment = await Payment.create({
            student: studentId,
            amount,
            status
        })
        if (payment) {
            res.status(201).json({
                success: true,
                payment
            })
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}