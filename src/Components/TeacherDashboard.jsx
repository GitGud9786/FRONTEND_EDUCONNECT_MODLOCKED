import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import TeacherTopBar from "./TeacherTopBar";
import '../styles/TeacherDashboard.css';

const TeacherClass = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`http://localhost:8000/teacherassign/courses/${id}`);
                const data = await response.json();
                console.log('Fetched courses:', data); // Log the fetched data
                if (Array.isArray(data)) {
                    setCourses(data);
                } else {
                    console.error('Fetched data is not an array:', data);
                }
            } catch (error) {
                console.error('Error loading courses:', error);
            }
        };

        fetchCourses();
    }, [id]);

    const handleCourseClick = (course) => {
        navigate(`/teacher/teacherclassroom/${id}`, { state: { course } });
    };

    return (
        <div className="teacherclassrooms">
            {Array.isArray(courses) && courses.length > 0 ? (
                courses.map((course, index) => (
                    <button key={index} className="teacherclasscard" onClick={() => handleCourseClick(course)}>
                        <div className='teachertitlesection'>
                            <h2 className="teachercoursetitle">{course.title}</h2>
                            <p className='teachersection'><strong>Section :</strong> 1 & 2</p>
                        </div>
                        <div className='teachercountsemester'>
                            {/* <p className='teachercount'>Student count: {course.student_count}</p> */}
                            <p className='teachersemester'>Semester: {course.semester}</p>
                        </div>
                    </button>
                ))
            ) : (
                <p>No courses available.</p>
            )}
        </div>
    );
};

const TeacherSchedule = () => {
    const [events, setEvents] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`http://localhost:8000/teacher/get-event/${id}`);
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [id]);

    const deleteEvent = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:8000/teacher/delete-event/${eventId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <aside className="teacherschedule">
            <h3>Upcoming Schedule</h3>
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
        </aside>
    );
};

const CombinedTeacherComponents = () => {
    const [teacherInfo, setTeacherInfo] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchTeacherInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8000/teacher/read/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched teacher info:', data);
                if (data.length > 0) {
                    setTeacherInfo(data[0]);
                } else {
                    console.error('No teacher info found');
                }
            } catch (error) {
                console.error('Error loading teacher info:', error);
            }
        };

        fetchTeacherInfo();
    }, [id]);

    return (
        <div className="combinedteachercomponents">
            <TeacherTopBar />
            <div className="teachersmainsection">
                <aside className="teachersidebar">
                    <h1>Teacher Info</h1>
                    <p><strong>Name : </strong> {teacherInfo.name}</p>
                    <p><strong>Email:</strong> {teacherInfo.email}</p>    
                </aside>
                <TeacherClass />
                <TeacherSchedule />
            </div>
        </div>
    );
};

export default CombinedTeacherComponents;