import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faDumpster, faSearch, faEye } from '@fortawesome/free-solid-svg-icons';
import TopBarAdmin from './TopBarAdmin';
import '../styles/StudentsAdmin.css';

const TeachersAdmin = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:8000/teacher');
        if (!response.ok) throw new Error('Failed to fetch teachers');
        const data = await response.json();
        setTeachers(data);
        setFilteredTeachers(data);
      } catch (error) {
        console.error(error);
        setError('Could not fetch teachers data');
      }
    };
    fetchTeachers();
  }, []);

  const filterTeachers = () => {
    const searchResult = teachers.filter(teacher => {
      const departmentMatches = selectedDepartment === 'All' || teacher.department_name === selectedDepartment;
      const idMatches = !searchText || teacher.teacher_id.toString().includes(searchText);
      return departmentMatches && idMatches;
    });

    setFilteredTeachers(searchResult);
  };

  useEffect(() => {
    filterTeachers();
  }, [selectedDepartment, searchText]);

  const fetchTeacherDetails = async (teacherId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/teacher/read/${teacherId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedTeacher(data.length > 0 ? data[0] : null);
      } else {
        setSelectedTeacher(null);
        alert("Teacher not found!");
      }
    } catch (error) {
      console.error("Error fetching teacher details:", error);
    }
    setLoading(false);
  };

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
                <option value="CSE">Computer Science and Engineering</option>
                <option value="EEE">Electrical and Electronics Engineering</option>
                <option value="MPE">Mechanical and Production Engineering</option>
                <option value="CEE">Civil and Environmental Engineering</option>
                <option value="TVE">Technical and Vocational Education</option>
                <option value="BTM">Business Technology and Management</option>
              </select>
            </label>

            <div className="stdadmin-searchbar">
              <input
                type="search"
                placeholder="Search by ID"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button onClick={filterTeachers} className='search-button'>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

          <div className="stdadmin-controls">
            <button>
              <Link to="/admin/teacher/register" className="stdadmin-controls-button">
                <FontAwesomeIcon icon={faPlus} />
                <span>Add</span>
              </Link>
            </button>
            <button>
              <Link to="/admin/teacher/edit" className="stdadmin-controls-button">
                <FontAwesomeIcon icon={faEdit} />
                <span>Edit</span>
              </Link>
            </button>
            <button
              className="stdadmin-controls-button"
              onClick={async () => {
                const teacherId = prompt("Enter Teacher ID to delete:");
                if (teacherId) {
                  try {
                    const response = await fetch(`http://localhost:8000/teacher/delete/${teacherId}`, {
                      method: "DELETE",
                    });

                    if (response.ok) {
                      alert("Teacher deleted successfully");
                    } else {
                      alert("Failed to delete teacher");
                    }
                  } catch (error) {
                    console.error("Error deleting teacher:", error);
                  }
                }
              }}
            >
              <FontAwesomeIcon icon={faDumpster} />
              <span>Delete</span>
            </button>
          </div>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

          {/* Total Teachers Count */}
          <div className="total-students">
            <p>Total Teachers Available: {filteredTeachers.length}</p>
          </div>

          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher.teacher_id}>
                    <td>{teacher.teacher_id}</td>
                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.phone_number}</td>
                    <td>{teacher.department_name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>No teachers found for the selected filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedTeacher && (
          <div className="student-info">
            <h3>Teacher Information</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <p><strong>ID:</strong> {selectedTeacher.teacher_id}</p>
                <p><strong>Name:</strong> {selectedTeacher.name}</p>
                <p><strong>Email:</strong> {selectedTeacher.email}</p>
                <p><strong>Date of Birth:</strong> {selectedTeacher.date_of_birth}</p>
                <p><strong>Department:</strong> {selectedTeacher.department}</p>
                <p><strong>Address:</strong> {selectedTeacher.address}</p>
                <p><strong>Phone:</strong> {selectedTeacher.phone_number}</p>
                <p><strong>Blood Group:</strong> {selectedTeacher.blood_group}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachersAdmin;