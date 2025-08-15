import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";

function Login({ onLogin, onSwitchToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });
      // alert("Login successful!");
      console.log(res.data);
      onLogin(username); // ✅ This tells App.js the user is logged in
    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="app-title">BT</h1>
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <span className="link" onClick={onSwitchToSignup}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
