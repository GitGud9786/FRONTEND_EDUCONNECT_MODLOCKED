import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Dashboard.css';
import '../styles/Schedule.css';
import CourseCard from './CourseCard';
import TopBar from './TopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const { student_id: paramStudentId } = useParams();
  const [studentId, setStudentId] = useState(paramStudentId || null);
  const [events, setEvents] = useState([]);

  // Fetch events based on student ID
  useEffect(() => {
    if (!studentId) {
      const currentUrl = window.location.href;
      const extractedId = currentUrl.split('/').pop();
      setStudentId(extractedId);
    }
  }, [studentId]);

  useEffect(() => {
    if (studentId) {
      const fetchEvents = async () => {
        try {
          const response = await fetch(`http://localhost:8000/students/get-event/${studentId}`);
          const data = await response.json();
          setEvents(data);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
      fetchEvents();
    }
  }, [studentId]);

  // Function to handle event deletion
  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:8000/students/delete-event/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the event from the UI by filtering it out of the events array
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      } else {
        console.error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

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
      courseTitle: 'CSE 4501: Operating Systems',
      instructorName: 'Ridwan Kabir',
      section: '2B',
      imageUrl: 'https://cse.iutoic-dhaka.edu/uploads/img/1601107075_1082.jpg',
      dueDate: 'Thursday',
      task: 'Lab Report Submission',
    },
  ];

  return (
    <div className="container-home">
      <TopBar />
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
              <Link to="/dash/assignment" key={index}>
                <CourseCard {...course} />
              </Link>
            ))}
          </div>
        </div>

        <div className="main-right-home">
          <div className="schedule-section">
            <h2>Upcoming Tasks for me</h2>
            <div>
              {Array.isArray(events) && events.length === 0 ? (
                <p>No events scheduled</p>
              ) : (
                Array.isArray(events) && events.map((event) => (
                  <div key={event.id} className="event-card">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p>
                      {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}
                    </p>
                    <button onClick={() => deleteEvent(event.id)} className="delete-button">Delete</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
