import React from "react";
import { Link } from "react-router-dom";
import ProductImage from "../ProductPage/Right_Side_ProductPage/ProductImage";
import { IndianRupee, Star } from "lucide-react";

function SmallProductCards({ product }) {
  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow ">
      {/* Image Section - Stacked on top */}
      <Link
        to={`/products/${product._id}`}
        state={{ product }}
        className="relative aspect-square w-full bg-gray-50 flex items-center justify-center p-3"
      >
        <ProductImage src={product.images[0]?.url} h={16} />
        
        {product.discount_percentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
            {product.discount_percentage}% OFF
          </div>
        )}
      </Link>

      {/* Info Section */}
      <div className="p-3 flex flex-col grow justify-between gap-1">
        <div>
          <h3 className="text-sm font-medium text-gray-800 min-h-10 line-clamp-1 leading-snug">
            {product.productName}
          </h3>
          
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[10px] font-bold text-gray-600">{product.ratings || 0}</span>
            <Star size={10} fill="#FFD700" color="#FFD700" />
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-center text-lg font-bold text-gray-900">
            <IndianRupee size={14} strokeWidth={3} />
            <span>{product.price?.toLocaleString("en-IN")}</span>
          </div>
          {product.discount_percentage > 0 && (
            <p className="text-[10px] text-gray-400 line-through">
              ₹{Math.round(product.price / (1 - product.discount_percentage / 100))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(SmallProductCards);