import { useContext } from "react";
import { CartContext } from "../../Universal/CartContext";
import { Minus, Plus, IndianRupee, Trash2 } from "lucide-react";

function CartPage() {
  const { cart, updateCartItem } = useContext(CartContext);

  // Guard Clauses (Must be below the useContext hook)
  if (cart === null) {
    return <div className="p-10 text-center font-medium">Loading your cart...</div>;
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="p-10 text-center space-y-4">
        <h2 className="text-xl font-bold">Your cart is empty!</h2>
        <p className="text-gray-500">Add some products to see them here.</p>
      </div>
    );
  }

  // Calculate subtotal safely from the populated productId
  const subtotal = cart.items.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-black mb-8 tracking-tight">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.productId?._id}
              className="flex items-center gap-6 border border-gray-100 p-5 rounded-2xl bg-white shadow-sm"
            >
              {
              console.log(item)
              }
              {/* Product Image */}
              <div className="w-24 h-24 shrink-0 bg-gray-50 rounded-xl overflow-hidden border">
                <img
                  src={item.productId?.images?.[0]?.url || "https://res.cloudinary.com/db2lak2ea/image/upload/v1772292688/Pngtree_reload_vector_icon_4015267_r7wovq.png"}
                  alt={item.productId?.productName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">
                  {item.productId?.productName}
                </h3>
                <div className="flex items-center text-blue-600 font-bold mt-1">
                   <IndianRupee size={14} strokeWidth={3} />
                   <span>{item.productId?.price?.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
                <button
                  onClick={() => updateCartItem(item.productId, -1)}
                  className="p-1.5 hover:bg-white hover:shadow-sm rounded-full transition-all text-gray-600"
                >
                  <Minus size={16} />
                </button>
                
                <span className="px-4 font-bold text-gray-800 w-8 text-center">
                  {item.quantity}
                </span>
                
                <button
                  onClick={() => updateCartItem(item.productId, 1)}
                  className="p-1.5 hover:bg-white hover:shadow-sm rounded-full transition-all text-gray-600"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Summary Box */}
        <div className="border p-6 rounded-lg h-fit bg-gray-50">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span className="font-bold">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>
          <button className="w-full bg-amber-400 py-3 rounded-full font-bold">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
export default CartPage;
