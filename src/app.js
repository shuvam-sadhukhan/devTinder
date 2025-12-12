const express=require('express');
const connectDB=require('./config/database.js');
const passwordValidate=require('./Utils/validation.js');


const bcrypt = require('bcrypt');
const UserModel=require('./models/user.js');
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken');
const userAuth=require('./middlewares/auth.js');


const app=express();

app.use(express.json());
app.use(cookieParser());

// ADD TO DATABASE

app.post('/signup',async(req,res)=>{

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
});


//LOGIN API

app.post('/login',async(req,res)=>{
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


//geting profile after login

app.get('/profile',userAuth,async(req,res)=>{
  // const cookies=req.cookies;
  // console.log(cookies);
  // const {token}=cookies;
  // const decodeMessage=await jwt.verify(token,"DEV@Tinder$790");
  
  // const{_id}=decodeMessage;
  // const user=await UserModel.find({_id:_id});
  // console.log(user);
  // res.send(user);
  const user=req.user;
  res.send(user);
});

app.post('/sendConnectionRequest', userAuth,(req,res)=>{
  const user=req.user;
  console.log(user);
  // const {firstName}=user;
  res.send(user.firstName + " "+"is sending conection request");
  
 
})

// FIND FROM DATABASE
app.get('/user',async(req,res)=>{
  const email=req.body.email;
  try{
    const user=await UserModel.find({email:email});
    if(user.length===0){
      res.status(404).send("no matching data found");
    }
    else{
          res.send(user);
    }
   
  }
  catch(e){
    res.status(400).send("error finding the user");
  }
   
});

// FIND FROM DATABASE
app.get('/feed',async(req,res)=>{
  try{
    const user= await UserModel.find({});
    res.send(user);
  }
  catch(e){
    res.status(400).send("error finding the user");
  }
});

// DELETE FROM DATABASE
app.delete('/user',async(req,res)=>{
  const userId= req.body.userId;
  try{
      const user=await UserModel.findByIdAndDelete({_id:userId});
      res.send("user deleted successfully");
  }
  catch(e){
    res.status(400).send("error finding user");
  }
});

// UPDATE TO DATABASE

app.patch('/user',async(req,res)=>{
  const userId= req.body.userId;
  const data=req.body;
  
 try{

    const allowUpdates=["userId","firstName","lastName","password","about","gender"];
  const isUpdateAllowed=Object.keys(data).every(k=>allowUpdates.includes(k));
  if(!isUpdateAllowed){
    throw new Error("update not allowed");
  }
    const user=await UserModel.findByIdAndUpdate({_id:userId},data,{
      runValidators:true
    });
    res.send("updated successfully"); 

  }catch(e){
    res.send("error finding user");
  }
})

//DELETE FROM DATABASE
app.delete('/testdelete',async(req,res)=>{
  const email=req.body.email;
  try{
     const user=await UserModel.findOneAndDelete({email:email});
  res.send("delete successful");
    
  }catch(e){
    res.send("error delete user");
  }
 
})






connectDB().then(()=>{
  console.log('database connected');
  app.listen(3000,()=>{
    console.log("server is successfully running on port: 3000");
});
}).catch(()=>{
 console.log('error connection');
})


