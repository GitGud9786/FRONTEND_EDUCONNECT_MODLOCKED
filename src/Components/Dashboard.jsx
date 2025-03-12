import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Dashboard.css';
import '../styles/Schedule.css';
import CourseCard from './CourseCard';
import TopBar from './TopBar';

const Dashboard = () => {
  const { student_id: paramStudentId } = useParams();
  const [studentId, setStudentId] = useState(paramStudentId || null);
  const [events, setEvents] = useState([]);
  const [courses, setCourses] = useState([]);

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

  useEffect(() => {
    if (studentId) {
      const fetchCourses = async () => {
        try {
          // Fetch all course IDs for the student
          const enrollmentsResponse = await fetch(`http://localhost:8000/studentenroll/enrollments/${studentId}`);
          const enrollments = await enrollmentsResponse.json();

          const courseDataPromises = enrollments.map(async (enrollment) => {
            const { course_id } = enrollment;

            // Fetch the course details
            const courseResponse = await fetch(`http://localhost:8000/courses/read/${course_id}`);
            const course = await courseResponse.json();

            // Fetch the teacher assignment for the course
            const assignmentResponse = await fetch(`http://localhost:8000/teacherassign/teacher/${course_id}`);
            const assignment = await assignmentResponse.json();
            const { teacher_id } = assignment;

            // Fetch the teacher details
            const teacherResponse = await fetch(`http://localhost:8000/teacher/read/${teacher_id}`);
            const teacher = await teacherResponse.json();

            return {
              courseID: course[0].course_id,
              courseTitle: course[0].title,
              teacherName: teacher[0].name,
              teacherDesignation: teacher[0].designation,
            };
          });

          const courseData = await Promise.all(courseDataPromises);
          setCourses(courseData);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
      fetchCourses();
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

  return (
    <div className="container-home">
      <TopBar />
      <div className="main-home">
        <div className="main-left-home">
          <div className="maintop-home">
            <h1>Home</h1>
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
