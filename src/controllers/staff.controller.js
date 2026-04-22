const Staff = require("../models/Staff")

exports.createStaff = async (req, res)=>{
    try{
        const {fullName, email, role, status, skills}= req.body

        if(!fullName || !email || !role || !status || !skills){
            res.status(404).json({
                message: "All fields must be filled"
            })
        }
        const staff = await Staff.create({
            fullName, email, status, skills
        })
        if(staff){
            res.status(201).json({
                success: true,
                message: "staff created successfully",
                staff
            })
        }
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
exports.getAllStaff= async (req, res)=>{
    try{
        const staff = await Staff.find();
        if(staff){
            res.status(200).json({
                success:true,
                count:staff.length,
                staff
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}