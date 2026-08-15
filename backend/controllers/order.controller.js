import Order from "../models/order.model.js";
import Product from "../models/product.model.js"; // adjust name/path if yours differs
import Cart from "../models/cart.model.js";

// POST /api/orders
// body: {
//   items: [{ productId, quantity }],
//   shippingAddress: { street, city, state, zipCode, country, phone },
//   fromCart: boolean  // true when checking out from the cart page, so we clear it after
// }
export const placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, fromCart } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items to order" });
    }
    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    // price everything server-side — never trust prices from the client
    const orderItems = [];
    let subtotal = 0;

    for (const { productId, quantity } of items) {
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${productId} not found` });
      }
      if (product.stock < quantity) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${product.productName}` });
      }

      const discount = product.discount_percentage || 0;
      const unitPrice =
        discount > 0
          ? Math.round(product.price * (1 - discount / 100))
          : product.price;

      orderItems.push({ product: product._id, quantity, price: unitPrice });
      subtotal += unitPrice * quantity;

      // decrement stock
      product.stock -= quantity;
      await product.save();
    }

    const shippingCost = subtotal >= 2000 ? 0 : 99;
    const total = subtotal + shippingCost;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      subtotal,
      shipping: shippingCost,
      total,
    });

    if (fromCart) {
      await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    }

    const populatedOrder = await order.populate("items.product");
    res.status(201).json(populatedOrder);
  } catch (error) {
    console.log("Error in placeOrder controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/orders/my
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.log("Error in getMyOrders controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log("Error in getOrderById controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
