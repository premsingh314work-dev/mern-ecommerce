import React from "react";
import { useHistory } from "../../Universal/HistoryContext";
import { useEffect, useState } from "react";
import SmallProductCard from "./SmallProductCard";

function RecentlyViewed() {
  const { History } = useHistory();
  // useEffect(() => {
  //   console.log(History);
  // }, [History]);
  return (
    <>
      {(History.length>0)&&(<div className="w-full">
        <h2 className="text-2xl font-bold p-2 text-gray-950">
          Recently Viewed
        </h2>

        {/* The Scroll Container */}
        <div className="flex flex-row gap-3 p-2 overflow-x-auto snap-x scrollbar-hide">
          {History.map((product) => (
            <div
              key={product._id}
              // Change: Use 'w-[calc(50%-0.75rem)]' instead of 'min-w'
              // to prevent it from growing when there is only one item.
              className="snap-start w-[calc(50%-0.75rem)] md:w-50 shrink-0"
            >
              <SmallProductCard product={product} />
            </div>
          ))}
        </div>
      </div>)}
    </>
  );
}

export default RecentlyViewed;
