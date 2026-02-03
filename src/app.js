const express=require('express');
const connectDB=require('./config/database.js');
const http=require("http");

const UserModel=require('./models/user.js');
const cookieParser = require('cookie-parser');

const userAuth=require('./middlewares/auth.js');

const authRouter=require('./routes/auth.js');
const profileRouter=require('./routes/profile.js')
const requestRouter=require('./routes/requests.js');
const userRouter = require('./routes/user.js');
const chatRouter = require('./routes/chat.js');

const cors=require("cors");
const initialSocket = require('./Utils/socket.js');

const app=express();

require("dotenv").config();
const PORT=process.env.PORT || 3000;

app.use(cors({
  origin:["http://localhost:5173","https://codesphere-black.vercel.app/"],
  credentials:true

}));
app.use(express.json());
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);
app.use('/',chatRouter);


const server=http.createServer(app);
initialSocket(server);  



connectDB().then(()=>{
  console.log('database connected');
  server.listen(PORT,()=>{
    console.log("server is successfully running on port:");
});
}).catch((e)=>{
 console.log('error connection'+e);
})


