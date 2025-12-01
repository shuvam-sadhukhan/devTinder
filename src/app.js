const express=require('express');
const app=express();

app.get('/users/:userId/:name/:pass',(req,res)=>{
    console.log(req.params);
    res.send({firstName:"shuvam", lastName:"sad"});
});

app.post('/users',(req,res)=>{
    res.send("data saved to the database");
})

app.listen(3000,()=>{
    console.log("server is successfully running on port: 3000");
});