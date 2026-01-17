import express from "express";
import { protect } from "../middlewares/protected.middleware.js";
import { isUser } from "../middlewares/isAdmin.middleware.js";
import { AddtoCart, Get_Cart } from "../controllers/cart.controller.js";

const CartRouter= express.Router();

CartRouter.post('/',protect,isUser, AddtoCart);
CartRouter.get('/',protect,isUser, Get_Cart);
// CartRouter.post('/product',protect, isAdmin, Post_Products);


export default CartRouter;