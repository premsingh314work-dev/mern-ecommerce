import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useHistory } from "../../Universal/HistoryContext";
import {ShoppingCart } from "lucide-react";
import Addtocartbutton from "../../Universal/Addtocart.button";

function SingleProduct() {
  const { AddToHistory } = useHistory();
  const location = useLocation();
  const { prodid } = useParams();
  const Backend_url = import.meta.env.VITE_BACKEND_URL;

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    if (product) {
      console.log(product);
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        console.log("API called");

        const res = await axios.get(`${Backend_url}/api/products/${prodid}`);

        setProduct(res.data.product);
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    if (!product) {
      fetchProduct();
    }
  }, [prodid]);

  useEffect(() => {
    if (product) {
      AddToHistory(product);
    }
  }, [product]);

  // if (!product) return <div>Loading...</div>;
  if (loading) return <div>Loading details...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="min-h-screen bg-white p-4 md:p-10 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT COLUMN: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img
              src={product.images?.[0]?.url}
              alt={product.productName}
              className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Thumbnail strip for multiple images */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images?.map((img, idx) => (
              <div
                key={idx}
                className="w-20 h-20 border-2 border-transparent hover:border-amber-500 rounded-md overflow-hidden cursor-pointer shrink-0"
              >
                <img
                  src={img.url}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Product Info */}
        <div className="flex flex-col space-y-6">
          <div className="border-b pb-4">
            <nav className="text-sm text-blue-600 mb-2 hover:underline cursor-pointer">
              {product.category || "Electronics"}
            </nav>
            <h1 className="text-3xl font-bold leading-tight">
              {product.productName}
            </h1>
            <div className="flex items-center mt-2 gap-4">
              <div className="flex items-center bg-green-100 px-2 py-0.5 rounded text-green-700 font-bold text-sm">
                {product.ratings || 0} ★
              </div>
              <span className="text-gray-500 text-sm">
                {product.numOfReviews || 0} Reviews
              </span>
            </div>
          </div>

          <div className="space-y-1">
            {product.discount_percentage != 0 && (
              <p className="text-red-600 text-sm font-semibold">
                -{product.discount_percentage}% Limited Time Deal
              </p>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-light">₹</span>
              <span className="text-4xl font-bold">
                {product.price?.toLocaleString("en-IN")}
              </span>
            </div>
            {product.discount_percentage > 0 && (
              <p className="text-gray-500 text-sm">
                M.R.P:{" "}
                <span className="line-through">
                  ₹
                  {Math.round(
                    product.price / (1 - product.discount_percentage / 100),
                  ).toLocaleString("en-IN")}
                </span>
              </p>
            )}
            <p className="text-green-700 font-medium text-sm">
              Inclusive of all taxes
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}
              ></div>
              <span className="font-semibold">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>  

            <div className="flex flex-col gap-3">
              <Addtocartbutton ProductToAdd={product._id}/>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition shadow-sm">
                BUY NOW
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-lg">About this item</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm leading-relaxed">
              {/* Splitting description by dots to create bullet points if it's a long string */}
              {product.description
                ?.split(".")
                .filter((s) => s.trim().length > 0)
                .map((sentence, i) => (
                  <li key={i}>{sentence.trim()}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
