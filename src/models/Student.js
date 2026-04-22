const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    course:{
        type:String,
        enum: ["Full Stack Dvelopment", "Frontend Mastery", "Web Fundamentals", "Backend Engineering", "Digital Marketing Pro"]
    },

    progress: {
        type: Number,
        default: 0
    },
    level:{
        type: String,
        enum:["beginner", "intermediate", "advanced"],
        default:"beginner"   
     },
    DOB: {
        type:Date,

    },
    address:{
        type:String,
    },
    phone:{
        type:String,
    },
    payments:{
        amount:Number,
        date:{
            type:Date,
            default: Date.now
        },
        status: {
            type:String,
            enum:["paid", "pending", "failed"]
        }
    }
}, {timestamps: true})
module.exports = mongoose.model("Student", studentSchema)
