import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  PackagePlus,
  Package,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";

const NAV_ITEMS = [
  { key: "welcome", label: "Overview", icon: LayoutGrid },
  { key: "AddProduct", label: "Add Product", icon: PackagePlus },
  { key: "Products", label: "My Products", icon: Package },
  { key: "Orders", label: "Orders", icon: ClipboardList },
  { key: "Settings", label: "Settings", icon: Settings },
];

function SideBar({ Activeview, setActiveview }) {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();

  const handleNav = (key) => {
    const keyLower = key.toString().toLowerCase();
    setActiveview(keyLower);
    if (keyLower === "welcome") {
      navigate("/seller/dashboard");
    } else {
      navigate(`/seller/dashboard?view=${keyLower}`);
    }
  };

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col rounded-xl border border-neutral-200 bg-white">
      <div className="border-b border-neutral-200 px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
          Seller
        </p>
        <p className="mt-1 text-lg font-semibold text-neutral-900">Dashboard</p>

        <div className="mt-4 flex items-center gap-3">
          <img
            src={authUser?.avatar || "/default-avatar.png"}
            alt={authUser?.name || "Seller"}
            className="h-9 w-9 rounded-full border border-neutral-200 object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-neutral-900">
              {authUser?.name || "Seller"}
            </p>
            <p className="truncate text-xs text-neutral-500">
              {authUser?.email}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const keyLower = key.toString().toLowerCase();
          const isActive = Activeview === keyLower;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleNav(key)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${
                isActive
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-neutral-200 p-3">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
        >
          <LogOut className="h-4 w-4" strokeWidth={2} />
          Log out
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
