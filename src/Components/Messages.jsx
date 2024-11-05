// MessagesWithChat.jsx
import React, { useState } from 'react';
import chatbox from '../Assets/chatbox.png';
import '../styles/Messages.css'; // Assuming the styles will be in this file
import TopBar from './TopBar';

const MessagesWithChat = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [recipientType, setRecipientType] = useState('');
  const [isHovered, setIsHovered] = useState(null);

  const courses = [
    'CSE 4601: Computer Networks',
    'CSE 4705: Artificial Intelligence',
    'EEE 2411: Digital Electronics',
  ];

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setRecipientType('');
  };

  const handleRecipientChange = (type) => {
    setRecipientType(type);
  };

  return (
    <div className="container-messages">
      <div>
        <TopBar/>
      </div>
      <div className="messages-layout">
      {/* Left Panel: Course Selection and Options */}
      <div className="left-panel">
        {/* Chatbox logo at the top */}
        <div className="chat-logo">
          <img src={chatbox} alt="Chatbox Logo" className="chatbox-logo" style={{ width: '100px', height: 'auto' }}/>
        </div>

        {/* Course Selection */}
        <div className="course-selection">
          <label htmlFor="course" className="course-label">Select Course</label>
          <select
            id="course"
            value={selectedCourse}
            onChange={handleCourseChange}
            className="select-input"
          >
            <option value="">-- Choose a Course --</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>
        </div>

        {/* Recipient Options */}
        {selectedCourse && (
          <div className="recipient-options">
            <p className="recipient-prompt"> <strong>{selectedCourse}</strong></p>
            <button
              onMouseEnter={() => setIsHovered('teacher')}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => handleRecipientChange('teacher')}
              className={`recipient-button ${recipientType === 'teacher' ? 'selected' : ''}`}
            >
              Message Teacher
            </button>
            <button
              onMouseEnter={() => setIsHovered('group')}
              onMouseLeave={() => setIsHovered(null)}
              onClick={() => handleRecipientChange('group')}
              className={`recipient-button ${recipientType === 'group' ? 'selected' : ''}`}
            >
              Message Group
            </button>
          </div>
        )}
      </div>

      {/* Right Panel: Chatbox */}
      {/* Right Panel: Chatbox */}
<div className="right-panel">
  {recipientType ? (
    <div className="chatbox">
      <h3>Chat with {recipientType === 'teacher' ? 'Teacher' : 'Student Group'}</h3>
      <div className="messages-container">
        {/* Chat messages */}
        <p className="message">[Teacher]: Please submit your assignment by Friday.</p>
        <p className="message">[You]: Sure, I will submit it on time.</p>
      </div>
      <div className="chatbox-input-container">
        <input type="text" placeholder="Type your message..." className="chatbox-input" />
        <button className="send-button">Send</button>
      </div>
    </div>
  ) : (
    <div className="chatbox-placeholder">
      <h3>Select a course and recipient to start messaging</h3>
    </div>
  )}
</div>

    </div>
    </div>
  );
};

export default MessagesWithChat;
