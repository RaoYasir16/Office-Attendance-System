const express = require("express");
const { checkIn, checkOut, getAllAttendance, searchAttendance } = require("../controllers/attendanceController");
const { authMiddleware, authorizeRole } = require("../middlewares/authMiddleware");

const router = express.Router()

router.post("/check-in",authMiddleware, authorizeRole("user"),checkIn);

router.post("/check-out",authMiddleware, authorizeRole("user"),checkOut);

router.get("/all-attendance",authMiddleware,authorizeRole("user"),getAllAttendance);

router.get("/get-attendance",authMiddleware,authorizeRole("user"),searchAttendance);




module.exports = router