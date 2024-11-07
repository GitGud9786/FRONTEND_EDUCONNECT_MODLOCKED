//App.js
import logo from "./logo.svg";
import "./App.css";


import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Course from "./Components/CoursePage";
import Profile from './Components/Profile';
import Schedule from './Components/Schedule';
import Messages from './Components/Messages';
import Grades from './Components/Grades';
import AdminPanel from "./Components/AdminDashboard";
import AdminStudentRegister from "./Components/AdminStudentRegister";
import AdminFacultyRegister from "./Components/AdminFacultyRegister";
import CombinedCourseList from "./Components/CourseList";
import AdminCourseRegister from "./Components/AdminCourseRegister";
import AdminDepartmentRegister from "./Components/AdminDepartmentRegister"
import StudentsAdmin from './Components/StudentsAdmin';
import FacultiesAdmin from './Components/FacultiesAdmin';
import CoursesAdmin from './Components/CoursesAdmin';
import DepartmentsAdmin from './Components/DepartmentsAdmin';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/courselist/course" element={<Course />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/courselist" element={<CombinedCourseList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/student/register" element={<AdminStudentRegister />} />
          <Route path="/admin/faculty/register" element={<AdminFacultyRegister />} />
          <Route path="/admin/course/register" element={<AdminCourseRegister />} />
          <Route path="/admin/department/register" element={<AdminDepartmentRegister />} />
          <Route path="/admin/student" element={<StudentsAdmin />} />
          <Route path="/admin/faculty" element={<FacultiesAdmin />} />
          <Route path="/admin/course" element={<CoursesAdmin />} />
          <Route path="/admin/department" element={<DepartmentsAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;