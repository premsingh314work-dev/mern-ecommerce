import React from "react";
import { Link } from "react-router-dom";
import { Star, IndianRupee, ShoppingCart } from "lucide-react";
import Addtocartbutton from "../../../Universal/Addtocart.button";

function ProductDetail({ product }) {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-1">
        {/* Category tag */}
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 px-2 py-0.5 bg-blue-50 rounded-md w-fit">
          {product.category || "General"}
        </span>

        {/* Product Name */}
        <Link
          to={`/products/${product._id}`}
          state={{ product }}
        >
          <h3 className="text-lg font-bold text-gray-800 hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
            {product.productName}
          </h3>
        </Link>

        {/* Reviews */}
        <div className="flex items-center gap-1.5 mt-1">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(product.ratings || 0) ? "currentColor" : "none"} 
                strokeWidth={1.5} 
              />
            ))}
          </div>
          <span className="text-xs font-medium text-gray-500">
            ({product.numOfReviews || 0})
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        {/* Pricing */}
        <div className="space-y-0.5">
          <div className="flex items-center text-2xl font-black text-gray-900">
            <IndianRupee size={18} strokeWidth={3} />
            <span>{product.price?.toLocaleString("en-IN")}</span>
          </div>
          
          {product.discount_percentage > 0 && (
            <p className="text-xs text-gray-400">
              M.R.P: <span className="line-through">
                ₹{Math.round(product.price / (1 - product.discount_percentage / 100)).toLocaleString("en-IN")}
              </span>
            </p>
          )}
        </div>

        {/* Action Button */}
        <Addtocartbutton ProductToAdd={product._id}/>
        
      </div>
    </div>
  );
}

export default React.memo(ProductDetail);