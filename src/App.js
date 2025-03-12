import logo from "./logo.svg";
import "./App.css";

import React from "react";

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
import AdminTeacherRegister from "./Components/AdminTeacherRegister";
import AdminTeacherEdit from "./Components/AdminTeacherEdit";
import CombinedCourseList from "./Components/CourseList";
import AdminCourseRegister from "./Components/AdminCourseRegister";
import AdminCourseEdit from "./Components/AdminCourseEdit";
import AdminDepartmentRegister from "./Components/AdminDepartmentRegister";
import AdminDepartmentEdit from "./Components/AdminDepartmentEdit";
import StudentsAdmin from './Components/StudentsAdmin';
import TeachersAdmin from './Components/TeachersAdmin';
import CoursesAdmin from './Components/CoursesAdmin';
import DepartmentsAdmin from './Components/DepartmentsAdmin';
import CombinedTeacherComponents from "./Components/TeacherDashboard";
import CombinedTeacherClassroom from "./Components/TeacherCourseClassroom";
import TeacherSideBar from "./Components/TeacherCourseSideBar";
import CourseCardAssignment from "./Components/CourseCardAssignment";
import FileUploader from "./Components/FileUploader";
import MeetingPage from './Components/MeetingClassroom';
import AdminCourseStudentEnrollment from "./Components/AdminCourseStudentEnroll";
import AdminTeacherAssign from "./Components/AdminTeacherAssign";
import AdminEnrollment from "./Components/AdminEnrollment";
import GradeAssign from "./Components/GradeAssign";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeacherSchedule from "./Components/TeacherSchedule";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/studentdashboard/:id" element={<Dashboard />} />
          <Route path="/student/courselist/course/:id" element={<Course />} />
          <Route path="/student/schedule/:id" element={<Schedule />} />
          <Route path="/student/messages/:id" element={<Messages />} />
          <Route path="/student-profile/:id" element={<Profile />} />
          <Route path="/student/grades/:id" element={<Grades />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/student/courselist/:id" element={<CombinedCourseList />} />
          <Route path="/admin/student/register" element={<AdminStudentRegister />} />
          <Route path="/admin/student/edit" element={<AdminStudentEdit />} />
          <Route path="/admin/teacher/register" element={<AdminTeacherRegister />} />
          <Route path="/admin/teacher/edit" element={<AdminTeacherEdit />} />
          <Route path="/admin/course/register" element={<AdminCourseRegister />} />
          <Route path="/admin/course/edit" element={<AdminCourseEdit />} />
          <Route path="/admin/department/register" element={<AdminDepartmentRegister />} />
          <Route path="/admin/department/edit" element={<AdminDepartmentEdit />} />
          <Route path="/admin/student" element={<StudentsAdmin />} />
          <Route path="/admin/teacher" element={<TeachersAdmin />} />
          <Route path="/admin/course" element={<CoursesAdmin />} />
          <Route path="/admin/department" element={<DepartmentsAdmin />} />
          <Route path="/teacherdashboard/:id" element={<CombinedTeacherComponents />} />
          <Route path="/teacher/teacherclassroom/:id" element={<CombinedTeacherClassroom />} />
          <Route path="/teacher/schedule/:id" element={<TeacherSchedule />} />
          <Route path="/dash/assignment" element={<CourseCardAssignment />} />
          <Route path="/dash/assignment/upload" element={<FileUploader />} />
          <Route path="/meetingpage" element={<MeetingPage />} />
          <Route path="/admin/student-enroll" element={<AdminCourseStudentEnrollment />} />
          <Route path="/admin/teacher-assignment" element={<AdminTeacherAssign />} />
          <Route path="/admin/enrollment" element={<AdminEnrollment />} />
          <Route path="/teacher/grade-assign/:id" element={<GradeAssign />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;