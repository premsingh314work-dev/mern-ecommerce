import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCartStore } from "../stores/useCartStore";

const CartPage = () => {
  const {
    items,
    isLoading,
    fetchCart,
    removeFromCart,
    updateQuantity,
    getSubtotal,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = getSubtotal();
  const shipping = subtotal >= 2000 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
            <p className="mt-1 text-sm text-gray-500">
              Review your items before checkout.
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white py-20">
              <p className="text-sm text-gray-500">Loading your cart…</p>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-gray-200 bg-white py-20 text-center">
              <p className="text-sm text-gray-500">
                Your cart is empty. Browse products and add something you like.
              </p>
              <Link
                to="/"
                className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  {items.map(({ product, quantity }) => {
                    const id = product._id;
                    const discount = product.discount_percentage || 0;
                    const price = product.price ?? 0;
                    const unitPrice =
                      discount > 0
                        ? Math.round(price * (1 - discount / 100))
                        : price;
                    const imageUrl = product.images?.[0]?.url;

                    return (
                      <div
                        key={id}
                        className="flex gap-5 border-b border-gray-100 p-5 last:border-b-0"
                      >
                        {/* Product Image */}
                        <img
                          src={imageUrl}
                          alt={product.productName}
                          className="h-28 w-28 rounded-xl object-cover"
                        />

                        {/* Product Info */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex justify-between gap-4">
                            <div>
                              <h2 className="font-semibold text-gray-900">
                                {product.productName}
                              </h2>

                              <p className="mt-1 text-sm text-gray-500">
                                ₹{unitPrice.toLocaleString("en-IN")}
                              </p>
                            </div>

                            <button
                              onClick={() => removeFromCart(id)}
                              className="text-sm text-red-500 transition hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>

                          {/* Quantity */}
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                              <button
                                onClick={() => updateQuantity(id, quantity - 1)}
                                className="flex h-9 w-9 items-center justify-center text-lg text-gray-600 hover:bg-gray-50"
                              >
                                −
                              </button>

                              <span className="flex h-9 w-10 items-center justify-center border-x border-gray-200 text-sm font-medium">
                                {quantity}
                              </span>

                              <button
                                onClick={() =>
                                  updateQuantity(
                                    id,
                                    Math.min(product.stock || 99, quantity + 1),
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center text-lg text-gray-600 hover:bg-gray-50"
                              >
                                +
                              </button>
                            </div>

                            <p className="font-semibold text-gray-900">
                              ₹{(unitPrice * quantity).toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Continue Shopping */}
                <Link
                  to="/"
                  className="mt-5 inline-block text-sm font-medium text-gray-600 hover:text-black"
                >
                  ← Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div>
                <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white p-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Order Summary
                  </h2>

                  <div className="mt-6 space-y-4 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0
                          ? "Free"
                          : `₹${shipping.toLocaleString("en-IN")}`}
                      </span>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex justify-between text-lg font-semibold text-gray-900">
                        <span>Total</span>
                        <span>₹{total.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mt-6 flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-black"
                    />

                    <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200">
                      Apply
                    </button>
                  </div>

                  {/* Checkout */}
                  <button className="mt-6 w-full rounded-xl bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800">
                    Proceed to Checkout
                  </button>

                  <p className="mt-4 text-center text-xs text-gray-400">
                    Secure checkout · Free returns
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
