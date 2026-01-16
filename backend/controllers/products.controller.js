import productModel from "../models/product.model.js";

export const Get_Products=async (req,res)=>{
    try{
        let {search,limit,category,page} = req.query;
        if(Number(page)<=0) {page=1};
        
        
        const skip = ((page?page:1 )-1)*(limit?limit:10);
        console.log(page,limit,skip);

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
        
        const projection = search ? { score: { $meta: "textScore" } } : {};
        
        const products= await productModel .find(filter, projection).skip(skip).limit(Number(limit)|| 10).sort(sort); 
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