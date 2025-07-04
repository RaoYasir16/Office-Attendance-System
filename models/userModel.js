const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    salary:{
        type:Number,
        default:30000
    }
},
{timestamps:true}
)


module.exports = mongoose.model("User",userSchema)