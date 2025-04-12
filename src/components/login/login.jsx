import React, { useState } from "react";
import "./login.css"; // We'll create this CSS file
import axios from "axios";
import { Link, useNavigate } from "react-router";
import Navbar from "../navbar/navbar.jsx";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "https://ecommerce-project-backend-0xn5.onrender.com/auth/login",
          { username, password }
        )
        .then((response) => {
          const token = response.data.data.token;
          localStorage.setItem("Token", token);
          navigate("/");
        });
    } catch (error) {
      setUsername("");
      setPassword("");
      navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>

        <div className="footer-text">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
