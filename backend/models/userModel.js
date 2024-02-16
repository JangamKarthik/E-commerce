const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Cannot exceed 30 characters"]
    },
    email:{
        type:String,
        required:[true, "Please provide an email address"],
        unique:true,
        vaildate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        minLength:[8,"Password must be at least 8 characters long"],
        select:false,
    },
    avatar:{
        public_id:{
        type:String,
        required:true
        },
        url:{
        type:String,
        required:true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

module.exports = mongoose.model("User",userSchema);