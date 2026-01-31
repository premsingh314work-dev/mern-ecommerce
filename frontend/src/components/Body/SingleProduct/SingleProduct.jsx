import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SingleProduct() {
  const { prodid } = useParams();
  const [product, setProduct] = useState(null);
  const Backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!prodid) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${Backend_url}/api/products/${prodid}`
        );
        console.log(res);
        
        setProduct(res.data.product);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchProduct();
  }, [prodid]);

  // if (!product) return <div>Loading...</div>;

  return (
    <div>
      {/* <h1>{product.productName}</h1>
      <p>₹{product.price}</p> */}
    </div>
  );
}

export default SingleProduct;
