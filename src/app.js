const express=require('express');
const connectDB=require('./config/database.js');
const UserModel=require('./models/user.js');

const app=express();

app.use(express.json());

app.post('/signup',async(req,res)=>{
   const user=  UserModel(req.body);
   await user.save();
  res.send("added to database");
});

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


app.get('/feed',async(req,res)=>{
  try{
    const user= await UserModel.find({});
    res.send(user);
  }
  catch(e){
    res.status(400).send("error finding the user");
  }
});


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


app.patch('/user',(req,res)=>{

})





connectDB().then(()=>{
  console.log('database connected');
  app.listen(3000,()=>{
    console.log("server is successfully running on port: 3000");
});
}).catch(()=>{
 console.log('error connection');
})


