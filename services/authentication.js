const jwt = require("jsonwebtoken");
require('dotenv').config();

function createtoken(user){
    const payload ={
        _id:user._id,
        email:user.email,
        mobileNumber:user.mobileNumber,
    }
    const token = jwt.sign(payload,process.env.SECRET_API);
    return token;
}

function validationtoken (token) {
    const payload = jwt.verify(token,process.env.SECRET_API);
    return payload;
}

module.exports=  {
    createtoken,
    validationtoken
}