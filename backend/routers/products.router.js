import express from "express";
import { protect, softProtect } from "../middlewares/protected.middleware.js";
import { isSeller } from "../middlewares/isAdmin.middleware.js";
import {  Get_Products ,Post_Products,Get_singleProduct} from "../controllers/products.controller.js";

const ProductRouter= express.Router();

ProductRouter.get('/', softProtect,Get_Products);
ProductRouter.get('/:prodid', Get_singleProduct);
ProductRouter.post('/',protect, isSeller, Post_Products);


export default ProductRouter;