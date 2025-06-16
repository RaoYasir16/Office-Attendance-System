const mongoose = require("mongoose");

const salarySlipSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    month:{
        type:String,
        required:true
    },
    totalDays:Number,
    presents:Number,
    absents:Number,
    leaves:Number,
    salaryGiven:Number,
    deductions:Number
},{timestamps:true});

module.exports = mongoose.model("SalarySlip",salarySlipSchema)