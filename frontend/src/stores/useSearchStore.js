import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useSearchStore = create((set, get) => ({
  SearchQuery: "",
  isSearching: false,
  productList: [],
  singleProduct: null,

  setSearchQuery: (query) => {
    set({ SearchQuery: query });
  },
  searchProducts: async (SearchQuery) => {
    try {
      set({ isSearching: true, SearchQuery });
      const res = await axiosInstance.get(`/products?search=${SearchQuery}`);
      // console.log(res.data.data);      
      set({ productList: res.data.data || [] });
      // Navigation will be handled by the Navbar component
    } catch (err) {
      console.log("Search error:", err);
      set({ productList: [] });
    } finally {
      set({ isSearching: false });
    }
  },
  searchProductsById: async (id) => {
    try {
      set({ isSearching: true, singleProduct: null });
      const res = await axiosInstance.get(`/products/${id}`);
      set({ singleProduct: res.data.product || null });
    } catch (err) {
      console.log("Product fetch error:", err);
      set({ singleProduct: null });
    } finally {
      set({ isSearching: false });
    }
  },
}));
