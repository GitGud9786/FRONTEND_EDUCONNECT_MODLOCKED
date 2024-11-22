import React from 'react';
import { useState, useEffect } from 'react';
import TeacherTopBar from './TeacherTopBar';
import "../styles/TeacherCourseClassroom.css";
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

const Announcement = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={`teacher-collapsible-container ${isExpanded ? "expanded" : ""}`}>
      {/* Collapsible Bar */}
      {!isExpanded && (
        <div className="teacher-collapsible-bar" onClick={toggleExpand}>
          <span className="teacher-collapsible-title">Announce something to your class</span>
        </div>
      )}

      {/* Expanded Content */}
      {isExpanded && (
        <div className="teacher-expanded-content">
          <textarea
            className="teacher-expanded-textarea"
            placeholder="Announce something to your class"
          />
          <div className="teacher-expanded-toolbar">
            <button className="teacher-toolbar-btn"><b>B</b></button>
            <button className="teacher-toolbar-btn"><i>I</i></button>
            <button className="teacher-toolbar-btn"><u>U</u></button>
            <button className="teacher-toolbar-btn">•</button>
            <button className="teacher-toolbar-btn">📎</button>
            <button className="teacher-toolbar-btn">🎥</button>
            <button className="teacher-toolbar-btn">🔗</button>
          </div>
          <div className="teacher-expanded-actions">
            <button className="teacher-cancel-btn" onClick={toggleExpand}>
              Cancel
            </button>
            <button className="teacher-post-btn">Post</button>
          </div>
        </div>
      )}
    </div>
  );
};


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
  

const CombinedTeacherClassroom = () =>
{
    return(
        <div className="combinedteacherclassroom">
            <TeacherTopBar />
            <div className='teachercoursemain'>
                <TeacherSideBar / >
                <div className='teachercoursecontents'>
                    <TitleBlock />
                    <Announcement />
                    <TeacherPostCard />
                </div>
            </div>
        </div>
    );
};

export default CombinedTeacherClassroom;