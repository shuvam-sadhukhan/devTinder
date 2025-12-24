const express=require('express');
const userAuth=require('../middlewares/auth.js');
const connectionRequestModel=require('../models/connectionRequest.js');
const UserModel=require('../models/user.js');


const requestRouter=express.Router();


 // sending connection request
requestRouter.post('/request/send/:status/:toUserId', userAuth,async(req,res)=>{
  try{
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;
  //satus check
    const allowedStatus=['ignore','interested'];
    if(!allowedStatus.includes(status)){
       return res.status(400).json({message:'invalid status type'})
    } 
    // connection request check
    const search= await connectionRequestModel.findOne({
      $or:[
        {fromUserId:fromUserId, toUserId:toUserId},
        {fromUserId:toUserId, toUserId:fromUserId}
      ]
    });
    if(search){
      return res.status(400).json({message:'connection request already exists'})
    }

    if(toUserId===fromUserId){
      return res.status(400).json({message:'connection request cannot be made'})

    }

    // touserid check in db

    const existToUserId= await UserModel.findById({_id:toUserId});
    if(!existToUserId){
      return res.status(400).json({message:'no user found'});
    }

 // save to database
    const connectionRequest= new connectionRequestModel({
      fromUserId,
      toUserId,
      status
    });
   const data= await connectionRequest.save();
    res.json({message:`${req.user.firstName} is ${status} in ${existToUserId.firstName}`,data:data});

  }catch(e){
    res.status(400).send("error"+e.message);
  }
 
  
 
})


// receieving connection request
requestRouter.post('/request/review/:status/:requestId',userAuth,async(req,res)=>{

  try{
      const loggedInUser=req.user;
      const status=req.params.status;
      const requestId=req.params.requestId;
      const allowedStatus=["accepted","rejected"];

      if(!allowedStatus.includes(status)){
        return res.status(400).json({message:"status not allowed"})
      }
      
      const connectionRequest= await connectionRequestModel.findOne({
        _id:requestId,toUserId:loggedInUser._id, status:'interested'});
        connectionRequest.status=status;
        const data=await connectionRequest.save();

        res.json({message:`${loggedInUser.firstName} ${status} onnection request of `,data:data})

  }catch(e){
    res.status(400).send("error message:"+e.message);
  }
})


module.exports=requestRouter