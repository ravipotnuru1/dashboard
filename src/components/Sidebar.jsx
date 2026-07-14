import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaShoppingCart,
  FaCalendarAlt,
  FaEnvelope,
  FaTasks,
  FaProjectDiagram,
  FaFolder,
  FaUsers,
  FaChevronDown,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [ecommerceOpen, setEcommerceOpen] = useState(true);

  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 15px",
    marginBottom: "5px",
    textDecoration: "none",
    color: isActive ? "#fff" : "#d1d5db",
    background: isActive ? "#16a34a" : "transparent",
    borderRadius: "7px",
  });

  const subLinkStyle = ({ isActive }) => ({
    display: "block",
    padding: "9px 15px",
    marginLeft: "25px",
    textDecoration: "none",
    color: isActive ? "#86efac" : "#d1d5db",
    fontSize: "14px",
  });

  const menuStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 15px",
    cursor: "pointer",
  };

  const menuLeftStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const arrowStyle = (open) => ({
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    transition: "0.3s",
  });

  return (
    <aside
      style={{
        width: "230px",
        minHeight: "100vh",
        background: "#111827",
        padding: "20px 15px",
        color: "#fff",
        flexShrink: 0,
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>Dashboard</h2>

      {/* DASHBOARD */}

      <div
        onClick={() => setDashboardOpen(!dashboardOpen)}
        style={menuStyle}
      >
        <div style={menuLeftStyle}>
          <FaHome />
          <span>Dashboard</span>
        </div>

        <FaChevronDown style={arrowStyle(dashboardOpen)} />
      </div>

      {dashboardOpen && (
        <div>
          <NavLink to="/home" style={subLinkStyle}>
            Analytics Overview
          </NavLink>

          <NavLink to="/home-two" style={subLinkStyle}>
            Social Insights
          </NavLink>

          <NavLink to="/home-four" style={subLinkStyle}>
            Finance Overview
          </NavLink>

          <NavLink to="/home-five" style={subLinkStyle}>
            Finance Profile
          </NavLink>

          <NavLink to="/home-six" style={subLinkStyle}>
            Sales Analytics
          </NavLink>

          <NavLink to="/home-seven" style={subLinkStyle}>
            Project Overview
          </NavLink>
        </div>
      )}

      {/* E-COMMERCE */}

      <div
        onClick={() => {
          setEcommerceOpen(true);
          navigate("/ecommerce");
        }}
        style={menuStyle}
      >
        <div style={menuLeftStyle}>
          <FaShoppingCart />
          <span>E-commerce</span>
        </div>

        <FaChevronDown
          onClick={(event) => {
            event.stopPropagation();
            setEcommerceOpen(!ecommerceOpen);
          }}
          style={arrowStyle(ecommerceOpen)}
        />
      </div>

      {ecommerceOpen && (
        <div>
          <NavLink to="/ecommerce" style={subLinkStyle}>
            Products
          </NavLink>

          <NavLink to="/ecommerce-orders" style={subLinkStyle}>
            Orders
          </NavLink>

          <NavLink
            to="/ecommerce/customer-care"
            style={subLinkStyle}
          >
            Customer Care
          </NavLink>
        </div>
      )}

      {/* OTHER MENU */}

      <NavLink to="/calendar" style={linkStyle}>
        <FaCalendarAlt />
        Calendar
      </NavLink>

      <NavLink to="/mail" style={linkStyle}>
        <FaEnvelope />
        Mail
      </NavLink>

      <NavLink to="/tasks" style={linkStyle}>
        <FaTasks />
        Tasks
      </NavLink>

      <NavLink to="/projects" style={linkStyle}>
        <FaProjectDiagram />
        Projects
      </NavLink>

      <NavLink to="/file-manager" style={linkStyle}>
        <FaFolder />
        File Manager
      </NavLink>

      <NavLink to="/social" style={linkStyle}>
        <FaUsers />
        Social
      </NavLink>
    </aside>
  );
}

export default Sidebar;