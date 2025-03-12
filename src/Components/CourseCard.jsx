import React from 'react';
import '../styles/CourseCard.css';

const CourseCard = ({ courseID, courseTitle, teacherName }) => {
  return (
    <div className="course-card">
      <div className="course-header">
        <div className="course-info">
          <h2>{courseID}</h2>
          <h3>{courseTitle}</h3>
          <p>Section 1 & 2</p>
        </div>
      </div>
      <div className="course-body">
        <p><strong>Course Teacher:</strong></p>
        <p>{teacherName}</p>
      </div>
    </div>
  );
};

export default CourseCard;
