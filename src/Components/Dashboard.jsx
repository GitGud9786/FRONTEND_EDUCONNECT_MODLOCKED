import React from 'react'
import '../styles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faCalendar, faCheckSquare, faUsers, faEnvelope, faChartBar, faCog, faAddressBook, faSearch } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {

    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  return (
    <div className= "container">
      <div className="menubar">
        <div className="header">EDUCONNECT</div>
        <div className="menu">MENU</div>
        <div className="sidebar">
      <ul>
      <li>
          <FontAwesomeIcon icon={faDashboard} className="icon" />
          <span>Dashboard</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCalendar} className="icon" />
          <span>Schedule</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCheckSquare} className="icon" />
          <span>Course</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faUsers} className="icon" />
          <span>Students</span>
        </li>
        <li className="messages">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <span>Messages</span>
          <span className="badge">2</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faChartBar} className="icon" />
          <span>Assignments</span>
        </li>
      </ul>
        </div>

        <div className="border"></div>

        <div className="menu">GENERAL</div>
        <div className="sidebar">
      <ul>
      <li>
          <FontAwesomeIcon icon={faCog} className="icon" />
          <span>Settings</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faAddressBook} className="icon" />
          <span>Contact</span>
        </li>
        
      </ul>
        </div>
      </div>
      

      <div className="main">
        <div className="top">
            <div className="search">
                <input type="Search" placeholder="Search"/>
                <FontAwesomeIcon icon={faSearch} className="seicon"/>
            </div>

            <div className="detes">
                <span>John Doe</span>
                <span><strong>Student</strong></span>
            </div>
                
            <div className="dates">
                <span className="date">{formattedDate}</span>
            </div>
        </div>
        
        <div className="header2">Dashboard</div>
      </div>
    </div>
  )
}

export default Dashboard
