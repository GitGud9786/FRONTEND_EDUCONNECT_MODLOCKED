import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/Login.css'

import bike_icon from '../Assets/bike.png'
import logo from '../Assets/logo.jpg'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Email:", email);
        console.log("Password:", password);
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
                  <Link to="/dash" className="link">Login</Link>
                </div>
            </div>
        </div>
      </div>

      <div className="right">
        <img src={bike_icon} alt="" />
      </div>
    </div>
  )
}

export default Login
