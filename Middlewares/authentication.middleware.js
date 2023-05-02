const redis = require("../redis");
const jwt=require("jsonwebtoken")
async function authentication(req,res,next){
    let token=req.headers?.authorization?.split(" ")[1];
    
    if(await redis.get(token)){
        //console.log(redis.get(token))
        res.send({msg:"Please login again!"})
    }
    else if(token){
        let decoded=jwt.verify(token,'gupta');
        if(decoded.userID){
            req.body.userID=decoded.userID;
            next()
        }else{
            res.send({msg:"please login!"})
        }
    }else{
        res.send({msg:"please login!"})
    }
}
module.exports=authentication