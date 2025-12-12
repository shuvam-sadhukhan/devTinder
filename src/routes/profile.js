const express=require('express');
const userAuth=require('../middlewares/auth.js');

const profileRouter=express.Router();



//geting profile after login

profileRouter.get('/profile',userAuth,async(req,res)=>{
  
  const user=req.user;
  res.send(user);
});

module.exports=profileRouter    