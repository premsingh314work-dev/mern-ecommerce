import express from "express";
import cors from "cors";
import Authrouter from "./routers/auth.route.js";
import {connectDB} from './lib/db.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import ProductRouter from "./routers/products.router.js";
import MeRouter from "./routers/me.router.js";
import CartRouter from "./routers/cart.route.js";
import dns from 'node:dns/promises';

dns.setServers(['8.8.8.8','1.1.1.1']);


dotenv.config();


const PORT = process.env.PORT || 3000;
const app = express();


app.use(
  cors({
    origin: process.env.FRONTEND_URL  ,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/user",MeRouter);
app.use("/api/cart",CartRouter);
app.use("/api/auth",Authrouter);
app.use("/api/products",ProductRouter);

app.get('/',(req,res)=>{
    res.send("Hi");
})


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
  }
};

startServer();


// git add .         
// git commit -m "implemented jwt fully"     
// git push origin main
