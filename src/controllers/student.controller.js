const Payment = require("../models/Payment")
const Student = require("../models/Student")

exports.createStudent = async (req, res) => {
    try {

        const {
            fullName,
            email,
            course,
            level,
            amountPaid,
            amountDue,
            paymentStatus,
            progress
        } = req.body

        if (
            !fullName ||
            !email ||
            !course ||
            !level
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields must be filled"
            })
        }

        const existingStudent = await Student.findOne({ email })

        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: "Student already exists"
            })
        }

        const student = await Student.create({
            fullName,
            email,
            course,
            level,
            amountPaid,
            amountDue,
            paymentStatus,
            progress
        })

        if (amountPaid > 0) {
            await Payment.create({
                student: student._id,
                amount: amountPaid,
                status: paymentStatus || "paid"
            })
        }

        if (amountDue > 0) {
            await Payment.create({
                student: student._id,
                amount: amountDue,
                status: "pending"
            })
        }
        res.status(201).json({
            success: true,
            message: "Student created successfully",
            student
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.getAllStudent = async (req, res) => {
    try {

        const students = await Student.find().sort({
            createdAt: -1
        })

        res.status(200).json({
            success: true,
            students,
            count: students.length
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
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
            return res.status(404).json({
                success: false,
                message: "Student not found"
            })
        }

        res.status(200).json({
            success: true,
            student
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.addPayment = async (req, res) => {
    try {

        const { studentId, amount, status } = req.body

        const payment = await Payment.create({
            student: studentId,
            amount,
            status
        })

        res.status(201).json({
            success: true,
            payment
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}