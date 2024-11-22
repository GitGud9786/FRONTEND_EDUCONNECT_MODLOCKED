import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/TeacherTopBar.css';

import profileImage from '../Assets/logo.jpg';

const TeacherTopBar = () => {
    const navigate = useNavigate(); // Initialize navigation

    const handleLogout = () => {
        // Add any logout logic here (e.g., clearing tokens, resetting state)
        navigate('/'); // Redirect to the logout route
    };

    return (
        <header className='teachertopbar'>
            <img src={profileImage} alt="Profile" className="teacherlogo" />
            <button className='teacherusername'>Ridwan Kabir, Lecturer, CSE</button>
            <button className='teacherlogout' onClick={handleLogout}>Log out</button>
        </header>
    );
};

export default TeacherTopBar;
