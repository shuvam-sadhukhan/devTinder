const validator = require('validator');

const passwordValidate=(req)=>{
  const password=req.body.password;
  if(!validator.isStrongPassword(password)){
    throw new Error("password is not strong");
  }
}


const validateEditProfileData=(req)=>{
  allowedEditFields=['firstName','lastName','age','about','skills','gender','photoUrl'];
  
 const isEditAllowed= Object.keys(req.body).every(field=> allowedEditFields.includes(field));
 return isEditAllowed;

}

module.exports={passwordValidate,validateEditProfileData}

