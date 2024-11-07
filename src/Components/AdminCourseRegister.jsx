import React, { useState } from "react";
import "../styles/AdminCourseRegister.css";

const AdminCourseRegister = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    courseDuration: "",
    courseInformation: "",
    courseDepartment: "",
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
    <form className="admincourseform" onSubmit={handleSubmit}>
      <h2>Course Registration Details</h2>
      <fieldset>
        <legend>Course Information</legend>
        <div className="admincourseformsection">
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
          <select
            className="admincourseselect"
            name="courseDepartment"
            value={formData.courseDepartment}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="CSE">Computer Science and Engineering</option>
            <option value="EEE">Electrical and Electronics Engineering</option>
            <option value="MPE">Mechanical and Production Engineering</option>
            <option value="CEE">Civil and Environmental Engineering</option>
            <option value="IPE">Industrial and Production Engineering</option>
            <option value="BTM">Business Technology and Management</option>
          </select>
        </div>
      </fieldset>
      <fieldset className="admincourseinforegister">
        <legend>Course Description Block</legend>
        <textarea
          name="courseInformation"
          placeholder="Description"
          value={formData.courseInformation}
          onChange={handleChange}
        />
      </fieldset>
      <button className="courseregisterbutton" type="submit">
        Register Course
      </button>
    </form>
  );
};

export default AdminCourseRegister;
