import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

import bike_icon from '../Assets/bike.png';
import logo from '../Assets/logo.jpg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to handle error messages
  
  const navigate = useNavigate(); // For navigation after login success

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make the POST request to your backend
      const response = await fetch('https://your-backend-url.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }) // Send email and password in the request body
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json(); // Assuming the response will be JSON
      console.log("Server Response:", data);

      // Example of handling a successful login (e.g., token received)
      // Redirect to the dashboard
      navigate('/dash');

    } catch (err) {
      // Handle errors here (e.g., login failed)
      console.error(err.message);
      setError(err.message); // Display error message to the user
    }
  };

  return (
    <div className="container">
      <div className="left">
        <img src={logo} alt="" />

        <div className="header">
          <div className="heading">EDUCONNECT</div>
          <div className="subheading">Unlock Your Potential!</div>
        </div>

        <div className="inputs">
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

          {error && <div className="error">{error}</div>} {/* Display error if login fails */}

          <div className="submit-container">
            <div className="submit" onClick={handleLogin}>
              Login
            </div>
          </div>
        </div>
      </div>

      <div className="right">
        <img src={bike_icon} alt="" />
      </div>
    </div>
  );
};

export default Login;
