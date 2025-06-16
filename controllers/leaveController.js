const Leave = require("../models/leaveModel");

//..........User Apply For Leave......//Only User
const applyLeave = async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;
    const userId = req.user.id;

    if (!fromDate || !toDate || !reason) {
      return res.status(400).json({
        message: "All field are Required",
      });
    }

    const leave = await Leave.create({
      user_id: userId,
      fromDate,
      toDate,
      reason,
    });

    return res.status(200).json({
      message: "Leave Apply Successfully",
      leave,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//............View our own Leave Application......
const getMyLeaveRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const leave = await Leave.find({ user_id: userId }).sort({
      createdtAt: -1,
    });

    if (leave.length === 0) {
      return res.status(400).json({
        message: "Leave request Not found",
      });
    }

    return res.status(200).json({
      message: "Leave requests Fatched Successfylly",
      leave,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//.........Only Admin View All users Leave Requests..........
const viewAllLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await Leave.find()
      .populate("user_id", "username email")
      .sort({ createdtAt: -1 });

    if (leaveRequest.length === 0) {
      return res.status(400).json({
        message: "Leave Request Not found",
      });
    }

    return res.status(200).json({
      message: "Leave Request fatched Successfully",
      leaveRequest,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//...............Admin approve or Reject Leave requests
const updateLeaveStatus = async (req, res) => {
  try {
    const leaveId = req.params.id;
    const { status, adminNote } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid Status Values",
      });
    }

    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      { status, adminNote },
      { new: true }
    );

    return res.status(200).json({
      message: "Leave status Updated",
      leave,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyLeave,
  getMyLeaveRequest,
  viewAllLeaveRequest,
  updateLeaveStatus,
};
