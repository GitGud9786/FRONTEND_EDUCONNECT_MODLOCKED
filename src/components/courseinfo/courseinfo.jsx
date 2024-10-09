import React from 'react';
import './courseinfo.css';
const Courseinfo = () =>
{
    return(
        <div className='courseinfo'>
            <h2>Software Project & Development</h2>
            <h3>CSE 4510: Software Development</h3>

            <div className = 'coursedetails'>
                <p><strong>COURSE INFORMATION</strong></p>
                <p><strong>Instructor: Dr. Hasan Mahmud, Shohel Ahmed</strong></p>
                <p><strong>Course syllabus: </strong><a href='https://cse.iutoic-dhaka.edu/academics-1/academic-catalogue'>Click on this link!</a></p>
                <p><strong>Lab duration: 150 minutes</strong></p>
            </div>

            <div className='courseinstructions'>
                <p>To access course content, please select the Modules on the left.</p>
            </div>
        </div>
    );
};
export default Courseinfo;