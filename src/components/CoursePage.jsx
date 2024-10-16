import React, { useEffect, useState } from 'react';
import Dashboard from "./Dashboard";
import '../styles/CoursePage.css';

const Courseinfo = () => {
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('/courseinfo.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCourseData(data);
                setLoading(false); 
            })
            .catch((error) => {
                console.error('Error loading course data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!courseData) {
        return <p>No course data available.</p>;
    }

    const { courseTitle, courseCode, instructor, syllabus, labDuration } = courseData;

    return (
        <div className='courseinfo'>
            <h2 className = 'toptitle'>{courseTitle}</h2>
            <h3 className='coursecode'>{courseCode}</h3>

            <div className='coursedetails'>
                <p><strong>COURSE INFORMATION</strong></p>
                <p><strong>Instructor: {instructor}</strong></p>
                <p><strong>Course syllabus: </strong><a href={syllabus}>Click on this link!</a></p>
                <p><strong>Lab duration: {labDuration}</strong></p>
            </div>

            <div className='courseinstructions'>
                <p>To access course content, please select the Modules on the left.</p>
            </div>
        </div>
    );
};

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
    );
};

const Sidebar = () =>
{
    const [select,setSelect] = useState("");
    const handleItem = (item) => {
        setSelect(item);
    }
    return(
        <div className='sidebar'>
            <ul>
                <li className={select === 'Home' ? 'select':''}
                onClick={() => handleItem('Home')}>Home</li>

                <li className={select === 'Syllabus' ? 'select':''}
                onClick={() => handleItem('Syllabus')}>Syllabus</li>
                
                <li className={select === 'Announcements' ? 'select':''}
                onClick={() => handleItem('Announcements')}>Announcements</li>
                
                <li className={select === 'Grades' ? 'select':''}
                onClick={() => handleItem('Grades')}>Grades</li>
                
                <li className={select === 'Modules' ? 'select':''}
                onClick={() => handleItem('Modules')}>Modules</li>
            </ul>
        </div>
    );
};


const PageHeader = () => {
    return(
        <h1 className = 'pageheader'>COURSE DETAIL ANALYSIS</h1>
    );
};

const CombinedComponent = () => {
    return (
        <div className="App-tausif">
            <Dashboard />
            <PageHeader />
            <div className="horizontalcontainer">
                <Sidebar />
                <Courseinfo />
                <ToDoList />
            </div>
        </div>
    );
};

export default CombinedComponent;