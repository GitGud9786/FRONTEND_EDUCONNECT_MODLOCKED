import { useState } from "react";

function AdminCourseEdit() {
    const [courseId, setCourseId] = useState("");
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [departments, setDepartments] = useState([]);

    // Fetch course details
    const fetchCourseData = async () => {
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const response = await fetch(`http://localhost:8000/courses/read/${courseId}`);
            if (!response.ok) {
                throw new Error("Course not found.");
            }
            const data = await response.json();
            setCourseData(data);
        } catch (err) {
            setError(err.message);
            setCourseData(null);
        }
        setLoading(false);
    };

    // Fetch departments for dropdown (optional)
    const fetchDepartments = async () => {
        try {
            const response = await fetch(`http://localhost:8000/departments/`);
            if (!response.ok) {
                throw new Error("Failed to load departments.");
            }
            const data = await response.json();
            setDepartments(data);
        } catch (err) {
            console.error("Error fetching departments:", err);
        }
    };

    // Handle form field updates
    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    // Submit updated data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await fetch(`http://localhost:8000/courses/update/${courseId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(courseData),
            });
            const result = await response.json();
            setMessage(result.message);
        } catch (err) {
            setMessage("Error updating course.");
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", textAlign: "center" }}>
            <h2>Edit Course Information</h2>

            {/* Input field for Course ID */}
            <input 
                type="text" 
                placeholder="Enter Course ID" 
                value={courseId} 
                onChange={(e) => setCourseId(e.target.value)} 
                style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
            />
            <button onClick={fetchCourseData} style={{ padding: "10px", marginBottom: "20px" }}>Edit</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}

            {/* If course data is available, show the form */}
            {courseData && (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                    <input 
                        type="text" 
                        name="title" 
                        value={courseData.title} 
                        onChange={handleChange} 
                        placeholder="Course Title" 
                    />
                    <textarea 
                        name="description" 
                        value={courseData.description} 
                        onChange={handleChange} 
                        placeholder="Course Description" 
                    />
                    
                    {/* Dropdown for department selection */}
                    <select 
                        name="department_id" 
                        value={courseData.department_id} 
                        onChange={handleChange}
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.department_id} value={dept.department_id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>

                    <input 
                        type="text" 
                        name="course_department" 
                        value={courseData.course_department} 
                        onChange={handleChange} 
                        placeholder="Department Name" 
                    />

                    <button type="submit" style={{ marginTop: "10px", padding: "10px" }}>Update</button>
                </form>
            )}
        </div>
    );
}

export default AdminCourseEdit;
