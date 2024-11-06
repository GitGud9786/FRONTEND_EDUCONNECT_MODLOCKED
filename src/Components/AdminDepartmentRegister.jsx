import React, { useState } from 'react';
import '../styles/AdminDepartmentRegister.css';

const AdminDepartmentRegister = () => {
  const [formData, setFormData] = useState({
    departmentId: '',
    departmentName: '',
    departmentEmail: '',
    departmentHead: '',
    departmentShortHand: '',
    departmentLocation: '',
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
    <form className="admindepartmentform" onSubmit={handleSubmit}>
      <h2>Department Creation Form</h2>
      <div className="admindepartmentformsection">
        <input
          type="text"
          name="departmentName"
          placeholder="First Name"
          value={formData.departmentName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="departmentShortHand"
          placeholder="Designated Acroynym"
          value={formData.departmentShortHand}
          onChange={handleChange}
        />
        <input
          type="text"
          name="departmentHead"
          placeholder="Designated Head of the Department"
          value={formData.departmentHead}
          onChange={handleChange}
        />
      </div>

      <h2>Department Contact and Location</h2>
      <div className='admindepartmentformsection'>
      <input
          type="text"
          name="departmentEmail"
          placeholder="Department Email"
          value={formData.departmentEmail}
          onChange={handleChange}
        />
        <select className='admindepartmentselect'>
          type="text"
          name="departmentLocation"
          placeholder="Establishment of the Department"
          value={formData.departmentLocation}
          onChange={handleChange}
          <option value="null">Location</option>
            <option value="AB1">Academic Building 01</option>
            <option value="AB2">Academic Building 02</option>
        </select>
      </div>
      <button className='studentregisterbutton' type="submit">Establish department</button>
    </form>
  );
};

export default AdminDepartmentRegister;
