import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CheckCircle2 } from "lucide-react";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // If someone lands here directly (refresh, bookmark, back button),
  // there's no order in state — send them somewhere useful instead of blank.
  if (!order) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#FAFAF9] mx-auto max-w-2xl px-6 py-24 text-center">
          <p className="text-sm text-neutral-500">
            We couldn't find that order. If you just placed one, check your
            orders instead.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Back to home
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAFAF9] mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" strokeWidth={2} />
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-900">
          Order placed
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          Thanks — your order has been confirmed. You'll pay on delivery.
        </p>

        <div className="mt-10 rounded-lg border border-neutral-200 bg-white p-6 text-left">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">Order ID</span>
            <span className="font-medium text-neutral-900">{order._id}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-neutral-500">Status</span>
            <span className="font-medium capitalize text-neutral-900">
              {order.status}
            </span>
          </div>

          <div className="mt-5 divide-y divide-neutral-200 border-t border-neutral-200">
            {order.items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <span className="text-neutral-700">
                  {item.product.productName}{" "}
                  <span className="text-neutral-400">× {item.quantity}</span>
                </span>
                <span className="font-medium text-neutral-900">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4 text-base font-semibold text-neutral-900">
            <span>Total</span>
            <span>₹{order.total.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Continue shopping
          </button>
          <Link
            to="/orders"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900"
          >
            View my orders
          </Link>
        </div>
      </main>
    </>
  );
};

export default OrderConfirmationPage;
