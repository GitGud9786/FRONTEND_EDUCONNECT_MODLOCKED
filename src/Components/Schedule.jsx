import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import '../styles/Schedule.css';
import AddEventForm from './AddEventForm';
import TopBar from './TopBar';
import { gapi } from 'gapi-script';
import { initClient, loadCalendarEvents } from '../utils/googleCalendarApi';

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectEvent, setSelectEvent] = useState(null);

  // Initialize Google API client
  useEffect(() => {
    gapi.load('client:auth2', () => {
      initClient().then(() => {
        console.log("Google API initialized ✅");

        // Ensure Auth Instance is available
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance) {
          authInstance.signIn().then(googleUser => {
            console.log("User signed in! 🎉", googleUser);
            loadCalendarEvents().then(response => {
              const googleEvents = response.result.items.map(event => ({
                start: new Date(event.start.dateTime || event.start.date),
                end: new Date(event.end.dateTime || event.end.date),
                title: event.summary,
              }));
              setEvents(googleEvents);
            });
          }).catch(error => console.error("Google Sign-In Failed ❌", error));
        } else {
          console.error("Auth Instance not available ❌");
        }
      }).catch(error => console.error("Google API init failed ❌", error));
    });
  }, []);

  // Handle slot (date) selection
  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setSelectEvent(null); // Deselect any event
    setShowAddEventForm(true); // Show Add Event Form when a date is clicked
  };

  // Handle event selection
  const handleSelectedEvent = (event) => {
    setSelectedDate(event.start);
    setSelectEvent(event);
    setShowAddEventForm(true); // Show the form for editing the selected event
  };

  // Handle Add Event to Google Calendar
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

      // Use Google API to insert the event to Google Calendar
      const event = {
        summary: newEvent.title,
        start: {
          dateTime: newEventWithDate.start,
          timeZone: 'UTC',
        },
        end: {
          dateTime: newEventWithDate.end,
          timeZone: 'UTC',
        },
      };

      gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      }).then(() => {
        console.log("Event added to Google Calendar ✅");
        setEvents([...events, newEventWithDate]); // Add event to local state
      }).catch((error) => {
        console.error("Error adding event to Google Calendar ❌", error);
      });
    }
    setShowAddEventForm(false); // Close the form after adding the event
    setSelectEvent(null); // Clear selected event after adding or updating
  };

  // Handle canceling the form
  const handleCancel = () => {
    setShowAddEventForm(false); // Close the form without adding an event
    setSelectEvent(null); // Reset selected event
  };

  // Handle deleting the event
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
