import express from "express";
import { LoginMethod, SignupMethod } from "../controllers/auth.controller.js";

const Authrouter = express.Router();

Authrouter.post("/signup", SignupMethod);
Authrouter.post("/login", LoginMethod);
Authrouter.post("/logout", (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // sameSite: "none",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
})

export default Authrouter;
