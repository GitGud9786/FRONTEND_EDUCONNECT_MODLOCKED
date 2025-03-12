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
  const [assignGradeData, setAssignGradeData] = useState({
    quiz1_marks: "",
    quiz2_marks: "",
    quiz3_marks: "",
    assignments_marks: "",
    attendance_marks: "",
    mid_sem_marks: "",
    final_sem_marks: "",
  });
  const [updateGradeData, setUpdateGradeData] = useState({
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
      const response = await axios.get("http://localhost:8000/studentenroll/enrollments");
      setEnrollments(response.data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  const fetchGrades = async () => {
    try {
      const response = await axios.get("http://localhost:8000/grades/all-grades");
      setGrades(response.data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const handleEnrollmentChange = (e) => {
    const value = e.target.value;
    const [student_id, course_id] = value.split("-");
    setSelectedEnrollment(value);

    // Reset assign grade data
    setAssignGradeData({
      quiz1_marks: "",
      quiz2_marks: "",
      quiz3_marks: "",
      assignments_marks: "",
      attendance_marks: "",
      mid_sem_marks: "",
      final_sem_marks: "",
    });
  };

  const handleGradeChange = async (e) => {
    const value = e.target.value;
    const [student_id, course_id] = value.split("-");
    setSelectedGrade(value);

    try {
      const response = await axios.get(`http://localhost:8000/grades/grades/${student_id}/${course_id}`);
      const gradeData = response.data;
      setUpdateGradeData({
        quiz1_marks: gradeData.quiz1_marks,
        quiz2_marks: gradeData.quiz2_marks,
        quiz3_marks: gradeData.quiz3_marks,
        assignments_marks: gradeData.assignments_marks,
        attendance_marks: gradeData.attendance_marks,
        mid_sem_marks: gradeData.mid_sem_marks,
        final_sem_marks: gradeData.final_sem_marks,
      });
    } catch (error) {
      console.error("Error fetching grade data:", error);
      setUpdateGradeData({
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

  const handleAssignGradeDataChange = (e) => {
    const { name, value } = e.target;
    setAssignGradeData({ ...assignGradeData, [name]: value });
  };

  const handleUpdateGradeDataChange = (e) => {
    const { name, value } = e.target;
    setUpdateGradeData({ ...updateGradeData, [name]: value });
  };

  const handleAssignGrade = async () => {
    if (!selectedEnrollment) {
      alert("Please select a student and course.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/grades/assign-grade", {
        student_id: parseInt(selectedEnrollment.split("-")[0], 10),
        course_id: parseInt(selectedEnrollment.split("-")[1], 10),
        ...assignGradeData,
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
      const response = await axios.put("http://localhost:8000/grades/update-grade", {
        student_id: parseInt(selectedGrade.split("-")[0], 10),
        course_id: parseInt(selectedGrade.split("-")[1], 10),
        ...updateGradeData,
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
                  Student ID: {enrollment.student_id} ------ Course ID: {enrollment.course_id}
                </option>
              ))}
            </select>
          </div>

          <h3>Quiz and Assignments</h3>
          {/* Quiz and Assignment Marks */}
          <div className="form-group">
            <input
              type="number"
              name="quiz1_marks"
              placeholder="Quiz 1 (out of 15)"
              value={assignGradeData.quiz1_marks}
              onChange={handleAssignGradeDataChange}
              min="0"
            />
            <input
              type="number"
              name="quiz2_marks"
              placeholder="Quiz 2 (out of 15)"
              value={assignGradeData.quiz2_marks}
              onChange={handleAssignGradeDataChange}
              min="0"
            />
            <input
              type="number"
              name="quiz3_marks"
              placeholder="Quiz 3 (out of 15)"
              value={assignGradeData.quiz3_marks}
              onChange={handleAssignGradeDataChange}
              min="0"
            />
            <input
              type="number"
              name="assignments_marks"
              placeholder="Assignments (out of 15)"
              value={assignGradeData.assignments_marks}
              onChange={handleAssignGradeDataChange}
              min="0"
            />
          </div>

          <h3>Attendance and Exams</h3>
          {/* Attendance and Exam Marks */}
          <div className="form-group">
            <input
              type="number"
              name="attendance_marks"
              placeholder="Attendance (out of 30)"
              value={assignGradeData.attendance_marks}
              onChange={handleAssignGradeDataChange}
              min="0"
            />
            <input
              type="number"
              name="mid_sem_marks"
              placeholder="Mid-Sem (out of 75)"
              value={assignGradeData.mid_sem_marks}
              onChange={handleAssignGradeDataChange}
              min="0"
            />
            <input
              type="number"
              name="final_sem_marks"
              placeholder="Final-Sem (out of 150)"
              value={assignGradeData.final_sem_marks}
              onChange={handleAssignGradeDataChange}
              min="0"
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
                  Student ID: {grade.student_id} ------ Course ID: {grade.course_id}
                </option>
              ))}
            </select>
          </div>

          <h3>Quiz and Assignments</h3>
          {/* Quiz and Assignment Marks */}
          <div className="form-group">
            <input
              type="number"
              name="quiz1_marks"
              placeholder="Quiz 1 (out of 15)"
              value={updateGradeData.quiz1_marks}
              onChange={handleUpdateGradeDataChange}
              min="0"
            />
            <input
              type="number"
              name="quiz2_marks"
              placeholder="Quiz 2 (out of 15)"
              value={updateGradeData.quiz2_marks}
              onChange={handleUpdateGradeDataChange}
              min="0"
            />
            <input
              type="number"
              name="quiz3_marks"
              placeholder="Quiz 3 (out of 15)"
              value={updateGradeData.quiz3_marks}
              onChange={handleUpdateGradeDataChange}
              min="0"
            />
            <input
              type="number"
              name="assignments_marks"
              placeholder="Assignments (out of 15)"
              value={updateGradeData.assignments_marks}
              onChange={handleUpdateGradeDataChange}
              min="0"
            />
          </div>

          <h3>Attendance and Exams</h3>
          {/* Attendance and Exam Marks */}
          <div className="form-group">
            <input
              type="number"
              name="attendance_marks"
              placeholder="Attendance (out of 30)"
              value={updateGradeData.attendance_marks}
              onChange={handleUpdateGradeDataChange}
              min="0"
            />
            <input
              type="number"
              name="mid_sem_marks"
              placeholder="Mid-Sem (out of 75)"
              value={updateGradeData.mid_sem_marks}
              onChange={handleUpdateGradeDataChange}
              min="0"
            />
            <input
              type="number"
              name="final_sem_marks"
              placeholder="Final-Sem (out of 150)"
              value={updateGradeData.final_sem_marks}
              onChange={handleUpdateGradeDataChange}
              min="0"
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