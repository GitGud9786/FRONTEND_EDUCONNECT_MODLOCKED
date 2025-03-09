import React, { useState, useEffect } from 'react';
import TopBarAdmin from './TopBarAdmin';
import '../styles/AdminEnrollment.css';

const AdminEnrollment = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  const [teacherId, setTeacherId] = useState(""); // Search input for teacher
  const [courseCode, setCourseCode] = useState(""); // Search input for course

  const [teacherName, setTeacherName] = useState(""); // Found teacher name
  const [courseName, setCourseName] = useState(""); // Found course name

  useEffect(() => {
    // Fetch teacher data
    fetch("/teacher_enroll.json")
      .then((response) => response.json())
      .then((data) => setTeacherData(data));

    // Fetch course data
    fetch("/course_enroll.json")
      .then((response) => response.json())
      .then((data) => setCourseData(data));
  }, []);

  // Handle teacher search
  const searchTeacher = () => {
    const foundTeacher = teacherData.find((teacher) => teacher.id === teacherId);
    setTeacherName(foundTeacher ? foundTeacher.name : "Not Found");
  };

  // Handle course search
  const searchCourse = () => {
    const foundCourse = courseData.find((course) => course.code === courseCode);
    setCourseName(foundCourse ? foundCourse.name : "Not Found");
  };

  return (
    <div className="enrollcontainer">
      {/* Teacher Search */}
      <div className="teacherenrollment">
        <h3>Search Teacher</h3>
        <input
          type="text"
          placeholder="Enter Teacher ID"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
        />
        <div className='enrollbutton'><button onClick={searchTeacher}>Search</button></div>
        <p>Teacher Name: {teacherName}</p>
      </div>

      {/* Course Search */}
      <div className="courseenrollment">
        <h3>Search Course</h3>
        <input
          type="text"
          placeholder="Enter Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <div className='enrollbutton'><button onClick={searchCourse}>Search</button></div>
        <p>Course Name: {courseName}</p>
      </div>
    </div>
  );
};

const CombinedEnrollment = () => {
  return (
    <div>
      <TopBarAdmin />
      <AdminEnrollment />
    </div>
  )
};

export default CombinedEnrollment;