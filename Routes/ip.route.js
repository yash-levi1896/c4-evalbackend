const express=require('express');
const redis=require('../redis')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const ipRoute=express.Router();
const valid = require('../Middlewares/validator.middleware');

ipRoute.get("/:ipadd",async(req,res)=>{
    const {ipadd}=req.params;
   // console.log(redis.exists(ipadd))
    if(await redis.exists(ipadd)){
         // console.log()
            console.log("from redis")
            res.send({msg: JSON.parse( await redis.get(ipadd))})
        
    }
    else{
    const response = await fetch(`https://ipapi.co/${ipadd}/json/`);
    const body = await response.json();
    await  redis.set(ipadd,JSON.stringify(body.city),{EX:1*60*60});
    res.send({msg:body.city})
    }
})









module.exports=ipRoute