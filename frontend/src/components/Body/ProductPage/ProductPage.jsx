import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import CardProduct from "./Right_Side_ProductPage/Card.Product";
function ProductPage() {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  console.log(searchParams);
  

  useEffect(() => {
    if (!searchQuery) return;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${Backend_url}/api/products?search=${searchQuery}`,
        );
        setProducts(res.data.productsList || []);        
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);
  if (!searchQuery) return <p className="p-4">Search for products</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {/* <div className="p-4">
      <h2 className="text-xl font-bold">Results</h2>

      {products.length === 0 && <p>No products found</p>}

      {products.map((p) => (
        <div key={p._id} className="border p-2 my-2">
          {p.productName}
        </div>
      ))}
    </div> */}

      <nav className="p-1 h-auto text-left shadow-md">
        <p className="text-base font-medium w-fit">
          {" "}
          1-48 of 173 results for{" "}
          <span className=" text-[#C45500]">"bottel"</span>
        </p>
      </nav>
      <div className="p-2 pr-5">
        <div className="h-auto w-full flex p-1">
          {/* filter div */}
          <>
            <div className="h-full w-[17%] bg-fuchsia-400">hi</div>
          </>

          {/* products display div */}
          <div className="h-auto pr-2 p-1 w-full flex flex-col">
            <h2 className="flex flex-col p-1">
              <span className="text-xl font-semibold">Results</span>
              <span>Check each product page for other buying options.</span>
            </h2>
            {products.map((product,index)=>{                
              return <CardProduct key={index} productName={product.productName} rating={product.ratings} price={product.price}/>
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
