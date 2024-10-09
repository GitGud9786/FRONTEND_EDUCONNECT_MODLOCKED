import React, { useEffect, useState } from 'react';
import './courseinfo.css';

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
            <h2>{courseTitle}</h2>
            <h3>{courseCode}</h3>

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

export default Courseinfo;
