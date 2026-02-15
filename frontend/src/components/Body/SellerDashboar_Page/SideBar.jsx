import React from "react";

function SideBar({setActiveview}) {
  return (
    <div className="bg-white rounded-2xl h-full w-60 shadow-md flex flex-col p-1 gap-1">
      <button 
        className="bg-red-400 h-10 font-medium hover:scale-101 rounded-2xl"
        onClick={()=>{setActiveview("AddProduct")}}
        >
        Add Product
      </button>
    </div>
  );
}

export default SideBar;
