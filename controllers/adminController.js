const User = require ("../models/userModel");
const Attendance = require("../models/attendanceModel");

// .................Get All Users.......// Only Admin
const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find().select("-password");
        if(!users){
            return res.status(404).json({
                message:"No users found"
            });
        }

        return res.status(200).json({
            message:"Users fatched Successfully",
            users
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

// ........Get User Attendance by Id.........//Only Admin
const userAttendance = async(req,res)=>{
    try {
        const userId = req.params.id

        const user = await User.findOne({_id:userId});
        if(!user){
            return res.status(404).json({
                message:"User Not found"
            });
        }

        const attendance = await Attendance.find({ user_id: userId }).populate('user_id', 'username email');
        if(attendance.length === 0){
            return res.status(404).json({
                message:"Attendance not found for this user"
            });
        }

        return res.status(200).json({
            message:"Attendance fatched successfully",
            attendance
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

// ...........Delete a User........// Only Admin
const deleteUser = async(req,res)=>{
    try {
        const userId = req.params.id

        const user = await User.findOne({_id:userId});
        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }

        await Attendance.deleteMany({user_id:userId});
        await User.findByIdAndDelete(userId);


        return res.status(200).json({
            message:"User delete successfylly",
            user
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
module.exports = {getAllUsers,userAttendance,deleteUser}