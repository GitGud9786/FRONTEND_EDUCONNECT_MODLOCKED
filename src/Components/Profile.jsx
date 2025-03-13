import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faUniversity, faAddressCard, faTint } from '@fortawesome/free-solid-svg-icons';
import studentLogo from '../Assets/studentLogo.png';
import '../styles/Profile.css';
import TopBar from './TopBar';

const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [country, setCountry] = useState("Not Available");

    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8000/students/read/${id}`);
                const data = await response.json();
                if (data.length > 0) {
                    const studentData = data[0];
                    setStudent(studentData);

                    // Extract country from address
                    const address = studentData.address || "";
                    const match = address.match(/(.*?)(\d{5})/); // Match any characters before the 5-digit postcode
                    if (match && match[1]) {
                        setCountry(match[1].trim());
                    }
                } else {
                    console.error('No student info found');
                }
            } catch (error) {
                console.error('Error loading student info:', error);
            }
        };

        fetchStudentInfo();
    }, [id]);

    if (!student) {
        return <p>Loading...</p>; // Display while fetching student data
    }

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const infoCards = [
        { label: "Father's Name", value: student.father_name },
        { label: "Mother's Name", value: student.mother_name },
        { label: "Date of Birth", value: formatDate(student.date_of_birth) },
        { label: "Address", value: student.address },
        { label: "Phone", value: student.phone_number, icon: faPhone },
        { label: "Email", value: student.email, icon: faEnvelope },
        { label: "Blood Group", value: student.blood_group, icon: faTint },
        // { label: "Department", value: student.department },
        { label: "Program", value: student.program },
        { label: "CGPA", value: student.cgpa },
        { label: "Credits Earned", value: student.credits_earned },
        { label: "Emergency Contact Name", value: student.emergency_contact?.name },
        { label: "Relationship", value: student.emergency_contact?.relationship },
        { label: "Emergency Contact Phone", value: student.emergency_contact?.phone, icon: faPhone },
    ];

    return (
        <div className="container-profile">
            <TopBar />
            <div className="profile-header">
                <div className="profile-pic-container">
                    <img src={studentLogo} alt="Profile" className="profile-pic" />
                </div>
                <div className="profile-header-details">
                    <h1>{student.name}</h1>
                    <p><strong>ID:</strong> {student.student_id}</p>
                    <p><strong>Country : </strong> Bangladesh </p>
                    <p><strong>Department : </strong> {student.department || "Not Available"}</p>
                    <p><strong>Semester : </strong> 5th</p>
                </div>
            </div>

            <div className="profile-details">
                <div className="card-profile">
                    <h2><FontAwesomeIcon icon={faAddressCard} /> Personal & Academic Details</h2>
                    {infoCards.map((info, index) => (
                        info.value && (
                            <div key={index} className={`info-card ${index % 2 === 0 ? 'even' : 'odd'}`}>
                                <p>
                                    <strong>{info.label}:</strong> {info.icon && <FontAwesomeIcon icon={info.icon} />} {info.value}
                                </p>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;