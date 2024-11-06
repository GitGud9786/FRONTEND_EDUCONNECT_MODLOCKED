import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPanel.css';
import logo from '../Assets/logo.jpg';
import admincourse from '../Assets/admincourse.png';
import adminfaculty from '../Assets/adminfaculty.png';
import adminreview from '../Assets/adminreview.png';
import adminstudent from '../Assets/adminstudent.png'; 
import admindepartment from '../Assets/admindepartment.png';

const AdminPanel = () => {
    return (
        <div className = 'adminpanel'>
            <div className='admintopbar'>
                <img src={logo} alt='adminlogo' />
                <a href='/' className='adminlogout'>Log out</a>
            </div>

            <h1 className='adminitle'>ADMIN PANEL</h1>
            <hr className="admindivider" />

            <div className="adminpanelgrid">
                <Link to = "/stdadmin" className = "adminpanelitem">
                    <img src={adminstudent} alt="Students" className="panel-icon" />
                    <p>Students</p>
                </Link>
                <div className="adminpanelitem">
                    <img src={adminfaculty} alt="Faculties" className="panel-icon" />
                    <p>Faculties</p>
                </div>
                <div className="adminpanelitem">
                    <img src={admincourse} alt="Courses" className="panel-icon" />
                    <p>Courses</p>
                </div>
                <div className="adminpanelitem">
                    <img src={admindepartment} alt="Departments" className="panel-icon" />
                    <p>Departments</p>
                </div>
                
            </div>
            <div className="adminevaluation">
                    <img src={adminreview} alt="Review students' evaluation" className="panel-icon" />
                    <p>Review student's evaluation</p>
                </div>
        </div>
    );
};

export default AdminPanel;