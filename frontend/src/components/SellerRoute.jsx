import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore.js";

// Wrap any route element with this to restrict it to sellers only.
// Assumes authUser has a `role` field (e.g. "buyer" | "seller") — adjust
// the check below if your user object names/values this differently.
function SellerRoute({ children }) {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // accept either "seller" or "Seller" (backends sometimes differ in casing)
  if ((authUser.role || "").toString().toLowerCase() !== "seller") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default SellerRoute;
