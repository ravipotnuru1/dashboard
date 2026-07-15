import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>

        <h2>We can't seem to find that</h2>

        <p>
          The page you're looking for doesn't exist or has been moved
        </p>

        <button onClick={() => navigate("/home")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;