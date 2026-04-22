const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const staffSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "on_leave", "inactive"],
        default: "absent"
    },
    role: {
        type: String,
        enum: ["frontend", "backend Engineer", "Lead_Developer", "digital_marketing", "ui_ux", "other"],
        required: true

    },
    skillset: [String],
    attendance: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            status: {
                type: String,
                enum: ["present", "absent", "late"]
            }
        }
    ],
    performanceScore: {
        type: Number,
        default: 0
    }
}, { timestamps: true })
module.exports = mongoose.model("Staff", staffSchema)