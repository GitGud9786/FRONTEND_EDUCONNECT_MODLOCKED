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
import AdminStudentEdit from "./Components/AdminStudentEdit";
import AdminFacultyRegister from "./Components/AdminFacultyRegister";
import CombinedCourseList from "./Components/CourseList";
import AdminCourseRegister from "./Components/AdminCourseRegister";
import AdminDepartmentRegister from "./Components/AdminDepartmentRegister"
import AdminDepartmentEdit from "./Components/AdminDepartmentEdit"
import StudentsAdmin from './Components/StudentsAdmin';
import TeachersAdmin from './Components/TeachersAdmin';
import CoursesAdmin from './Components/CoursesAdmin';
import DepartmentsAdmin from './Components/DepartmentsAdmin';
import CombinedTeacherComponents from "./Components/TeacherDashboard"
import CombinedTeacherClassroom from "./Components/TeacherCourseClassroom"
import TeacherSideBar from "./Components/TeacherCourseSideBar";
import MeetingPage from './Components/MeetingClassroom';

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
          <Route path="/admin/student/edit" element={<AdminStudentEdit/>} />
          <Route path="/admin/faculty/register" element={<AdminFacultyRegister />} />
          <Route path="/admin/course/register" element={<AdminCourseRegister />} />
          <Route path="/admin/department/register" element={<AdminDepartmentRegister />} />
          <Route path="/admin/department/edit" element={<AdminDepartmentEdit />} />
          <Route path="/admin/student" element={<StudentsAdmin />} />
          <Route path="/admin/faculty" element={<TeachersAdmin />} />
          <Route path="/admin/course" element={<CoursesAdmin />} />
          <Route path="/admin/department" element={<DepartmentsAdmin />} />
          <Route path="/teacherdashboard" element={<CombinedTeacherComponents />} />
          <Route path="/teacherclassroom" element={<CombinedTeacherClassroom />} />
          <Route path="/meetingpage" element={<MeetingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;