import React from 'react';
import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import "../styles/CourseCardAssignment.css";
import TeacherSideBar from './TeacherCourseSideBar';

const TitleBlock = () => {
    return(
        <div className="block-container">
        <div className="title-header">
            <h1>CSE 4510: Software and Development</h1>
            </div>
        <div className="section-header">
            <h2>Section 1 & 2</h2>
        </div>
        </div>
    )
}


const TeacherPostCard = ({ user, date, message }) => {
  return (
    <div className="teacher-announcement-card">
      {/* Header: User Info */}
      <div className="teacher-announcement-header">
        <div className="user-info">
          <span className="teacher-user-name">Ridwan Kabir</span>
          <span className="teacher-announcement-date">June 15</span>
        </div>
        <div className="teacher-options-menu">⋮</div>
      </div>

      {/* Message Content */}
      <div className="teacher-announcement-message">We are thrilled to welcome you to the selection phase of Project Altair Software Sub Team! We are going to start the recruitment process very soon. Over the next few months, you will be given tasks that will challenge your problem solving skills. And only your dedication will prove you worthy.
The first part of the recruitment process will be held online. The tasks will be given on a weekly basis. You can ask any questions and communicate with us in the messenger group provided.</div>

      {/* Comment Section */}
      <div className="teacher-comment-section">
        <input
          className="teacher-comment-input"
          type="text"
          placeholder="Add class comment..."
        />
        <button className="teacher-comment-send-btn">➤</button>
      </div>
    </div>
  );
};
  


const CourseCardAssignment = () => {
    const [isMarkedDone, setIsMarkedDone] = useState(false);
  
    const handleMarkDone = () => {
        if(isMarkedDone)
            setIsMarkedDone(false);
        else
            setIsMarkedDone(true)
    };
  
    return (
      <div className="container-assignment">
        <TopBar />
        <div className='courseassignmentmain'>
          
          {/* Main Course Content */}
          <div className='teachercoursecontents'>
            <TitleBlock /> 
            <TeacherPostCard />
          </div>
  
          {/* Action Buttons */}
          <div className="assignment-action-buttons">
            <div className="submission-text">
                <h2>Submission</h2>
            </div>
            <button className="upload-btn">Upload File</button>
            <button 
              className={`mark-done-btn ${isMarkedDone ? 'done' : ''}`} 
              onClick={handleMarkDone}
            >
              {isMarkedDone ? "Unsubmit" : "Mark as Done"}
            </button>
          </div>
          
        </div>
      </div>
    );
  };
  

export default CourseCardAssignment;