import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import { addRecentlyViewed, getRecentlyViewed } from "../utils/redis.utils.js";

// Import your Product model
// import Product from '../models/Product.js'; 

export const Get_Products = async (req, res) => {
  try {
    // 1. Grab everything from the URL query
    // Example URL: /products?search=shoes&category=mens&tags=sale,summer&page=2&limit=10
    const { search, category, tags, page, limit } = req.query;

    // 2. Pagination Math (Safely convert strings to numbers)
    const pageNumber = Number(page) > 0 ? Number(page) : 1; // Default to page 1
    const limitNumber = Number(limit) > 0 ? Number(limit) : 10; // Default to 10 items per page
    const skipAmount = (pageNumber - 1) * limitNumber;

    // 3. Build the Database Filter
    const filter = {};
    const sort = {};
    let projection = {};

    // A. Text Search Filter (Requires a text index on your MongoDB schema)
    if (search) {
      filter.$text = { $search: search };
      projection = { score: { $meta: "textScore" } }; // Tell Mongo to grade the match
      sort.score = { $meta: "textScore" }; // Sort by the best match first
    } else {
      // If no search, default to sorting by newest products first
      sort.createdAt = -1; 
    }

    // B. Category Filter
    if (category) {
      filter.category = category;
    }

    // C. Tags Filter (Finds products that have AT LEAST ONE of the requested tags)
    if (tags) {
      // Converts "sale, summer " into ['sale', 'summer']
      const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      filter.tags = { $in: tagsArray };
    }

    // 4. Fetch the Data (Using Promise.all makes these run at the same time for speed)
    const [products, totalProducts] = await Promise.all([
      // Fetch the specific 10 items for the current page
      productModel.find(filter, projection)
        .sort(sort)
        .skip(skipAmount)
        .limit(limitNumber),
      
      // Count HOW MANY total products match this filter in the whole database
      productModel.countDocuments(filter) 
    ]);

    // 5. Calculate total pages for the frontend
    const totalPages = Math.ceil(totalProducts / limitNumber);

    // 6. Send the perfect response back to the frontend
    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        totalProducts,      // e.g., 45
        totalPages,         // e.g., 5
        currentPage: pageNumber, // e.g., 2
        itemsPerPage: limitNumber // e.g., 10
      }
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
    
    const rvPrdouctIDs = await getRecentlyViewed(userId);
    
    res.status(200).json(rvPrdouctIDs);
  } catch (error) {
    console.error("Error adding to recently viewed:", error);
    res
      .status(500)
      .json({ message: "Server error while getting recently viewed item." });
  }
};
