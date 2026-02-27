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
        { withCredentials: true }
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
    // 1. OPTIMISTIC UPDATE: Change state immediately for the UI
    setCart((prevCart) => {
      if (!prevCart) return prevCart;

      const updatedItems = prevCart.items.map((item) => {
        // Handle both populated objects and raw ID strings
        const currentId = item.productId._id || item.productId;
        
        if (currentId === productId) {
          const newQty = Math.max(0, item.quantity + change);
          // Store the latest target quantity in the Ref for the API call
          pendingUpdates.current[productId] = newQty;
          return { ...item, quantity: newQty };
        }
        return item;
      });

      return { 
        ...prevCart, 
        items: updatedItems.filter((i) => i.quantity > 0) 
      };
    });

    // 2. DEBOUNCE LOGIC: Wait 1 second after last click before hitting API
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      const finalQty = pendingUpdates.current[productId];
      
      // If finalQty is undefined (already handled) or shouldn't sync, return
      if (finalQty === undefined) return;

      try {
        await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/update`,
          { productId, quantity: finalQty }, 
          { withCredentials: true }
        );
        // Clean up the ref after successful sync
        delete pendingUpdates.current[productId];
      } catch (err) {
        console.error("Failed to sync with DB, rolling back...", err);
        fetchCart(); // Re-fetch actual DB state if sync fails
      }
    }, 1000); 
  };

  const addToCart = async (productId, quantity) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { addtocart: { productId, quantity } },
        { withCredentials: true }
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