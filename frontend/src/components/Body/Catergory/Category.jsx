import React from "react";
import CardCategory from "./Card.Category";
function Category_List() {
  return (
    <div className="w-full ">
      <h1 className="text-3xl text-gray-950 font-semibold w-fit p-2">
        Categories
      </h1>

      {/* ONLY THIS DIV SCROLLS */}
      <div className="w-full overflow-x-auto  ">
        <div className="flex flex-nowrap">
          <CardCategory/>
          <CardCategory/>
          <CardCategory/>
          <CardCategory/>
          <CardCategory/>
          <CardCategory/>
          <CardCategory/>
        </div>
      </div>
    </div>
  );
}

export default Category_List;
