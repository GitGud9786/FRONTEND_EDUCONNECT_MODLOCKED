import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/AddEventForm.css";

const TeacherAddEventForm = ({ onAddEvent, onCancel, event }) => {
  const { teacher_id: paramTeacherId } = useParams();
  const [teacherId, setTeacherId] = useState(paramTeacherId || null);
  const [eventTitle, setEventTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // For storing the selected date
  const [successMessage, setSuccessMessage] = useState(""); // For showing success message

  useEffect(() => {
    if (!teacherId) {
      const extractedId = window.location.pathname.split("/").pop();
      setTeacherId(extractedId);
    }
  }, [teacherId]);

  useEffect(() => {
    if (event) {
      setEventTitle(event.title || "");
      setStartTime(event.start ? formatDateTime(event.start).slice(11, 16) : ""); // Extract time from the event
      setEndTime(event.end ? formatDateTime(event.end).slice(11, 16) : "");
      setDescription(event.description || "");
      setSelectedDate(event.start ? formatDateTime(event.start).slice(0, 10) : ""); // Extract date
    } else {
      setEventTitle("");
      setStartTime("");
      setEndTime("");
      setDescription("");
      setSelectedDate("");
    }
  }, [event]);

  // Function to format time as "YYYY-MM-DD HH:mm:ss"
  const formatDateTime = (time) => {
    const date = new Date(time);
    return date.toISOString().slice(0, 19).replace("T", " "); // Converts to "YYYY-MM-DD HH:mm:ss"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teacherId) {
      console.error("Teacher ID is missing");
      return;
    }

    // Combine the selected date with the start time
    const startDateTime = new Date(`${selectedDate}T${startTime}:00`);
    const endDateTime = new Date(`${selectedDate}T${endTime}:00`);

    // Convert times to MySQL compatible format
    const eventData = {
      title: eventTitle,
      start_time: formatDateTime(startDateTime), // Full date and time
      end_time: formatDateTime(endDateTime),     // Full date and time
      description: description,
    };

    try {
      const response = await fetch(`http://localhost:8000/teachers/add-event/${teacherId}`, {
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

      // Show success message
      setSuccessMessage("Event added successfully!");

      // Clear the form after adding event
      setEventTitle("");
      setStartTime("");
      setEndTime("");
      setDescription("");
      setSelectedDate("");

      // Hide the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="add-event-box">
      <form onSubmit={handleSubmit}>
        <h2>{event ? "Edit Event" : "Add New Event"} - Teacher {teacherId}</h2>

        <label htmlFor="eventTitle">Event Title:</label>
        <input
          type="text"
          id="eventTitle"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="Enter event title"
          required
        />

        <label htmlFor="selectedDate">Event Date:</label>
        <input
          type="date"
          id="selectedDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
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

      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default TeacherAddEventForm;