import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "../styles/Auth.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (name.trim().length < 3) {
      setError("Please enter your full name");
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!strongPassword.test(password)) {
      setError(
        "Password must have 8 characters, uppercase, lowercase and number"
      );
      return;
    }

    if (!agree) {
      setError("Please accept the terms and conditions");
      return;
    }

    setError("");
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h2 className="flower-logo">🌼 FLOWER</h2>

        <img
          src="/auth-image.png"
          alt="Signup Illustration"
          className="auth-image"
        />
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h1>Create Your Account</h1>

          <button type="button" className="google-btn">
            <span>G</span>
            Sign up with Google
          </button>

          <div className="auth-divider">
            <span>OR SIGN UP WITH EMAIL</span>
          </div>

          <form onSubmit={handleSignup}>
            <label>Full Name</label>

            <div className="input-box">
              <FaUser />

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <label>Email</label>

            <div className="input-box">
              <FaEnvelope />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label>Password</label>

            <div className="input-box">
              <FaLock />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <label className="remember">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />

              I agree to the Terms and Conditions
            </label>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-submit">
              Sign Up
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;