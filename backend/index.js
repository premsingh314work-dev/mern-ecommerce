import express from "express";
import router from "./routers/auth.route.js";
import {connectDB} from './lib/db.js';
import dotenv from "dotenv";

dotenv.config();



const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/auth',router);

app.get('/',(req,res)=>{
    res.send("Hi");
})


app.listen(PORT,async()=>{
    await connectDB()
    console.log(`your backend is running on port ${PORT} , http://localhost:${PORT}`);
})
