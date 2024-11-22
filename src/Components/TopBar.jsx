import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendar,
  faBook,
  faChartBar,
  faCog,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../Assets/logo.jpg";
import dp from "../Assets/dp.jpg";
import "../styles/Dashboard.css";

const TopBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const currentDate = new Date();
  const formattedDate = `${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

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

              <NavLink
                to="/grades"
                className={({ isActive }) =>
                  isActive ? "nav-home-selected" : "nav-home"
                }
              >
                <FontAwesomeIcon icon={faChartBar} className="icon-home" />
                <span>Grades</span>
              </NavLink>
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

              <div className="profile-dropdown">
                <img
                  src={dp}
                  alt="Profile"
                  className="dps"
                  onClick={toggleDropdown}
                />

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <NavLink
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </NavLink>
                    <NavLink to="/" onClick={() => setDropdownOpen(false)}>
                      LogOut
                    </NavLink>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
