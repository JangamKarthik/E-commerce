const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

// Registration 
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"test id",
            url:"ProfilePictureURL"
        }
    });

    const token = user.getJWTTOKEN();

    res.status(201).json({
        success:true,
        user,
        token,
    });
});

// User Login

exports.loginUser = catchAsyncErrors (async (req,res,next)=>{

    const {email,password} = req.body;

    //validating user

    if(!email || !password){
        return next(new  ErrorHandler("Please provide email and password",400));
    }

    const user = User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched = user.comparePassword();

    if(!isPasswordMatched){
        return next(new ErrorHnadler("Invalid email or password",401));
    }

    const token = user.getJWTTOKEN();

    res.status(200).json({
        success:true,
        token,
    });

});