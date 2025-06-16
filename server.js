const dotenv = require("dotenv").config();
const express = require("express");
const db = require("./Office-Attendance-System/config/db")

//route import
const userRoute = require("./routes/userRoute");
const attendanceRoute = require("./routes/attendanceRoute");
const adminRoute = require("./routes/adminRoutes");
const leaveRoute = require("./routes/leaveRoute");
const salarySlipRoute = require("./routes/salaryRoute")

const app = express();
app.use(express.json());

//route use
app.use("/",userRoute);
app.use("/",attendanceRoute);
app.use("/",adminRoute);
app.use("/",leaveRoute);
app.use("/",salarySlipRoute)



const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server started on ${port}` )
    db()
})