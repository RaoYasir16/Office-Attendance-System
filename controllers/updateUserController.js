const User = require("../models/userModel");


const updateUser= async(req , res)=>{
    try {
        const userId = req.user.id
         const {username,email,}= req.body
         
        
    } catch (error) {
    return res.status(500).json({
        message:error.message
    })
    }
}