import React, { useState } from 'react';
import '../styles/Grades.css';
import logo from '../Assets/grade.png';
import TopBar from './TopBar';

const Grades = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [grades, setGrades] = useState(null);

  const courses = [
    { code: 'CSE 4601', name: 'Computer Networks' },
    { code: 'CSE 4705', name: 'Artificial Intelligence' },
    { code: 'EEE 2411', name: 'Digital Electronics' }
  ];

  const handleCourseChange = (event) => {
    const course = event.target.value;
    setSelectedCourse(course);
    // Mock data
    setGrades({
      quizzes: [10, 8, 9, 7],
      midExam: 35,
      assignments: [15, 20, 18],
      projects: [25],
    });
  };

  const getTopThreeQuizzesTotal = () => {
    if (!grades || !grades.quizzes) return 0;

    const sortedQuizzes = [...grades.quizzes].sort((a, b) => b - a); // Sort in descending order
    const topThree = sortedQuizzes.slice(0, 3); // Get top three scores
    return topThree.reduce((acc, score) => acc + score, 0); // Sum of top three scores
  };

  const quizTotal = getTopThreeQuizzesTotal();

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
              <option key={course.code} value={course.code}>
                {course.code}: {course.name}
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
                {grades.quizzes.map((quiz, index) => (
                  <p key={index}>Quiz {index + 1}: {quiz}</p>
                ))}
                <p>Total of Best 3 Quizzes: {quizTotal}</p>
              </div>
              <div className="grade-card assignments">
                <h4>Assignments</h4>
                {grades.assignments.map((assignment, index) => (
                  <p key={index}>Assignment {index + 1}: {assignment}</p>
                ))}
              </div>
              <div className="grade-card mid-exam">
                <h4>Mid</h4>
                <p>{grades.midExam}</p>
              </div>
              <div className="grade-card projects">
                <h4>Projects</h4>
                <p>{grades.projects[0]}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grades;