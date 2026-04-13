import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },    
    shortDescription: {
      type: String,
      required: [true, "Please provide a short description"],
      maxlength: [1000, "Description is too long"],
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
        _id: false,
      },
    ],
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    discount_percentage: {
      type: Number,
      required: false,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      default: 0,
    },
    modelNo: {
      type: String,
      required: true,
      unique: true, // This is great to have!
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: "User", 
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,      // Changes "  shoes " to "shoes"
        lowercase: true, // Changes "SHOES" to "shoes"
      },
    ],
  },
  { timestamps: true }
);

// Standard index for quick category lookups
productSchema.index({ category: 1 }, { name: "idx_category" });

// UPDATED: The Text Index for your Search Bar
productSchema.index(
  {
    productName: "text",
    shortDescription: "text", 
    category: "text",
    tags: "text", // Now your search bar will look through tags natively!
  },
  { 
    name: "idx_product_search",
    weights: {
      productName: 10,
      tags: 5,
      category: 3,
      shortDescription: 1
    }
  }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;