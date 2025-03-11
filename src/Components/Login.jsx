import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

import bike_icon from '../Assets/study.png';
import logo from '../Assets/logo.jpg';

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!role || !email || !password) {
      setError("Please enter role, email, and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));

        switch (data.user.user_role) {
          case "student":
            navigate(`/student-profile/${data.user.user_id}`);
            break;
          case "teacher":
            navigate(`/teacherdashboard/${data.user.user_id}`);
            break;
          case "admin":
            navigate(`/admin`);
            break;
          default:
            setError("Invalid role assigned to user.");
        }
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      setError("Error connecting to server.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="left">
          <img src={logo} alt="logo" />
          <div className="header">
            <div className="heading">EDUCONNECT</div>
            <div className="subheading">Unlock Your Potential!</div>
          </div>

          <div className="inputs">
            <div className="input">
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <div className="input">
              <input 
                type="email" 
                placeholder="Enter Your Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            <div className="input">
              <input 
                type="password" 
                placeholder="Enter Your Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            {error && <p className="error">{error}</p>}

            <div className="submit-container">
              <div className="submit" onClick={handleLogin}>Login</div>
            </div>
          </div>
        </div>

        <div className="right">
          <img src={bike_icon} alt="study" />
        </div>
      </div>
      <div className="bottom-login">Created by MODLOCKED©</div>
    </div>
  );
};

export default Login;