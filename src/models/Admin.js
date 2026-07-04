const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        // required: true,
    },
    hashedPassword: {
        type:String
    }


})

module.exports = mongoose.model("Admin", adminSchema)