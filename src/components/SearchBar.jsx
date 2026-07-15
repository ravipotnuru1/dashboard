import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const pages = [
    { name: "Home", path: "/home" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "E-Commerce", path: "/ecommerce" },
    { name: "Orders", path: "/ecommerce-orders" },
    {
      name: "Customer Care",
      path: "/ecommerce/customer-care",
    },
    { name: "Calendar", path: "/calendar" },
    { name: "Mail", path: "/mail" },
    { name: "Task", path: "/tasks" },
    { name: "Projects", path: "/projects" },
    { name: "File Manager", path: "/file-manager" },
    { name: "Notes", path: "/notes" },
    { name: "Contacts", path: "/contacts" },
    { name: "Social", path: "/dashboard-social" },
  ];

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleNavigate = (path) => {
    navigate(path);
    setSearch("");
  };

  return (
    <div
      style={{
        position: "relative",
        width: "250px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "0 14px",
          height: "40px",
          border: "1px solid #e3e6e8",
          borderRadius: "8px",
          background: "#ffffff",
        }}
      >
        <FaSearch
          style={{
            color: "#999fa7",
            fontSize: "13px",
          }}
        />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: "12px",
            color: "#444a52",
          }}
        />
      </div>

      {search && (
        <div
          style={{
            position: "absolute",
            top: "46px",
            left: "0",
            width: "100%",
            maxHeight: "280px",
            overflowY: "auto",
            background: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
            zIndex: "9999",
            padding: "6px 0",
          }}
        >
          {filteredPages.length > 0 ? (
            filteredPages.map((page) => (
              <button
                key={page.path}
                type="button"
                onClick={() => handleNavigate(page.path)}
                style={{
                  width: "100%",
                  padding: "11px 15px",
                  border: "none",
                  background: "transparent",
                  color: "#4b5159",
                  textAlign: "left",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                {page.name}
              </button>
            ))
          ) : (
            <p
              style={{
                padding: "12px 15px",
                margin: "0",
                color: "#999fa7",
                fontSize: "12px",
              }}
            >
              No page found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;