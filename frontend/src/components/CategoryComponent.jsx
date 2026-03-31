import React from "react";
import {CategoryListData} from "../data/CategoryList.data"
const CategoryComponent = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-3xl font-semibold tracking-wide">Categories</h3>
      <div className="carousel carousel-end rounded-box gap-3">
        {
            CategoryListData.map((categoryDetail,index)=>{
                return <CategoryCard key={index} categoryDetail={categoryDetail}/>
            })    
        }
      </div>
    </div>
  );
};

const CategoryCard = ({categoryDetail}) => {
  return (
    <div className="card bg-base-100 image-full w-96 shadow-sm carousel-item">
      <figure>
        <img
          src={categoryDetail.src}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{categoryDetail.CategoryName}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryComponent;
