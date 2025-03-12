import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from './TopBar';
import "../styles/CourseCardAssignment.css";
import DropboxChooser from 'react-dropbox-chooser';

const APP_KEY = "2kkwrv0a58nf77q";

const TitleBlock = ({ courseTitle }) => {
  return (
    <div className="block-container">
      <div className="title-header">
        <h1>{courseTitle}</h1>
      </div>
      <div className="section-header">
        <h2>Section 1 & 2</h2>
      </div>
    </div>
  );
};

const TeacherPostCard = ({ user, date, message }) => {
  return (
    <div className="teacher-announcement-card">
      {/* Header: User Info */}
      <div className="teacher-announcement-header">
        <div className="user-info">
          <span className="teacher-user-name">{user}</span>
          <span className="teacher-announcement-date">{date}</span>
        </div>
        <div className="teacher-options-menu">⋮</div>
      </div>

      {/* Message Content */}
      <div className="teacher-announcement-message">{message}</div>

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
    console.log("CourseCardAssignment component mounted!");
  const { course_id } = useParams();
  console.log("course_id from useParams:", course_id);
  const [isMarkedDone, setIsMarkedDone] = useState(false);
  const [url, setUrl] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchCourseTitle = async () => {
      try {
        const response = await fetch(`http://localhost:8000/courses/read/${course_id}`);
        const data = await response.json();
        console.log('Course data:', data);
        if (data && data.length > 0) {
          setCourseTitle(data[0].title);
        } else {
          console.error('Course title not found');
        }
      } catch (error) {
        console.error('Error fetching course title:', error);
      }
    };

    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`http://localhost:8000/announcement/course/${course_id}`);
        const data = await response.json();
        console.log('Announcements data:', data);
        setAnnouncements(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setAnnouncements([]);
      }
    };

    if (course_id) {
      fetchCourseTitle();
      fetchAnnouncements();
    }
  }, [course_id]);

  // Toggle "Mark as Done" & Reset URL on Unsubmit
  const handleMarkDone = () => {
    setIsMarkedDone((prev) => !prev);
  };

  // Handle Dropbox file upload
  function handleSuccess(files) {
    console.log(files[0].link);
    setUrl(files[0].link);
  }

  // Clear uploaded file manually
  const handleRemoveFile = () => {
    setUrl(""); // Clear URL
  };

  return (
    <div className="container-assignment">
      <TopBar />
      <div className="courseassignmentmain">
        {/* Main Course Content */}
        <div className="teachercoursecontents">
          <TitleBlock courseTitle={courseTitle} />
          {announcements.map((announcement, index) => (
            <TeacherPostCard
              key={index}
              user="Teacher Name" // Replace with actual teacher name if available
              date={new Date(announcement.created_at).toLocaleDateString()}
              message={announcement.description}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="assignment-action-buttons">
          <div className="submission-text">
            <h2>Submission</h2>
          </div>

          {/* Hide Upload & URL Input When Marked as Done */}
          {!isMarkedDone && (
            <>
              <div className="file-uploader">
                <DropboxChooser
                  appKey={APP_KEY}
                  success={handleSuccess}
                  cancel={() => console.log("closed")}
                  multiselect={true}
                >
                  <button className="upload-btn">Upload to Dropbox</button>
                </DropboxChooser>
              </div>

              {/* Show Uploaded File Link & Remove Button */}
              {url && (
                <div className="uploaded-link">
                  <p>Uploaded File:</p>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url.length > 30 ? `${url.substring(0, 15)}...${url.slice(-10)}` : url}
                  </a>
                  <button className="upload-btn" onClick={handleRemoveFile}>
                    Remove File ❌
                  </button>
                </div>
              )}
            </>
          )}

          {/* Mark as Done Button */}
          <button
            className={`mark-done-btn ${isMarkedDone ? "done" : ""}`}
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