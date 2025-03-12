import React, { useState, useEffect } from "react";
import axios from "axios";
import chatbox from "../Assets/chatbox.png";
import "../styles/Messages.css"; // Assuming the styles will be in this file
import TopBar from "./TopBar";
import { useParams } from "react-router-dom";

const MessagesWithChat = () => {
  const { student_id: paramStudentId } = useParams(); // Extract student_id from URL params
  const [studentId, setStudentId] = useState(paramStudentId || null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    // If studentId is not set, extract it from the URL
    if (!studentId) {
      const extractedId = window.location.pathname.split("/").pop();
      setStudentId(extractedId);
    }
  }, [studentId]);

  useEffect(() => {
    fetchCourses();
  }, [studentId]);

  useEffect(() => {
    if (selectedCourse) {
      fetchMessages();
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/courses/student/${studentId}`);
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const courseId = selectedCourse.split(":")[0].trim(); // Extract course ID from selectedCourse
      const response = await axios.get(`http://localhost:8000/messages/${courseId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const courseId = selectedCourse.split(":")[0].trim(); // Extract course ID from selectedCourse
        const payload = {
          course_id: courseId,
          student_id: studentId, // Use the actual student ID
          content: message,
        };
        await axios.post("http://localhost:8000/messages/send", payload);
        setMessage("");
        fetchMessages(); // Refresh messages after sending
      } catch (error) {
        console.error("Failed to send message:", error);
      }
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
              {courses.map((course) => (
                <option key={course.course_id} value={`${course.course_id}: ${course.title}`}>
                  {course.course_id}: {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          {selectedCourse ? (
            <div className="chatbox">
              <div className="chat-header">
                <h3>👥 Student Group Chat</h3>
              </div>
              <div className="messages-container">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.student_id === studentId ? "sent" : "received"}`}>
                    <div className="message-content">
                      <span className="sender">{msg.student_id === studentId ? `You (ID: ${msg.student_id})` : `Student ${msg.student_id}`}</span>
                      <p>{msg.content}</p>
                      <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
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
              <h3>Select a course to start messaging</h3>
              <p>Choose from your enrolled courses to begin a conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesWithChat;