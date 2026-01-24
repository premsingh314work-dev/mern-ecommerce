import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./components/Body/ProductPage";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Body from "./components/Body/Body";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-screen">
        <div className="h-[9%]">
          <Navbar />
        </div>
        <div className="h-auto w-screen">
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
