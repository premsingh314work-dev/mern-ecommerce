import express from "express";
import { protect } from "../middlewares/protected.middleware.js";
import { isUser } from "../middlewares/isAdmin.middleware.js";
import { AddtoCart } from "../controllers/cart.controller.js";

const CartRouter= express.Router();

CartRouter.post('/addtocart',protect,isUser, AddtoCart);
// CartRouter.post('/product',protect, isAdmin, Post_Products);


export default CartRouter;