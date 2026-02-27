import express from "express";
import { protect } from "../middlewares/protected.middleware.js";
import {
  AddtoCart,
  Get_Cart,
  updateCartQuantity,
} from "../controllers/cart.controller.js";

const CartRouter = express.Router();    
CartRouter.get("/", protect, Get_Cart);
CartRouter.post("/", protect, AddtoCart);

// Update/Increment/Decrement existing product quantity
// Using PATCH because we are modifying an existing resource
CartRouter.patch("/update", protect, updateCartQuantity);

export default CartRouter;
