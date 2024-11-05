// Schedule.jsx

import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../styles/Schedule.css'; // Import the styles for Schedule
import AddEventForm from './AddEventForm';
import logo from '../Assets/schedule.png'; // Assuming your logo is in the 'assets' folder
import TopBar from './TopBar'

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectEvent, setSelectEvent] = useState(null);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setSelectEvent(null); // Deselect any event
    setShowAddEventForm(true); // Show Add Event Form when a date is clicked
  };

  const handleSelectedEvent = (event) => {
    setSelectedDate(event.start);
    setSelectEvent(event);
    setShowAddEventForm(true); // Show the form for editing the selected event
  };

  const handleAddEvent = (newEvent) => {
    if (selectEvent) {
      const updatedEvent = { ...selectEvent, ...newEvent };
      const updatedEvents = events.map((event) =>
        event === selectEvent ? updatedEvent : event
      );
      setEvents(updatedEvents);
    } else {
      const newEventWithDate = {
        ...newEvent,
        start: selectedDate,
        end: moment(selectedDate).add(1, "hours").toDate(),
      };
      setEvents([...events, newEventWithDate]);
    }
    setShowAddEventForm(false); // Close the form after adding the event
    setSelectEvent(null); // Clear selected event after adding or updating
  };

  const handleCancel = () => {
    setShowAddEventForm(false); // Close the form without adding an event
    setSelectEvent(null); // Reset selected event
  };

  const deleteEvents = () => {
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event !== selectEvent);
      setEvents(updatedEvents);
      setShowAddEventForm(false);
      setSelectEvent(null); // Reset after deleting
    }
  };

  return (
    <div style={{ height: "750px" }}>
      {/* Logo and Title Section */}
      <TopBar></TopBar>

      {/* Calendar Component */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectedEvent}
      />

      {/* Conditional rendering of the Add Event form */}
      {showAddEventForm && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectEvent ? "Edit Event" : "Add Event"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancel}
                ></button>
              </div>
              <div className="modal-body">
                <AddEventForm
                  onAddEvent={handleAddEvent}
                  onCancel={handleCancel}
                  event={selectEvent} // Pass the selected event to the form for editing
                />
              </div>
              {selectEvent && (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={deleteEvents}
                  >
                    Delete Event
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;