import React, { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import Navbar from "../components/Navbar";
import Hero_Banner from "../components/Hero_Banner";
import CategoryComponent from "../components/CategoryComponent";
import RecentlyViewed from "../components/RecentlyViewed";

const HomePage = () => {
  const { authUser } = useAuthStore();
  return (<>
    <Navbar/>
    <div className="p-3 flex flex-col gap-5">
      <Hero_Banner/>
      
      <CategoryComponent/>
      <RecentlyViewed/>
    </div>
  </>
  );
};

export default HomePage;
