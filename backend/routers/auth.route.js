import express from "express";
import { LoginMethod, SignupMethod } from "../controllers/auth.controller.js";
import { softProtect } from "../middlewares/protected.middleware.js";

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
Authrouter.get("/me", softProtect, (req, res) => {
  if (!req.user?._id) {
    return res.status(200).json({ success: false, user: null });
  }
  ({ message: "Unauthorized" });
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar, // optional
      email: req.user.email,
      role: req.user.role,
    },
  });
});

export default Authrouter;
