import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      // console.log("checkAuth running");
      const res = await axiosInstance.get("/auth/me");
      set({ authUser: res.data.user });
      // console.log(res);
    } catch (err) {
      console.error("Error in authCheck:", err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
      // console.log("checkAuth ending");
    }
  },

  login: async (formdata) => {
    console.log("login form data:", formdata);

    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", formdata);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
      return res;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      console.log("error: ", err.response?.data?.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  signup: async (formdata) => {
    console.log("signup form data:", formdata);
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", formdata);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
      return res;
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      console.log("error: ", err.response?.data?.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({authUser:null});
      console.log(res);
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
      console.log("error: ", err.response?.data?.message);
    }
  },
}));
