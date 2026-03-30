import User from "../models/user.model.js";
import { GenreateJWT } from "../middlewares/jwt.middleware.js";

const isProduction = process.env.NODE_ENV === "production";

export const SignupMethod = async (req, res) => {
  const { name, email, password, avatar, phone } = req.body;
  try {
    const existing_user = await User.findOne({ email: email });
    if (existing_user) {
      console.log(existing_user);
      return res.status(409).json({ message: "User already exists" });
    }
    const new_user = new User({ name:name, email:email, password:password, avatar:avatar, phone:phone });
    await new_user.save();

    const payload = {
      _id: new_user._id,
      email: new_user.email,
      role: new_user.role || "User",
      avatar: new_user.avatar,
      name: new_user.name,
    };

    const jwt_token = GenreateJWT(payload);

    res.cookie("jwt", jwt_token, {
      httpOnly: true,
      secure: isProduction, // only HTTPS in production
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "User created and Logged in!",
      user:payload
    });
  } catch (err) {
    console.error("Error during user sign up:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const LoginMethod = async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email }).select(
      "+password",
    );
    // console.log(existingUser);

    if (existingUser && existingUser.password == password) {
      const payload = {
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
        avatar: existingUser.avatar,
        name: existingUser.name,
      };
      const jwt_token = GenreateJWT(payload);
      res.cookie("jwt", jwt_token, {
        httpOnly: true,
        secure: isProduction, // only HTTPS in production
        sameSite: isProduction ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });
      // console.log(existingUser);
      return res.status(200).json({ message: "Login SuccessFully!", user:payload});
    } else {
      return res.status(404).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during user sign up:", error.message);
    res.status(500).json({ message: "Internal server error during sign up." });
  }
};
