const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const paymentSchema = new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    
    amount:{
        type:Number,
    },
    status:{
        type:String,
        enum:["paid", "pending", "failed"]
    },
    date:{
        type:Date,
        required: Date.now()
    },
    
})
module.exports = mongoose.model("Payment", paymentSchema)