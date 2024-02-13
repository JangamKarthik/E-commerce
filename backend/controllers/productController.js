const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Product -- Admin route
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    async (req,res,next)=>{
        const product = await Product.create(req.body);
        res.status(201).json({
            success:true,
            product
        })
    }
});

// Get All Products
exports.getAllProducts = async(req,res) => {
    const Products = await Product.find();
    res.status(200).json({
        success:true,
        Products
    })
}

// update Product--Admin
exports.updateProduct = async(req,res,next)=>{
    let product = Product.findById(req.params.id);
    if(!product){
        return res.status(500).json
({
    success:false,
    message:"Product not found"
})    
}

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});

    res.status(200).json({
        success:true,
        product
    })

}

// Delete Product--Admin
exports.deleteProduct = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    })
}

//get product details
exports.getProductDetails = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        success:true,
        product
    })

}