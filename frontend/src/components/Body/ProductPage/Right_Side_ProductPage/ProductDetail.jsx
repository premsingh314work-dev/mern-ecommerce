import React from "react";
import { Star,IndianRupee } from "lucide-react";
function ProductDetail() {
  return (
    <>
        {/* Product name */}
        <p className="text-lg font-semibold line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem quisquam ut eum veniam et laborum unde temporibus distinctio? Pariatur beatae consequatur optio officia dolorem maiores placeat sit vero! Dolore suscipit enim consequuntur porro aperiam? Repellat sunt consequuntur temporibus qui cum!
        </p>
        {/* review comp */}
        <div className="flex items-center gap-2">
          <span className="text-sm ">4.4</span>
          <span className="flex">
            <Star size={16} className="" color="#FFD700" strokeWidth={1} />
            <Star size={16} className="" color="#FFD700" strokeWidth={1} />
            <Star size={16} className="" color="#FFD700" strokeWidth={1} />
            <Star size={16} className="" color="#FFD700" strokeWidth={1} />
            <Star size={16} className="" color="#FFD700" strokeWidth={1} />
          </span>
        </div>
        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="flex items-center text-2xl font-semibold">
            <IndianRupee size={20} /> 1600
          </p>
        </div>
        {/* add to cart div */}
        <div className="bg-amber-500 px-4 py-2 w-fit rounded-full font-semibold hover:scale-105 transition">
          <button type="button">ADD TO CART</button>
        </div>
    </>
  );
}

export default ProductDetail;
