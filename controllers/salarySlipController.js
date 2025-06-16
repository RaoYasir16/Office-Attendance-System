const Attendance = require("../../models/attendanceModel")
const SalarySlip = require("../../models/salarySlipModel");
const User = require("../../models/userModel");
const moment = require("moment");



//........................Admin Generate Salary Slip..............
const generateSalarySlip = async(req , res)=>{
    try {
        const {userId,month} = req.body // month="2025-06"


        const existingMonthSlip = await SalarySlip.findOne({month,user_id:userId        });
        if(existingMonthSlip){
            return res.status(400).json({
                message:"Salary Slip already Generated for this Month"
            });
        }

        
        const startDate = moment(month).startOf("month").toDate();
        const endDate = moment(month).endOf("month").toDate();

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User Not Found"
            });
        }

        const attendanceRecords = await Attendance.find({
            user_id:userId,
            date:{$gte:startDate, $lte:endDate}
        });

        if(!attendanceRecords){
            return res.status(404).json({
                message:"Attendance Record Not Found for this Month"
            });
        }

        const totelDays = moment(endDate).date();
        const presents = attendanceRecords.filter(a=>a.status === "Present").length;
        const lateCount = attendanceRecords.filter(a=>a.status === "Late").length;
        const totalPresentDays = presents + lateCount
        const absents = totelDays - totalPresentDays
        const perDaySalary = user.salary/totelDays
        const deductions = absents * perDaySalary;
        const salaryGiven = user.salary- deductions

        const slip = await SalarySlip.create({
            user_id : userId,
            month,
            totelDays,
            presents,
            absents,
            leaves:0,
            salaryGiven,
            deductions
        });

        return res.status(200).json({
            message:"Salarty Slip Generated",
            slip
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


//.................User Get Our Salary Slips............//
const getUserSlip = async(req,res)=>{
    try {
        const userId = req.user.id

        const slips = await SalarySlip.find({
            user_id:userId
        }).populate("user_id","username email");

        if(slips.length === 0){
            return res.status(400).json({
                message:"Your Salary Slips not found"
            });
        }

        return res.status(200).json({
            message:"Salary Slips Fatched Successfylly",
            slips
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

//...................User can Search Our Salary Slip by Month..............//
const getSlipByMonth = async(req,res)=>{
    try {
        const {month} = req.query
        const userId = req.user.id

        const salarySlip = await SalarySlip.findOne({month,user_id:userId}).populate("user_id","username email")
        
        if(!salarySlip){
            return res.status(400).json({
                message:"Your Salary Slip for this month not Found"
            });
        }

        return res.status(200).json({
            message:`salary Slip Fatched successfylly for month ${month}`,
            salarySlip
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports = {generateSalarySlip,getUserSlip,getSlipByMonth}