import express from "express";
import cors from "cors";
import Authrouter from "./routers/auth.route.js";
import {connectDB} from './lib/db.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import ProductRouter from "./routers/products.router.js";

import CartRouter from "./routers/cart.route.js";

dotenv.config();


const PORT = 3000;
const app = express();


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/cart",CartRouter);
app.use("/api/auth",Authrouter);
app.use("/api/products",ProductRouter);

app.get('/',(req,res)=>{
    res.send("Hi");
})


app.listen(PORT,async()=>{
    await connectDB()
    console.log(`your backend is running on port ${PORT} , http://localhost:${PORT}`);
})


// git add .         
// git commit -m "implemented jwt fully"     
// git push origin main
