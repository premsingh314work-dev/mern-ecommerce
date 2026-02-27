import { useContext } from "react";
import { CartContext } from "./CartContext";
import { ShoppingCart, Minus, Plus } from "lucide-react";

function Addtocartbutton({ ProductToAdd }) {
  // FIX: Destructure updateCartItem from context
  const { addToCart, cart, updateCartItem } = useContext(CartContext);

  const itemInCart = cart?.items?.find((i) => {
    const idInCart = i.productId._id || i.productId;
    return idInCart === ProductToAdd;
  });
  const currentQuantity = itemInCart ? itemInCart.quantity : 0;

  return (
    <div className="flex items-center gap-3">
      {currentQuantity === 0 ? (
        <button
          onClick={() => addToCart(ProductToAdd, 1)}
          className="bg-amber-400 w-full hover:bg-amber-500 text-gray-900 px-6 py-2.5 rounded-full font-bold transition-all"
        >
          <ShoppingCart size={16} className="inline mr-2" />
          ADD TO CART
        </button>
      ) : (
        <div className="flex items-center border rounded-full overflow-hidden">
          {/* 2. These buttons now trigger the debounced context function */}
          <button 
            onClick={() => updateCartItem(ProductToAdd, -1)} 
            className="px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            <Minus size={16} />
          </button>
          
          <span className="px-4 font-bold text-lg">{currentQuantity}</span>
          
          <button 
            onClick={() => updateCartItem(ProductToAdd, 1)} 
            className="px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Addtocartbutton;
