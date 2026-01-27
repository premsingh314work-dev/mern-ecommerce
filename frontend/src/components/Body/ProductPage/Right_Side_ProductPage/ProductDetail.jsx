import React from "react";
import { Star,IndianRupee } from "lucide-react";
function ProductDetail(props) {
    console.log("Render: ProductDetail");

  return (
    <>
      <div>

      
        {/* Product name */}
        <p className="text-lg font-semibold line-clamp-2">
            {props.productName}
        </p>
        {/* review comp */}
        <div className="flex items-center gap-2">
          <span className="text-sm ">{props.rating}</span>
          <span className="flex">
            <Star size={16} className="" color="#FFD700" strokeWidth={1} />
            <Star size={16} className="" color="#FFD700" strokeWidth={1} />
            <Star size={16} className="" color="#FFD700" strokeWidth={1} />
            <Star size={16} className="" color="#FFD700" strokeWidth={1} />
            <Star size={16} className="" color="#FFD700" strokeWidth={1} />
          </span>
        </div>
        </div>
        <div>
        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="flex items-center text-2xl font-semibold">
            <IndianRupee size={20} /> {props.price}
          </p>
        </div>
        {/* add to cart div */}
        <div className="bg-amber-500 px-4 py-2 w-fit rounded-full font-semibold hover:scale-105 transition">
          <button type="button">ADD TO CART</button>
        </div>
        </div>
    </>
  );
}

export default ProductDetail;
