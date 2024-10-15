import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/home/Sidebar";
import { Menu, X } from "lucide-react";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-800 text-white">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-30 bg-gray-700 p-2 rounded-md"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:static top-0 left-0 h-full w-64 z-20
          bg-gray-900 border-r border-gray-700 overflow-y-auto
        `}
      >
        <div className="p-4">
          <Sidebar />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow p-4 lg:p-8 w-full lg:w-5/6">
        <div className="bg-gray-700 rounded-xl p-4 lg:p-6 min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default Home;
