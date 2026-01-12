import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide a product description'],
        maxlength: [2000, 'Description is too long']
    },
    // Use an array for multiple images;
    // images: [{
    //     public_id: { type: String, required: true },
    //     url: { type: String, required: true }
    // }],
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: [String],
        required: true,
        index: true   
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        default: 0
    },
    // sku: {
    //     type: String, 
    //     required: true,
    //     unique: true
    // },
    ratings: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // Links product to the admin who created it
        required: true
    }
},
{ timestamps: true });


const productModel = mongoose.model('Product', productSchema);

export default productModel;
