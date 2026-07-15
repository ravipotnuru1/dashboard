import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "../styles/Auth.css";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || "cooper@example.com";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!strongPassword.test(password)) {
      setError(
        "Use 8 characters with uppercase, lowercase and number"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* LEFT IMAGE */}

        <div className="auth-left">
          <img
            src="/auth-image.png"
            alt="Reset Password"
          />
        </div>

        {/* RIGHT CARD */}

        <div className="auth-card">
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "#f7f7f7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 25px",
            }}
          >
            <FaLock
              style={{
                fontSize: "48px",
                color: "#f5b400",
              }}
            />
          </div>

          <h2
            style={{
              textAlign: "center",
              fontSize: "22px",
              marginBottom: "30px",
            }}
          >
            Reset Your Password
          </h2>

          <form
            className="auth-form"
            onSubmit={handleReset}
          >
            <label>Email</label>

            <div className="input-group">
              <input
                type="email"
                value={email}
                readOnly
              />
            </div>

            <label>Password</label>

            <div className="input-group">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              {showPassword ? (
                <FaEye
                  className="eye-icon"
                  onClick={() =>
                    setShowPassword(false)
                  }
                />
              ) : (
                <FaEyeSlash
                  className="eye-icon"
                  onClick={() =>
                    setShowPassword(true)
                  }
                />
              )}
            </div>

            <label>Confirm Password</label>

            <div className="input-group">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

              {showConfirmPassword ? (
                <FaEye
                  className="eye-icon"
                  onClick={() =>
                    setShowConfirmPassword(false)
                  }
                />
              ) : (
                <FaEyeSlash
                  className="eye-icon"
                  onClick={() =>
                    setShowConfirmPassword(true)
                  }
                />
              )}
            </div>

            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="auth-button"
            >
              Reset Password
            </button>
          </form>

          <p className="auth-footer">
            Go back to{" "}
            <Link
              to="/login"
              className="auth-link"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;