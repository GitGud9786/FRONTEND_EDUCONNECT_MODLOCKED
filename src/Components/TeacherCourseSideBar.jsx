import React from 'react';
import '../styles/TeacherCourseSideBar.css';

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

export default TeacherSideBar;