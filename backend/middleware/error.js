const ErrorHandler = require("../utils/errorhandler");


module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = ree.message || " Internal Server Error";

    res.status(err.statusCode).json({
        sucess: false,
        message: err.message,
    });
};