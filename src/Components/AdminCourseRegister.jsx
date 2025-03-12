import React, { useState, useEffect } from 'react';
import '../styles/AdminCourseRegister.css';

const AdminCourseRegister = () => {
    const [formData, setFormData] = useState({
        courseId: '',
        courseTitle: '',
        courseDescription: '',
        departmentId: '',
        courseDepartment: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

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
            const response = await fetch('http://localhost:8000/courses/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    course_id: formData.courseId,
                    title: formData.courseTitle,
                    description: formData.courseDescription,
                    department_id: formData.departmentId,
                    course_department: formData.courseDepartment,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setResponseMessage('Course created successfully!');
            } else {
                setResponseMessage(result.message || 'Error creating course.');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Failed to create course.');
        }
    };

    return (
        <form className="admindepartmentform" onSubmit={handleSubmit}>
            <h2>Course Creation Form</h2>
            <div className="admincourseformsection">
                <input
                    type="text"
                    name="courseId"
                    placeholder="Course ID"
                    value={formData.courseId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="courseTitle"
                    placeholder="Course Title"
                    value={formData.courseTitle}
                    onChange={handleChange}
                    required
                />
            </div>

            <h2>Course Details</h2>
            <div className="admindepartmentformsection">
                <textarea
                    name="courseDescription"
                    placeholder="Course Description"
                    value={formData.courseDescription}
                    onChange={handleChange}
                    required
                />
            </div>

            <h2>Department ID</h2>
            <div className="admindepartmentformsection">
                <input
                    type="text"
                    name="departmentId"
                    placeholder="Department ID"
                    value={formData.departmentId}
                    onChange={handleChange}
                    required
                />
            </div>

            <h2>Course Department</h2>
            <div className="admindepartmentformsection">
                <input
                    type="text"
                    name="courseDepartment"
                    placeholder="Course Department"
                    value={formData.courseDepartment}
                    onChange={handleChange}
                    required
                />
            </div>

            <button className='studentregisterbutton' type="submit">Create Course</button>
            {responseMessage && <p>{responseMessage}</p>}
        </form>
    );
};

export default AdminCourseRegister;
