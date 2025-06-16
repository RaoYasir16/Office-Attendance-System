const express = require("express");
const router = express.Router();
const { authMiddleware, authorizeRole } = require("../middlewares/authMiddleware");
const { getAllUsers, userAttendance, deleteUser} = require("../Office-Attendance-System/controllers/adminController");

router.get("/get-all-users",authMiddleware,authorizeRole('admin'),getAllUsers);

router.get("/get-attendance/:id",authMiddleware,authorizeRole("admin"),userAttendance);

router.delete("/delete-user/:id",authMiddleware,authorizeRole("admin"),deleteUser);


module.exports = router