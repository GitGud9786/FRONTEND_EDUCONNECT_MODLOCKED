import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TeacherTopBar.css';

import profileImage from '../Assets/logo.jpg';

const TeacherTopBar = ({ teacherName }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add any logout logic here (e.g., clearing tokens, resetting state)
        navigate('/'); // Redirect to the logout route
    };

    return (
        <header className='teachertopbar'>
            <img src={profileImage} alt="Profile" className="teacherlogo" />
            <button className='teacherusername'>{teacherName}</button>
            <button className='teacherlogout' onClick={handleLogout}>Log out</button>
        </header>
    );
};

export default TeacherTopBar;
