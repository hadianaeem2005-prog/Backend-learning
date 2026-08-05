import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import app from "./app.js";
import { upload } from "./middlewares/multer.middleware.js";

dotenv.config();


connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERROR:",error);
        throw error
        
    })
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`server is running at port ${process.env.PORT}`);
        
    })
})
.catch((error)=>{
    console.log("MongoDB connection failed:",error);
})