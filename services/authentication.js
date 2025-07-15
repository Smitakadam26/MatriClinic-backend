const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = process.env.SECRET_API;

function createtoken(user){
    const payload ={
        _id:user._id,
        email:user.email,
        mobileNumber:user.mobileNumber,
    }
    const token = jwt.sign(payload,secret);
    return token;
}

function validationtoken (token) {
    const payload = jwt.verify(token,secret);
    return payload;
}

module.exports=  {
    createtoken,
    validationtoken
}