import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SearchPage from "./pages/SearchPage";
import "./App.css";
import { useAuthStore } from "./stores/useAuthStore.js";
import PageLoader from "./components/PageLoader.jsx";
import { useRvStore } from "./stores/useRvStore.js";
import Footer from "./components/Footer.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import SellerDashboard from "./pages/seller/SellerDashboard.jsx"; // adjust path to match your folder structure
import SellerRoute from "./components/SellerRoute.jsx";

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const { getRecentlyViewed, RecentlyViewedProducts } = useRvStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    getRecentlyViewed();
  }, [getRecentlyViewed]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<SearchPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/seller/dashboard"
          element={
            <SellerRoute>
              <SellerDashboard />
            </SellerRoute>
          }
        />
      </Routes>

      <Footer />
      <Toaster />
    </>
  );
}

export default App;
