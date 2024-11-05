import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faUniversity, faAddressCard, faMapMarkerAlt, faTint } from '@fortawesome/free-solid-svg-icons';
import profilePic from '../Assets/profilePic.jpg'; 
import '../styles/Profile.css';
import TopBar from './TopBar'

const Profile = () => {
    const student = {
        id: '210041215',
        name: 'Siyam Bhuiyan',
        currentSession: '2021-2024',
        currentSemester: '5',
        country: 'Bangladesh',
        personalDetails: {
            fatherName: 'Md. Bhuiyan',
            motherName: 'Mst Bhuiyan',
            dateOfBirth: '01-01-2002',
            address: 'Dhaka, Bangladesh',
            phone: '+8801625462464536',
            email: 'siyambhuiyan@iut-dhaka.edu',
            bloodGroup: 'B+'
        },
        academicDetails: {
            department: 'Computer Science and Engineering',
            program: 'BSc in CSE',
            cgpa: '3.06',
            creditsEarned: '105',
        },
        emergencyContact: {
            name: 'lamiya',
            relationship: 'Sister',
            phone: '+8801658675876897',
        }
    };

    return (
        <div className="container-profile">
            <TopBar></TopBar>
            <div className="profile-header">
                <div className="profile-pic-container">
                    <img src={profilePic} alt="Profile" className="profile-pic" />
                </div>
                <div className="profile-header-details">
                    <h1>{student.name}</h1>
                    <p><strong>ID:</strong> {student.id}</p>
                    <p><strong>Country:</strong> {student.country}</p> 
                    <p><strong>Session:</strong> {student.currentSession}</p>
                    <p><strong>Semester:</strong> {student.currentSemester}</p>
                </div>
            </div>

            <div className="profile-details">
                <div className="card-profile">
                    <h2><FontAwesomeIcon icon={faAddressCard} /> Personal Details</h2>
                    <p><strong>Father's Name:</strong> {student.personalDetails.fatherName}</p>
                    <p><strong>Mother's Name:</strong> {student.personalDetails.motherName}</p>
                    <p><strong>Date of Birth:</strong> {student.personalDetails.dateOfBirth}</p>
                    <p><strong>Address:</strong> {student.personalDetails.address}</p>
                    <p><strong>Phone:</strong> <FontAwesomeIcon icon={faPhone} /> {student.personalDetails.phone}</p>
                    <p><strong>Email:</strong> <FontAwesomeIcon icon={faEnvelope} /> {student.personalDetails.email}</p>
                    <p><strong>Blood Group:</strong> <FontAwesomeIcon icon={faTint} /> {student.personalDetails.bloodGroup}</p>
                </div>

                <div className="card-profile">
                    <h2><FontAwesomeIcon icon={faUniversity} /> Academic Details</h2>
                    <p><strong>Department:</strong> {student.academicDetails.department}</p>
                    <p><strong>Program:</strong> {student.academicDetails.program}</p>
                    <p><strong>CGPA:</strong> {student.academicDetails.cgpa}</p>
                    <p><strong>Credits Earned:</strong> {student.academicDetails.creditsEarned}</p>
                </div>

                <div className="card-profile">
                    <h2><FontAwesomeIcon icon={faAddressCard} /> Emergency Contact</h2>
                    <p><strong>Name:</strong> {student.emergencyContact.name}</p>
                    <p><strong>Relationship:</strong> {student.emergencyContact.relationship}</p>
                    <p><strong>Phone:</strong> <FontAwesomeIcon icon={faPhone} /> {student.emergencyContact.phone}</p>
                </div>

                
                
            </div>
        </div>
    );
};

export default Profile;
