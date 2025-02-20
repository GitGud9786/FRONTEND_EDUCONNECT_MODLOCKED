import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

import bike_icon from '../Assets/study.png';
import logo from '../Assets/logo.jpg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Select a Role");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (role !== "student") {
      setError("Only student login is implemented.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/students/studentlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("student", JSON.stringify(data.student)); // Save student info
        navigate(`/student-profile/${data.student.student_id}`); // Redirect to profile page
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
          <img src={logo} alt="" />
          <div className="header">
            <div className="heading">EDUCONNECT</div>
            <div className="subheading">Unlock Your Potential!</div>
          </div>

          <div className="inputs">
            <div className="input">
              <label htmlFor="role-select">Select Role:</label>
              <select id="role-select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">-- Choose an option --</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
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
          <img src={bike_icon} alt="" />
        </div>
      </div>
      <div className="bottom-login">Created by MODLOCKED©</div>
    </div>
  );
};

export default Login;
