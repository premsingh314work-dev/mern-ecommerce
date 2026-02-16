import React from "react";
import CardCategory from "./Card.Category";
import { CategoryListData } from "../../../data/CategoryList.data";


function Category_List() {

  

  return (
    <div className="w-full ">
      <h1 className="text-3xl text-gray-950 font-semibold w-fit p-2">
        Categories
      </h1>

      {/* ONLY THIS DIV SCROLLS */}
      <div className="w-full overflow-x-auto  ">
        <div className="flex flex-nowrap">
          {CategoryListData.map((elem,index)=>{
              return <CardCategory key={index} categoryName={elem.CategoryName} img={elem.src}  />
          })}
        </div>
      </div>
    </div>
  );
}

export default Category_List;
