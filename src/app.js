import 'dotenv/config'
import express from 'express';
import AllRoutes from './Routes/index.js';
import { connectDB } from './db/config.js';
import syncDB from './db/init.js';
const myApp = express();
const port = 3000;
myApp.use(express.json());
myApp.use(AllRoutes);
connectDB;
syncDB().then(console.log("db added"));

//server Listen 
myApp.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})