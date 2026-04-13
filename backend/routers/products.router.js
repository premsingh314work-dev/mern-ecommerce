import express from "express";
import { protect } from "../middlewares/protected.middleware.js";
import { isSeller } from "../middlewares/isAdmin.middleware.js";
import {  Get_Products ,Post_Products,Get_singleProduct, getRecentlyViewedProducts, addProductToRecentlyViewed} from "../controllers/products.controller.js";

const ProductRouter= express.Router();

ProductRouter.get('/',Get_Products);
ProductRouter.post('/',protect, isSeller, Post_Products);
ProductRouter.get('/getrecentlyviewed', protect, getRecentlyViewedProducts);

ProductRouter.get('/:prodid', Get_singleProduct);
ProductRouter.post('/postrecentlyviewed/:itemId', protect, addProductToRecentlyViewed);


export default ProductRouter;