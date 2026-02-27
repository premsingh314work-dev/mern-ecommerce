import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, ShoppingCart, CircleUserRound } from "lucide-react";
import axios from "axios";
import { useAuth } from "../Universal/AuthContext";

function Navbar() {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const { user, loading, setUser } = useAuth();
  console.log(user);
  
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    navigate(`/products?search=${encodeURIComponent(value)}`);
    // console.log(value);
    
  };

  // console.log(user);
  
  return (
    <nav className="h-16 flex items-center justify-between px-7 shadow-md">
      <Link to="/" className="text-2xl font-bold">
        Smart <span className="text-red-600">Shop</span>
      </Link>

      {/* Search */}
      <form
        onSubmit={handleSubmit}
        className="hidden md:flex items-center bg-gray-200 rounded-full w-[40vw]
                   focus-within:ring-2 focus-within:ring-gray-400 transition"
      >
        <input
          type="text"
          placeholder="Search items"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="grow px-4 py-2 bg-transparent focus:outline-none"
        />
        <button type="submit" className="p-2 hover:bg-gray-300 rounded-full">
          <Search />
        </button>
      </form>

      {/* Right Section */}
      <div className="flex items-center gap-6 font-semibold">
        <span className="hover:text-gray-600 cursor-pointer">Support</span>
        <span className="hover:text-gray-600 cursor-pointer">Wallet</span>
        <Link to="/cart">
        <button className="hover:scale-110 transition">
          <ShoppingCart size={28} />
        </button>
        </Link>

        {/* Auth UI */}
        {!loading && (
          !user ? (
            <Link to="/signup">
              <button className="flex items-center gap-2 cursor-pointer">
                <CircleUserRound size={28} />
                <span>Sign-up</span>
              </button>
            </Link>
          ) : (
            <div className="relative">
              <img
                src={user.avatar || "/default-avatar.png"}
                alt="profile"
                className="w-9 h-9 rounded-full cursor-pointer border"
                onClick={() => setOpen(!open)}
              />

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Settings
                  </Link>
                  { (user.role=='Seller')?(

                    <Link
                      to="/sellerdashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setOpen(false)}
                      >
                      Dashboard
                    </Link>
                  ):(<></>)
                  }

                  <button
                    onClick={async () => {
                      console.log("Logiut-clicked");
                      try{
                        await axios.post(
                          `${Backend_url}/api/auth/logout`,
                          {},
                          { withCredentials: true }
                        );
                        setUser(null);
                        setOpen(false);
                      }catch(err){
                        console.log(err);
                        
                      }
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </nav>
  );
}

export default Navbar;
