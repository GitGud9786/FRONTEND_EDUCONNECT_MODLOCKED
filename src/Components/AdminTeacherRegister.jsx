import React, { useState } from "react";
import "../styles/AdminTeacherRegister.css";

const AdminTeacherRegister = () => {
  const [formData, setFormData] = useState({
    teacherId: "", // Added teacher ID
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

  const [responseMessage, setResponseMessage] = useState("");

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
      const response = await fetch("http://localhost:8000/teacher/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacher_id: formData.teacherId,
          name: `${formData.teacherFirstName} ${formData.teacherMiddleName} ${formData.teacherLastName}`.trim(),
          date_of_birth: formData.teacherDateOfBirth,
          blood_group: formData.teacherBloodGroup,
          designation: formData.teacherDesignation,
          department_name: formData.teacherDepartment,
          department_id: formData.teacherDepartmentID,
          address: `${formData.teacherStreetAddress}, ${formData.teacherCity}, ${formData.teacherState}, ${formData.teacherCountry} - ${formData.teacherZipCode}`,
          email: formData.teacherEmail,
          phone_number: formData.teacherPhone,
          password: formData.teacherPass,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setResponseMessage("Teacher registered successfully!");
      } else {
        setResponseMessage(result.message || "Error registering teacher.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Failed to register teacher.");
    }
  };

  return (
    <form className="adminteacherform" onSubmit={handleSubmit}>
      <h2>Teacher Register Form</h2>

      <fieldset>
        <legend>Personal Information</legend>
        <div className="adminteacherformsection">
          <input type="text" name="teacherId" placeholder="Teacher ID" value={formData.teacherId} onChange={handleChange} required />
          <input type="text" name="teacherFirstName" placeholder="First Name" value={formData.teacherFirstName} onChange={handleChange} required />
          <input type="text" name="teacherMiddleName" placeholder="Middle Name" value={formData.teacherMiddleName} onChange={handleChange} />
          <input type="text" name="teacherLastName" placeholder="Last Name" value={formData.teacherLastName} onChange={handleChange} required />
          <input type="date" name="teacherDateOfBirth" value={formData.teacherDateOfBirth} onChange={handleChange} required />
          <input type="text" name="teacherBloodGroup" placeholder="Blood Group" value={formData.teacherBloodGroup} onChange={handleChange} required />
        </div>
      </fieldset>

      <fieldset>
        <legend>Designation and Department</legend>
        <div className="adminteacherformsection">
          <input type="text" name="teacherDesignation" placeholder="Designation" value={formData.teacherDesignation} onChange={handleChange} required />
          <input type="text" name="teacherDepartment" placeholder="Department Name" value={formData.teacherDepartment} onChange={handleChange} required />
          <input type="text" name="teacherDepartmentID" placeholder="Department ID" value={formData.teacherDepartmentID} onChange={handleChange} required />
        </div>
      </fieldset>

      <fieldset>
        <legend>Address</legend>
        <div className="adminteacherformsection">
          <input type="text" name="teacherStreetAddress" placeholder="Street Address" value={formData.teacherStreetAddress} onChange={handleChange} required />
          <input type="text" name="teacherCity" placeholder="City" value={formData.teacherCity} onChange={handleChange} required />
          <input type="text" name="teacherState" placeholder="State / Province" value={formData.teacherState} onChange={handleChange} required />
          <input type="text" name="teacherCountry" placeholder="Country" value={formData.teacherCountry} onChange={handleChange} required />
          <input type="text" name="teacherZipCode" placeholder="ZIP Code" value={formData.teacherZipCode} onChange={handleChange} required />
        </div>
      </fieldset>

      <fieldset>
        <legend>Contact and Credentials Information</legend>
        <div className="adminteacherformsection">
          <input type="email" name="teacherEmail" placeholder="E-mail" value={formData.teacherEmail} onChange={handleChange} required />
          <input type="text" name="teacherPhone" placeholder="Phone" value={formData.teacherPhone} onChange={handleChange} required />
          <input type="password" name="teacherPass" placeholder="Default password" value={formData.teacherPass} onChange={handleChange} required />
        </div>
      </fieldset>

      <button className="teacherregisterbutton" type="submit">Register this teacher</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default AdminTeacherRegister;
