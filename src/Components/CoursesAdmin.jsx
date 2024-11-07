import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faDumpster, faSearch } from '@fortawesome/free-solid-svg-icons';
import TopBarAdmin from './TopBarAdmin';
import '../styles/StudentsAdmin.css';

const StudentsAdmin = () => {
  const students = [
    { id: 4301, firstName: 'Coding 1',department: 'CSE' },
    { id: 4779, firstName: 'Mecha 1', department: 'MPE' },
    { id: 4321, firstName: 'Electric 1', department: 'EEE' },
    { id: 4103, firstName: 'Coding 2', department: 'CSE' },
    { id: 4389, firstName: 'Coding 3', department: 'CSE' },
    { id: 4551, firstName: 'Mecha 2', department: 'MPE' },
    { id: 4801, firstName: 'Electric 3', department: 'EEE' },
    { id: 4310, firstName: 'Civil 1', department: 'CEE' },
  ];

  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [error, setError] = useState('');

  // Function to filter students by department, year, and ID
  const filterStudents = () => {
    const searchResult = students.filter(student => {
      const departmentMatches = selectedDepartment === 'All' || student.department === selectedDepartment;
      const idMatches = !searchText || student.id.toString().includes(searchText);

      return departmentMatches && idMatches;
    });

    if (searchResult.length > 0) {
      setFilteredStudents(searchResult);
      setError(''); // Clear error if students are found
    } else {
      setFilteredStudents([]); // No results
      setError(`No courses found with the specified criteria.`); // Set error message
    }
  };

  // Call filterStudents whenever department, year, or searchText changes
  useEffect(() => {
    filterStudents();
  }, [selectedDepartment, searchText]);

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
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="MPE">MPE</option>
                <option value="CEE">CEE</option>
              </select>
            </label>

            <div className="stdadmin-searchbar">
              <input
                type="search"
                placeholder="Search by ID"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button onClick={filterStudents}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          <table className="student-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>ID</th>
                <th>Course Name</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td><input type="checkbox" /></td>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.department}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center' }}>No students found for the selected filters.</td>
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
