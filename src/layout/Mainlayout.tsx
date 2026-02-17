import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "../components/shared/Navbar";
import { Sidebar } from "../components/shared/Sidebar";

export const Mainlayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen bg-black flex flex-col  overflow-hidden">
      <Navbar setIsOpen={setIsOpen} />
      <div className="flex flex-1 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none ">
          <div className="absolute top-0 left-30 w-[500px] h-[500px] bg-[#00B8DB33] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#8E51FF33] rounded-full blur-[100px]" />
        </div>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className=" flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 text-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
