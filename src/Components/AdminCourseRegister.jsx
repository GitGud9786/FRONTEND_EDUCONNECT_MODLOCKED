import React, { useState } from 'react';
import '../styles/AdminCourseRegister.css';

const AdminCourseRegister = () => {
    const [formData, setFormData] = useState({
        courseName: '',
        courseID: '',
        courseInformation: '',
        courseDepartment: '',
    });

    const [message, setMessage] = useState(''); // To show success/error message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/courses/create', { // Adjust this URL if needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    course_id: formData.courseID,
                    department_id: 1, // Set this based on your form or default
                    course_department: formData.courseDepartment,
                    title: formData.courseName,
                    description: formData.courseInformation,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message}`);
            } else {
                const result = await response.json();
                setMessage('Course successfully created!');
                console.log('Course created:', result);
            }
        } catch (error) {
            console.error('Error creating course:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <form className='admincourseform' onSubmit={handleSubmit}>
            <h2>Course Registration Details</h2>
            <div className='admincourseformsection'>
                <input
                    type="text"
                    name="courseName"
                    placeholder="Name of course"
                    value={formData.courseName}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="courseID"
                    placeholder="Course code"
                    value={formData.courseID}
                    onChange={handleChange}
                />
                <select
                    className='admincourseselect'
                    name="courseDepartment"
                    value={formData.courseDepartment}
                    onChange={handleChange}
                >
                    <option value="">Department</option>
                    <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                    <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
                    <option value="Mechanical and Production Engineering">Mechanical and Production Engineering</option>
                    <option value="Civil and Environmental Engineering">Civil and Environmental Engineering</option>
                    <option value="Industrial and Production Engineering">Industrial and Production Engineering</option>
                    <option value="Business Technology and Management">Business Technology and Management</option>
                </select>

                <div className='admincourseinforegister'>
                    <h2>Course Description Block</h2>
                    <textarea
                        name="courseInformation"
                        placeholder="Description"
                        value={formData.courseInformation}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button className='studentregisterbutton' type="submit">Register this course</button>
            {message && <p>{message}</p>} {/* Display success/error message */}
        </form>
    );
};

export default AdminCourseRegister;
