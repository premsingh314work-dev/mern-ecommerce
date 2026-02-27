import cartModel from "../models/cart.model.js";

export const AddtoCart = async (req, res) => {
  try {
    const userid = req.user._id;
    const { productId, quantity } = req.body.addtocart;
    // console.log("prodid:", productId);
    let cart = await cartModel.findOne({ userId: userid });
    if (!cart) {
      cart = new cartModel({
        userId: userid,
        items: [{ productId: productId, quantity: quantity }],
      });
    } else {
      const productIndex = cart.items.findIndex(
        (p) => p.productId.toString() == productId,
      );
      console.log(productIndex);
      if (productIndex > -1) {
        cart.items[productIndex].quantity=quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }
    await cart.save();
    res.status(201).json({ message: "Product has been added to cart", cart });
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
};

export const Get_Cart = async (req, res) => {
  const userId = req.user._id;
  let cart = await cartModel.findOne({ userId }).populate("items.productId");
  if (!cart) [res.json({ message: "Cart is empty", cart: {} })];
  res.json({ message: `Cart of user ${userId}`, cart });
};


export const updateCartQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  let cart = await cartModel.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const productIndex = cart.items.findIndex(p => p.productId.toString() === productId);

  if (productIndex > -1) {
    if (quantity <= 0) {
      cart.items.splice(productIndex, 1); // Remove item
    } else {
      cart.items[productIndex].quantity = quantity; // Set absolute quantity
    }
    await cart.save();
  }
  
  res.status(200).json({ cart });
};