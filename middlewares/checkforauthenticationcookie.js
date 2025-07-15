const {validationtoken} = require('../services/authentication')

function checkforauthenticationcookie (cookieName){
    return(req,res,next) =>{
        const tokencookievalue = req.cookies[cookieName];
        if(!tokencookievalue){
           return  next();
        }
        try{
            const userpayload = validationtoken(tokencookievalue);
            req.user = userpayload;
        }
        catch(error){}
        return next();
    }
}

module.exports = {
    checkforauthenticationcookie
}