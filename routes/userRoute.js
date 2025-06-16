const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../Office-Attendance-System/controllers/userController");

router.post("/register",registerUser);

router.post("/login",loginUser);


module.exports = router