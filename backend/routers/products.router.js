import express from "express";
import { protect } from "../middlewares/protected.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import {  Get_Products ,Post_Products} from "../controllers/products.controller.js";

const ProductRouter= express.Router();

ProductRouter.get('/', Get_Products);
ProductRouter.post('/',protect, isAdmin, Post_Products);
// router.get('/login', LoginMethod);

export default ProductRouter;