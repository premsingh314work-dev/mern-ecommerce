import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const fetchMe = async () => {
    try {
      const res = await axios.get(`${Backend_url}/api/user/me`, {
        withCredentials: true,
      });
      setUser(res.data.user);
      // console.log(res.data.user);
    } catch (err) {
      console.log("Critical Auth Error: " ,err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
