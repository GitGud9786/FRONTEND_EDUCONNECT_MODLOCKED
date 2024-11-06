import React, { useState } from 'react';
import '../styles/AdminFacultyRegister.css';

const AdminFacultyRegister = () => {
  const [formData, setFormData] = useState({
    facultyfirstName: '',
    facultymiddleName: '',
    facultylastName: '',
    facultydateOfBirth: '',
    facultyId: '',
    facultyDesignation: '',
    facultyDepartment: '',
    facultystreetAddress: '',
    facultycity: '',
    facultystate: '',
    facultycountry: '',
    facultyzipCode: '',
    facultyemail: '',
    facultyphone: '',
    facultybloodGroup: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send data to backend
    try {
      const response = await fetch('http://localhost:8000/students/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.studentfirstName} ${formData.studentmiddleName} ${formData.studentlastName}`,
          email: formData.studentemail,
          password: 'defaultPassword', // replace this as needed
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Student Registered Successfully:", data);
      } else {
        const error = await response.json();
        console.error("Failed to Register Student:", error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form className="adminfacultyform" onSubmit={handleSubmit}>
      <h2>Faculty Register Form</h2>
      <div className="adminfacultyformsection">
        <input
          type="text"
          name="facultyfirstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="facultymiddleName"
          placeholder="Middle Name"
          value={formData.middleName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="facultylastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="facultydate"
          name="facultydateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <input
          type="text"
          name="facultybloodgroup"
          placeholder="Blood Group"
          value={formData.bloodGroup}
          onChange={handleChange}
        />
      </div>

      <h2>Designation and Department</h2>
      <div className="adminfacultyformsection">
      <input
          type="text"
          name="facultydesignation"
          placeholder="Desgination of the faculty"
          value={formData.facultyDesignation}
          onChange={handleChange}
        />
        <input
          type="text"
          name="facultydepartment"
          placeholder='Designation of department'
          value={formData.facultyDepartment}
          onChange={handleChange}
        />
      </div>

      <h2>Address</h2>
      <div className="adminfacultyformsection">
        <input
          type="text"
          name="facultystreetAddress"
          placeholder="Street Address"
          value={formData.streetAddress}
          onChange={handleChange}
        />
        <input
          type="text"
          name="facultycity"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="facultystate"
          placeholder="State / Province"
          value={formData.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="facultycountry"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />
        <input
          type="text"
          name="facultyzipCode"
          placeholder="ZIP Code"
          value={formData.zipCode}
          onChange={handleChange}
        />
      </div>

      <h2>Contact Information</h2>
      <div className="adminfacultyformsection">
        <input
          type="email"
          name="facultyemail"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="facultyphone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <button className='facultyregisterbutton' type="submit">Register this faculty</button>
    </form>
  );
};

export default AdminFacultyRegister;
