import cartModel from "../models/cart.model.js";

export const AddtoCart = async (req, res) => {
  try {
    const userid = req.user._id;
    const { productId, quantity } = req.body.products[0];

    // console.log(userid, productId, quantity);

    let cart = await cartModel.findOne({ userId: userid });
    if (!cart) {
      cart = new cartModel({
        userId: userid,
        products: [{ productId: productId, quantity: quantity }],
      });
    } else {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(201).json({ message: "Product has been added to cart", cart });
  } catch (err) {
    res.json({ message: "Error agya koe" });
    console.log(err);
  }
};
