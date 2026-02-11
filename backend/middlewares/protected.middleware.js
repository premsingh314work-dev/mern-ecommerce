import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach user info to request
    req.user = {
      _id: decoded._id,
      role: decoded.role,
      email: decoded.email,
      name: decoded.name,
      avatar: decoded.avatar, // optional
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const softProtect = (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return next(); // No token No problem, just move to the route
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = {
      _id: decoded._id,
      role: decoded.role,
      email: decoded.email,
      name: decoded.name,
      avatar: decoded.avatar,
    };
    next();
  } catch (err) {
    next();
  }
};