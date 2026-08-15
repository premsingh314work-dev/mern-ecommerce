import express from "express";
import { protect } from "../middlewares/protected.middleware.js";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
} from "../controllers/order.controller.js";

const OrderRouter = express.Router();

OrderRouter.post("/", protect, placeOrder);
OrderRouter.get("/my", protect, getMyOrders);
OrderRouter.get("/:id", protect, getOrderById);

export default OrderRouter;

// In server.js, mount alongside your other routers:
// import OrderRouter from "./routers/order.route.js";
// app.use("/api/orders", OrderRouter);
