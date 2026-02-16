// import React, { memo } from "react";
// import { Link } from "react-router-dom";
// import ProductImage from ".//ProductImage";
// import ProductDetail from "./ProductDetail";
// function CardProduct({ product }) {
//   // console.log(product);

//   // console.log("Render: CardProduct", product.productName);

//   return (
//     <>
//       <div className=" h-auto w-full m-1 bg-gray-100 rounded-lg flex flex-row">
//         {/* img div */}
//         <Link
//           to={`/products/${product._id}`}
//           state={{ product }}
//           // target="_blank"
//         >
//           <div className=" bg-red-500 aspect-square w-60 shrink-0 ">
//             <ProductImage src={product.images[0].url} />
//           </div>
//         </Link>
//         {/* product detail div */}
//         <div className="flex-3 p-3 flex flex-col justify-between">
//           <ProductDetail product={product} />
//         </div>
//       </div>
//     </>
//   );
// }

// export default React.memo(CardProduct);

import React from "react";
import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";
import ProductDetail from "./ProductDetail";

function CardProduct({ product }) {
  return (
    <div className="group h-auto w-full mb-4 bg-white border border-gray-100 rounded-xl flex flex-row hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image Section */}
      <Link
        to={`/products/${product._id}`}
        state={{ product }}
        className="relative aspect-square w-48 sm:w-60 shrink-0 bg-gray-50 flex items-center justify-center overflow-hidden border-r border-gray-50"
      >
        <div className="p-4 group-hover:scale-105 transition-transform duration-500 ease-out">
          <ProductImage src={product.images[0].url} />
        </div>
        
        {/* Subtle Discount Badge if available */}
        {product.discount_percentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm">
            {product.discount_percentage}% OFF
          </div>
        )}
      </Link>

      {/* Detail Section */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <ProductDetail product={product} />
      </div>
    </div>
  );
}

export default React.memo(CardProduct);