import React from "react";
import { useRvStore } from "../stores/useRvStore";
import { IndianRupee, Star } from "lucide-react";

const RecentlyViewed = () => {
  const { RecentlyViewedProducts ,isLoading} = useRvStore();
  // console.log(RecentlyViewedProducts);

  return (
    <>
      <div className="bg-gray-400/10 flex flex-col gap-3 p-3">
        <h3 className="text-3xl font-semibold tracking-wide">
          Recently Viewed
        </h3>
        {RecentlyViewedProducts.length === 0 && isLoading===false ? (
          <div className="text-gray-500">No recently viewed products yet.</div>
        ) : (
          <div className="carousel carousel-end rounded-box gap-3">
            {RecentlyViewedProducts.map((product) => (
              <RecentlyViewedProd key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
const RecentlyViewedProd = React.memo(({ product }) => {
  return (
    // 1. Main Container: Added group for hover states and fixed width
    <div className="group relative w-50 cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl carousel-item group">
      <figure className="relative m-0 flex aspect-[4/5] flex-col">
        {/* 2. The Image with Hover Zoom */}
        <img
          src={product.images?.[0]?.url || "/placeholder.jpg"}
          alt={product.productName || "Recently viewed product"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* 3. Gradient Protection Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

        {/* 4. Tags (Top Left) - FIXED: Stacked vertically with a max-width */}
        <div className="absolute left-3 top-3 z-10 flex max-w-[55%] flex-col items-start gap-1.5">
          {product.tags?.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="max-w-full truncate rounded-full bg-white/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-sm backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 5. Ratings (Top Right) */}
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{product.ratings || "0.0"}</span>
        </div>

        {/* 6. Content Area (Bottom Left) - Price and Title */}
        <div className="absolute bottom-3 left-3 pr-3 z-10">
          <h4 className="mb-0.5 line-clamp-1 text-xs font-medium text-gray-300">
            {product.productName}
          </h4>

          <h3 className="flex items-center text-lg font-bold text-white">
            <IndianRupee
              className="mr-0.5 h-4 w-4 text-gray-300"
              strokeWidth={2.5}
            />
            <span>{product.price?.toLocaleString("en-IN")}</span>
          </h3>
        </div>
      </figure>
    </div>
  );
});
export default RecentlyViewed;
