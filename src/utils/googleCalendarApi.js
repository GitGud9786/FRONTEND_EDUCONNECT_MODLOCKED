import { gapi } from 'gapi-script';

const CLIENT_ID = '204754049053-ei5vg5van10at4q6ksj20lp2ks38j6hg.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDiJhYDLjEZAjif2MH1AOFdxvWiPp1MdAI';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export const initClient = () => {
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