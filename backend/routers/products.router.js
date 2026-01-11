import express from "express";
import { Get_Products, Post_Products } from "../controllers/products.controller.js";

const ProductRouter= express.Router();

ProductRouter.get('/product', Get_Products);
ProductRouter.post('/product', Post_Products);
// router.get('/login', LoginMethod);

export default ProductRouter;