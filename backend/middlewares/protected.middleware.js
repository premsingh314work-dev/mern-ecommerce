import jwt from "jsonwebtoken";
import Users from "../models/user.model.js";
export const protect =async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await Users.findById(decoded._id).select("-password");
    req.user=user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
