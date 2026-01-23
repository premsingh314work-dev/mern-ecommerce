import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  CircleUserRound,
  Menu,
  X,
} from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
   
      <nav className="h-16 flex items-center justify-between px-7 shadow-md">

        <div className="text-2xl font-bold">
          Smart <span className="text-red-600">Shop</span>
        </div>


        <form
          onSubmit={(e) => e.preventDefault()}
          className="hidden md:flex items-center bg-gray-200 rounded-full w-[40vw]
                     focus-within:ring-2 focus-within:ring-gray-400 transition"
        >
          <input
            type="text"
            placeholder="Search items"
            className="grow px-4 py-2 bg-transparent focus:outline-none"
          />
          <button className="p-2 hover:bg-gray-300 rounded-full">
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

      {/* Mobile Search */}
      <div className="md:hidden px-4 mt-2">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center bg-gray-200 rounded-full"
        >
          <input
            type="text"
            placeholder="Search items"
            className="grow px-4 py-2 bg-transparent focus:outline-none"
          />
          <button className="p-2">
            <Search />
          </button>
        </form>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4 font-semibold">
          <div className="hover:text-gray-600 cursor-pointer">Support</div>
          <div className="hover:text-gray-600 cursor-pointer">Wallet</div>
          <div className="flex items-center gap-2 hover:text-gray-600 cursor-pointer">
            <CircleUserRound size={24} />
            <span>Sign-in</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
