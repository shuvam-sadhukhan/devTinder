const chatModel = require("../models/chats");
const userAuth=require('../middlewares/auth.js');

const express=require('express');
const chatRouter=express.Router();

chatRouter.get('/chat/:userId',userAuth,async(req,res)=>{

         const {userId}=req.params;
         const loggedInUser=req.user._id;
         try{
         const chat=await chatModel.findOne({participants:{$all:[userId,loggedInUser]}})
         .populate("messages.senderId",["firstName","lastName"])
         if(!chat){
            chat=new chatModel({
                participants:[userId,loggedInUser],
                messages:[]
            });
            await chat.save();
         }
         res.json(chat);
         
         }catch(e){
            console.log(e);
         }

})


module.exports=chatRouter;