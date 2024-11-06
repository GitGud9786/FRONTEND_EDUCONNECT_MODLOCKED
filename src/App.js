//App.js
import logo from "./logo.svg";
import "./App.css";


import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Course from "./Components/CoursePage";
import Profile from './Components/Profile';
import Schedule from './Components/Schedule';
import Messages from './Components/Messages';
import AdminPanel from "./Components/AdminDashboard";
import AdminStudentRegister from "./Components/AdminStudentRegister";
import AdminFacultyRegister from "./Components/AdminFacultyRegister";
import CombinedCourseList from "./Components/CourseList";

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/course" element={<Course />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/courselist" element={<CombinedCourseList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/adminstudentregister" element={<AdminStudentRegister />} />
          <Route path="/adminfacultyregister" element={<AdminFacultyRegister />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
