import React from "react";
import { useRvStore } from "../stores/useRvStore";
import { IndianRupee, Star } from "lucide-react";

const RecentlyViewed = () => {
  const { RecentlyViewedProducts } = useRvStore();
  // console.log(RecentlyViewedProducts);

  return (
    <>
      <div>
        <h3 className="text-3xl font-semibold tracking-wide">
          Recently Viewed
        </h3>
      </div>
      {RecentlyViewedProducts.length === 0 ? (
        <div className="text-gray-500">No recently viewed products yet.</div>
      ) : (
        <div className="flex gap-5 flex-wrap h-50">
          {RecentlyViewedProducts.map((product) => (
            // <h1>{product}</h1>
            <RecentlyViewedProd key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};
const RecentlyViewedProd = ({ product }) => {
  return (
    // 1. Main Container: Added group for hover states and fixed width
    <div className="group relative w-40 cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl">
      <figure className="relative m-0 flex aspect-[4/5] flex-col">
        {/* 2. The Image with Hover Zoom */}
        <img
          src={product.images?.[0]?.url || "/placeholder.jpg"}
          alt={product.productName || "Recently viewed product"}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* 3. Gradient Protection Layer (Crucial for readable text!) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

        {/* 4. Tags (Top Left) - Frosted Glass Effect & Crash-Proofing */}

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.tags?.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-sm backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 5. Ratings (Top Right) - Better placement so it doesn't overlap tags */}
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span>{product.ratings || "0.0"}</span>
          </div>

        {/* 6. Content Area (Bottom Left) - Price and Title */}
        <div className="absolute bottom-4 left-4 pr-4">
          {/* I added the product name here, as modern cards usually need context */}
          <h4 className="mb-1 line-clamp-1 text-sm font-medium text-gray-300">
            {product.productName}
          </h4>

          <h3 className="flex items-center text-2xl font-bold text-white">
            <IndianRupee
              className="mr-0.5 h-6 w-6 text-gray-300"
              strokeWidth={2.5}
            />
            <span>{product.price?.toLocaleString("en-IN")}</span>
          </h3>
        </div>
      </figure>
    </div>
  );
};
export default RecentlyViewed;
