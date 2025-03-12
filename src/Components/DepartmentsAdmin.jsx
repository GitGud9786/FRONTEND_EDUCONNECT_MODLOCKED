import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faDumpster, faSearch } from '@fortawesome/free-solid-svg-icons';
import TopBarAdmin from './TopBarAdmin';
import '../styles/StudentsAdmin.css';

const StudentsAdmin = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:8000/departments/');
        const data = await response.json();
        setDepartments(data);
        setFilteredDepartments(data);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setError('Failed to fetch departments');
      }
    };
    fetchDepartments();
  }, []);

  const filterDepartments = () => {
    const searchResult = departments.filter(department => {
      const buildingMatches = selectedBuilding === 'All' || department.location.includes(selectedBuilding);
      const idMatches = !searchText || department.department_id.toString().includes(searchText);
      return buildingMatches && idMatches;
    });

    setFilteredDepartments(searchResult);
  };

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
              <label className="holders">Building:</label>
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
              <button onClick={filterDepartments} className = "search-button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>


          <div className="stdadmin-controls">
        <button>
          <Link to="/admin/department/register" className="stdadmin-controls-button">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add</span>
          </Link>
        </button>
        <button>
          <Link to="/admin/department/edit" className="stdadmin-controls-button">
            <FontAwesomeIcon icon={faEdit} />
            <span>Edit</span>
          </Link>
        </button>
        <button
          className="stdadmin-controls-button"
          onClick={async () => {
            const departmentId = prompt("Enter Department ID to delete:");
            if (departmentId) {
              try {
                const response = await fetch(`http://localhost:8000/departments/delete/${departmentId}`, {
                  method: "DELETE",
                });

                if (response.ok) {
                  alert("Department deleted successfully");
                } else {
                  alert("Failed to delete department");
                }
              } catch (error) {
                console.error("Error deleting department:", error);
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
                    <td>{department.department_id}</td>
                    <td>{department.name}</td>
                    <td>{department.location}</td>
                    <td>{department.dept_email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No departments found for the selected filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsAdmin;