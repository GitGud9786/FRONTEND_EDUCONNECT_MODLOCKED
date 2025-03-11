import React, { useState } from "react";
import "../styles/AdminDepartmentRegister.css";

const AdminDepartmentRegister = () => {
  const [formData, setFormData] = useState({
    departmentId: "",
    departmentName: "",
    departmentEmail: "",
    departmentHead: "",
    departmentShortHand: "",
    departmentLocation: "",
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
      const response = await fetch('http://localhost:8000/departments/create', {  // Adjust this URL based on your backend configuration
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          department_id: formData.departmentId,
          name: formData.departmentName,
          dept_email: formData.departmentEmail,
          location: formData.departmentLocation,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage('Department created successfully!');
      } else {
        setResponseMessage(result.message || 'Error creating department.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Failed to create department.');
    }
  };

  return (
    <form className="admindepartmentform" onSubmit={handleSubmit}>
      <h2>Department Creation Form</h2>
      <div className="admindepartmentformsection">
        <input
          type="text"
          name="departmentName"
          placeholder="Department Name"
          value={formData.departmentName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="departmentId"
          placeholder="Department ID"
          value={formData.departmentId}
          onChange={handleChange}
          required
        />
      </div>

      <h2>Department Contact and Location</h2>
      <div className="admindepartmentformsection">
        <input
          type="text"
          name="departmentEmail"
          placeholder="Department Email"
          value={formData.departmentEmail}
          onChange={handleChange}
          required
        />
        <select className="admindepartmentselect">
          type="text" name="departmentLocation" placeholder="Establishment of
          the Department" value={formData.departmentLocation}
          onChange={handleChange}
          <option value="null">Location</option>
          <option value="AB1">Academic Building 01</option>
          <option value="AB2">Academic Building 02</option>
        </select>
      </div>
      <button className="studentregisterbutton" type="submit">
        Establish department
      </button>
    </form>
  );
};

export default AdminDepartmentRegister;
