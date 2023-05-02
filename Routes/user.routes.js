const express=require('express');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const UserModel = require('../Models/user.model');
const redis = require('../redis');
const userRoute=express.Router();



userRoute.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    let user=await UserModel.find({email});
    try{
    if(user.length===0){
        bcrypt.hash(password,5,async(err,hash)=>{
            let userreg=new UserModel({name,email,password:hash})
            await userreg.save();
            res.send({msg:"user registered!"})
        })
    }else{
        res.send({msg:"user already registered please login !"})
    }}
    catch(error){
        res.status(500).send({msg:error.message})
    }
    
})

userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
     let user=await UserModel.find({email});
     try {
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                
                    if(err){
                        throw err
                    }
                    if(result){
                        res.status(200).send({msg:"Login successfull!",token:jwt.sign({userID:user[0]._id},'gupta')})
                }else{
                    res.status(400).send({msg:"Wrong Credentials!"})
                }
            })
        }else{
            res.status(200).send({msg:"please registered first!"})
        }
     } catch (error) {
        res.status(500).send({msg:error.message})

     }
})

userRoute.get("/logout",(req,res)=>{
    let token=req.headers?.authorization?.split(" ")[1];

    redis.set(token,1);
    res.send({msg:"you're loged out!"})
})









module.exports=userRoute;