const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },

    amount: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: ["paid", "pending", "failed"],
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Payment", paymentSchema);