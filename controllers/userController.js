const User = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//register User
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(403).json({
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role,
        });

        return res.status(200).json({
            message: "User register successfully",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};



//Login user
const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({
                message:"All fields are require"
            });
        }

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({
                message:"User not Register"
            });
        }

        const compare = await bcrypt.compare(password,existingUser.password);
        if(!compare){
            return res.status(400).json({
                message:"Incorrect Password"
            })
        }

        const jsonwebtoken = await jwt.sign({
            id:existingUser.id,
            username:existingUser.username,
            role:existingUser.role
        },
    process.env.JWT_KEY,
    {expiresIn:"7d"}
    );

    return res.status(200).json({
        message:"User login successfully",
        jsonwebtoken
    })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}



module.exports = { registerUser,loginUser };
