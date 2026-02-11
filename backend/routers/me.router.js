import express from "express";
import { softProtect} from "../middlewares/protected.middleware.js";
const Merouter = express.Router();

Merouter.get("/me", softProtect, (req, res) => {
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
      role:req.user.role,
    },
  });
});

export default Merouter;
