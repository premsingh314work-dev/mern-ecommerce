import express from "express";
import { protect } from "../middlewares/protected.middleware.js";
const Merouter= express.Router();

Merouter.get('/me', protect,(req,res)=>{
    if(!req.user._id)return;
    res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar, // optional
      email: req.user.email
    }
    });
});

export default Merouter;