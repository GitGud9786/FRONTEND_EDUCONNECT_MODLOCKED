import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TeacherCourseSideBar.css';

const TeacherSideBar = () => {
    const navigate = useNavigate(); // Hook for navigation

    return (
        <aside className='teachersidebar'>
            <button className='teachersidebarbutton'>Classrooms</button>
            <button className='teachersidebarbutton' onClick={() => navigate('/teacher/schedule/:id')}>Schedule</button>
            <button className='teachersidebarbutton'>Messages</button>
            <button className='teachersidebarbutton'>Assignments</button>
        </aside>
    );
};

export default TeacherSideBar;
