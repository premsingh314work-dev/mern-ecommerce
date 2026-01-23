import React from "react";

function ScrollableDiv() {
  return (
    <>
      <div className="h-[40vh] bg-red-300 flex flex-row gap-4 p-2 overflow-x-auto overflow-y-hidden">
        <div className="bg-red-700 h-full w-100 shrink-0"></div>
        <div className="bg-red-700 h-full w-100 shrink-0"></div>
        <div className="bg-red-700 h-full w-100 shrink-0"></div>
        <div className="bg-red-700 h-full w-100 shrink-0"></div>
        <div className="bg-red-700 h-full w-100 shrink-0"></div>
        <div className="bg-red-700 h-full w-100 shrink-0"></div>
        <div className="bg-red-700 h-full w-100 shrink-0"></div>
      </div>
    </>
  );
}

export default ScrollableDiv;
