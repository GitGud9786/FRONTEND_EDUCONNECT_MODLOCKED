import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TeacherTopBar from "./TeacherTopBar";
import "../styles/GradeAssign.css";

const GradeAssign = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [grades, setGrades] = useState([]);

  const [selectedEnrollment, setSelectedEnrollment] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [gradeData, setGradeData] = useState({
    quiz1_marks: "",
    quiz2_marks: "",
    quiz3_marks: "",
    assignments_marks: "",
    attendance_marks: "",
    mid_sem_marks: "",
    final_sem_marks: "",
  });

  useEffect(() => {
    fetchStudents();
    fetchEnrollments();
    fetchGrades();
  }, []);

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
      const response = await axios.get("http://localhost:8000/student-enrollments");
      setEnrollments(response.data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  const fetchGrades = async () => {
    try {
      const response = await axios.get("http://localhost:8000/all-grades");
      setGrades(response.data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const handleEnrollmentChange = (e) => {
    const [student_id, course_id] = e.target.value.split("-");
    setSelectedEnrollment({ student_id, course_id });

    // Reset grade data
    setGradeData({
      quiz1_marks: "",
      quiz2_marks: "",
      quiz3_marks: "",
      assignments_marks: "",
      attendance_marks: "",
      mid_sem_marks: "",
      final_sem_marks: "",
    });
  };

  const handleGradeChange = (e) => {
    const [student_id, course_id] = e.target.value.split("-");
    setSelectedGrade({ student_id, course_id });

    // Fetch existing grade data if available
    const existingGrade = grades.find(
      (grade) => grade.student_id === parseInt(student_id, 10) && grade.course_id === parseInt(course_id, 10)
    );
    if (existingGrade) {
      setGradeData(existingGrade);
    } else {
      setGradeData({
        quiz1_marks: "",
        quiz2_marks: "",
        quiz3_marks: "",
        assignments_marks: "",
        attendance_marks: "",
        mid_sem_marks: "",
        final_sem_marks: "",
      });
    }
  };

  const handleGradeDataChange = (e) => {
    const { name, value } = e.target;
    setGradeData({ ...gradeData, [name]: value });
  };

  const handleAssignGrade = async () => {
    if (!selectedEnrollment) {
      alert("Please select a student and course.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/assign-grade", {
        student_id: parseInt(selectedEnrollment.student_id, 10),
        course_id: parseInt(selectedEnrollment.course_id, 10),
        ...gradeData,
      });

      alert(response.data.message);
      fetchGrades(); // Refresh grades list
    } catch (error) {
      alert(error.response?.data?.message || "Error assigning grade");
    }
  };

  const handleUpdateGrade = async () => {
    if (!selectedGrade) {
      alert("Please select a student and course.");
      return;
    }

    try {
      const response = await axios.put("http://localhost:8000/update-grade", {
        student_id: parseInt(selectedGrade.student_id, 10),
        course_id: parseInt(selectedGrade.course_id, 10),
        ...gradeData,
      });

      alert(response.data.message);
      fetchGrades(); // Refresh grades list
    } catch (error) {
      alert(error.response?.data?.message || "Error updating grade");
    }
  };

  return (
    <div className="admin-page-container">
      <TeacherTopBar />
      <div className="admin-grade-container">
        <div className="grade-section">
          <h2>Assign Grades</h2>

          {/* Enrollment Selection */}
          <div className="form-group">
            <label>Select Enrollment: </label>
            <select value={selectedEnrollment} onChange={handleEnrollmentChange}>
              <option value="">-- Select Enrollment --</option>
              {enrollments.map((enrollment, index) => (
                <option key={index} value={`${enrollment.student_id}-${enrollment.course_id}`}>
                  Student ID: {enrollment.student_id} - Course ID: {enrollment.course_id}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Input Form */}
          <div className="form-group">
            <label>Quiz 1 Marks: </label>
            <input
              type="number"
              name="quiz1_marks"
              value={gradeData.quiz1_marks}
              onChange={handleGradeDataChange}
            />
          </div>
          <div className="form-group">
            <label>Quiz 2 Marks: </label>
            <input
              type="number"
              name="quiz2_marks"
              value={gradeData.quiz2_marks}
              onChange={handleGradeDataChange}
            />
          </div>
          <div className="form-group">
            <label>Quiz 3 Marks: </label>
            <input
              type="number"
              name="quiz3_marks"
              value={gradeData.quiz3_marks}
              onChange={handleGradeDataChange}
            />
          </div>
          <div className="form-group">
            <label>Assignments Marks: </label>
            <input
              type="number"
              name="assignments_marks"
              value={gradeData.assignments_marks}
              onChange={handleGradeDataChange}
            />
          </div>
          <div className="form-group">
            <label>Attendance Marks: </label>
            <input
              type="number"
              name="attendance_marks"
              value={gradeData.attendance_marks}
              onChange={handleGradeDataChange}
            />
          </div>
          <div className="form-group">
            <label>Mid-Sem Marks: </label>
            <input
              type="number"
              name="mid_sem_marks"
              value={gradeData.mid_sem_marks}
              onChange={handleGradeDataChange}
            />
          </div>
          <div className="form-group">
            <label>Final-Sem Marks: </label>
            <input
              type="number"
              name="final_sem_marks"
              value={gradeData.final_sem_marks}
              onChange={handleGradeDataChange}
            />
          </div>

          <button className="action-button" onClick={handleAssignGrade}>
            Assign Grade
          </button>
        </div>

        <div className="grade-section">
          <h2>Update Grades</h2>

          {/* Grade Selection */}
          <div className="form-group">
            <label>Select Grade: </label>
            <select value={selectedGrade} onChange={handleGradeChange}>
              <option value="">-- Select Grade --</option>
              {grades.map((grade, index) => (
                <option key={index} value={`${grade.student_id}-${grade.course_id}`}>
                  Student ID: {grade.student_id} - Course ID: {grade.course_id}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Input Form */}
          <div className="form-group">
            <label>Quiz 1 Marks: </label>
            <input
              type="number"
              name="quiz1_marks"
              value={gradeData.quiz1_marks}
              onChange={handleGradeDataChange}
            />
          </div>
          <div className="form-group">
            <label>Quiz 2 Marks: </label>
            <input
              type="number"
              name="quiz2_marks"
              value={gradeData.quiz2_marks}
              onChange={handleGradeDataChange}
            />
          </div>
          <div className="form-group">
            <label>Quiz 3 Marks: </label>
            <input
              type="number"
              name="quiz3_marks"
              value={gradeData.quiz3_marks}
              onChange={handleGradeDataChange}
            />
          </div>
          <div className="form-group">
            <label>Assignments Marks: </label>
            <input
              type="number"
              name="assignments_marks"
              value={gradeData.assignments_marks}
              onChange={handleGradeDataChange}
            />
          </div>
          <div className="form-group">
            <label>Attendance Marks: </label>
            <input
              type="number"
              name="attendance_marks"
              value={gradeData.attendance_marks}
              onChange={handleGradeDataChange}
            />
          </div>
          <div className="form-group">
            <label>Mid-Sem Marks: </label>
            <input
              type="number"
              name="mid_sem_marks"
              value={gradeData.mid_sem_marks}
              onChange={handleGradeDataChange}
            />
          </div>
          <div className="form-group">
            <label>Final-Sem Marks: </label>
            <input
              type="number"
              name="final_sem_marks"
              value={gradeData.final_sem_marks}
              onChange={handleGradeDataChange}
            />
          </div>

          <button className="action-button" onClick={handleUpdateGrade}>
            Update Grade
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradeAssign;