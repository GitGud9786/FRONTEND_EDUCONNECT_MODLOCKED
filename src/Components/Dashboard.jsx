import React from 'react'
import '../styles/Dashboard.css'
import CourseCard from './CourseCard';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendar, faBook, faChartBar, faCog, faTh, faList, faMessage } from '@fortawesome/free-solid-svg-icons';
import TopBar from "./TopBar";

const Dashboard = () => {
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
      <TopBar/>
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
                        <CourseCard key={index} {...course} />
                    ))}
          </div>
        </div>

        <div className="main-right-home">
          <h1>To Do</h1>
          
          <div className="view-home">
            <button className="nav-home-selected">
              <span>All</span>
            </button>
            <button className="nav-home">
              <span>Assignments</span>
            </button>
            <button className="nav-home">
              <span>Others</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard