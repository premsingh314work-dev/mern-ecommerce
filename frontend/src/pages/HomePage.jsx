import React, { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import Navbar from "../components/Navbar";
import Hero_Banner from "../components/Hero_Banner";

const HomePage = () => {
  const { authUser } = useAuthStore();
  return (<>
    <Navbar/>
    <div className="p-3">
      <Hero_Banner/>
    </div>
  </>
  );
};

export default HomePage;
