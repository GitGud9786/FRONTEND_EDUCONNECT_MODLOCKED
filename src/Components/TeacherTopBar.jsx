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
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../Assets/logo.jpg";
import logout from "../Assets/logoutButton2.png";
import "../styles/Dashboard.css";

const TeacherTopBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const currentDate = new Date();
  const formattedDate = `${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <div className="topbar-home">
        <div className="topbar-left-home">
          <img src={logo} alt="Logo" className="logo-home" />
          <ul>
            <li>
              <NavLink
                to={`/teacherdashboard/${user.user_id}`}
                className={({ isActive }) =>
                  isActive ? "nav-home-selected" : "nav-home"
                }
              >
                <FontAwesomeIcon icon={faHome} className="icon-home" />
                <span>Home</span>
              </NavLink>

              <NavLink
                to={`/teacher/schedule/${user.user_id}`}
                className={({ isActive }) =>
                  isActive ? "nav-home-selected" : "nav-home"
                }
              >
                <FontAwesomeIcon icon={faCalendar} className="icon-home" />
                <span>Schedule</span>
              </NavLink>

              {/* <NavLink
                to={`/teacher/messages/${user.user_id}`}
                className={({ isActive }) =>
                  isActive ? "nav-home-selected" : "nav-home"
                }
              >
                <FontAwesomeIcon icon={faMessage} className="icon-home" />
                <span>Messages</span>
              </NavLink> */}

              <NavLink
                to={`/teacher/grade-assign/${user.user_id}`}
                className={({ isActive }) =>
                  isActive ? "nav-home-selected" : "nav-home"
                }
              >
                <FontAwesomeIcon icon={faClipboardList} className="icon-home" />
                <span>Assign Grades</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="topbar-right-home">
          <ul>
            <li>
              
              <span className="date-home">{formattedDate}</span>

              <div className="profile-dropdown">
                <img
                  src={logout}
                  alt="Profile"
                  className="dps"
                  onClick={toggleDropdown}
                />

                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <NavLink
                      to={`/teacherdashboard/${user.user_id}`}
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

export default TeacherTopBar;
