import { useEffect, useState } from "react";
import { useParams ,useLocation} from "react-router-dom";
import axios from "axios";

function SingleProduct() {
  const location = useLocation();
  const { prodid } = useParams();
  
  const [product, setProduct] = useState(location.state?.product || null);
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  
  useEffect(() => {
    if(!product) console.log("Product is not present before fetch");
    if(product) return;
    
    if (!prodid) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${Backend_url}/api/products/${prodid}`
        );
        // console.log(res);
        
        setProduct(res.data.product);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchProduct();
    console.log(product);
    
  }, [prodid,product]);

  // if (!product) return <div>Loading...</div>;

  return (
    <div>
      {/* <h1>{product.productName}</h1>
      <p>₹{product.price}</p> */}
    </div>
  );
}

export default SingleProduct;
