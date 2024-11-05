//CourseCard.jsx
import React from 'react';
import '../styles/CourseCard.css';

const CourseCard = ({ courseTitle, instructorName, section, imageUrl, dueDate, task }) => {
  return (
    <div className="course-card">
      <div className="course-header">
        <div className="course-info">
          <h3>{courseTitle}</h3>
          <p>Section {section}</p>
          <p>{instructorName}</p>
        </div>
        <div className="course-avatar">
          <img src={imageUrl} alt={instructorName} />
        </div>
      </div>
      <div className="course-body">
        {dueDate && task ? (
          <div className="task-info">
            <p>Due {dueDate}</p>
            <p>{task}</p>
          </div>
        ) : (
          <p>No upcoming tasks</p>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
