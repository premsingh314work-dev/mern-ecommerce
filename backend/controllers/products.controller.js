import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import { addRecentlyViewed, getRecentlyViewed } from "../utils/redis.utils.js";

// Import your Product model
// import Product from '../models/Product.js';

export const Get_Products = async (req, res) => {
  try {

    const { search, category, tags, page, limit } = req.query;

    const pageNumber = Number(page) > 0 ? Number(page) : 1;
    const limitNumber = Number(limit) > 0 ? Number(limit) : 10; 
    const skipAmount = (pageNumber - 1) * limitNumber;


    const filter = {};
    const sort = {};
    let projection = {};


    if (search) {
      filter.$text = { $search: search };
      projection = { score: { $meta: "textScore" } }; 
      sort.score = { $meta: "textScore" }; 
    } else {

      sort.createdAt = -1;
    }


    if (category) {
      filter.category = category;
    }


    if (tags) {

      const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
      filter.tags = { $in: tagsArray };
    }

    const [products, totalProducts] = await Promise.all([

      productModel
        .find(filter, projection)
        .sort(sort)
        .skip(skipAmount)
        .limit(limitNumber),

      productModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalProducts / limitNumber);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        totalProducts, 
        totalPages, 
        currentPage: pageNumber, 
        itemsPerPage: limitNumber, 
      },
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
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

export const addProductToRecentlyViewed = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user._id;
    await addRecentlyViewed(userId, itemId);
    res
      .status(201)
      .json({ message: `Product added in recently viewed ${itemId}` });
  } catch (error) {
    console.error("Error adding to recently viewed:", error);
    res
      .status(500)
      .json({ message: "Server error while saving recently viewed item." });
  }
};
export const getRecentlyViewedProducts = async (req, res) => {
  try {
    const userId = req.user._id;

    const rvProductIDs = await getRecentlyViewed(userId);
    if (!rvProductIDs || rvProductIDs.length === 0) {
      return res.status(200).json([]);
    }
    const rvproducts = await productModel
      .find({
        _id: { $in: rvProductIDs },
      })
      .select("name images tags reviews price ratings");
    const correctlyOrderedProducts = rvProductIDs
      .map((id) => {
        // Find the specific product that matches the current ID in the Redis loop
        return rvproducts.find((product) => product._id.toString() === id);
      })
      .filter((product) => product !== undefined);
    res.status(200).json(correctlyOrderedProducts);
  } catch (error) {
    console.error("Error adding to recently viewed:", error);
    res
      .status(500)
      .json({ message: "Server error while getting recently viewed item." });
  }
};
