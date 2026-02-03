const mongoose = require('mongoose');


const connectDB= async()=>{
    // await mongoose.connect('mongodb://localhost:27017/devTinder');
    // await mongoose.connect('mongodb+srv://Nodejs:chandan@nodejsproject.rlyg2vp.mongodb.net/devTinder')
//    await mongoose.connect(process.env.DB_CONNECTION);
  
   await mongoose.connect(process.env.MONGO_URI,{
  family:4});
    }


module.exports=connectDB;
