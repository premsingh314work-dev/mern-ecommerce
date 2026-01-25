import React from "react";
import ProductImage from ".//ProductImage";
import ProductDetail from "./ProductDetail";
function CardProduct() {
  return (
    <>
      <div className=" h-fit w-full m-1 bg-gray-500 rounded-lg flex flex-row">
        {/* img div */}
        <div className=" bg-red-500 flex-1 ">
          <ProductImage />
        </div>
        {/* product detail div */}
        <div className="bg-pink-400 flex-3 p-3 flex flex-col justify-between">
          <ProductDetail />
        </div>
      </div>
    </>
  );
}

export default CardProduct;
