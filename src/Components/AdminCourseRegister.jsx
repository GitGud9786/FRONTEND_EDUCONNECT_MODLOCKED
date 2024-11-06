import React, { useState } from 'react';
import '../styles/AdminCourseRegister.css';

const AdminCourseRegister = () => {
    const [formData, setFormData] = useState({
        courseName: '',
        courseCode: '',
        courseID: '',
        courseDuration: '',
        courseInformation: '',
        courseDepartment: ''
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
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
                name="courseCode"
                placeholder="Course code"
                value={formData.courseCode}
                onChange={handleChange}
            />
            <input
                type="text"
                name="courseDuration"
                placeholder="Dedicated duration"
                value={formData.courseDuration}
                onChange={handleChange}
            />
            <select className='admincourseselect'>
                type="text"
                name="courseDepartment"
                placeholder="Department of the Course"
                 value={formData.courseDepartment}
                 onChange={handleChange}
                 <option value="null">Location</option>
                <option value="AB1">Computer Science and Engineering</option>
                <option value="AB2">Electrical and Electronics Engineering</option>
                <option value="AB2">Mechanical and Production Engineering</option>
                <option value="AB2">Civil and Environmental Engineering</option>
                <option value="AB2">Industrial and Production Engineering</option>
                <option value="AB2">Business Technology and Management</option>
            </select>

            <div className='admincourseinforegister'>
                <h2>Course Description Block</h2>
                <textarea
                    type="text"
                    name="courseInformation"
                    placeholder="Description"
                    value={formData.courseInformation}
                    onChange={handleChange}
                />
                </div>
            </div>
            <button className='studentregisterbutton' type="submit">Register this student</button>
        </form>
    );
};

export default AdminCourseRegister;
