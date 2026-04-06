import express from "express";
import { protect } from "../middlewares/protected.middleware.js";
import { isSeller } from "../middlewares/isAdmin.middleware.js";
import {  Get_Products ,Post_Products,Get_singleProduct, trackRecentlyViewed, getRecentlyViewed} from "../controllers/products.controller.js";

const ProductRouter= express.Router();

ProductRouter.get('/',Get_Products);
ProductRouter.get('/:prodid', Get_singleProduct);
ProductRouter.post('/',protect, isSeller, Post_Products);

ProductRouter.get('/recently-viewed', protect, getRecentlyViewed);
ProductRouter.post('/recently-viewed', protect, trackRecentlyViewed);


export default ProductRouter;