import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  FaThLarge,
  FaShoppingBag,
  FaCalendarAlt,
  FaEnvelope,
  FaComments,
  FaTasks,
  FaProjectDiagram,
  FaFolder,
  FaStickyNote,
  FaAddressBook,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  const [ecommerceOpen, setEcommerceOpen] = useState(
    location.pathname.startsWith("/ecommerce")
  );

  const openChat = () => {
    window.dispatchEvent(new Event("open-chat"));
  };

  const ecommerceActive =
    location.pathname.startsWith("/ecommerce");

  return (
    <aside className="figma-sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">✿</div>
        <span>FLOWER</span>
      </div>

      <div className="sidebar-search">
        <FaSearch />

        <input
          type="text"
          placeholder="Search anything"
        />
      </div>

      <p className="sidebar-menu-title">MAIN MENU</p>

      <nav className="sidebar-nav">
        {/* DASHBOARD */}

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaThLarge />
          <span>Dashboard</span>
        </NavLink>

        {/* E-COMMERCE */}

        <button
          type="button"
          className={`sidebar-link sidebar-menu-button ${
            ecommerceActive ? "active" : ""
          }`}
          onClick={() =>
            setEcommerceOpen((previous) => !previous)
          }
        >
          <div className="sidebar-link-left">
            <FaShoppingBag />
            <span>E-Commerce</span>
          </div>

          <FaChevronDown
            className={`sidebar-arrow ${
              ecommerceOpen ? "rotate" : ""
            }`}
          />
        </button>

        {/* E-COMMERCE SUBMENU */}

        {ecommerceOpen && (
          <div className="sidebar-submenu">
            <NavLink
              to="/ecommerce"
              end
              className={({ isActive }) =>
                `sidebar-sub-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/ecommerce-orders"
              className={({ isActive }) =>
                `sidebar-sub-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              Orders
            </NavLink>

            <NavLink
              to="/ecommerce/customer-care"
              className={({ isActive }) =>
                `sidebar-sub-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              Customer Care
            </NavLink>
          </div>
        )}

        {/* CALENDAR */}

        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaCalendarAlt />
          <span>Calendar</span>
        </NavLink>

        {/* MAIL */}

        <NavLink
          to="/mail"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaEnvelope />
          <span>Mail</span>
          <span className="mail-badge">8</span>
        </NavLink>

        {/* CHAT */}

        <button
          type="button"
          className="sidebar-link sidebar-chat-button"
          onClick={openChat}
        >
          <FaComments />
          <span>Chat</span>
        </button>

        {/* TASK */}

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaTasks />
          <span>Task</span>
        </NavLink>

        {/* PROJECTS */}

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaProjectDiagram />
          <span>Projects</span>
        </NavLink>

        {/* FILE MANAGER */}

        <NavLink
          to="/file-manager"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaFolder />
          <span>File Manager</span>
        </NavLink>

        {/* NOTES */}

        <NavLink
          to="/notes"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaStickyNote />
          <span>Notes</span>
        </NavLink>

        {/* CONTACTS */}

        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaAddressBook />
          <span>Contacts</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;