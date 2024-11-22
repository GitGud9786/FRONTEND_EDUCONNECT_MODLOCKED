import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faDumpster, faSearch } from '@fortawesome/free-solid-svg-icons';
import TopBarAdmin from './TopBarAdmin';
import '../styles/StudentsAdmin.css';

const StudentsAdmin = () => {
  const [departments, setDepartments] = useState([]); // Store fetched departments
  const [selectedBuilding, setSelectedBuilding] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [error, setError] = useState('');

  // Fetch departments from backend
  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:8000/departments/'); // Adjust this URL to match your backend
      const data = await response.json();
      setDepartments(data);
      setFilteredDepartments(data); // Initialize filtered list with all departments
    } catch (err) {
      console.error('Error fetching departments:', err);
      setError('Failed to fetch departments');
    }
  };

  // Filter departments by building and ID
  const filterDepartments = () => {
    const searchResult = departments.filter(department => {
      const buildingMatches = selectedBuilding === 'All' || department.location.includes(selectedBuilding);
      const idMatches = !searchText || department.department_id.toString().includes(searchText);

      return buildingMatches && idMatches;
    });

    if (searchResult.length > 0) {
      setFilteredDepartments(searchResult);
      setError(''); // Clear error if departments are found
    } else {
      setFilteredDepartments([]); // No results
      setError(``); // Set error message
    }
  };

  // Fetch departments when component mounts
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Call filterDepartments whenever selectedBuilding or searchText changes
  useEffect(() => {
    filterDepartments();
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
              <button onClick={filterDepartments}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          <table className="student-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Department ID</th>
                <th>Department Name</th>
                <th>Location</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredDepartments.length > 0 ? (
                filteredDepartments.map((department) => (
                  <tr key={department.department_id}>
                    <td><input type="checkbox" /></td>
                    <td>{department.department_id}</td>
                    <td>{department.name}</td>
                    <td>{department.location}</td>
                    <td>{department.dept_email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No departments found for the selected filters.</td>
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
