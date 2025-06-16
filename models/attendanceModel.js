const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    checkintime: {
        type: Date
    },
    checkouttime: {
        type: Date
    },
    status: {
        type: String,
        enum: ["Present", "Absent", "Late"],
        default: "Absent" 
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Attendance", attendanceSchema);
