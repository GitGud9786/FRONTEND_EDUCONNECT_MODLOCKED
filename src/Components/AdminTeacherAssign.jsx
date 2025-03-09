import { useState, useEffect } from "react";
import axios from "axios";

const AdminTeacherAssign = () => {
    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState("");

    const [unenrollAssignment, setUnenrollAssignment] = useState("");

    // Fetch teachers and courses on component mount
    useEffect(() => {
        fetchTeachers();
        fetchCourses();
        fetchAssignments();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/teacher");
            setTeachers(response.data);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://localhost:8000/courses");
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const fetchAssignments = async () => {
        try {
            const response = await axios.get("http://localhost:8000/teacherassign/assignments");
            setAssignments(response.data);
        } catch (error) {
            console.error("Error fetching assignments:", error);
        }
    };

    // Assign a Teacher to a Course
    const handleEnroll = async () => {
        if (!selectedTeacherId || !selectedCourseId) {
            alert("Please select both a Teacher and a Course.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/teacherassign/enroll", {
                teacher_id: parseInt(selectedTeacherId, 10),
                course_id: parseInt(selectedCourseId, 10),
            });

            alert(response.data.message);
            fetchAssignments(); // Refresh unenroll options
        } catch (error) {
            console.error("Enroll Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Error enrolling teacher");
        }
    };

    // Unenroll a Teacher from a Course
    const handleUnenroll = async () => {
        if (!unenrollAssignment) {
            alert("Please select an assignment to unenroll.");
            return;
        }

        const [teacher_id, course_id] = unenrollAssignment.split("-");

        try {
            const response = await axios.delete("http://localhost:8000/teacherassign/unenroll", {
                data: {
                    teacher_id: parseInt(teacher_id, 10),
                    course_id: parseInt(course_id, 10),
                },
            });

            alert(response.data.message);
            fetchAssignments(); // Refresh unenroll options
        } catch (error) {
            console.error("Unenroll Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Error unenrolling teacher");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Assign Teacher to Course</h2>
            <div style={{ marginBottom: "10px" }}>
                <label>Choose Teacher: </label>
                <select
                    value={selectedTeacherId}
                    onChange={(e) => setSelectedTeacherId(e.target.value)}
                >
                    <option value="">-- Select Teacher --</option>
                    {teachers.map((teacher) => (
                        <option key={teacher.teacher_id} value={teacher.teacher_id}>
                            {teacher.name} (ID: {teacher.teacher_id})
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: "10px" }}>
                <label>Choose Course: </label>
                <select
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                >
                    <option value="">-- Select Course --</option>
                    {courses.map((course) => (
                        <option key={course.course_id} value={course.course_id}>
                            {course.course_name} (ID: {course.course_id})
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleEnroll}>Assign</button>

            <h2 style={{ marginTop: "30px" }}>Unenroll Teacher from Course</h2>
            <div style={{ marginBottom: "10px" }}>
                <label>Choose Assignment: </label>
                <select
                    value={unenrollAssignment}
                    onChange={(e) => setUnenrollAssignment(e.target.value)}
                >
                    <option value="">-- Select Assignment --</option>
                    {assignments.map((assignment, index) => (
                        <option
                            key={index}
                            value={`${assignment.teacher_id}-${assignment.course_id}`}
                        >
                            Teacher ID: {assignment.teacher_id} - Course ID: {assignment.course_id}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={handleUnenroll}>Unenroll</button>
        </div>
    );
};

export default AdminTeacherAssign;
