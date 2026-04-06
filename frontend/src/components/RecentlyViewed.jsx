import React from "react";
import { useRvStore } from "../stores/useRvStore";

const RecentlyViewed = () => {
  const { RecentlyViewedProducts } = useRvStore();

  return (
    <>
      <div>
        <h3 className="text-3xl font-semibold tracking-wide">Recently Viewed</h3>
      </div>
      {RecentlyViewedProducts.length === 0 ? (
        <div className="text-gray-500">No recently viewed products yet.</div>
      ) : (
        <div className="flex gap-5 flex-wrap">
          {RecentlyViewedProducts.map((product) => (
            <RecentlyViewedProd key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

const RecentlyViewedProd = ({ product }) => {
  return (
    <div className="card bg-gray-300/50 w-40 shadow-sm card-xs">
      <figure className="flex flex-col relative">
        {/* TAGS */}
        <div className="flex gap-1 justify-start items-center absolute left-0 top-0">
          <div className="badge bg-sky-500 badge-outline badge-sm">Fashion</div>
          <div className="bg-sky-500 badge badge-outline badge-sm">Products</div>
        </div>

        <img
          src={product.images?.[0]?.url || "https://via.placeholder.com/160"}
          alt={product.productName || "Recently viewed product"}
          className="rounded-xl"
        />
      </figure>
      <div className="p-2">
        <h4 className="text-sm font-medium truncate">{product.productName}</h4>
      </div>
    </div>
  );
};
export default RecentlyViewed;
