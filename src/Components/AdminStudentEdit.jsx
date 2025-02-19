import { useState } from "react";

function AdminStudentEdit() {
    const [studentId, setStudentId] = useState("");
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Fetch student details
    const fetchStudentData = async () => {
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const response = await fetch(`http://localhost:8000/students/read/${studentId}`);
            if (!response.ok) {
                throw new Error("Student not found.");
            }
            const data = await response.json();
            setStudentData(data);
        } catch (err) {
            setError(err.message);
            setStudentData(null);
        }
        setLoading(false);
    };

    // Handle form field updates
    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    // Submit updated data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await fetch(`http://localhost:8000/students/update/${studentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studentData),
            });
            const result = await response.json();
            setMessage(result.message);
        } catch (err) {
            setMessage("Error updating student.");
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", textAlign: "center" }}>
            <h2>Edit Student Information</h2>

            {/* Input field for Student ID */}
            <input 
                type="text" 
                placeholder="Enter Student ID" 
                value={studentId} 
                onChange={(e) => setStudentId(e.target.value)} 
                style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
            />
            <button onClick={fetchStudentData} style={{ padding: "10px", marginBottom: "20px" }}>Edit</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}

            {/* If student data is available, show the form */}
            {studentData && (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                    <input type="text" name="name" value={studentData.name} onChange={handleChange} placeholder="Name" />
                    <input type="email" name="email" value={studentData.email} onChange={handleChange} placeholder="Email" />
                    <input type="text" name="address" value={studentData.address} onChange={handleChange} placeholder="Address" />
                    <input type="date" name="date_of_birth" value={studentData.date_of_birth} onChange={handleChange} />
                    <input type="text" name="department" value={studentData.department} onChange={handleChange} placeholder="Department" />
                    <input type="text" name="phone_number" value={studentData.phone_number} onChange={handleChange} placeholder="Phone Number" />
                    <input type="text" name="blood_group" value={studentData.blood_group} onChange={handleChange} placeholder="Blood Group" />
                    <button type="submit" style={{ marginTop: "10px", padding: "10px" }}>Update</button>
                </form>
            )}
        </div>
    );
}

export default AdminStudentEdit;
