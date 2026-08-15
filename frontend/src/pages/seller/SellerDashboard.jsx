import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "./SideBar.jsx";
import AddProductForm from "./AddProductForm";

function WelcomeView() {
  return (
    <div className="flex h-full flex-col items-start justify-center rounded-xl border border-neutral-200 bg-white p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
        Overview
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-neutral-900">
        Welcome back
      </h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
        Use the sidebar to add a new product, review existing listings, or check
        on recent orders.
      </p>
    </div>
  );
}

function SellerDashboard() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialView = (params.get("view") || "welcome")
    .toString()
    .toLowerCase();
  const [Activeview, setActiveview] = useState(initialView);

  // keep Activeview in sync with URL query changes
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const v = (p.get("view") || "welcome").toString().toLowerCase();
    setActiveview(v);
  }, [location.search]);

  return (
    <div className="flex h-screen w-screen gap-4 bg-neutral-50 p-4">
      <SideBar Activeview={Activeview} setActiveview={setActiveview} />

      <main className="h-full w-full overflow-y-auto">
        {Activeview === "addproduct" ? <AddProductForm /> : <WelcomeView />}
      </main>
    </div>
  );
}

export default SellerDashboard;
