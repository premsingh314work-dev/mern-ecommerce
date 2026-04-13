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
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer/>

      <Toaster />
    </>
  );
}

export default App;
