import React from "react";
import { CategoryListData } from "../data/CategoryList.data";
import { useSearchStore } from "../stores/useSearchStore";
import { useNavigate } from "react-router-dom";

const CategoryComponent = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-3xl font-semibold tracking-wide">Categories</h3>
      <div className="carousel carousel-end rounded-box gap-3">
        {CategoryListData.map((categoryDetail, index) => {
          return <CategoryCard key={index} categoryDetail={categoryDetail} />;
        })}
      </div>
    </div>
  );
};

const CategoryCard = ({ categoryDetail }) => {
  const navigate = useNavigate();
  return (
    <div className="card bg-base-100 image-full w-70 shadow-sm carousel-item group relative">
      <figure>
        <img src={categoryDetail.src} alt="Shoes" />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-xl">{categoryDetail.CategoryName}</h2>

        <div className="opacity-30 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <p>
            Discover top-quality {categoryDetail.CategoryName.toLowerCase()}{" "}
            with great deals and latest trends.
          </p>

          <div className="card-actions justify-end mt-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate(`/products?search=${categoryDetail.CategoryName}`);
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryComponent;
