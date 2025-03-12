import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faDumpster, faSearch } from '@fortawesome/free-solid-svg-icons';
import TopBarAdmin from './TopBarAdmin';
import '../styles/StudentsAdmin.css';

const CoursesAdmin = () => {
  const [courses, setCourses] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/courses/');
        const data = await response.json();
        setCourses(data);
        setFilteredCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to fetch courses');
      }
    };
    fetchCourses();
  }, []);

  const filterCourses = () => {
    const searchResult = courses.filter(course => {
      const departmentMatches = selectedDepartment === 'All' || course.course_department.includes(selectedDepartment);
      const idMatches = !searchText || course.course_id.toString().includes(searchText);
      return departmentMatches && idMatches;
    });

    setFilteredCourses(searchResult);
  };

  useEffect(() => {
    filterCourses();
  }, [selectedDepartment, searchText]);

  return (
    <div className="studentsadmincontainer">
      <TopBarAdmin />
      <div className="studentsadmin-subcontainer">
        <div className="table-container">
          <div className="filter-controls">
            <label>
              <label className="holders">Department:</label>
              <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option value="All">All</option>
                <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                <option value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</option>
                <option value="Mechanical and Production Engineering">Mechanical and Production Engineering</option>
                <option value="Civil and Environmental Engineering">Civil and Environmental Engineering</option>
                <option value="Industrial and Production Engineering">Industrial and Production Engineering</option>
                <option value="Business Technology and Management">Business Technology and Management</option>
              </select>
            </label>

            <div className="stdadmin-searchbar">
              <input
                type="search"
                placeholder="Search by ID"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button onClick={filterCourses} className="search-button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

          <div className="stdadmin-controls">
          <button>
          <Link to="/admin/course/register" className="stdadmin-controls-button">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add</span>
          </Link>
          </button>
          <button>
            <Link to="/admin/course/edit" className="stdadmin-controls-button">
                <FontAwesomeIcon icon={faEdit} />
                <span>Edit</span>
            </Link >
          </button>
          <button
            className="stdadmin-controls-button"
            onClick={async () => {
              const courseId = prompt("Enter Course ID to delete:");
              if (courseId) {
                try {
                  const response = await fetch(`http://localhost:8000/courses/delete/${courseId}`, {
                    method: "DELETE",
                  });

                  if (response.ok) {
                    alert("Course deleted successfully");
                  } else {
                    alert("Failed to delete course");
                  }
                } catch (error) {
                  console.error("Error deleting course:", error);
                }
              }
            }}
          >
            <FontAwesomeIcon icon={faDumpster} />
            <span>Delete</span>
          </button>
        </div>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          <table className="student-table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Title</th>
                <th>Department</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.course_id}>
                    <td>{course.course_id}</td>
                    <td>{course.title}</td>
                    <td>{course.course_department}</td>
                    <td>{course.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No courses found for the selected filters.</td>
                </tr>
              )}
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
};

export default CoursesAdmin;
