import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import PublicNav from "@/components/PublicNav";
import { BookOpen, User, Lock, Eye, EyeOff } from "lucide-react";
import "./styles/Login.css";

const Login = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!employeeId.trim() || !password.trim()) {
      setError("Please enter your employee ID and password.");
      return;
    }
    const success = login(employeeId, password);
    if (success) {
      navigate("/lecturer");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className={`login-container ${isFocused ? "focused-bg" : "default-bg"}`}>
      <PublicNav />

      <div className="login-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="login-card"
        >
          <div className="portal-icon">
            <BookOpen />
          </div>

          <h1 className="login-title">lecturer Portal</h1>
          <p className="login-subtitle">Sign in with your employee ID</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Employee ID</label>
              <div className="input-wrapper">
                {/* <User className="input-icon" size={18} /> */}
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="form-input"
                  placeholder="e.g. TCH-2024-001"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                {/* <Lock className="input-icon" size={18} /> */}
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="form-input password-input"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <span>⚠️</span> {error}
              </div>
            )}

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="/forgot-password" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="submit-button">
              Sign In
            </button>
          </form>

          <div className="portal-switch">
            <span className="switch-text">
              Are you a student?{" "}
              <a href="http://localhost:5173/login/student" className="switch-link">
                Go to Student Portal
              </a>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
