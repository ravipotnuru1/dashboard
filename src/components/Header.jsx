import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Notification from "./Notification";

function Header() {
  const navigate = useNavigate();

  return (
    <header
      style={{
        height: "70px",
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <h2>Dashboard</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <SearchBar />

        <div
          onClick={() => navigate("/home-two")}
          style={{ cursor: "pointer" }}
        >
          <Notification />
        </div>
      </div>
    </header>
  );
}

export default Header;