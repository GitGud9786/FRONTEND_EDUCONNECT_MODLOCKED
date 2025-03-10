import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../styles/Schedule.css';
import AddEventForm from './AddEventForm';
import TopBar from './TopBar';

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectEvent, setSelectEvent] = useState(null);

  // Handle slot (date) selection
  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
    setShowAddEventForm(true);
  };

  // Handle event selection
  const handleSelectedEvent = (event) => {
    setSelectedDate(event.start);
    setSelectEvent(event);
    setShowAddEventForm(true);
  };

  // Handle Add Event
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
    setShowAddEventForm(false);
    setSelectEvent(null);
  };

  // Handle canceling the form
  const handleCancel = () => {
    setShowAddEventForm(false);
    setSelectEvent(null);
  };

  // Handle deleting the event
  const deleteEvents = () => {
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event !== selectEvent);
      setEvents(updatedEvents);
      setShowAddEventForm(false);
      setSelectEvent(null);
    }
  };

  return (
    <div style={{ height: "750px" }}>
      <TopBar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        selectable={true}
        onSelectEvent={handleSelectedEvent}
        onSelectSlot={handleSelectSlot}
      />

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
                  event={selectEvent}
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
