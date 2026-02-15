import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./components/Body/ProductPage/ProductPage";
import "./App.css";
import MainLayout from "./components/Body/MainLayout";
import HomePage from "./components/Body/HomePage";
import SignUpPage from "./components/AuthPages/Signup/SignUpPage";
import LoginPage from "./components/AuthPages/Login/LoginPage";
import SingleProduct from "./components/Body/SingleProduct/SingleProduct";
import SellerDashboard from "./components/Body/SellerDashboar_Page/SellerDashboard";
import ProtectedRoute from "./components/Universal/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:prodid" element={<SingleProduct />} />
        </Route>
        
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["Seller"]} />}>
          <Route path="/sellerdashboard" element={<SellerDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["Admin"]}/> }>
          <Route path="/admindashboard" element={<> </>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
