import { NavLink } from "react-router-dom";
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
  FaChevronRight,
  FaSearch,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="figma-sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">✿</div>
        <span>FLOWER</span>
      </div>

      <div className="sidebar-search">
        <FaSearch />
        <input type="text" placeholder="Search anything" />
      </div>

      <p className="sidebar-menu-title">MAIN MENU</p>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaThLarge />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/ecommerce"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaShoppingBag />
          <span>E-Commerce</span>
          <FaChevronDown className="sidebar-arrow" />
        </NavLink>

        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaCalendarAlt />
          <span>Calendar</span>
        </NavLink>

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

        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaComments />
          <span>Chat</span>
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaTasks />
          <span>Task</span>
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaProjectDiagram />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/file-manager"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaFolder />
          <span>File Manager</span>
        </NavLink>

        <NavLink
          to="/notes"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FaStickyNote />
          <span>Notes</span>
        </NavLink>

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