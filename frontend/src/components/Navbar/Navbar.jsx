import { useState } from "react";
import { useNavigate, useLocation ,Link} from "react-router-dom";
import { Search, ShoppingCart, CircleUserRound, Menu, X } from "lucide-react";

function Navbar({ onSearch = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [value, setValue] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    console.log("SEARCH SENT:", value);
    navigate(`/products?search=${encodeURIComponent(value)}`);
  };
  return (
    <>
      <nav className="h-16 flex items-center justify-between px-7 shadow-md">
        <Link to="/"className="text-2xl font-bold cursor-pointer">
          Smart <span className="text-red-600">Shop</span>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="hidden md:flex items-center bg-gray-200 rounded-full w-[40vw]
                     focus-within:ring-2 focus-within:ring-gray-400 transition"
        >
          <input
            type="text"
            placeholder="Search items"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="grow px-4 py-2 bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="p-2 hover:bg-gray-300 rounded-full"
            // onClick={SearchClick}
          >
            <Search />
          </button>
        </form>

        {/* Right Section (Desktop) */}
        <div className="hidden md:flex items-center gap-6 font-semibold">
          <span className="hover:text-gray-600 cursor-pointer">Support</span>
          <span className="hover:text-gray-600 cursor-pointer">Wallet</span>

          <button className="hover:scale-110 transition">
            <ShoppingCart size={28} />
          </button>

          <button className="flex items-center gap-2 hover:text-gray-600">
            <CircleUserRound size={28} />
            <span>Sign-in</span>
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="flex md:hidden items-center gap-4">
          <ShoppingCart size={26} />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
