import User from "../models/user.model.js";


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
    const {email,password}=req.body;
    try{
        const existing_user=await User.findOne({email:email});
        if(existing_user && password==existing_user.password){
            res.json({message:"logined"});
        }
        else{
            return res.status(404).json({message:"Invalid email or password"});
        }

    }
    catch(err){
            console.error("Error during user sign up:", err.message);
            res.status(500).json({ message: "Internal server error during sign up." });
        }
}