import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faDumpster, faSearch } from '@fortawesome/free-solid-svg-icons';
import TopBarAdmin from './TopBarAdmin';
import '../styles/StudentsAdmin.css';

const StudentsAdmin = () => {
  const students = [
    { id: 1, firstName: 'CSE', Building: "AB1", Head: "Sohel Ahmed"},
    { id: 2, firstName: 'EEE', Building: "AB2", Head: "Yead"},
    { id: 3, firstName: 'MPE', Building: "AB1", Head: "Oshayer"},
    { id: 4, firstName: 'CEE', Building: "AB2", Head: "Tausif"}
  ];

  const [selectedBuilding, setSelectedBuilding] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [error, setError] = useState('');

  // Function to filter students by Building, year, and ID
  const filterStudents = () => {
    const searchResult = students.filter(student => {
      const BuildingMatches = selectedBuilding === 'All' || student.Building === selectedBuilding;
      const idMatches = !searchText || student.id.toString().includes(searchText);

      return BuildingMatches && idMatches;
    });

    if (searchResult.length > 0) {
      setFilteredStudents(searchResult);
      setError(''); // Clear error if students are found
    } else {
      setFilteredStudents([]); // No results
      setError(`No Department found with the specified criteria.`); // Set error message
    }
  };

  // Call filterStudents whenever Building, year, or searchText changes
  useEffect(() => {
    filterStudents();
  }, [selectedBuilding, searchText]);

  return (
    <div className="studentsadmincontainer">
      <TopBarAdmin />
      <div className="studentsadmin-subcontainer">
        <div className="table-container">
          <div className="filter-controls">
            <label>
              Building:
              <select value={selectedBuilding} onChange={(e) => setSelectedBuilding(e.target.value)}>
                <option value="All">All</option>
                <option value="AB1">AB1</option>
                <option value="AB2">AB2</option>
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
                <th>Department</th>
                <th>Building</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td><input type="checkbox" /></td>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.Building}</td>
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
          <Link to="/admin/department/register" className="stdadmin-controls-button">
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
