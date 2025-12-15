const mongoose=require('mongoose');
const validator = require('validator');
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("invalid password");
            }
        }
    },
    age:{
        type:Number,
    },
    about:{
        type:String,
        default:"hello user"
    },
    gender:{
        type:String,
        validate(value){
          if(!["male","female","others"].includes(value)){
            throw new Error("gender ata not valid");
          }
        }
    },
    skills:{
        type:[String],

    },
   
},{timestamps:true})

const UserModel=mongoose.model("user",userSchema);

module.exports=UserModel