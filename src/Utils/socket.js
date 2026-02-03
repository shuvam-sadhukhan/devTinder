 const socket=require("socket.io");
const chatModel = require("../models/chats");



const initialSocket=(server)=>{

  const io=socket(server,{
  cors:{
    origin:["http://localhost:5173","https://codesphere-black.vercel.app/"]
  }
});
io.on("connection",(socket)=>{
    socket.on("joinChat",({firstName,loggedInUser,userId})=>{
        const roomId=[loggedInUser,userId].sort().join("_");
        console.log(firstName+"joined room"+ roomId);
        socket.join(roomId);
        
    });   
    socket.on("sendMessage",async({firstName,loggedInUser,userId, text})=>{
       const roomId=[loggedInUser,userId].sort().join("_");
       console.log(firstName+" "+text);

       //save message to database
       try{
        let chat=await chatModel.findOne({participants: {$all:[userId,loggedInUser]}});

        if(!chat){
          chat=new chatModel({
            participants:[userId,loggedInUser],
            messages:[],
          })
        };
        chat.messages.push({senderId:loggedInUser,text:text});
        await chat.save();
         io.to(roomId).emit("message recieved",{firstName,text})
       


       }catch(e){
        console.log(e);
       }
     
    });
     
    socket.on("disconnect",()=>{});
  
})


}

module.exports=initialSocket