import User from "../models/user.model.js";
import { GenreateJWT } from "../middlewares/jwt.middleware.js";

export const SignupMethod=async(req,res)=>{
    const{name,email,password}=req.body;
        try{
            const existing_user = await User.findOne({email:email});
            if(existing_user){
                console.log(existing_user);
                return res.status(409).json({message:"User already exists"});
            }
            const new_user=new User({name,email,password});
            await new_user.save();
            res.status(201).json({message:"User created"})
        }
        catch(err){
            console.error("Error during user sign up:", err.message);
            res.status(500).json({ message: "Internal server error during sign up." });
        }
}

export const LoginMethod = async(req,res)=>{
    // console.log(req.body);
    const {email,password}=req.body;
    try{
        const existingUser = await User.findOne({email:email}).select('+password');
        // console.log(existingUser);

        if(existingUser && existingUser.password == password){
            const payload={
                _id:existingUser._id,
                email:email,
                role:existingUser.role
            }
            const jwt_token = GenreateJWT(payload);
            res.cookie("jwt",jwt_token,{
            httpOnly: true,                // prevents JS access to cookie
            secure: process.env.NODE_ENV === "production", // only HTTPS in prod
            sameSite: "strict"
            });
            // console.log(existingUser);
            return res.status(200).json({ message: "True", token: jwt_token });
            
        }
        else{
            return res.status(404).json({message:"Invalid email or password"});
        }
    }
    catch(error){
        console.error("Error during user sign up:", error.message);
        res.status(500).json({ message: "Internal server error during sign up." });
    }
}