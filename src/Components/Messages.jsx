// MessagesWithChat.jsx
import React, { useState } from "react";
import chatbox from "../Assets/chatbox.png";
import "../styles/Messages.css"; // Assuming the styles will be in this file
import TopBar from "./TopBar";

const MessagesWithChat = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [recipientType, setRecipientType] = useState("");
  const [message, setMessage] = useState("");
  const [isHovered, setIsHovered] = useState(null);

  const courses = [
    "CSE 4601: Computer Networks",
    "CSE 4705: Artificial Intelligence",
    "EEE 2411: Digital Electronics",
  ];

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setRecipientType("");
  };

  const handleRecipientChange = (type) => {
    setRecipientType(type);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage("");
    }
  };

  return (
    <div className="container-messages">
      <TopBar />
      <div className="messages-layout">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="chat-logo-container">
            <img src={chatbox} alt="Chatbox Logo" className="chatbox-logo" />
            <h2>Messages</h2>
          </div>

          <div className="course-selection">
            <label htmlFor="course">Select Course</label>
            <select
              id="course"
              value={selectedCourse}
              onChange={handleCourseChange}
              className="select-course"
            >
              <option value="">Choose a Course</option>
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <div className="recipient-options">
              <h3 className="selected-course-title">{selectedCourse}</h3>
              <div className="recipient-buttons">
                <button
                  onMouseEnter={() => setIsHovered("teacher")}
                  onMouseLeave={() => setIsHovered(null)}
                  onClick={() => handleRecipientChange("teacher")}
                  className={`recipient-button ${
                    recipientType === "teacher" ? "active" : ""
                  }`}
                >
                  <span className="icon">👨‍🏫</span>
                  Message Teacher
                </button>
                <button
                  onMouseEnter={() => setIsHovered("group")}
                  onMouseLeave={() => setIsHovered(null)}
                  onClick={() => handleRecipientChange("group")}
                  className={`recipient-button ${
                    recipientType === "group" ? "active" : ""
                  }`}
                >
                  <span className="icon">👥</span>
                  Message Group
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          {recipientType ? (
            <div className="chatbox">
              <div className="chat-header">
                <h3>
                  {recipientType === "teacher" ? (
                    <>👨‍🏫 Chat with Course Teacher</>
                  ) : (
                    <>👥 Student Group Chat</>
                  )}
                </h3>
              </div>
              <div className="messages-container">
                <div className="message received">
                  <div className="message-content">
                    <span className="sender">Teacher</span>
                    <p>Please submit your assignment by Friday.</p>
                    <span className="timestamp">2:30 PM</span>
                  </div>
                </div>
                <div className="message sent">
                  <div className="message-content">
                    <span className="sender">You</span>
                    <p>Sure, I will submit it on time.</p>
                    <span className="timestamp">2:31 PM</span>
                  </div>
                </div>
              </div>
              <div className="message-input-container">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="message-input"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="chatbox-placeholder">
              <img
                src={chatbox}
                alt="Select Chat"
                className="placeholder-icon"
              />
              <h3>Select a course and recipient to start messaging</h3>
              <p>Choose from your enrolled courses to begin a conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesWithChat;
