import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />

        <main
          style={{
            padding: "24px",
            flex: 1,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;