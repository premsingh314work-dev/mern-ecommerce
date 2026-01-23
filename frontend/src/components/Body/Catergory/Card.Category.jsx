import React from "react";

function CardCategory(props) {
  return (
    <div className="shrink-0 basis-1/6 p-2 text-center">
      <h2 className="text-gray-900 font-semibold text-lg">
        {props.categoryName}
      </h2>
      <div className="mx-auto bg-red-700 rounded-full h-40 w-40 ">
        {/* category img */}
        <button type="button" className="">
          <img
            className="object-cover rounded-full hover:scale-105 cursor-pointer"
            src={props.img}
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default CardCategory;
