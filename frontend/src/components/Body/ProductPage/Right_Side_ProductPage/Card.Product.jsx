import React,{memo} from "react";
import ProductImage from ".//ProductImage";
import ProductDetail from "./ProductDetail";
function CardProduct(props) {
  console.log("Render: CardProduct",props.productName);
  
  return (
    <>
      <div className=" h-auto w-full m-1 bg-gray-100 rounded-lg flex flex-row">
        {/* img div */}
        <div className=" bg-red-500 aspect-square w-60 shrink-0 ">
          <ProductImage />
        </div>
        {/* product detail div */}
        <div className="flex-3 p-3 flex flex-col justify-between">
          <ProductDetail productName={props.productName} rating={props.rating} price={props.price}/>
        </div>
      </div>
    </>
  );
}

export default React.memo(CardProduct);