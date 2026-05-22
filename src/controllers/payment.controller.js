const Student = require("../models/Student");

const getPaymentAnalytics = async (req, res) => {
  try {

    const students = await Student.find();

    const totalRevenue = students.reduce(
      (acc, curr) => acc + (curr.amountPaid || 0),
      0
    );

    const outstanding = students.reduce(
      (acc, curr) => acc + (curr.amountDue || 0),
      0
    );

    const failedPayments = students
      .filter((student) => student.paymentStatus === "failed")
      .reduce((acc, curr) => acc + (curr.amountDue || 0), 0);

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        outstanding,
        failedPayments,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getPaymentAnalytics,
};