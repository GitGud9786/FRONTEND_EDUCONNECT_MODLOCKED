import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

import bike_icon from '../Assets/bike.png';
import logo from '../Assets/logo.jpg';
import std from '../Assets/student.png';
import bulb from '../Assets/bulb.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate(); // for programmatic navigation

  const handleLogin = (e) => {
    e.preventDefault(); // prevent the default form submission behavior
    console.log("Email:", email);
    console.log("Password:", password);

    // After logging in, you can navigate to the dashboard
    navigate('/dash');
  };

  const AnimatedImage = () => {
    return (
      <div>
        <img src={std} alt="Expanding Image" className='bulb-login'/>
      </div>
    );
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

          <div className="submit-container">
            <div className="submit" onClick={handleLogin}>
              {/* Removed the <Link> and used navigate directly in handleLogin */}
              Login
            </div>
          </div>
        </div>
      </div>

      <div className="right" style={{position: 'relative'}}>
        <img src={std} alt="" className="student-login"/>
        <img src={bulb} alt="" className="bulb-login" />
      </div>
    </div>
  );
};

export default Login;
