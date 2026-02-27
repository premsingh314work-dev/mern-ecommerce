import mongoose, { Mongoose } from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
          required: true,
          _id:false,
        },
        quantity:{
            type:Number,
            required: true,
            min: [1, 'Quantity cannot be less than 1']
        }
      }
    ],
  },
  { timestamps: true }
);

const cartModel = mongoose.model("Carts", cartSchema);

export default cartModel;
