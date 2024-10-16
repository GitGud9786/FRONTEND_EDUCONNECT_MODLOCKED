import React from 'react'
import '../styles/Dashboard.css'
import CourseCard from './CourseCard';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendar, faCheckSquare, faUsers, faEnvelope, faChartBar, faCog, faAddressBook, faSearch } from '@fortawesome/free-solid-svg-icons';
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
        <img src={logo} alt="" className="logo-home" />
        <ul>
          <li>
          <button className="nav-home-selected">
            <FontAwesomeIcon icon={faHome} className="icon-home" />
            <span>Home</span>
          </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
