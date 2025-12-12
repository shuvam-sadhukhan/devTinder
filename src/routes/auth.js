const express=require('express');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const passwordValidate=require('../Utils/validation.js');
const UserModel=require('../models/user.js');

const authRouter=express.Router();


// ADD TO DATABASE
authRouter.post('/signup',async(req,res)=>{
    try{
  const {firstName,lastName,email,password}=req.body;
  passwordValidate(req);
 const passwordHash= await bcrypt.hash(password, 10);

 
   const user=  UserModel({
    firstName,
    lastName,
    email,
    password:passwordHash
   });
   await user.save();
  res.send("added to database");
}catch(e){
    res.status(400).send("couldnot added to database");
}
});



//LOGIN API

authRouter.post('/login',async(req,res)=>{
  try{
  const{email,password}=req.body;
  const user=await UserModel.findOne({email:email});
  if(!user){
    throw new Error("email doesnot match");
  }
  const check= await bcrypt.compare(password,user.password);
  if(check){
    const token= await jwt.sign({_id:user._id}, "DEV@Tinder$790");
    console.log(token);
    res.cookie("token",token);
    res.send("login successful");
  }
  else{
    throw new Error("passoword doesnot match");
  }
}catch(e){
  res.status(400).send("doesnot able to login");
}
  
});

module.exports=authRouter;