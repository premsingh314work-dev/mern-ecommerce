import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./components/Body/ProductPage/ProductPage";
import "./App.css";
import MainLayout from "./components/Body/MainLayout";
import HomePage from "./components/Body/HomePage"; 
import SignUpPage from "./components/AuthPages/Signup/SignUpPage";

function App() {
  return (
    <BrowserRouter>

          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/products/:id" element={<ProductPage />} />
            </Route>

            <Route path="/signup" element={<SignUpPage />} />
          </Routes>

    </BrowserRouter>
  );
}

export default App;
