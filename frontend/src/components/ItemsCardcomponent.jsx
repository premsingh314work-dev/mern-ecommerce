import React from "react";
import { useRvStore } from "../stores/useRvStore";
import { useNavigate } from "react-router-dom";
const ItemsCardcomponent = React.memo(({ product }) => {
  const { postRecentlyViewed } = useRvStore();
  const navigate = useNavigate();
  const imageUrl =
    product.images?.[0]?.url || "https://via.placeholder.com/200";
  return (
    <div
      className="card bg-white/10 backdrop-blur shadow-lg transition hover:scale-105"
      onClick={async () => {
        await postRecentlyViewed(product);
        navigate(`/product/${product._id}`);
      }}
    >
      <figure>
        <img
          src={imageUrl}
          alt={product.productName}
          loading="lazy"
          className="w-full h-40 object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title text-sm line-clamp-2">
          {product.productName}
        </h3>
        <p className="text-cyan-400 font-semibold">₹{product.price}</p>
        <p className="text-xs text-gray-400">{product.category}</p>
      </div>
    </div>
  );
});

export default ItemsCardcomponent;
