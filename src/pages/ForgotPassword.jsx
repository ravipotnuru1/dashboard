import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import "../styles/Auth.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleRecover = (e) => {
    e.preventDefault();

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");

    navigate("/reset-password", {
      state: { email },
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* LEFT IMAGE */}

        <div className="auth-left">
          <img
            src="/auth-image.png"
            alt="Recover Password"
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
              marginBottom: "35px",
            }}
          >
            Recover Your Password
          </h2>

          <form
            className="auth-form"
            onSubmit={handleRecover}
          >
            <label>Email</label>

            <div className="input-group">
              <input
                type="email"
                placeholder="cooper@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
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
              Recover Password
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

export default ForgotPassword;