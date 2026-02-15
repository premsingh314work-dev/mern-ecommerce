import React, { memo } from "react";
import { Link } from "react-router-dom";
import ProductImage from ".//ProductImage";
import ProductDetail from "./ProductDetail";
function CardProduct({ product }) {
  // console.log(product);

  // console.log("Render: CardProduct", product.productName);

  return (
    <>
      <Link to={`/products/${product._id}`} state={{ product }} target="_blank" >
        <div className=" h-auto w-full m-1 bg-gray-100 rounded-lg flex flex-row">
          {/* img div */}
          <div className=" bg-red-500 aspect-square w-60 shrink-0 ">
            <ProductImage src={product.images[0].url} />
          </div>
          {/* product detail div */}
          <div className="flex-3 p-3 flex flex-col justify-between">
            <ProductDetail
              productName={product.productName}
              rating={product.rating}
              price={product.price}
            />
          </div>
        </div>
      </Link>
    </>
  );
}

export default React.memo(CardProduct);
