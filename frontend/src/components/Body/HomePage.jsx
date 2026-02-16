import { useState, useEffect } from "react";
import Hero_Banner from "./Banner/Hero_Banner";
import Category_List from "./Catergory/Category";
import BestSeller from "./LandingPageComps/BestSeller";
import RecentlyViewed from "./LandingPageComps/RecentlyViewed";
// import ScrollableDiv from "../Universal/Scrollable_div";

function HomePage() {
  return (
    <>
      <div className="p-2 gap-5 flex flex-col bg-gray-100">
        <div>
          <Hero_Banner />
          <Category_List />
        </div>

        <div className="h-auto p-1">
          
          <RecentlyViewed/>
          <BestSeller/> 
          <>
            <div className="text-center p-10">
              <h1 className="text-7xl font-semibold ">FOOTER AEGA YAHA</h1>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default HomePage;
