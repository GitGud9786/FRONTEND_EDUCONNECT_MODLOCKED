// AddEventForm.jsx
import React, { useState, useEffect } from 'react';
import '../styles/AddEventForm.css';

const AddEventForm = ({ onAddEvent, onCancel, event }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (event) {
      setEventTitle(event.title || '');
      setStartTime(event.start ? new Date(event.start).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '');
      setEndTime(event.end ? new Date(event.end).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '');
      setDescription(event.description || '');
    } else {
      setEventTitle('');
      setStartTime('');
      setEndTime('');
      setDescription('');
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title: eventTitle,
      start: startTime,
      end: endTime,
      description: description,
    };

    onAddEvent(newEvent);

    // Clear the form after submission
    setEventTitle('');
    setStartTime('');
    setEndTime('');
    setDescription('');
  };

  return (
    <div className="add-event-box">
      <form onSubmit={handleSubmit}>
        <h2>{event ? "Edit Event" : "Add New Event"}</h2>

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
