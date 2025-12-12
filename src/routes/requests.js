const express=require('express');
const userAuth=require('../middlewares/auth.js');

const requestRouter=express.Router();



requestRouter.post('/sendConnectionRequest', userAuth,(req,res)=>{
  const user=req.user;
  console.log(user);
  // const {firstName}=user;
  res.send(user.firstName + " "+"is sending conection request");
  
 
})


module.exports=requestRouter