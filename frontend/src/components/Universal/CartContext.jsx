import { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const debounceTimer = useRef(null);
  // This Ref stores the latest "target" quantity to solve state closure issues
  const pendingUpdates = useRef({});

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { withCredentials: true },
      );
      setCart(res.data.cart);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateCartItem = (productId, change) => {
    const targetId = typeof productId === "object" ? productId._id : productId;

    setCart((prevCart) => {
      if (!prevCart) return prevCart;

      const updatedItems = prevCart.items.map((item) => {
        const currentId = (item.productId?._id || item.productId).toString();

        if (currentId === targetId.toString()) {
          const newQty = Math.max(0, item.quantity + change);

          pendingUpdates.current[targetId] = newQty;

          return {
            ...item,
            quantity: newQty,
          };
        }
        return item;
      });

      return {
        ...prevCart,
        items: updatedItems.filter((i) => i.quantity > 0),
      };
    });

    // Debounce Logic
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      const finalQty = pendingUpdates.current[targetId];
      if (finalQty === undefined) return;

      try {
        await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/update`,
          { productId: targetId, quantity: finalQty },
          { withCredentials: true },
        );
        delete pendingUpdates.current[targetId];
      } catch (err) {
        console.error("Sync failed", err);
        fetchCart();
      }
    }, 150);
  };

  const addToCart = async (productId, quantity) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { addtocart: { productId, quantity } },
        { withCredentials: true },
      );
      setCart(res.data.cart);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
};
