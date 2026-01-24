import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    if (!searchQuery) return;
    console.log("SEARCH RECEIVED:", searchQuery);

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/products?search=${searchQuery}`,
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
    <div className="p-4">
      <h2 className="text-xl font-bold">Results</h2>

      {products.length === 0 && <p>No products found</p>}

      {products.map((p) => (
        <div key={p._id} className="border p-2 my-2">
          {p.productName}
        </div>
      ))}
    </div>
  );
}

export default ProductPage;
