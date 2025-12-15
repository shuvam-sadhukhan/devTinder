const express=require('express');
const userAuth=require('../middlewares/auth.js');
const {validateEditProfileData}=require('../Utils/validation.js');


const profileRouter=express.Router();



//geting profile after login

profileRouter.get('/profile/view',userAuth,async(req,res)=>{
  
  const user=req.user;
  res.send(user);
});

// edit profile after login

profileRouter.patch('/profile/edit', userAuth,async(req,res)=>{
  try{
    if(!validateEditProfileData(req)){
      throw new Error('Invalid edit request');
    }

    const loggedInUser=req.user;
    Object.keys(req.body).forEach(e=>loggedInUser[e]=req.body[e]);
    await loggedInUser.save();

    res.send(`${loggedInUser.firstName} your profile updated successfully`);
    

  }catch(e){
    res.status(400).send(e);
  }

})

module.exports=profileRouter    