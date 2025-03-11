import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk-ng';
import TeacherTopBar from './TeacherTopBar';
import "../styles/TeacherCourseClassroom.css";
import axios from 'axios';

const APP_ID = '5a3ef53cf05c49d5a7e6ad24ba307cdb';
const TOKEN = null; // use a token if needed for production
const CHANNEL = 'test-channel';

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
    );
};

const Announcement = ({ fetchAnnouncements }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [announcementText, setAnnouncementText] = useState("");
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handlePost = async () => {
    if (!announcementText.trim() || !title.trim() || !courseId.trim()) return;
    try {
      await axios.post("http://localhost:8000/announcement/create", {
        course_id: courseId,
        title: title,
        description: announcementText,
      });
      setAnnouncementText("");
      setTitle("");
      setCourseId("");
      toggleExpand();
      fetchAnnouncements(); // Refresh announcements list
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  return (
    <div className={`teacher-collapsible-container ${isExpanded ? "expanded" : ""}`}>
      {!isExpanded && (
        <div className="teacher-collapsible-bar" onClick={toggleExpand}>
          <span className="teacher-collapsible-title">Announce something to your class</span>
        </div>
      )}

      {isExpanded && (
        <div className="teacher-expanded-content">
          <input
            type="text"
            className="teacher-expanded-input"
            placeholder="Enter Course ID"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />
          <input
            type="text"
            className="teacher-expanded-input"
            placeholder="Enter Announcement Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="teacher-expanded-textarea"
            placeholder="Announce something to your class"
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
          />
          <div className="teacher-expanded-actions">
            <button className="teacher-cancel-btn" onClick={toggleExpand}>Cancel</button>
            <button className="teacher-post-btn" onClick={handlePost}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
};

const MeetingClassroom = () => {
  const [joined, setJoined] = useState(false);
  const clientRef = useRef(null);
  useEffect(() => {
    clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  }, []);
  const joinCall = () => {
    const meetingUrl = `/meetingpage?appId=${APP_ID}&channel=${CHANNEL}&token=${TOKEN}`;
    window.open(meetingUrl, '_blank');
  };
  return (
    <div>
      {!joined && (
        <button className="meeting-button" onClick={joinCall}>
          Join in a call
        </button>
      )}
    </div>
  );
};

const TeacherPostCard = ({ user, date, message }) => {
  return (
    <div className="teacher-announcement-card">
      <div className="teacher-announcement-header">
        <div className="user-info">
          <span className="teacher-user-name">{user}</span>
          <span className="teacher-announcement-date">{date}</span>
        </div>
        <div className="teacher-options-menu">⋮</div>
      </div>
      <div className="teacher-announcement-message">{message}</div>
    </div>
  );
};

const CombinedTeacherClassroom = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState({});
  const { id } = useParams();

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("http://localhost:8000/announcement/");
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8000/teacher/read/${id}`);
        const data = await response.json();
        console.log('Fetched teacher info:', data); // Log the fetched data
        if (data.length > 0) {
          setTeacherInfo(data[0]);
        } else {
          console.error('No teacher info found');
        }
      } catch (error) {
        console.error('Error loading teacher info:', error);
      }
    };

    fetchTeacherInfo();
  }, [id]);

  return (
    <div className="combinedteacherclassroom">
      <TeacherTopBar />
      <div className='teachercoursemain'>
        <aside className="teachersidebar">
          <h3>Teacher Info</h3>
          <p><strong>Email:</strong> {teacherInfo.email}</p>
          <p><strong>Department:</strong> {teacherInfo.department}</p>
        </aside>
        <div className='teachercoursecontents'>
          <TitleBlock />
          <MeetingClassroom />
          <Announcement fetchAnnouncements={fetchAnnouncements} />
          {announcements.map((announcement) => (
            <TeacherPostCard
              key={announcement.announcement_id}
              user="Teacher"
              date={new Date().toLocaleDateString()}
              message={announcement.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CombinedTeacherClassroom;