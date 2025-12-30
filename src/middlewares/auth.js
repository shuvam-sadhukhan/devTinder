const jwt=require('jsonwebtoken');
const UserModel=require('../models/user.js');
const cokieParser=require("cookie-parser");


const userAuth=async(req,res,next)=>{
    try{
    const cookies=req.cookies;
    const {token}=cookies;  
    if(!token){
      return res.status(401).send('Please login');
    }
    const decodedMessage= await jwt.verify(token,"DEV@Tinder$790");
    const {_id}=decodedMessage;
    const user= await UserModel.findOne({_id:_id});
    if(!user){
        throw new Error("user not found");
    }
    req.user=user;
    next();
}catch(e){
    res.status(400).send("Error"+ e.message);
}
}

module.exports=userAuth