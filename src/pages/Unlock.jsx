import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "../styles/Auth.css";

function Unlock() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleUnlock = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must contain at least 8 characters");
      return;
    }

    setError("");
    navigate("/home");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-left">
          <img
            src="/auth-image.png"
            alt="Unlock Illustration"
          />
        </div>

        <div className="auth-card">
          <div
            style={{
              textAlign: "center",
              marginBottom: "35px",
            }}
          >
            <img
              src="/profile.png"
              alt="Ronald Robertson"
              style={{
                width: "105px",
                height: "105px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "18px",
              }}
            />

            <h2
              style={{
                fontSize: "22px",
                margin: "0 0 10px",
              }}
            >
              Ronald Robertson
            </h2>

            <p
              style={{
                color: "#9ca3af",
                fontSize: "13px",
                margin: 0,
              }}
            >
              Enter your password to access the admin.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleUnlock}
          >
            <label>Password</label>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {showPassword ? (
                <FaEye
                  className="eye-icon"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEyeSlash
                  className="eye-icon"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            {error && (
              <p className="auth-error">{error}</p>
            )}

            <button
              type="submit"
              className="auth-button"
            >
              Unlock
            </button>
          </form>

          <p className="auth-footer">
            Not you?{" "}
            <Link
              to="/login"
              className="auth-link"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Unlock;