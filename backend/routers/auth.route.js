import express from "express";
import { LoginMethod, SignupMethod } from "../controllers/auth.controller.js";

const Authrouter = express.Router();

Authrouter.post("/signup", SignupMethod);
Authrouter.post("/login", LoginMethod);
Authrouter.post("/logout", (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: isProduction, // only HTTPS in production
    sameSite: isProduction ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export default Authrouter;
