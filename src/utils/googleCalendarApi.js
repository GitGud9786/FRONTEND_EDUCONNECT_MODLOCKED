import { gapi } from 'gapi-script';

const CLIENT_ID = 'dummy.apps.googleusercontent.com';
const API_KEY = 'dummmy';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar";

export const initClient = async () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    });
};

export const loadCalendarEvents = () => {
  return gapi.client.calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: 'startTime',
  });
};

export const signInAndLoadEvents = () => {
  return gapi.auth2.getAuthInstance().signIn().then(() => {
    return loadCalendarEvents();
  });
};
