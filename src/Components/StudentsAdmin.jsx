import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faDumpster, faSearch } from '@fortawesome/free-solid-svg-icons';
import TopBarAdmin from './TopBarAdmin';
import '../styles/StudentsAdmin.css';

const StudentsAdmin = () => {
  const initialStudents = [
    { id: 210041201, firstName: 'Daisy', lastName: 'Scott', email: 'daisy22@gmail.com', phone: '+442046886341', year: 'Year 1', department: 'CSE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041202, firstName: 'Isabel', lastName: 'Harris', email: 'isabel87@gmail.com', phone: '+442751886322', year: 'Year 3', department: 'CSE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041203, firstName: 'Dan', lastName: 'Thomas', email: 'dan98765@gmail.com', phone: '+442842635535', year: 'Year 1', department: 'MPE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041204, firstName: 'Debra', lastName: 'Nelson', email: 'debra112@gmail.com', phone: '+442932223543', year: 'Year 2', department: 'EEE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041205, firstName: 'Vera', lastName: 'Cooper', email: 'vera8888@gmail.com', phone: '+442198254644', year: 'Year 3', department: 'CSE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041206, firstName: 'Brian', lastName: 'Miller', email: 'brian5564@gmail.com', phone: '+442213233311', year: 'Year 3', department: 'CSE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041207, firstName: 'Lauren', lastName: 'Martin', email: 'lauren7712@gmail.com', phone: '+442089235622', year: 'Year 3', department: 'MPE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041208, firstName: 'Milton', lastName: 'Smith', email: 'milton2244@gmail.com', phone: '+442044957517', year: 'Year 1', department: 'EEE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041209, firstName: 'Molly', lastName: 'White', email: 'molly747@gmail.com', phone: '+442041963198', year: 'Year 3', department: 'CEE' , photo: 'https://via.placeholder.com/40' },
  ];

  const [students, setStudents] = useState(initialStudents);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(initialStudents);
  const [selectedStudentId, setSelectedStudentId] = useState(null); // Tracks the ID of the selected student
  const [error, setError] = useState('');

  // Function to filter students by department, year, and ID
  const filterStudents = () => {
    const searchResult = students.filter(student => {
      const departmentMatches = selectedDepartment === 'All' || student.department === selectedDepartment;
      const yearMatches = selectedYear === 'All' || student.year === selectedYear;
      const idMatches = !searchText || student.id.toString().includes(searchText);

      return departmentMatches && yearMatches && idMatches;
    });

    if (searchResult.length > 0) {
      setFilteredStudents(searchResult);
      setError(''); // Clear error if students are found
    } else {
      setFilteredStudents([]); // No results
      setError(`No students found with the specified criteria.`); // Set error message
    }
  };

  // Call filterStudents whenever department, year, or searchText changes
  useEffect(() => {
    filterStudents();
  }, [selectedDepartment, selectedYear, searchText, students]);

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    if (selectedStudentId === id) {
      setSelectedStudentId(null); // Unselect if already selected
    } else {
      setSelectedStudentId(id); // Select new ID
    }
  };

  // Handle delete functionality
  const handleDelete = () => {
    if (selectedStudentId === null) {
      setError('Please select one student to delete.');
      return;
    }

    // Delete the selected student
    const updatedStudents = students.filter(student => student.id !== selectedStudentId);
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
    setSelectedStudentId(null); // Clear selection
    setError(''); // Clear error
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
                <th><input type="checkbox" disabled /></th>
                <th>Photo</th>
                <th>ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Year</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedStudentId === student.id}
                        onChange={() => handleCheckboxChange(student.id)}
                      />
                    </td>
                    <td><img src={student.photo} alt={`${student.firstName} ${student.lastName}`} className="photo" /></td>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>{student.year}</td>
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
          <Link to="/admin/student/register" className="stdadmin-controls-button">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add</span>
          </Link>
          <button>
            <FontAwesomeIcon icon={faEdit} />
            <span>Edit</span>
          </button>
          <button onClick={handleDelete}>
            <FontAwesomeIcon icon={faDumpster} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsAdmin;
