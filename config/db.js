const mongoose = require("mongoose");
const uri = process.env.DB_URI

const db = async()=>{
    try {
        mongoose.connect(uri);
        console.log("Database connected")
    } catch (error) {
        console.log("Database not connected")
    }
}


module.exports = db