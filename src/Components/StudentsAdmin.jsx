import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faDumpster, faSearch, faEye } from '@fortawesome/free-solid-svg-icons';
import TopBarAdmin from './TopBarAdmin';
import '../styles/StudentsAdmin.css';

const StudentsAdmin = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:8000/students');
        if (!response.ok) throw new Error('Failed to fetch students');
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error(error);
        setError('Could not fetch students data');
      }
    };
    fetchStudents();
  }, []);

  const filterStudents = () => {
    const searchResult = students.filter(student => {
      const departmentMatches = selectedDepartment === 'All' || student.department === selectedDepartment;
      const yearMatches = selectedYear === 'All' || student.year === selectedYear;
      const idMatches = !searchText || student.student_id.toString().includes(searchText);
      return departmentMatches && yearMatches && idMatches;
    });

    setFilteredStudents(searchResult);
    setError(searchResult.length > 0 ? '' : 'No students found.');
  };

  useEffect(() => {
    filterStudents();
  }, [selectedDepartment, selectedYear, searchText]);

  const fetchStudentDetails = async (studentId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/students/read/${studentId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedStudent(data.length > 0 ? data[0] : null);
      } else {
        setSelectedStudent(null);
        alert("Student not found!");
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
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
              Department:
              <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                <option value="All">All</option>
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="MPE">MPE</option>
                <option value="CEE">CEE</option>
              </select>
            </label>

            <label>
              Year Group:
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="All">All</option>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
                <option value="Year 4">Year 4</option>
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
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Blood Group</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.student_id}>
                    <td>{student.student_id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone_number}</td>
                    <td>{student.department}</td>
                    <td>{student.blood_group}</td>
                    <td>
                      <button
                        className="stdadmin-controls-button"
                        onClick={() => fetchStudentDetails(student.student_id)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>No students found for the selected filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="stdadmin-controls">
          <Link to="/admin/student/register" className="stdadmin-controls-button">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add</span>
          </Link >
          <button>
            <Link to="/admin/student/edit" className="stdadmin-controls-button">
              <FontAwesomeIcon icon={faEdit} />
              <span>Edit</span>
            </Link >
          </button>
          <button
            className="stdadmin-controls-button"
            onClick={async () => {
              const studentId = prompt("Enter Student ID to delete:");
              if (studentId) {
                try {
                  const response = await fetch(`http://localhost:8000/students/delete/${studentId}`, {
                    method: "DELETE",
                  });

                  if (response.ok) {
                    alert("Student deleted successfully");
                  } else {
                    alert("Failed to delete student");
                  }
                } catch (error) {
                  console.error("Error deleting student:", error);
                }
              }
            }}
          >
            <FontAwesomeIcon icon={faDumpster} />
            <span>Delete</span>
          </button>
        </div>

        {selectedStudent && (
          <div className="student-info">
            <h3>Student Information</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <p><strong>ID:</strong> {selectedStudent.student_id}</p>
                <p><strong>Name:</strong> {selectedStudent.name}</p>
                <p><strong>Email:</strong> {selectedStudent.email}</p>
                <p><strong>Date of Birth:</strong> {selectedStudent.date_of_birth}</p>
                <p><strong>Department:</strong> {selectedStudent.department}</p>
                <p><strong>Address:</strong> {selectedStudent.address}</p>
                <p><strong>Phone:</strong> {selectedStudent.phone_number}</p>
                <p><strong>Blood Group:</strong> {selectedStudent.blood_group}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsAdmin;
