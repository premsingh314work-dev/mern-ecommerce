import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useOrderStore } from "../stores/useOrderStore";

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

const OrdersPage = () => {
  const { orders, isLoadingOrders, fetchMyOrders } = useOrderStore();

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAFAF9] mx-auto max-w-4xl px-6 py-14 sm:px-8 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
          Account
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          My orders
        </h1>

        {isLoadingOrders ? (
          <div className="mt-14 text-center text-sm text-neutral-500">
            Loading your orders…
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-5 rounded-lg border border-neutral-200 bg-white py-20 text-center">
            <p className="text-sm text-neutral-500">
              You haven't placed any orders yet.
            </p>
            <Link
              to="/"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-lg border border-neutral-200 bg-white p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                  <div>
                    <p className="text-xs text-neutral-500">Order ID</p>
                    <p className="text-sm font-medium text-neutral-900">
                      {order._id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">Placed on</p>
                    <p className="text-sm font-medium text-neutral-900">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      STATUS_STYLES[order.status] ||
                      "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-4 divide-y divide-neutral-100">
                  {order.items.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex items-center gap-4 py-3"
                    >
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                        {item.product.images?.[0]?.url && (
                          <img
                            src={item.product.images[0].url}
                            alt={item.product.productName}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-neutral-900">
                            {item.product.productName}
                          </p>
                          <p className="mt-0.5 text-xs text-neutral-500">
                            Qty {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-neutral-900">
                          ₹
                          {(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3 text-sm font-semibold text-neutral-900">
                  <span>Total</span>
                  <span>₹{order.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default OrdersPage;
