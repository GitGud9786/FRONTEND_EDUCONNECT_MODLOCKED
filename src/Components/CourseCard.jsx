import React from 'react';
import '../styles/CourseCard.css';

const CourseCard = ({ courseID, courseTitle, teacherName, teacherDesignation }) => {
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
        <p>{teacherName}</p>
        <p>{teacherDesignation}</p>
      </div>
    </div>
  );
};

export default CourseCard;
