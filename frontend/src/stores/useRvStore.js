import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useRvStore = create((set, get) => ({
  RecentlyViewedProducts: [],
  isLoading: true,

  getRecentlyViewed: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/products/getrecentlyviewed");
      set({ RecentlyViewedProducts: res.data });
    } catch (err) {
      console.log("error in getRecentlyViewed(redis):", err);
      set({ RecentlyViewedProducts: [] });
    } finally {
      set({ isLoading: false });
    }
  },
  postRecentlyViewed: async (productId) => {
    try {
      await axiosInstance.post("/products/recently-viewed", { productId });
    } catch (err) {
      console.log("error in postRecentlyViewed(redis):", err);
    }
  },
}));
