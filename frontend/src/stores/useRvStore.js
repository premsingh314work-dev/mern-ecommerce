import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useRvStore = create((set, get) => ({
  RecentlyViewedProducts: [],
  isLoading: true,
  hasFetchedInitial: false,

  getRecentlyViewed: async () => {
    if (get().hasFetchedInitial) return;
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/products/getrecentlyviewed");
      set({
        RecentlyViewedProducts: res.data,
        hasFetchedInitial: true,
      });
    } catch (err) {
      console.log("error in getRecentlyViewed(redis):", err);
      set({ RecentlyViewedProducts: [] });
    } finally {
      set({ isLoading: false });
    }
  },
  postRecentlyViewed: async (product) => {

    const rvproductdata = {
      _id: product._id,
      images: product.images,
      price: product.price,
      ratings: product.ratings,
      tags: product.tags,
    };
    // console.log(rvproductdata);

    try {
      await axiosInstance.post(
        `/products/postrecentlyviewed/${rvproductdata._id}`,
      );
      const currentList = get().RecentlyViewedProducts;
      const filteredList = currentList.filter(
        (p) => p._id !== rvproductdata._id,
      );
      filteredList.unshift(rvproductdata);
      const updatedList = filteredList.slice(0, 10);
      set({ RecentlyViewedProducts: updatedList });
    } catch (err) {
      console.log("error in postRecentlyViewed(redis):", err);
    }
  },
}));
