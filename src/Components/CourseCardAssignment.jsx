import React from 'react';
import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import "../styles/CourseCardAssignment.css";
import DropboxChooser from 'react-dropbox-chooser';

const APP_KEY = "2kkwrv0a58nf77q"

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
  const [url, setUrl] = useState("");

  // Toggle "Mark as Done" & Reset URL on Unsubmit
  const handleMarkDone = () => {
      /*if (isMarkedDone) {
          setUrl(""); // ✅ Clear URL when "Unsubmit" is clicked
      }*/
      setIsMarkedDone((prev) => !prev);
  };

  // Handle Dropbox file upload
  function handleSuccess(files) {
      console.log(files[0].link);
      setUrl(files[0].link);
  }

  // ✅ New function to clear uploaded file manually
  const handleRemoveFile = () => {
      setUrl(""); // Clear URL
  };

  return (
      <div className="container-assignment">
          <TopBar />
          <div className="courseassignmentmain">

              {/* Main Course Content */}
              <div className="teachercoursecontents">
                  <TitleBlock />
                  <TeacherPostCard />
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

                          {/* ✅ Show Uploaded File Link & Remove Button */}
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