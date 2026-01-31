import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="h-16 shrink-0 z-10">
        <Navbar />
      </div>

      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}


export default MainLayout;
