import React, { useState } from 'react';
import '../styles/AdminStudentRegister.css';

const AdminStudentRegister = () => {
  const [formData, setFormData] = useState({
    studentfirstName: '',
    studentmiddleName: '',
    studentlastName: '',
    studentdateOfBirth: '',
    studentId: '',
    studentDepartment: '',
    studentstreetAddress: '',
    studentcity: '',
    studentstate: '',
    studentcountry: '',
    studentzipCode: '',
    studentemail: '',
    studentphone: '',
    studentguardianPhone: '',
    studentbloodGroup: '',
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
    <form className="adminstudentform" onSubmit={handleSubmit}>
      <h2>Student Register Form</h2>
      <div className="adminstudentformsection">
        <input
          type="text"
          name="studentfirstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="studentmiddleName"
          placeholder="Middle Name"
          value={formData.middleName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="studentlastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="studentdate"
          name="studentdateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <input
          type="text"
          name="studentguardianphone"
          placeholder="Guardian number"
          value={formData.guardianPhone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="studentbloodgroup"
          placeholder="Blood Group"
          value={formData.bloodGroup}
          onChange={handleChange}
        />
      </div>

      <h2>Department</h2>
      <div className='adminstudentformsection'>
      <input
          type="text"
          name="studentdepartment"
          placeholder="Designation of department"
          value={formData.studentDepartment}
          onChange={handleChange}
        />
      </div>
      <h2>Address</h2>
      <div className="adminstudentformsection">
        <input
          type="text"
          name="studentstreetAddress"
          placeholder="Street Address"
          value={formData.streetAddress}
          onChange={handleChange}
        />
        <input
          type="text"
          name="studentcity"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="studentstate"
          placeholder="State / Province"
          value={formData.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="studentcountry"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />
        <input
          type="text"
          name="studentzipCode"
          placeholder="ZIP Code"
          value={formData.zipCode}
          onChange={handleChange}
        />
      </div>

      <h2>Contact Information</h2>
      <div className="adminstudentformsection">
        <input
          type="email"
          name="studentemail"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="studentphone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <button className='studentregisterbutton' type="submit">Register this student</button>
    </form>
  );
};

export default AdminStudentRegister;
