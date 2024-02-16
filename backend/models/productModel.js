const { kMaxLength } = require("buffer");
const mongoose = require("mongoose");
const { type } = require("os");


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter the product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please provide a Description for this Product"]
    },
    price:{
        type:Number,
        required:[true,"Please enter the  Price of the Product"],
        maxLength:[8,"Price of product cannot exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
            type:String,
            required:true
            },
            url:{
            type:String,
            required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter the Product Category"]
    },
    Stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[3,"Stock cannot exceed 999 quantity"],
        default:1
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product",productSchema);