const express=require('express');
const connectDB=require('./config/database.js');

const UserModel=require('./models/user.js');
const cookieParser = require('cookie-parser');

const userAuth=require('./middlewares/auth.js');

const authRouter=require('./routes/auth.js');
const profileRouter=require('./routes/profile.js')
const requestRouter=require('./routes/requests.js');
const userRouter = require('./routes/user.js');
const app=express();

app.use(express.json());
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);









// FIND FROM DATABASE
// app.get('/user',async(req,res)=>{
//   const email=req.body.email;
//   try{
//     const user=await UserModel.find({email:email});
//     if(user.length===0){
//       res.status(404).send("no matching data found");
//     }
//     else{
//           res.send(user);
//     }
   
//   }
//   catch(e){
//     res.status(400).send("error finding the user");
//   }
   
// });

// FIND FROM DATABASE
// app.get('/feed',async(req,res)=>{
//   try{
//     const user= await UserModel.find({});
//     res.send(user);
//   }
//   catch(e){
//     res.status(400).send("error finding the user");
//   }
// });

// DELETE FROM DATABASE
// app.delete('/user',async(req,res)=>{
//   const userId= req.body.userId;
//   try{
//       const user=await UserModel.findByIdAndDelete({_id:userId});
//       res.send("user deleted successfully");
//   }
//   catch(e){
//     res.status(400).send("error finding user");
//   }
// });

// UPDATE TO DATABASE

// app.patch('/user',async(req,res)=>{
//   const userId= req.body.userId;
//   const data=req.body;
  
//  try{

//     const allowUpdates=["userId","firstName","lastName","password","about","gender"];
//   const isUpdateAllowed=Object.keys(data).every(k=>allowUpdates.includes(k));
//   if(!isUpdateAllowed){
//     throw new Error("update not allowed");
//   }
//     const user=await UserModel.findByIdAndUpdate({_id:userId},data,{
//       runValidators:true
//     });
//     res.send("updated successfully"); 

//   }catch(e){
//     res.send("error finding user");
//   }
// })

//DELETE FROM DATABASE
// app.delete('/testdelete',async(req,res)=>{
//   const email=req.body.email;
//   try{
//      const user=await UserModel.findOneAndDelete({email:email});
//   res.send("delete successful");
    
//   }catch(e){
//     res.send("error delete user");
//   }
 
// })






connectDB().then(()=>{
  console.log('database connected');
  app.listen(3000,()=>{
    console.log("server is successfully running on port: 3000");
});
}).catch(()=>{
 console.log('error connection');
})


