
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({
      message: "You are not authorized to perform this action"
    });
  }
  next();
};

export const isUser = (req, res, next) => {
  if (req.user.role !== "User") {
    return res.status(403).json({
      message: "You are not authorized to perform this action"
    });
  }
  next();
};

export const isSeller = (req, res, next) => {
  if (req.user.role !== "Seller") {
    return res.status(403).json({
      message: "You are not authorized to perform this action"
    });
  }
  next();
};


