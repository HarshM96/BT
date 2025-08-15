import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";

function Signup({ onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/signup", {
        username,
        password,
      });
      alert("Signup successful! Please log in.");
      onSwitchToLogin();
    } catch (err) {
  console.error("Signup error:", err.response?.data || err.message);
  alert(err.response?.data?.detail || "Signup failed. Please try again.");
}
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="app-title">BT</h1>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup} className="auth-form">
          <input
            type="text"
            placeholder="Choose a Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Choose a Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{" "}
          <span className="link" onClick={onSwitchToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
