import React, { useState } from  'react';
import './sidebar.css';
const Sidebar = () =>
{
    const [select,setSelect] = useState("");
    const handleItem = (item) => {
        setSelect(item);
    }
    return(
        <div className='sidebar'>
            <ul>
                <li className={select === 'Home' ? 'select':''}
                onClick={() => handleItem('Home')}>Home</li>

                <li className={select === 'Syllabus' ? 'select':''}
                onClick={() => handleItem('Syllabus')}>Syllabus</li>
                
                <li className={select === 'Announcements' ? 'select':''}
                onClick={() => handleItem('Announcements')}>Announcements</li>
                
                <li className={select === 'Grades' ? 'select':''}
                onClick={() => handleItem('Grades')}>Grades</li>
                
                <li className={select === 'Modules' ? 'select':''}
                onClick={() => handleItem('Modules')}>Modules</li>
            </ul>
        </div>
    );
};
export default Sidebar;