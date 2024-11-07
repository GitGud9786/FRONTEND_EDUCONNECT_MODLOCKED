import React, { useState } from "react";
import "../styles/AdminFacultyRegister.css";

const AdminFacultyRegister = () => {
  const [formData, setFormData] = useState({
    facultyfirstName: "",
    facultymiddleName: "",
    facultylastName: "",
    facultydateOfBirth: "",
    facultybloodGroup: "",
    facultyDesignation: "",
    facultyDepartment: "",
    facultyDepartmentID: "",
    facultystreetAddress: "",
    facultycity: "",
    facultystate: "",
    facultycountry: "",
    facultyzipCode: "",
    facultyemail: "",
    facultyphone: "",
    facultyPass: "",
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
    try {
      const response = await fetch("http://localhost:8000/students/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.facultyfirstName} ${formData.facultymiddleName} ${formData.facultylastName}`,
          email: formData.facultyemail,
          password: "defaultPassword",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Faculty Registered Successfully:", data);
      } else {
        const error = await response.json();
        console.error("Failed to Register Faculty:", error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form className="adminfacultyform" onSubmit={handleSubmit}>
      <h2>Faculty Register Form</h2>

      <fieldset>
        <legend>Personal Information</legend>
        <div className="adminfacultyformsection">
          <input
            type="text"
            name="facultyfirstName"
            placeholder="First Name"
            value={formData.facultyfirstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="facultymiddleName"
            placeholder="Middle Name"
            value={formData.facultymiddleName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="facultylastName"
            placeholder="Last Name"
            value={formData.facultylastName}
            onChange={handleChange}
          />
          <input
            type="date"
            name="facultydateOfBirth"
            placeholder="Date of Birth"
            value={formData.facultydateOfBirth}
            onChange={handleChange}
          />
          <input
            type="text"
            name="facultybloodGroup"
            placeholder="Blood Group"
            value={formData.facultybloodGroup}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Designation and Department</legend>
        <div className="adminfacultyformsection">
          <input
            type="text"
            name="facultyDesignation"
            placeholder="Designation"
            value={formData.facultyDesignation}
            onChange={handleChange}
          />
          <input
            type="text"
            name="facultyDepartment"
            placeholder="Department name"
            value={formData.facultyDepartment}
            onChange={handleChange}
          />
          <input
            type="text"
            name="facultyDepartmentID"
            placeholder="Department ID"
            value={formData.facultyDepartmentID}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Address</legend>
        <div className="adminfacultyformsection">
          <input
            type="text"
            name="facultystreetAddress"
            placeholder="Street Address"
            value={formData.facultystreetAddress}
            onChange={handleChange}
          />
          <input
            type="text"
            name="facultycity"
            placeholder="City"
            value={formData.facultycity}
            onChange={handleChange}
          />
          <input
            type="text"
            name="facultystate"
            placeholder="State / Province"
            value={formData.facultystate}
            onChange={handleChange}
          />
          <input
            type="text"
            name="facultycountry"
            placeholder="Country"
            value={formData.facultycountry}
            onChange={handleChange}
          />
          <input
            type="text"
            name="facultyzipCode"
            placeholder="ZIP Code"
            value={formData.facultyzipCode}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Contact and Credentials Information</legend>
        <div className="adminfacultyformsection">
          <input
            type="email"
            name="facultyemail"
            placeholder="E-mail"
            value={formData.facultyemail}
            onChange={handleChange}
          />
          <input
            type="text"
            name="facultyphone"
            placeholder="Phone"
            value={formData.facultyphone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="facultyPass"
            placeholder="Default password"
            value={formData.facultyPass}
            onChange={handleChange}
          />
        </div>
      </fieldset>

      <button className="facultyregisterbutton" type="submit">
        Register this faculty
      </button>
    </form>
  );
};

export default AdminFacultyRegister;
