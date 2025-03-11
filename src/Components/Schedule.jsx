import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../styles/Schedule.css';
import AddEventForm from './AddEventForm';
import TopBar from './TopBar';
import { useParams } from "react-router-dom"; // Import useParams

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const { student_id: paramStudentId } = useParams(); // Extract student_id from URL params
  const [studentId, setStudentId] = useState(paramStudentId || null);

  useEffect(() => {
    // If studentId is not set, extract it from the URL
    if (!studentId) {
      const extractedId = window.location.pathname.split("/").pop();
      setStudentId(extractedId);
    }
  }, [studentId]);

  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectEvent, setSelectEvent] = useState(null);

  useEffect(() => {
    if (studentId) {
      const fetchEvents = async () => {
        try {
          const response = await fetch(`http://localhost:8000/students/get-event/${studentId}`);
          const data = await response.json();
          console.log("Fetched events:", data);  // Log the fetched data

          // Parse the start and end time for each event to ensure correct date handling
          const eventsWithParsedDates = data.map((event) => ({
            ...event,
            start: moment(event.start_time).toDate(), // Use start_time from event object
            end: moment(event.end_time).toDate(), // Use end_time from event object
          }));

          setEvents(eventsWithParsedDates);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };

      fetchEvents();
    }
  }, [studentId]);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
    setShowAddEventForm(true);
  };

  const handleSelectedEvent = (event) => {
    setSelectedDate(event.start);
    setSelectEvent(event);
    setShowAddEventForm(true);
  };

  const handleAddEvent = (newEvent) => {
    if (selectEvent) {
      const updatedEvent = { ...selectEvent, ...newEvent };
      const updatedEvents = events.map((event) =>
        event === selectEvent ? updatedEvent : event
      );
      setEvents(updatedEvents);
    } else {
      const startDateTime = moment(selectedDate).set({
        hour: newEvent.startTime.split(":")[0], // Set hour from the selected start time
        minute: newEvent.startTime.split(":")[1], // Set minute from the selected start time
      }).toDate();

      const endDateTime = moment(startDateTime).add(1, "hours").toDate(); // Default duration of 1 hour

      const newEventWithDate = {
        ...newEvent,
        start: startDateTime,
        end: endDateTime,
      };

      setEvents([...events, newEventWithDate]);
    }
    setShowAddEventForm(false);
    setSelectEvent(null);
  };

  const handleCancel = () => {
    setShowAddEventForm(false);
    setSelectEvent(null);
  };

  const deleteEvents = () => {
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event !== selectEvent);
      setEvents(updatedEvents);
      setShowAddEventForm(false);
      setSelectEvent(null);
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor = "#3174ad"; // Default color
    if (event.type === "important") {
      backgroundColor = "#ff5722"; // Change color for important events
    } else if (event.type === "meeting") {
      backgroundColor = "#8bc34a"; // Color for meeting type events
    }

    return {
      style: {
        backgroundColor: backgroundColor,
        color: "white",
        borderRadius: "4px",
        padding: "5px",
      },
    };
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
        eventPropGetter={eventStyleGetter} // Add custom event styles
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
                  {/* <button
                    type="button"
                    className="btn btn-danger"
                    onClick={deleteEvents}
                  >
                  </button> */}
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
