import { useState } from "react";
import axios from "axios";

const AdminCourseStudentEnrollment = () => {
    const [courseId, setCourseId] = useState("");
    const [studentIds, setStudentIds] = useState("");
    const [unenrollStudentId, setUnenrollStudentId] = useState("");
    const [unenrollCourseId, setUnenrollCourseId] = useState("");

    const handleEnroll = async () => {
        try {
            const studentIdArray = studentIds.split(",").map(id => parseInt(id.trim(), 10)); // Convert to numbers
            
            console.log("Sending data:", { course_id: parseInt(courseId, 10), student_ids: studentIdArray }); // Debugging log

            const response = await axios.post("http://localhost:8000/studentenroll/enroll", {
                course_id: parseInt(courseId, 10), // Convert to number
                student_ids: studentIdArray // Ensure it's an array of numbers
            });

            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Error enrolling students");
        }
    };

    const handleUnenroll = async () => {
        try {
            const studentId = parseInt(unenrollStudentId, 10);
            const courseId = parseInt(unenrollCourseId, 10);
    
            if (isNaN(studentId) || isNaN(courseId)) {
                alert("Invalid Student ID or Course ID");
                return;
            }
    
            console.log("Sending Unenroll Data:", { student_id: studentId, course_id: courseId }); // Debugging log
    
            const response = await axios.delete("http://localhost:8000/studentenroll/unenroll", {
                data: { student_id: studentId, course_id: courseId } // ✅ Data must be inside 'data' field
            });
    
            alert(response.data.message);
        } catch (error) {
            console.error("Unenroll Error:", error.response?.data || error.message); // Log error
            alert(error.response?.data?.message || "Error unenrolling student");
        }
    };
    

    return (
        <div>
            <h2>Enroll Students</h2>
            <input
                type="text"
                placeholder="Course ID"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Student IDs (comma-separated)"
                value={studentIds}
                onChange={(e) => setStudentIds(e.target.value)}
            />
            <button onClick={handleEnroll}>Enroll</button>
            
            <h2>Unenroll Student</h2>
            <input
                type="text"
                placeholder="Student ID"
                value={unenrollStudentId}
                onChange={(e) => setUnenrollStudentId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Course ID"
                value={unenrollCourseId}
                onChange={(e) => setUnenrollCourseId(e.target.value)}
            />
            <button onClick={handleUnenroll}>Unenroll</button>
        </div>
    );
};

export default AdminCourseStudentEnrollment;

