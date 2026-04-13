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
      const currentRecentlyViewedProducts = get().RecentlyViewedProducts;
      await axiosInstance.post(`/products/postrecentlyviewed/${productId}`,);
           
    } catch (err) {
      console.log("error in postRecentlyViewed(redis):", err);
    }
  },
}));
