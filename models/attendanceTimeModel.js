const mongoose = require("mongoose");

const attendanceTimeSchema = mongoose.Schema({
    checkin_time:{
        type:String,
        required:true
    },
    checkout_time:{
        type:String,
        tequired:true
    }
},{timestamps:true})

module.exports = mongoose.model("AttendanceTime",attendanceTimeSchema)