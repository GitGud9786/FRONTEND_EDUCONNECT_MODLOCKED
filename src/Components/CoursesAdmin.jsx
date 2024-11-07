import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faDumpster, faSearch } from '@fortawesome/free-solid-svg-icons';
import TopBarAdmin from './TopBarAdmin';
import '../styles/StudentsAdmin.css';

const StudentsAdmin = () => {
  const [courses, setCourses] = useState([]); // State to hold courses
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [error, setError] = useState('');

  // Fetch courses data from the backend on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/courses');
        const data = await response.json();
        if (response.ok) {
          setCourses(data); // Set courses state with the fetched data
        } else {
          setError('Failed to fetch courses');
        }
      } catch (error) {
        setError('Error fetching courses from the backend');
      }
    };

    fetchCourses();
  }, []);

  // Function to filter courses by department and search text
  const filterCourses = () => {
    const searchResult = courses.filter(course => {
      const departmentMatches = selectedDepartment === 'All' || course.course_department === selectedDepartment;
      const idMatches = !searchText || course.course_id.toString().includes(searchText);

      return departmentMatches && idMatches;
    });

    if (searchResult.length > 0) {
      setFilteredCourses(searchResult);
      setError(''); // Clear error if courses are found
    } else {
      setFilteredCourses([]); // No results
      setError('No courses found with the specified criteria.'); // Set error message
    }
  };

  // Call filterCourses whenever department, year, or searchText changes
  useEffect(() => {
    filterCourses();
  }, [selectedDepartment, searchText, courses]);

  return (
    <div className="studentsadmincontainer">
      <TopBarAdmin />
      <div className="studentsadmin-subcontainer">
        <div className="table-container">
          <div className="filter-controls">
            <label>
              Department:
              <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option value="All">All</option>
                <option value="Computer Science and Engineering">CSE</option>
                <option value="Electrical and Electronics Engineering">EEE</option>
                <option value="Mechanical and Production Engineering">MPE</option>
                <option value="Civil and Environmental Engineering">CEE</option>
              </select>
            </label>

            <div className="stdadmin-searchbar">
              <input
                type="search"
                placeholder="Search by Course ID"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button onClick={filterCourses}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          <table className="student-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.course_id}>
                    <td><input type="checkbox" /></td>
                    <td>{course.course_id}</td>
                    <td>{course.title}</td>
                    <td>{course.course_department}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>No courses found for the selected filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="stdadmin-controls">
          <Link to="/admin/course/register" className="stdadmin-controls-button">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add</span>
          </Link>
          <button>
            <FontAwesomeIcon icon={faEdit} />
            <span>Edit</span>
          </button>
          <button>
            <FontAwesomeIcon icon={faDumpster} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsAdmin;
