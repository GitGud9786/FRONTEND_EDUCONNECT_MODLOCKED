import React from 'react'
import '../styles/Dashboard.css'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendar, faBook, faChartBar, faCog, faTh, faList, faMessage } from '@fortawesome/free-solid-svg-icons';
import { faHome, faCalendar, faBook, faChartBar, faCog, faUser, faMessage } from '@fortawesome/free-solid-svg-icons';
import logo from '../Assets/logo.jpg';


const TopBar = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  return (
    <div>
      <div className="topbar-home">
        <div className="topbar-left-home">
        <img src={logo} alt="" className="logo-home" />
        <ul>
          <li >
          <Link to = "/dash" className="nav-home-selected">
            <FontAwesomeIcon icon={faHome} className="icon-home" />
            <span>Home</span>
          </Link>

          <Link to = "/course" className="nav-home">
            <FontAwesomeIcon icon={faBook} className="icon-home" />
            <span>Courses</span>
          </Link>
          
          <Link to = "/schedule" className="nav-home">
            <FontAwesomeIcon icon={faCalendar} className="icon-home" />
            <span>Schedule</span>
          </Link>

          <Link to = "/messages" className="nav-home">
            <FontAwesomeIcon icon={faMessage} className="icon-home" />
            <span>Messages</span>
          </Link>

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
              <span className="date-home">Shahir Awlad</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TopBar
