const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = ree.message || " Internal Server Error";

    //handling wrong ID errors in MongoDB
if(err.name==="CastError"){
    const message = 'Resource not found ${err.path}';
    err = new ErrorHandler(message,400);
}


    res.status(err.statusCode).json({
        sucess: false,
        message: err.message,
    });
};