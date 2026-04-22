const Staff = require("../models/Staff");
const Student = require("../models/Student");

exports.staffPerformance= async(req,res)=>{
    try{
        const staff= await Staff.find()
        const data = staff.map((s)=>{
            const totalDays = s.attendance.length;
            const presentDays = s.attendance.filter((a)=> a.status === "present").length;
            const attendanceRate = totalDays === 0 ? 0 : (presentDays/totalDays) *100;
            return{
                name : s.fullName,
                role: s.role,
                attendanceRate: attendanceRate.toFixed(2)
            } 
        })
        res.json({success: true, data})
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

exports.studentProgress= async(req, res)=>{
    try{
        const students= await Student.find()
        const data = students.map((s)=>({
            fullName: s.fullName,
            level: s.level,
            progress: s.progress
        }));
        res.json({success:true, data})
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}