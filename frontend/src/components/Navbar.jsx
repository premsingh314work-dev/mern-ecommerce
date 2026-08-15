import React, { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboardIcon,
  LogInIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import SupportPage from "../pages/SupportPage";
import CartPage from "../pages/CartPage";
import { useSearchStore } from "../stores/useSearchStore";

const Navbar = () => {
  const { SearchQuery, setSearchQuery } = useSearchStore();
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleQuerySearch = (e) => {
    if (SearchQuery.trim() === "") return;
    if (e.key === "Enter") {
      const params = new URLSearchParams({ search: SearchQuery });
      navigate(`/products?${params.toString()}`);
    }
  };

  return (
    <div className="sticky top-0 z-50 isolate bg-white/10 backdrop-blur-md shadow-lg ring-1 ring-black/5 px-6 py-3 flex items-center justify-between gap-6">
      {/* LOGO */}
      <Link to="/" className="text-2xl font-bold whitespace-nowrap">
        Smart <span className="text-red-500">Shop</span>
      </Link>

      {/* SEARCH */}
      <div className="flex-1 max-w-md relative ">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 pl-10 rounded-full bg-white/30 ring-1 ring-black/5 focus:ring-2 focus:ring-cyan-500 focus:outline-none placeholder:text-white"
          value={SearchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyDown={handleQuerySearch}
        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5">
        <Link to="/supportpage">
          <SupportPage />
        </Link>
        <Link to="/cart">CartPage</Link>

        {/* AVATAR */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar relative cursor-pointer btn-ghost rounded-field"
          >
            <div className="w-10 rounded-full ring-2 ring-cyan-500">
              <img src={authUser?.avatar || "avatar.png"} alt="user" />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
          >
            {authUser ? (
              <>
                {(authUser.role || "").toString().toLowerCase() === "seller" ? (
                  <>
                    <li className="border-b border-slate-700/10 hover:scale-105">
                      <Link
                        to="/seller/dashboard"
                        className="flex items-center gap-2"
                      >
                        <LayoutDashboardIcon />
                        Dashboard
                      </Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
                <li className="border-b border-slate-700/10 hover:scale-105">
                  <Link to="/settings" className="flex items-center gap-2">
                    <SettingsIcon />
                    Settings
                  </Link>
                </li>

                <li className="border-b border-slate-700/10 hover:scale-105">
                  <button
                    className="flex items-center gap-2 text-red-600 w-full text-left"
                    onClick={logout}
                  >
                    <LogOutIcon />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="border-b border-slate-700/10 hover:scale-105">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-red-600 w-full text-left"
                  >
                    <LogInIcon />
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
