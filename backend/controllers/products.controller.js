import productModel from "../models/product.model.js";

export const Get_Products=async (req,res)=>{
    try{
        const {search,limit,category} = req.query;
        // console.log("limit:",limit, " ","search:",search," ","category",category);


        const filter={};
        const sort = {};

        if (search) {
            filter.$text ={$search: search};
            sort.score={$meta:"textScore"};
            // filter.$or = [{ productName: { $regex: search, $options: "i" } },{ category: { $regex: search, $options: "i" } }];
        }
        if(category){
            filter.category = category;
        }
        // console.log(JSON.stringify(filter));
        // console.log(JSON.stringify(sort));
        
        
        
        const products= await productModel.find(filter, search ? { score: { $meta: "textScore" } } : {}).limit(limit).sort(sort).limit(Number(limit) || 10);
        res.json({productsList:products});
    }catch(err){
        res.json({message:err});
    }
}

export const Post_Products=async (req,res)=>{
    try{
        const seller_id = req.user._id;
        // console.log("seller_id:" ,seller_id);
        const {productName,price,description,category,stock} = req.body;
        const newProduct = new productModel({seller:seller_id,productName,price,description,category,stock});
        await newProduct.save();
        res.status(201).json({message:"Product has been created",product:newProduct});
    }
    catch(err){
        res.json({message:err});
    }
}