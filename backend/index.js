import express from "express";
import Authrouter from "./routers/auth.route.js";
import {connectDB} from './lib/db.js';
import dotenv from "dotenv";
import ProductRouter from "./routers/products.router.js";

dotenv.config();



const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/auth',Authrouter);
app.use('/api',ProductRouter);

app.get('/',(req,res)=>{
    res.send("Hi");
})


app.listen(PORT,async()=>{
    await connectDB()
    console.log(`your backend is running on port ${PORT} , http://localhost:${PORT}`);
})


// git add .         
// >> git commit -m "implemented jwt fully"     
// >> git push origin main
