import { useState, useEffect } from "react";
import axios from "axios";
import TopBarAdmin from "./TopBarAdmin";
import "../styles/AdminCourseStudentEnroll.css";

const AdminCourseStudentEnrollment = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  const [unenrollAssignment, setUnenrollAssignment] = useState("");

  useEffect(() => {
    fetchCourses();
    fetchStudents();
    fetchEnrollments();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/studentenroll/enrollments"
      );
      setEnrollments(response.data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  const handleAddStudent = (studentId) => {
    if (!selectedStudentIds.includes(studentId)) {
      setSelectedStudentIds([...selectedStudentIds, studentId]);
    }
  };

  const handleRemoveStudent = (studentId) => {
    setSelectedStudentIds(selectedStudentIds.filter((id) => id !== studentId));
  };

  const handleEnroll = async () => {
    if (!selectedCourseId || selectedStudentIds.length === 0) {
      alert("Please select a course and at least one student.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/studentenroll/enroll",
        {
          course_id: parseInt(selectedCourseId, 10),
          student_ids: selectedStudentIds,
        }
      );

      alert(response.data.message);
      setSelectedStudentIds([]); // Clear after enroll
      fetchEnrollments(); // Refresh unenroll list
    } catch (error) {
      alert(error.response?.data?.message || "Error enrolling students");
    }
  };

  const handleUnenroll = async () => {
    if (!unenrollAssignment) {
      alert("Please select an enrollment to unenroll.");
      return;
    }

    const [student_id, course_id] = unenrollAssignment.split("-");

    try {
      const response = await axios.delete(
        "http://localhost:8000/studentenroll/unenroll",
        {
          data: {
            student_id: parseInt(student_id, 10),
            course_id: parseInt(course_id, 10),
          },
        }
      );

      alert(response.data.message);
      fetchEnrollments(); // Refresh unenroll list
    } catch (error) {
      alert(error.response?.data?.message || "Error unenrolling student");
    }
  };

  return (
    <div className="admin-page-container">
      <TopBarAdmin />
      <div className="admin-enroll-container">
        <div className="enrollment-section">
          <h2>Enroll Students to Course</h2>

          {/* Course Selection */}
          <div className="form-group">
            <label>Select Course: </label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              <option value="">-- Select Course --</option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name} (ID: {course.course_id})
                </option>
              ))}
            </select>
          </div>

          {/* Student Selection */}
          <div className="form-group">
            <label>Select Student to Add: </label>
            <select
              onChange={(e) => handleAddStudent(parseInt(e.target.value, 10))}
              value=""
            >
              <option value="">-- Select Student --</option>
              {students
                .filter(
                  (student) => !selectedStudentIds.includes(student.student_id)
                )
                .map((student) => (
                  <option key={student.student_id} value={student.student_id}>
                    {student.name} (ID: {student.student_id})
                  </option>
                ))}
            </select>
          </div>

          {/* Selected Students */}
          {selectedStudentIds.length > 0 && (
            <div className="selected-students">
              <h4>Selected Students:</h4>
              <ul>
                {selectedStudentIds.map((id) => {
                  const student = students.find((s) => s.student_id === id);
                  return (
                    <li key={id}>
                      <span>
                        {student
                          ? `${student.name} (ID: ${id})`
                          : `Student ID: ${id}`}
                      </span>
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveStudent(id)}
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <button className="action-button" onClick={handleEnroll}>
            Enroll
          </button>
        </div>

        <div className="unenroll-section">
          <h2>Unenroll Student from Course</h2>

          {/* Unenroll Assignment Selection */}
          <div className="form-group">
            <label>Select Enrollment to Unenroll: </label>
            <select
              value={unenrollAssignment}
              onChange={(e) => setUnenrollAssignment(e.target.value)}
            >
              <option value="">-- Select Enrollment --</option>
              {enrollments.map((enrollment, index) => (
                <option
                  key={index}
                  value={`${enrollment.student_id}-${enrollment.course_id}`}
                >
                  Student ID: {enrollment.student_id} - Course ID:{" "}
                  {enrollment.course_id}
                </option>
              ))}
            </select>
          </div>

          <button className="action-button unenroll" onClick={handleUnenroll}>
            Unenroll
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseStudentEnrollment;
