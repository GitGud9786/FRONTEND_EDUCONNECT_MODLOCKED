import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faUniversity, faAddressCard, faTint } from '@fortawesome/free-solid-svg-icons';
import profilePic from '../Assets/profilePic.jpg'; 
import '../styles/Profile.css';
import TopBar from './TopBar';

const Profile = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const storedStudent = localStorage.getItem("student");

        if (storedStudent) {
            setStudent(JSON.parse(storedStudent));
        } else {
            navigate('/login'); // Redirect if no student is logged in
        }
    }, [navigate]);

    if (!student) {
        return <p>Loading...</p>; // Display while fetching student data
    }

    return (
        <div className="container-profile">
            <TopBar />
            <div className="profile-header">
                <div className="profile-pic-container">
                    <img src={profilePic} alt="Profile" className="profile-pic" />
                </div>
                <div className="profile-header-details">
                    <h1>{student.name}</h1>
                    <p><strong>ID:</strong> {student.student_id}</p>
                    <p><strong>Country:</strong> {student.country || "Not Available"}</p>
                    <p><strong>Session:</strong> {student.session || "Not Available"}</p>
                    <p><strong>Semester:</strong> {student.semester || "Not Available"}</p>
                </div>
            </div>

            <div className="profile-details">
                <div className="card-profile">
                    <h2><FontAwesomeIcon icon={faAddressCard} /> Personal Details</h2>
                    <p><strong>Father's Name:</strong> {student.father_name || "N/A"}</p>
                    <p><strong>Mother's Name:</strong> {student.mother_name || "N/A"}</p>
                    <p><strong>Date of Birth:</strong> {student.date_of_birth || "N/A"}</p>
                    <p><strong>Address:</strong> {student.address || "N/A"}</p>
                    <p><strong>Phone:</strong> <FontAwesomeIcon icon={faPhone} /> {student.phone_number || "N/A"}</p>
                    <p><strong>Email:</strong> <FontAwesomeIcon icon={faEnvelope} /> {student.email}</p>
                    <p><strong>Blood Group:</strong> <FontAwesomeIcon icon={faTint} /> {student.blood_group || "N/A"}</p>
                </div>

                <div className="card-profile">
                    <h2><FontAwesomeIcon icon={faUniversity} /> Academic Details</h2>
                    <p><strong>Department:</strong> {student.department || "N/A"}</p>
                    <p><strong>Program:</strong> {student.program || "N/A"}</p>
                    <p><strong>CGPA:</strong> {student.cgpa || "N/A"}</p>
                    <p><strong>Credits Earned:</strong> {student.credits_earned || "N/A"}</p>
                </div>

                <div className="card-profile">
                    <h2><FontAwesomeIcon icon={faAddressCard} /> Emergency Contact</h2>
                    <p><strong>Name:</strong> {student.emergency_contact?.name || "N/A"}</p>
                    <p><strong>Relationship:</strong> {student.emergency_contact?.relationship || "N/A"}</p>
                    <p><strong>Phone:</strong> <FontAwesomeIcon icon={faPhone} /> {student.emergency_contact?.phone || "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
