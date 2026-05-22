const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    course: {
        type: String,
        enum: [
            "Full Stack Development",
            "Frontend Mastery",
            "Web Fundamentals",
            "Backend Engineering",
            "Digital Marketing Pro"
        ]
    },

    progress: {
        type: Number,
        default: 0
    },

    level: {
        type: String,
        enum: [
            "beginner",
            "intermediate",
            "advanced"
        ],
        default: "beginner"
    },

    amountPaid: {
        type: Number,
        default: 0
    },

    amountDue: {
        type: Number,
        default: 0
    },

    paymentStatus: {
        type: String,
        enum: [
            "paid",
            "pending",
            "failed"        ],
        default: "pending"
    },

    DOB: {
        type: Date,
    },

    
    address: {
        type: String,
    },

    phone: {
        type: String,
    }

}, { timestamps: true })

module.exports = mongoose.model("Student", studentSchema)