function valid(req,res,next){
    const {ipadd}=req.params
    console.log(ipadd)
    let regex=/^([0-9]{4}):([0-9]{3}):([0-9a-z]{4}):([0-9a-z]{4}):[a-z0-9]{4}:([0-9a-z]{4}):([0-9a-z]{4}):([0-9a-z]{4})$}/
   // let regex=/[0-9]{4}/
    console.log(regex.test(JSON.stringify(ipadd)))
    if(regex.test(ipadd)==true){
        next()
    }else{
        res.send({msg:"Wrong ip address"})
    }
}

module.exports=valid;