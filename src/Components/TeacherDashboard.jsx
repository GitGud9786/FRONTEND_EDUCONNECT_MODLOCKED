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
                            <p className='teachersection'>Section: {course.section}</p>
                        </div>
                        <div className='teachercountsemester'>
                            <p className='teachercount'>Student count: {course.student_count}</p>
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
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await fetch('http://localhost:8000/teacher/schedule'); // Ensure the correct endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setSchedule(data);
            } catch (error) {
                console.error('Error loading schedule:', error);
            }
        };

        fetchSchedule();
    }, []);

    return (
        <aside className="teacherschedule">
            <h3>Upcoming Schedule</h3>
            {schedule.map((item, index) => (
                <div key={index} className="teacherscheduleitem">
                    {item.course}
                </div>
            ))}
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