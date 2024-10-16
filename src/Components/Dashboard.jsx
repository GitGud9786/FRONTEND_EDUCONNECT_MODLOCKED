import React from 'react'
import '../styles/Dashboard.css'
import CourseCard from './CourseCard';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendar, faBook, faChartBar, faCog, faMessage, faTh, faList } from '@fortawesome/free-solid-svg-icons';
import logo from '../Assets/logo.jpg';

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
    <div className="container-home">
      <div className="topbar-home">
        <div className="topbar-left-home">
        <img src={logo} alt="" className="logo-home" />
        <ul>
          <li >
          <button className="nav-home-selected">
            <FontAwesomeIcon icon={faHome} className="icon-home" />
            <span>Home</span>
          </button>

          <Link to = "/course" className="nav-home">
            <FontAwesomeIcon icon={faBook} className="icon-home" />
            <span>Courses</span>
          </Link>
          
          <button className="nav-home">
            <FontAwesomeIcon icon={faCalendar} className="icon-home" />
            <span>Schedule</span>
          </button>

          <button className="nav-home">
            <FontAwesomeIcon icon={faMessage} className="icon-home" />
            <span>Messages</span>
          </button>

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

      <div className="main-home">
        <div className="main-left-home">
          <div className="maintop-home">
            <h1>Home</h1>

            <div className="view-home">
              <button className="nav-home-selected">
                <FontAwesomeIcon icon={faTh} className="icon-home" />
                <span>GridView</span>
              </button>
              <button className="nav-home">
                <FontAwesomeIcon icon={faList} className="icon-home" />
                <span>ListView</span>
              </button>
            </div> 
          </div>

          <div className="cards-home">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
