const express=require('express');
const connectionRequestModel = require('../models/connectionRequest');
const userAuth = require('../middlewares/auth');
const userRouter=express.Router();

//get all the pending connection requests for loggedin user
userRouter.get('/user/requests/received', userAuth,async(req,res)=>{
   try{
    const loggedInUser=req.user;

    const connectionRequest= await connectionRequestModel.find({toUserId:loggedInUser._id,status:'interested'})
    .populate("fromUserId",['firstName','lastName']);
    res.json({message:'data fetched successfully', data:connectionRequest});
   }catch(e){
    res.status(400).send('error'+e.message);
   }
})


// see the request accepted by whom and i acceot the connection request
userRouter.get('/user/connections', userAuth,async(req,res)=>{
   try{
   loggedInUser=req.user;
   const data= await connectionRequestModel.find({
      $or: [
      {fromUserId:loggedInUser._id, status:'accepted'},
      {toUserId:loggedInUser._id, status:'accepted'},
          ]
}).populate('fromUserId',['firstName','lastName']);
   res.json({message:"see connections accepted", data:data});
   }catch(e){
      res.status(400).send("error"+e.message);
   }
})

module.exports=userRouter;