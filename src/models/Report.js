const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const reportSchema = new mongoose.Schema({
    type:{
        type: String,
        enum: ["student_performance", "staff_performance", "payment"]
    },
    
    data:{
        type:Object,
    },
    generatedAt:{
        type:Date,
        default: Date.now()
    }
})
module.exports = mongoose.model("Report", reportSchema)