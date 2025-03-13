import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPanel.css';
import logo from '../Assets/logo.jpg';
import admincourse from '../Assets/admincourse.png';
import adminfaculty from '../Assets/adminfaculty.png';
import enroll from '../Assets/enroll.png';
import adminstudent from '../Assets/adminstudent.png'; 
import admindepartment from '../Assets/admindepartment.png';
import teacher from '../Assets/teacherAssign.png';


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
                <Link to = "/admin/student" className = "adminpanelitem">
                    <img src={adminstudent} alt="Students" className="panel-icon" />
                    <p>Students</p>
                </Link>
                <Link to = "/admin/teacher" className = "adminpanelitem">
                    <img src={teacher} alt="Faculties" className="panel-icon" />
                    <p>Teachers</p>
                </Link>
                <Link to = "/admin/course" className = "adminpanelitem">
                    <img src={admincourse} alt="Courses" className="panel-icon" />
                    <p>Courses</p>
                </Link>
                <Link to = "/admin/department" className = "adminpanelitem">
                    <img src={admindepartment} alt="Faculties" className="panel-icon" />
                    <p>Departments</p>
                </Link>


                <Link to = "/admin/student-enroll" className = "adminpanelitem">
                    <img src={enroll} alt="course-enroll" className="panel-icon" />
                    <p>Student Course Enrollment</p>
                </Link>

                <Link to = "/admin/teacher-assignment" className = "adminpanelitem">
                    <img src={adminfaculty} alt="course-enroll" className="panel-icon" />
                    <p>Teacher Course Assign</p>
                </Link>
                
            </div>
        </div>
    );
};

export default AdminPanel;