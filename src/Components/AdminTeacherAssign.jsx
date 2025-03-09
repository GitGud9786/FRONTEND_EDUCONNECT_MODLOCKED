import { useState } from "react";
import axios from "axios";

const AdminTeacherAssign = () => {
    const [courseId, setCourseId] = useState("");
    const [teacherIds, setTeacherIds] = useState("");
    const [unenrollTeacherId, setUnenrollTeacherId] = useState("");
    const [unenrollCourseId, setUnenrollCourseId] = useState("");

    // Enroll Teachers
    const handleEnroll = async () => {
        try {
            const response = await axios.post("http://localhost:8000/teacherassign/enroll", {
                course_id: parseInt(courseId, 10),
                teacher_ids: teacherIds.split(",").map(id => parseInt(id.trim(), 10))
            });
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Error enrolling teachers");
        }
    };

    // Unenroll Teacher
    const handleUnenroll = async () => {
        try {
            const teacherId = parseInt(unenrollTeacherId, 10);
            const courseId = parseInt(unenrollCourseId, 10);

            if (isNaN(teacherId) || isNaN(courseId)) {
                alert("Invalid Teacher ID or Course ID");
                return;
            }

            console.log("Sending Unenroll Data:", { teacher_id: teacherId, course_id: courseId }); // Debugging log

            const response = await axios.delete("http://localhost:8000/teacherassign/unenroll", {
                data: { teacher_id: teacherId, course_id: courseId } // ✅ Required for DELETE requests
            });

            alert(response.data.message);
        } catch (error) {
            console.error("Unenroll Error:", error.response?.data || error.message); // Log error
            alert(error.response?.data?.message || "Error unenrolling teacher");
        }
    };

    return (
        <div>
            <h2>Enroll Teachers</h2>
            <input
                type="text"
                placeholder="Course ID"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Teacher IDs (comma-separated)"
                value={teacherIds}
                onChange={(e) => setTeacherIds(e.target.value)}
            />
            <button onClick={handleEnroll}>Enroll</button>
            
            <h2>Unenroll Teacher</h2>
            <input
                type="text"
                placeholder="Teacher ID"
                value={unenrollTeacherId}
                onChange={(e) => setUnenrollTeacherId(e.target.value)}
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

export default AdminTeacherAssign;
