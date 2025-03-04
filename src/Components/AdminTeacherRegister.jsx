import React, { useState } from "react";
import "../styles/AdminTeacherRegister.css";

const AdminTeacherRegister = () => {
  const [formData, setFormData] = useState({
    teacherFirstName: "",
    teacherMiddleName: "",
    teacherLastName: "",
    teacherDateOfBirth: "",
    teacherBloodGroup: "",
    teacherDesignation: "",
    teacherDepartment: "",
    teacherDepartmentID: "",
    teacherStreetAddress: "",
    teacherCity: "",
    teacherState: "",
    teacherCountry: "",
    teacherZipCode: "",
    teacherEmail: "",
    teacherPhone: "",
    teacherPass: "",
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
    
  };

  return (
    <form className="adminteacherform" onSubmit={handleSubmit}>
      <h2>Teacher Register Form</h2>

      <fieldset>
        <legend>Personal Information</legend>
        <div className="adminteacherformsection">
          <input
            type="text"
            name="teacherFirstName"
            placeholder="First Name"
            value={formData.teacherFirstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="teacherMiddleName"
            placeholder="Middle Name"
            value={formData.teacherMiddleName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="teacherLastName"
            placeholder="Last Name"
            value={formData.teacherLastName}
            onChange={handleChange}
          />
          <input
            type="date"
            name="teacherDateOfBirth"
            placeholder="Date of Birth"
            value={formData.teacherDateOfBirth}
            onChange={handleChange}
          />
          <input
            type="text"
            name="teacherBloodGroup"
            placeholder="Blood Group"
            value={formData.teacherBloodGroup}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Designation and Department</legend>
        <div className="adminteacherformsection">
          <input
            type="text"
            name="teacherDesignation"
            placeholder="Designation"
            value={formData.teacherDesignation}
            onChange={handleChange}
          />
          <input
            type="text"
            name="teacherDepartment"
            placeholder="Department name"
            value={formData.teacherDepartment}
            onChange={handleChange}
          />
          <input
            type="text"
            name="teacherDepartmentID"
            placeholder="Department ID"
            value={formData.teacherDepartmentID}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Address</legend>
        <div className="adminteacherformsection">
          <input
            type="text"
            name="teacherStreetAddress"
            placeholder="Street Address"
            value={formData.teacherStreetAddress}
            onChange={handleChange}
          />
          <input
            type="text"
            name="teacherCity"
            placeholder="City"
            value={formData.teacherCity}
            onChange={handleChange}
          />
          <input
            type="text"
            name="teacherState"
            placeholder="State / Province"
            value={formData.teacherState}
            onChange={handleChange}
          />
          <input
            type="text"
            name="teacherCountry"
            placeholder="Country"
            value={formData.teacherCountry}
            onChange={handleChange}
          />
          <input
            type="text"
            name="teacherZipCode"
            placeholder="ZIP Code"
            value={formData.teacherZipCode}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Contact and Credentials Information</legend>
        <div className="adminteacherformsection">
          <input
            type="email"
            name="teacherEmail"
            placeholder="E-mail"
            value={formData.teacherEmail}
            onChange={handleChange}
          />
          <input
            type="text"
            name="teacherPhone"
            placeholder="Phone"
            value={formData.teacherPhone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="teacherPass"
            placeholder="Default password"
            value={formData.teacherPass}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <button className="teacherregisterbutton" type="submit">
        Register this teacher
      </button>
    </form>
  );
};

export default AdminTeacherRegister;
