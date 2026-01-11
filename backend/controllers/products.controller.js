import productModel from "../models/product.model.js";


export const Get_Products=async (req,res)=>{
    try{
        const products= await productModel.find();
        res.json(products);
    }catch(err){
        res.json({message:err});
    }
}

export const Post_Products=async (req,res)=>{
    try{
        const {seller,productName,price,description,category,stock} = req.body;
        const newProduct = new productModel({seller,productName,price,description,category,stock});
        await newProduct.save();
        res.status(201).json({message:"Product has been created"});
    }
    catch(err){
        res.json({message:err});
    }
}