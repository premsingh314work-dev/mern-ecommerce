import { useState, useEffect } from "react";
import Hero_Banner from "./Banner/Hero_Banner";
import Category_List from "./Catergory/Category";

function Body() {
  return (
    <>
      <div className="p-2 pr-5">
        <Hero_Banner />
        <Category_List />

      <div className="bg-violet-400 h-[40vh]">
        <div className="h-">

        </div>
      </div>

      </div>
    </>
  );
}

export default Body;
