import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["User", "Admin", "Seller"],
      default: "User",
    },
    avatar: {
      type: String, // location of pfp.
    },
    phone: {
      type: String,
      unique: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
