import React from 'react';
import { NavLink ,Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher, faBook, faBuilding, faStar, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
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
                to="/admin/student"
                className={({ isActive }) =>
                  isActive ? "nav-home-selected" : "nav-home"
                }
              >
                <FontAwesomeIcon icon={faUserGraduate} className="icon-home" />
                <span>Students</span>
              </NavLink>

              <NavLink
                to="/admin/faculty"
                className={({ isActive }) =>
                  isActive ? "nav-home-selected" : "nav-home"
                }
              >
                <FontAwesomeIcon icon={faChalkboardTeacher} className="icon-home" />
                <span>Faculties</span>
              </NavLink>

              <NavLink
                to="/admin/course"
                className={({ isActive }) =>
                  isActive ? "nav-home-selected" : "nav-home"
                }
              >
                <FontAwesomeIcon icon={faBook} className="icon-home" />
                <span>Courses</span>
              </NavLink>

              <NavLink
                to="/admin/department"
                className={({ isActive }) =>
                  isActive ? "nav-home-selected" : "nav-home"
                }
              >
                <FontAwesomeIcon icon={faBuilding} className="icon-home" />
                <span>Departments</span>
              </NavLink>

              <button className="nav-home">
                <FontAwesomeIcon icon={faStar} className="icon-home" />
                <span>Review</span>
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
