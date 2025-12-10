const validator = require('validator');

const passwordValidate=(req)=>{
  const password=req.body.password;
  if(!validator.isStrongPassword(password)){
    throw new Error("password is not strong");
  }
}

module.exports=passwordValidate

