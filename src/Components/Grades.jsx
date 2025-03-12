import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Grades.css';
import logo from '../Assets/grade.png';
import TopBar from './TopBar';
import axios from 'axios';

const Grades = () => {
  const { id } = useParams();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [grades, setGrades] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/grades/courses/${id}`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [id]);

  const handleCourseChange = async (event) => {
    const course = event.target.value;
    setSelectedCourse(course);

    try {
      const response = await axios.get(`http://localhost:8000/grades/grades/${id}/${course}`);
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
      setGrades(null);
    }
  };

  const getTopThreeQuizzesTotal = () => {
    if (!grades || !grades.quiz1_marks || !grades.quiz2_marks || !grades.quiz3_marks) return 0;

    const quizzes = [grades.quiz1_marks, grades.quiz2_marks, grades.quiz3_marks];
    const sortedQuizzes = quizzes.sort((a, b) => b - a); // Sort in descending order
    const topThree = sortedQuizzes.slice(0, 3); // Get top three scores
    return topThree.reduce((acc, score) => acc + score, 0); // Sum of top three scores
  };

  const quizTotal = getTopThreeQuizzesTotal();

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
        return '#00FF00'; // Green
      case 'A':
        return '#66FF66'; // Light Green
      case 'A-':
        return '#00FF4C'; // Lighter Green
      case 'B+':
        return '#00FF62'; // Even Lighter Green
      case 'B':
        return '#A26600'; // Yellowish
      case 'B-':
        return '#F26600'; // Light Orange
      case 'C':
        return '#FFC800'; // Orange
      case 'D':
        return '#FF6A00'; // Light Red
      case 'F':
        return '#FF0000'; // Red
      default:
        return '#FFFFFF'; // Default to white if grade is unknown
    }
  };

  return (
    <div className="grades-page">
      <TopBar /> 
      
      <div className="grades-container">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Select Course</h2>
        
        <div className="course-selection">
          <select 
            value={selectedCourse} 
            onChange={handleCourseChange} 
            className={`select-input ${selectedCourse ? 'selected' : ''}`}
          >
            <option value="">-- Choose a Course --</option>
            {courses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.course_id}: {course.title}
              </option>
            ))}
          </select>
        </div>

        {grades && (
          <div className="grades-display">
            <h3>Grades for {selectedCourse}</h3>
            <div className="grades-grid">
              <div className="grade-card quizzes">
                <h4>Quizzes</h4>
                <p>Quiz 1: {grades.quiz1_marks}</p>
                <p>Quiz 2: {grades.quiz2_marks}</p>
                <p>Quiz 3: {grades.quiz3_marks}</p>
                <p>Total of Best 3 Quizzes: {quizTotal}</p>
              </div>
              <div className="grade-card assignments">
                <h4>Assignments & Attendance</h4>
                <p>Assignments: {grades.assignments_marks}</p>
                <p>Attendance: {grades.attendance_marks}</p>
              </div>
              <div className="grade-card exams">
                <h4>Mid & Final</h4>
                <p>Mid: {grades.mid_sem_marks}</p>
                <p>Final: {grades.final_sem_marks}</p>
              </div>
              <div className="grade-card total-grade" style={{ borderColor: getGradeColor(grades.grade) }}>
                <h4>Total Marks & Grade</h4>
                <p>Total Marks: {grades.total_marks}</p>
                <p>Grade: {grades.grade}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grades;