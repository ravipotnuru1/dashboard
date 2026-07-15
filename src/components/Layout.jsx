import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

import "./Layout.css";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      <div
        className={`layout-sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <Sidebar closeSidebar={closeSidebar} />
      </div>

      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-mobile-overlay"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}

      <div className="layout-content">
        <Header toggleSidebar={toggleSidebar} />

        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;