import React from 'react'
import '../styles/Dashboard.css'
import CourseCard from './CourseCard';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faCalendar, faCheckSquare, faUsers, faEnvelope, faChartBar, faCog, faAddressBook, faSearch } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {

    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    

    const courses = [
      {
        courseTitle: 'CSE 4601: Computer Networks',
        instructorName: 'Dr. Hasan Mahmud',
        section: '3A',
        imageUrl: 'https://cse.iutoic-dhaka.edu/uploads/img/1727449400_1902.jpg',
        dueDate: 'Wednesday',
        task: 'Quiz on Chapter 4',
      },
      {
        courseTitle: 'CSE 4705: Artificial Intelligence',
        instructorName: 'Sabbir Ahmed',
        section: '1A',
        imageUrl: 'https://cse.iutoic-dhaka.edu/uploads/img/1727033840_1989.png',
        dueDate: 'Friday',
        task: 'Project Proposal Submission',
      },
      {
        courseTitle: 'EEE 2411: Digital Electronics',
        instructorName: 'Ridwan Kabir',
        section: '2B',
        imageUrl: 'https://cse.iutoic-dhaka.edu/uploads/img/1601107075_1082.jpg',
        dueDate: 'Thursday',
        task: 'Lab Report Submission',
      },



      // Add more courses as needed
    ];


  return (
    <div className= "container">
      <div className="menubar">
        <div className="header">EDUCONNECT</div>
        <div className="menu">MENU</div>
        <div className="sidebar-shahir">
      <ul>
      <li>
          <FontAwesomeIcon icon={faDashboard} className="icon-shahir" />
          <span>Dashboard</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCalendar} className="icon-shahir" />
          <span>Schedule</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCheckSquare} className="icon-shahir" />
          <Link to="/course" className="link">Course</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faUsers} className="icon-shahir" />
          <span>Students</span>
        </li>
        <li className="messages-shahir">
          <FontAwesomeIcon icon={faEnvelope} className="icon-shahir" />
          <span>Messages</span>
          <span className="badge-shahir">2</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faChartBar} className="icon-shahir" />
          <span>Assignments</span>
        </li>
      </ul>
        </div>

        <div className="border-shahir"></div>

        <div className="menu">GENERAL</div>
        <div className="sidebar-shahir">
      <ul>
      <li>
          <FontAwesomeIcon icon={faCog} className="icon-shahir" />
          <span>Settings</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faAddressBook} className="icon-shahir" />
          <span>Contact</span>
        </li>
        
      </ul>
        </div>
      </div>
      

      <div className="main-shahir">
        <div className="top-shahir">
            <div className="search-shahir">
                <input type="Search-shahir" placeholder="Search"/>
                <FontAwesomeIcon icon={faSearch} className="seicon-shahir"/>
            </div>

            <div className="detes-shahir">
                <span>Oshayer Siddique</span>
                <span><strong>Student</strong></span>
            </div>
                
            <div className="dates-shahir">
                <span className="date-shahir">{formattedDate}</span>
            </div>
        </div>
        
        <div className="header2-shahir">Dashboard</div>
        <h2>Courses</h2>
                <div className="course-grid">
                    {courses.map((course, index) => (
                        <CourseCard key={index} {...course} />
                    ))}
                </div>
      </div>
      
    </div>
  )
}

export default Dashboard
