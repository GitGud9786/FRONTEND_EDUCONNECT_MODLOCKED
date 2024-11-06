import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/TeacherDashboard.css';


import profileImage from '../Assets/logo.jpg';

const TeacherTopBar = () => {
    return(
        <header className='teachertopbar'>
            <img src={profileImage} alt="Profile" className="teacherlogo" />
            <button className='teacherusername'>Ridwan Kabir, Lecturer, CSE</button>
            <button className='teacherlogout'>Log out</button>
        </header>
    );
};


const TeacherSideBar = () =>
{
    return(
        <aside className='teachersidebar'>
            <button className='teachersidebarbutton'>Classrooms</button>
            <button className='teachersidebarbutton'>Schedule</button>
            <button className='teachersidebarbutton'>Messages</button>
            <button className='teachersidebarbutton'>Assignments</button>
        </aside>
    );
};

const TeacherClass = () => {
    const [courses, setCourses] = useState([]);
  
    useEffect(() => {
      // Fetch the courses from the JSON file
      fetch('teacher_courses.json')
        .then(response => response.json())
        .then(data => setCourses(data))
        .catch(error => console.error('Error loading courses:', error));
    }, []); // Empty dependency array ensures it runs only once when the component mounts
  
    const handleCourseClick = (course) => {
      console.log('Course clicked:', course);
    };
  
    return (
      <div className="teacherclassrooms">
        {courses.map((course, index) => (
          <button key={index} className="teacherclasscard" onClick={() => handleCourseClick(course)}>
            <div className='teachertitlesection'>
              <h2 className="teachercoursetitle">{course.title}</h2>
              <p className='teachersection'>Section: {course.section}</p>
            </div>
            <div className='teachercountsemester'>
              <p className='teachercount'>Student count: {course.studentCount}</p>
              <p className='teachersemester'>Semester: {course.semester}</p>
            </div>
          </button>
        ))}
      </div>
    );
  };

const handleCourseClick = (course) => {
    alert(`You selected ${course.title}`);
};

const TeacherSchedule = () => {
    const [schedule, setSchedule] = useState([]);
  
    useEffect(() => {
      // Fetch the schedule from the JSON file
      fetch('teacher_schedules.json')
        .then(response => response.json())
        .then(data => setSchedule(data))
        .catch(error => console.error('Error loading schedule:', error));
    }, []); // Empty dependency array ensures it runs only once when the component mounts
  
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
    return (
        <div className="combinedteachercomponents">
            <TeacherTopBar />
            <div className="teachersmainsection">
                <TeacherSideBar />
                <TeacherClass />
                <TeacherSchedule />
            </div>
        </div>
    );
};

export default CombinedTeacherComponents