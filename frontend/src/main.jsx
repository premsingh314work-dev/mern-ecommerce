import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./components/Universal/AuthContext.jsx";
import { HistoryProvider } from "./components/Universal/HistoryContext.jsx";
import { CartProvider } from "./components/Universal/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <HistoryProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </HistoryProvider>
  </AuthProvider>,
);
