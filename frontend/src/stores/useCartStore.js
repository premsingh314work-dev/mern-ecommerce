import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const updateTimers = {}; // productId -> timeout handle, lives outside the store

export const useCartStore = create((set, get) => ({
  items: [], // [{ product, quantity }] — product is the populated product doc
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/cart");
      set({ items: res.data.items, isLoading: false });
    } catch (error) {
      console.log("Error fetching cart", error.message);
      set({ isLoading: false });
    }
  },

  addToCart: async (product, quantity = 1) => {
    const productId = product._id || product.id;
    try {
      const res = await axiosInstance.post("/cart", { productId, quantity });
      set({ items: res.data.items });
    } catch (error) {
      console.log("Error adding to cart", error.message);
    }
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    // update the UI immediately so clicks feel instant
    set({
      items: get().items.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item,
      ),
    });

    // debounce the actual network write per product, so rapid +/- clicks
    // only send one request ~400ms after the user stops clicking
    clearTimeout(updateTimers[productId]);
    updateTimers[productId] = setTimeout(async () => {
      try {
        const res = await axiosInstance.put(`/cart/${productId}`, {
          quantity:
            get().items.find((i) => i.product._id === productId)?.quantity ??
            quantity,
        });
        // console.log("api send");
        set({ items: res.data.items });
      } catch (error) {
        console.log("Error updating quantity", error.message);
        get().fetchCart(); // resync on failure
      }
    }, 400);
  },

  removeFromCart: async (productId) => {
    const previousItems = get().items;
    set({
      items: previousItems.filter((item) => item.product._id !== productId),
    });
    try {
      const res = await axiosInstance.delete(`/cart/${productId}`);
      set({ items: res.data.items });
    } catch (error) {
      console.log("Error removing from cart", error.message);
      set({ items: previousItems }); // roll back on failure
    }
  },

  clearCart: async () => {
    try {
      await axiosInstance.delete("/cart");
      set({ items: [] });
    } catch (error) {
      console.log("Error clearing cart", error.message);
    }
  },

  getItemCount: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  getSubtotal: () =>
    get().items.reduce((total, item) => {
      const discount = item.product.discount_percentage || 0;
      const price = item.product.price ?? 0;
      const unitPrice =
        discount > 0 ? Math.round(price * (1 - discount / 100)) : price;
      return total + unitPrice * item.quantity;
    }, 0),
}));
