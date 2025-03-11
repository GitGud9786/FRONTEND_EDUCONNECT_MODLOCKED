import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CourseList.css';
import TopBar from "./TopBar";
const CourseListSideBar = () => {
    return (
        <aside className="courselistsidebar">
            <h2>Filters</h2>
            <div className="courselistfiltersection">
                <h3>Departments</h3>
                <label><input type="checkbox" /> Mechanical Engineering</label>
                <label><input type="checkbox" /> Literature</label>
                <label><input type="checkbox" /> Architecture</label>
                <label><input type="checkbox" /> Civil Engineering</label>
            </div>
            <div className="courselistfiltersection">
                <h3>Level</h3>
                <label><input type="checkbox" /> Undergraduate</label>
                <label><input type="checkbox" /> Graduate</label>
            </div>
            <div className="courselistfiltersection">
                <select className="courselistdropdown">
                    <option value="">Topic</option>
                    <option value="Mechanical Engineering">Graphics</option>
                    <option value="Literature">Literature</option>
                    <option value="Architecture">Humanities</option>
                    <option value="Civil Engineering">Computers</option>
                    <option value="Civil Engineering">Humanities</option>
                </select>
            </div>
        </aside>
    );
};

const CourseListCourseCard = ({ course }) => {
    return (
        <Link to = '/student/courselist/course' className="courselistcoursecard">
            <div className="courselistcourseinfo">
                <p className="courselisttitle">{course.title}</p>
                <p className="courselistdetails">{course.instructors.join(", ")}</p>
                <div className="tags">
                    {course.tags.map((tag, index) => (
                        <div key={index} className="courselisttag">{tag}</div>
                    ))}
                </div>
            </div>
        </Link>
    );
};

const CombinedCourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('/courselist.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCourses(data);
            })
            .catch((error) => console.error('Error loading course data:', error));
    }, []);

    return (
        <div className="courselistsuper">
            <TopBar></TopBar>
            <div className="courselistcontainer">
            <CourseListSideBar />
            <div className="courselistmain">
                {courses.map((course) => (
                    <CourseListCourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
        </div>
    );
};

export default CombinedCourseList;
