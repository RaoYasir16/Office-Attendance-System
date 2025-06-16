const express = require("express");
const router = express.Router();

const {generateSalarySlip, getUserSlip, getSlipByMonth} = require("../Office-Attendance-System/controllers/salarySlipController");
const {authMiddleware,authorizeRole} = require("../middlewares/authMiddleware");


//..............Admin Generate Salary Slip............
router.post("/generate",authMiddleware,authorizeRole("admin"),generateSalarySlip);

//.....................User Can view Or All Salary Slips
router.get("/my-slips",authMiddleware,authorizeRole("user"),getUserSlip);

//...................... User Search SalarySlip by Month...........
router.post("/my-slips",authMiddleware,authorizeRole("user"),getSlipByMonth)

module.exports = router