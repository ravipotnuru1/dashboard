import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "../styles/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters"
      );
      return;
    }

    setError("");
    navigate("/home");
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h2 className="flower-logo">
          🌼 FLOWER
        </h2>

        <img
          src="/auth-image.png"
          alt="Login Illustration"
          className="auth-image"
        />
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h1>Login To Your Account</h1>

          <button
            type="button"
            className="google-btn"
          >
            <span>G</span>
            Login with Google
          </button>

          <div className="auth-divider">
            <span>OR LOGIN WITH EMAIL</span>
          </div>

          <form onSubmit={handleLogin}>
            <label>Email</label>

            <div className="input-box">
              <FaEnvelope />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <label>Password</label>

            <div className="input-box">
              <FaLock />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <FaEye />
                ) : (
                  <FaEyeSlash />
                )}
              </button>
            </div>

            <div className="login-options">
              <label className="remember">
                <input type="checkbox" />
                Remember Me
              </label>

              <Link to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit"
            >
              Log In
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;