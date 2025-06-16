const Attendance = require("../models/attendanceModel");

// ........Check In.......// Only User
const checkIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const todayDate = new Date();

    const dateOnly = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate()
    );

    const existingAttendance = await Attendance.findOne({
      user_id: userId,
      date: dateOnly,
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Already checked in today",
      });
    }

    const checkInHour = todayDate.getHours();
    const checkInMinute = todayDate.getMinutes();

    let status = "Present";

    if (checkInHour > 11 || (checkInHour === 11 && checkInMinute > 15)) {
      status = "Late";
    }

    const attendance = await Attendance.create({
      user_id: userId,
      date: dateOnly,
      checkintime: todayDate,
      status: status,
    });

    return res.status(200).json({
      message: "Checked In Successfully",
      attendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ............Check Out............// Only User
const checkOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const todayDate = new Date();
    const dateOnly = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate()
    );

    const attendance = await Attendance.findOne({
      user_id: userId,
      date: dateOnly,
    });

    if (!attendance || !attendance.checkintime) {
      return res.status(400).json({
        message: "You must Check In first",
      });
    }

    if (attendance.checkouttime) {
      return res.status(400).json({
        message: "Already check out today",
      });
    }

    attendance.checkouttime = new Date();
    await attendance.save();

    return res.status(200).json({
      message: "Check out Successfully",
      attendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ...........Get All Attendance..........// Only User
const getAllAttendance = async (req, res) => {
  try {
    const userId = req.user.id;

    const attendance = await Attendance.find({ user_id: userId });
    if (attendance.length === 0) {
      return res.status(400).json({
        message: "No Attendance found",
      });
    }

    return res.status(200).json({
      message: "All Attendance fatched successfully",
      attendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// ..........Serach Spacific date Attendance.........//Only user
const searchAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        message: "Please Provide a date in query Like ?date=2025-06-12",
      });
    }

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(targetDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const attendance = await Attendance.findOne({
      user_id: userId,
      date: {
        $gte: targetDate,
        $lt: nextDate,
      },
    });

    if (!attendance) {
      return res.status(404).json({
        message: "No attendance found for this Date",
      });
    }

    return res.status(200).json({
      message: "Attendance Fatched successfully",
      attendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { checkIn, checkOut, getAllAttendance, searchAttendance };
