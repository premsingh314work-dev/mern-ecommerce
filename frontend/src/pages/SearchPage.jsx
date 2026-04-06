import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchStore } from "../stores/useSearchStore";
import Navbar from "../components/Navbar";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  const { searchProducts, productList, isSearching, setSearchQuery } = useSearchStore();

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      searchProducts(query);
    }
  }, [query, searchProducts, setSearchQuery]);
  if (isSearching) {
    return <div className="p-10 text-center text-xl">Loading products...</div>;
  }
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-4">
          Search Results for:{" "}
          <span className="text-cyan-500">{query}</span>
        </h2>

        {isSearching ? (
          <div className="text-center">Loading...</div>
        ) : productList && productList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productList.map((product) => (
              <div
                key={product._id}
                className="card bg-white/10 backdrop-blur shadow-lg"
              >
                <figure>
                  <img
                    src={
                      product.images?.[0]?.url ||
                      "https://via.placeholder.com/200"
                    }
                    alt={product.productName}
                    className="w-full h-40 object-cover"
                  />
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title text-sm line-clamp-2">
                    {product.productName}
                  </h3>
                  <p className="text-cyan-400 font-semibold">
                    ${product.price}
                  </p>
                  <p className="text-xs text-gray-400">{product.category}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">No products found.</div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
