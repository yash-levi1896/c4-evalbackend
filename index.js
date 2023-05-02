const express=require('express');
const connection = require('./db');
const userRoute = require('./Routes/user.routes');
const authentication = require('./Middlewares/authentication.middleware');
const ipRoute=require('./Routes/ip.route');
const valid = require('./Middlewares/validator.middleware');
const logger = require('./logger');
const app=express();
 require('dotenv').config();
app.use(express.json());

app.use("/user",userRoute);
app.use(authentication);
app.use("/city",ipRoute)









app.listen(process.env.port,async()=>{
    try {
        await connection
        
        console.log("connected to db");
        
    } catch (error) {
        logger();
    }
    console.log("connected to server")
})