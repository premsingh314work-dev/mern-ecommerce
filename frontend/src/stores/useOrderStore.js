import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useOrderStore = create((set, get) => ({
  isPlacingOrder: false,
  isLoadingOrders: false,
  lastOrder: null,
  orders: [],

  fetchMyOrders: async () => {
    set({ isLoadingOrders: true });
    try {
      const res = await axiosInstance.get("/orders/my");
      set({ orders: res.data });
    } catch (err) {
      console.log("Error fetching orders", err.message);
    } finally {
      set({ isLoadingOrders: false });
    }
  },

  // payload: { items: [{productId, quantity}], shippingAddress, fromCart }
  placeOrder: async (payload) => {
    set({ isPlacingOrder: true });
    try {
      const res = await axiosInstance.post("/orders", payload);
      set({ lastOrder: res.data });
      toast.success("Order placed successfully!");
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
      console.log("error: ", err.response?.data?.message);
      throw err;
    } finally {
      set({ isPlacingOrder: false });
    }
  },
}));
