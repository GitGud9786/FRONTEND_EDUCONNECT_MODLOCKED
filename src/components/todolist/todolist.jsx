import React from 'react';
import './todolist.css';

const ToDoList = () => {
    return (
        <div className = 'todolist'>
            <h3 className='todoheader'>To Do</h3>
      <ul>
        <li>Turn in GRASP THE SITUATION - Sep 14 at 11:59pm</li>
        <li>Turn in MODULE 02 S. HUSSEIN MANAGEMENT STYLE - Sep 15 at 11:59pm</li>
      </ul>
      
      <h3 className='comingupheader'>Coming Up</h3>
      <ul>
        <li>GRASP THE SITUATION - Sep 14 at 11:59pm</li>
        <li>MODULE 02 S. HUSSEIN MANAGEMENT STYLE - Sep 15 at 11:59pm</li>
        <li>WEEK 2: STUDENT SUMMARY - Sep 18 at 1:00pm</li>
      </ul>
        </div>
    )
}
export default ToDoList;