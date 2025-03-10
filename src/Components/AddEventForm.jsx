import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/AddEventForm.css";

const AddEventForm = ({ onAddEvent, onCancel, event }) => {
  const { student_id: paramStudentId } = useParams();
  const [studentId, setStudentId] = useState(paramStudentId || null);
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!studentId) {
      const extractedId = window.location.pathname.split("/").pop();
      setStudentId(extractedId);
    }
  }, [studentId]);

  useEffect(() => {
    if (event) {
      setEventTitle(event.title || "");
      setStartTime(event.start ? formatDateTime(event.start) : "");
      setEndTime(event.end ? formatDateTime(event.end) : "");
      setDescription(event.description || "");
    } else {
      setEventTitle("");
      setStartTime("");
      setEndTime("");
      setDescription("");
    }
  }, [event]);

  // Function to format time as "YYYY-MM-DD HH:mm:ss"
  const formatDateTime = (time) => {
    const date = new Date(time);
    return date.toISOString().slice(0, 19).replace("T", " "); // Converts to "YYYY-MM-DD HH:mm:ss"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId) {
      console.error("Student ID is missing");
      return;
    }

    // Convert times to MySQL compatible format
    const eventData = {
      title: eventTitle,
      start_time: formatDateTime(new Date(`1970-01-01T${startTime}:00`)), // Convert input time to full datetime
      end_time: formatDateTime(new Date(`1970-01-01T${endTime}:00`)),
      description: description,
    };

    try {
      const response = await fetch(`http://localhost:8000/students/add-event/${studentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      const data = await response.json();
      console.log("Event added successfully:", data);

      if (onAddEvent) {
        onAddEvent({ ...eventData, id: data.event_id });
      }

      setEventTitle("");
      setStartTime("");
      setEndTime("");
      setDescription("");
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="add-event-box">
      <form onSubmit={handleSubmit}>
        <h2>{event ? "Edit Event" : "Add New Event"} - Student {studentId}</h2>

        <label htmlFor="eventTitle">Event Title:</label>
        <input
          type="text"
          id="eventTitle"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Enter event title"
          required
        />

        <label htmlFor="startTime">Start Time:</label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />

        <label htmlFor="endTime">End Time:</label>
        <input
          type="time"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter event details"
          rows="4"
        ></textarea>

        <div className="form-buttons">
          <button type="submit" className="add-button">{event ? "Save Event" : "Add Event"}</button>
          <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddEventForm;
