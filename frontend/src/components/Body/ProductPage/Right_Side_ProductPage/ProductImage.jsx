import React from "react";

function ProductImage({src}) {
    // console.log("Render: ProductImage");

  return (
    <>
      <img src={src} alt="" className="h-full w-full object-cover rounded-l-lg" />
    </>
  );
}

export default ProductImage;
