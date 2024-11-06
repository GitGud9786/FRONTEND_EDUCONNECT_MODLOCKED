import React from 'react';
import { NavLink ,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendar, faBook, faChartBar, faCog, faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../Assets/logo.jpg';
import '../styles/Dashboard.css';

const TopBar = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  return (
    <div>
      <div className="topbar-home">
        <div className="topbar-left-home">
          <img src={logo} alt="Logo" className="logo-home" />
          <ul>
            <li>
              <NavLink
                to="/dash"
                className={({ isActive }) =>
                  isActive ? "nav-home-selected" : "nav-home"
                }
              >
                <FontAwesomeIcon icon={faHome} className="icon-home" />
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/courselist"
                className={({ isActive }) =>
                  isActive ? "nav-home-selected" : "nav-home"
                }
              >
                <FontAwesomeIcon icon={faBook} className="icon-home" />
                <span>Courses</span>
              </NavLink>

              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  isActive ? "nav-home-selected" : "nav-home"
                }
              >
                <FontAwesomeIcon icon={faCalendar} className="icon-home" />
                <span>Schedule</span>
              </NavLink>

              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  isActive ? "nav-home-selected" : "nav-home"
                }
              >
                <FontAwesomeIcon icon={faMessage} className="icon-home" />
                <span>Messages</span>
              </NavLink>

              <button className="nav-home">
                <FontAwesomeIcon icon={faChartBar} className="icon-home" />
                <span>Grades</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="topbar-right-home">
          <ul>
            <li>
              <button className="nav-home">
                <FontAwesomeIcon icon={faCog} className="icon-home" />
              </button>
              <span className="date-home">{formattedDate}</span>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav-home-selected" : "nav-home"
                }
              >
                <FontAwesomeIcon icon={faUser} className="icon-home" />
                <span>Siyam Bhuiyan</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
