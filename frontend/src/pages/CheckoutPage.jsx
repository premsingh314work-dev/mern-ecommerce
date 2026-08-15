import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";
import { useOrderStore } from "../stores/useOrderStore";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { items: cartItems, fetchCart } = useCartStore();
  const { placeOrder, isPlacingOrder } = useOrderStore();

  // Buy Now sends { product, quantity } via navigate state.
  // If that's absent, this is a cart checkout — use the cart store instead.
  const buyNowPayload = location.state?.product ? location.state : null;
  const isBuyNow = Boolean(buyNowPayload);

  useEffect(() => {
    if (!authUser) {
      navigate("/login", { replace: true });
      return;
    }
    if (!isBuyNow) {
      fetchCart();
    }
  }, [authUser, isBuyNow, fetchCart, navigate]);

  const lineItems = useMemo(() => {
    if (isBuyNow) {
      const { product, quantity } = buyNowPayload;
      return [{ product, quantity }];
    }
    return cartItems;
  }, [isBuyNow, buyNowPayload, cartItems]);

  const getUnitPrice = (product) => {
    const discount = product.discount_percentage || 0;
    const price = product.price ?? 0;
    return discount > 0 ? Math.round(price * (1 - discount / 100)) : price;
  };

  const subtotal = lineItems.reduce(
    (total, item) => total + getUnitPrice(item.product) * item.quantity,
    0,
  );
  const shipping = subtotal === 0 || subtotal >= 2000 ? 0 : 99;
  const total = subtotal + shipping;

  const [address, setAddress] = useState({
    street: authUser?.address?.street || "",
    city: authUser?.address?.city || "",
    state: authUser?.address?.state || "",
    zipCode: authUser?.address?.zipCode || "",
    country: authUser?.address?.country || "",
    phone: authUser?.phone || "",
  });

  const handleAddressChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const isAddressComplete = Object.values(address).every(
    (v) => v.trim() !== "",
  );

  const handlePlaceOrder = async () => {
    if (!isAddressComplete) {
      alert(
        "Please fill in your full shipping address before placing the order.",
      );
      return;
    }

    const payload = {
      items: lineItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      shippingAddress: address,
      fromCart: !isBuyNow,
    };

    try {
      const order = await placeOrder(payload);
      navigate("/order-confirmation", { state: { order } });
    } catch {
      // error toast already handled in the store
    }
  };

  if (lineItems.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#FAFAF9] mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-sm text-neutral-500">
            Nothing to check out. Add something to your cart first.
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAFAF9] mx-auto max-w-5xl px-6 py-14 sm:px-8 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
          Checkout
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          Review and place your order
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1px_0.9fr]">
          {/* Left: address + items */}
          <div className="space-y-8">
            {/* Shipping address */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Shipping address
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  value={address.street}
                  onChange={(e) =>
                    handleAddressChange("street", e.target.value)
                  }
                  placeholder="Street address"
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 sm:col-span-2"
                />
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  placeholder="City"
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
                <input
                  type="text"
                  value={address.state}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                  placeholder="State"
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
                <input
                  type="text"
                  value={address.zipCode}
                  onChange={(e) =>
                    handleAddressChange("zipCode", e.target.value)
                  }
                  placeholder="ZIP / postal code"
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
                <input
                  type="text"
                  value={address.country}
                  onChange={(e) =>
                    handleAddressChange("country", e.target.value)
                  }
                  placeholder="Country"
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
                <input
                  type="tel"
                  value={address.phone}
                  onChange={(e) => handleAddressChange("phone", e.target.value)}
                  placeholder="Phone number"
                  className="rounded-lg border border-neutral-300 p-2.5 text-sm text-neutral-900 outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 sm:col-span-2"
                />
              </div>
            </section>

            {/* Items */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
                {isBuyNow
                  ? "Item"
                  : `${lineItems.length} item${lineItems.length > 1 ? "s" : ""}`}
              </h2>
              <div className="mt-4 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
                {lineItems.map(({ product, quantity }) => (
                  <div key={product._id} className="flex gap-4 p-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                      {product.images?.[0]?.url && (
                        <img
                          src={product.images[0].url}
                          alt={product.productName}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">
                          {product.productName}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-500">
                          Qty {quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-neutral-900">
                        ₹
                        {(getUnitPrice(product) * quantity).toLocaleString(
                          "en-IN",
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Payment method */}
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
                Payment method
              </h2>
              <div className="mt-4 rounded-lg border border-neutral-900 bg-neutral-50 p-4">
                <p className="text-sm font-medium text-neutral-900">
                  Cash on Delivery
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Pay when your order arrives. Card and UPI checkout coming
                  soon.
                </p>
              </div>
            </section>
          </div>

          {/* Divider */}
          <div className="hidden bg-neutral-200 lg:block" />

          {/* Right: summary */}
          <div className="h-fit rounded-lg border border-neutral-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
              Order summary
            </p>

            <div className="mt-5 flex items-center justify-between text-sm text-neutral-600">
              <span>Subtotal</span>
              <span className="font-medium text-neutral-900">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-neutral-600">
              <span>Shipping</span>
              <span className="font-medium text-neutral-900">
                {shipping === 0
                  ? "Free"
                  : `₹${shipping.toLocaleString("en-IN")}`}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-5 text-base font-semibold text-neutral-900">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className={`mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition ${
                isPlacingOrder
                  ? "cursor-not-allowed bg-neutral-300"
                  : "bg-neutral-900 hover:bg-neutral-800"
              }`}
            >
              {isPlacingOrder ? "Placing order…" : "Place order"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default CheckoutPage;
