import React, { useState }from 'react'
import TopBarAdmin from './TopBarAdmin'
import './StudentsAdmin';

const StudentsAdmin = () => {
  const students = [
    { id: 210041201, firstName: 'Daisy', lastName: 'Scott', email: 'daisy22@gmail.com', phone: '+442046886341', year: '1', department: 'CSE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041202, firstName: 'Isabel', lastName: 'Harris', email: 'isabel87@gmail.com', phone: '+442751886322', year: '3', department: 'CSE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041203, firstName: 'Dan', lastName: 'Thomas', email: 'dan98765@gmail.com', phone: '+442842635535', year: '1', department: 'MPE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041204, firstName: 'Debra', lastName: 'Nelson', email: 'debra112@gmail.com', phone: '+442932223543', year: '2', department: 'EEE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041205, firstName: 'Vera', lastName: 'Cooper', email: 'vera8888@gmail.com', phone: '+442198254644', year: '3', department: 'CSE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041206, firstName: 'Brian', lastName: 'Miller', email: 'brian5564@gmail.com', phone: '+442213233311', year: '3', department: 'CSE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041207, firstName: 'Lauren', lastName: 'Martin', email: 'lauren7712@gmail.com', phone: '+442089235622', year: '3', department: 'MPE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041208, firstName: 'Milton', lastName: 'Smith', email: 'milton2244@gmail.com', phone: '+442044957517', year: '1', department: 'EEE' , photo: 'https://via.placeholder.com/40' },
    { id: 210041209, firstName: 'Molly', lastName: 'White', email: 'molly747@gmail.com', phone: '+442041963198', year: '3', department: 'CEE' , photo: 'https://via.placeholder.com/40' },
  ];

  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  const filteredStudents = students.filter((student) => {
    const departmentMatches = selectedDepartment === 'All' || student.department === selectedDepartment;
    const yearMatches = selectedYear === 'All' || student.grade === selectedYear;
    return departmentMatches && yearMatches;
  });

  return (
    <div className="table-container">
      <TopBarAdmin></TopBarAdmin>
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
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </select>
        </label>
      </div>
      <table className="student-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
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
          {students.map((student) => (
            <tr key={student.id}>
              <td><input type="checkbox" /></td>
              <td><img src={student.photo} alt={`${student.firstName} ${student.lastName}`} className="photo" /></td>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.year}</td>
              <td>{student.department}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StudentsAdmin
