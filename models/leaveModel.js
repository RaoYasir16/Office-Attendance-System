const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    fromDate:{
        type:Date,
        required:true
    },
    toDate:{
        type:Date,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['Pending','Approved','Rejected'],
        default:"Pending"
    },
    adminNote:{
        type:String
    },
},{
timestamps:true
});


module.exports = mongoose.model("Leave",leaveSchema)