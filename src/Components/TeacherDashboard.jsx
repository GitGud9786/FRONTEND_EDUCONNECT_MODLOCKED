import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TeacherTopBar from "./TeacherTopBar";
import TeacherSideBar from './TeacherCourseSideBar';
import TeacherCourseClassroom from './TeacherCourseClassroom';
import '../styles/TeacherDashboard.css';

const TeacherClass = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const response = await fetch(`http://localhost:8000/teacherassign/courses/${user.user_id}`);
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
    }, []);

    const handleCourseClick = (course) => {
        navigate('/teacherclassroom');
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
                const response = await fetch('teacher_schedules.json');
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
    const [teacherName, setTeacherName] = useState('');

    useEffect(() => {
        const fetchTeacherInfo = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const response = await fetch(`http://localhost:8000/teacher/read/${user.user_id}`);
                const data = await response.json();
                console.log('Fetched teacher info:', data); // Log the fetched data
                if (data.length > 0) {
                    setTeacherName(data[0].name);
                } else {
                    console.error('No teacher info found');
                }
            } catch (error) {
                console.error('Error loading teacher info:', error);
            }
        };

        fetchTeacherInfo();
    }, []);

    return (
        <div className="combinedteachercomponents">
            <TeacherTopBar teacherName={teacherName} />
            <div className="teachersmainsection">
                <TeacherSideBar />
                <TeacherClass />
                <TeacherSchedule />
            </div>
        </div>
    );
};

export default CombinedTeacherComponents;