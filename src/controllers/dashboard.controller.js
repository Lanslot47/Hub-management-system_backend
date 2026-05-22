const Student = require("../models/Student")
const Staff = require("../models/Staff")

exports.getDashboardData = async (req, res) => {

    try {

        // TOTAL STAFF

        const totalStaff = await Staff.countDocuments()

        const activeStaff = await Staff.countDocuments({
            status: "active"
        })

        // TOTAL STUDENTS

        const totalStudents = await Student.countDocuments()

        // TOTAL REVENUE

        const paidStudents = await Student.find({
            paymentStatus: "paid"
        })

        const pendingPayments = await Student.countDocuments({
            paymentStatus: "pending"
        })

        const totalRevenue = paidStudents.reduce(
            (acc, curr) => acc + curr.amountPaid,
            0
        )

        // ATTENDANCE

        const allStaff = await Staff.find()

        let totalAttendance = 0

        allStaff.forEach((staff) => {

            const presentDays = staff.attendance.filter(
                (item) => item.status === "present"
            ).length

            const totalDays = staff.attendance.length

            const percentage =
                totalDays > 0
                    ? (presentDays / totalDays) * 100
                    : 0

            totalAttendance += percentage
        })

        const averageAttendance =
            allStaff.length > 0
                ? Math.floor(totalAttendance / allStaff.length)
                : 0

        // STAFF OVERVIEW

        const staffOverview = allStaff.slice(0, 4)

        // STUDENT PROGRESS

        const studentProgress = await Student.find()
            .sort({ progress: -1 })
            .limit(4)

        res.status(200).json({
            success: true,

            stats: {
                totalStaff,
                activeStaff,
                totalStudents,
                totalRevenue,
                pendingPayments,
                averageAttendance
            },

            staffOverview,

            studentProgress
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}