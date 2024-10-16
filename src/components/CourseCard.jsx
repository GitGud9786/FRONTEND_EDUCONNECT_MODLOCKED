import React from 'react';
import '../styles/CourseCard.css';

const CourseCard = ({ courseTitle, instructorName, section, imageUrl, dueDate, task }) => {
  return (
    <div className="course-card">
      <div className="course-header" style={{ backgroundImage: `url(${imageUrl})` }}>
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
          <>
            <p>Due {dueDate}</p>
            <p>{task}</p>
          </>
        ) : (
          <p>No upcoming tasks</p>
        )}
      </div>
      <div className="course-footer">
        <button className="view-details-btn">View</button>
        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default CourseCard;
