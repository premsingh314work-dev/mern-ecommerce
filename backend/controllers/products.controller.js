import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import redisClient from "../lib/redisClient.js.js";

export const Get_Products = async (req, res) => {
  try {
    let { search, limit, category, page } = req.query;
    if (Number(page) <= 0) {
      page = 1;
    }

    const skip = ((page ? page : 1) - 1) * (limit ? limit : 10);
    // console.log(page,limit,skip, prodid);

    const filter = {};
    const sort = {};

    if (search) {
      filter.$text = { $search: search };
      sort.score = { $meta: "textScore" };
      // filter.$or = [{ productName: { $regex: search, $options: "i" } },{ category: { $regex: search, $options: "i" } }];
    }
    if (category) {
      filter.category = category;
    }

    const projection = search ? { score: { $meta: "textScore" } } : {};

    let products = await productModel
      .find()
      .find(filter, projection)
      .skip(skip)
      .limit(Number(limit) || 10)
      .sort(sort);
    res.json({
      productsList: products,
      page,
      limit,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: err.message,
    });
  }
};

export const Get_singleProduct = async (req, res) => {
  try {
    const { prodid } = req.params;

    if (!prodid) {
      return res.status(400).json({ message: "prodid is required" });
    }

    const product = await productModel.findById(prodid);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product: product });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const Post_Products = async (req, res) => {
  try {
    console.log("Post request hited");

    const seller_id = req.user._id;
    // console.log("seller_id:" ,seller_id);
    const {
      productName,
      price,
      description,
      modelNo,
      category,
      stock,
      images,
      discount_percentage,
    } = req.body;
    const newProduct = new productModel({
      seller: seller_id,
      productName,
      modelNo,
      price,
      description,
      category,
      stock,
      images,
      discount_percentage,
    });
    await newProduct.save();
    console.log(newProduct);

    res
      .status(201)
      .json({ message: "Product has been created", product: newProduct });
  } catch (err) {
    console.log("Mongoose Error:", err);
    res.status(400).json({
      message: "Validation Failed",
      error: err.message,
    });
  }
};

export const trackRecentlyViewed = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;
    const redisKey = `recently_viewed:${userId}`;
    const timestamp = Date.now();
    // 1. Add to sorted set
    await redisClient.zAdd(redisKey, [{ score: timestamp, value: productId }]);

    // 2. Cap the list at 15 items (remove oldest)
    await redisClient.zRemRangeByRank(redisKey, 0, -16);

    res.status(200).json({ message: "Product tracked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Controller to Fetch the List
export const getRecentlyViewed = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const redisKey = `recently_viewed:${userId}`;

    // Get IDs from Redis, newest first
    const productIds = await redisClient.zRevRange(redisKey, 0, -1);

    if (productIds.length === 0) {
      return res.status(200).json([]);
    }

    // Fetch actual product details from MongoDB
    const products = await productModel.find({ _id: { $in: productIds } });

    // CRITICAL: MongoDB doesn't maintain the Redis sorting order.
    // We must map the MongoDB results back to the sorted order of productIds.
    const sortedProducts = productIds
      .map((id) => products.find((p) => p._id.toString() === id))
      .filter((p) => p !== undefined); // filter out any nulls just in case

    res.status(200).json(sortedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
