import express from "express";
import {
  LoginMethod,
  SignupMethod,
  UpdateProfileMethod,
  UpdatePasswordMethod,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/protected.middleware.js";

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
Authrouter.get("/me", protect, (req, res) => {
  res.status(200).json({ user: req.user });
});

Authrouter.put("/update-profile", protect, UpdateProfileMethod);
Authrouter.put("/update-password", protect, UpdatePasswordMethod);

export default Authrouter;
