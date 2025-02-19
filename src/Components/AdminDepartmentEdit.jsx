import { useState } from "react";

function AdminDepartmentEdit() {
    const [departmentId, setDepartmentId] = useState("");
    const [departmentData, setDepartmentData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Fetch department details
    const fetchDepartmentData = async () => {
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const response = await fetch(`http://localhost:8000/departments/read/${departmentId}`);
            if (!response.ok) {
                throw new Error("Department not found.");
            }
            const data = await response.json();
            setDepartmentData(data);
        } catch (err) {
            setError(err.message);
            setDepartmentData(null);
        }
        setLoading(false);
    };

    // Handle form field updates
    const handleChange = (e) => {
        setDepartmentData({ ...departmentData, [e.target.name]: e.target.value });
    };

    // Submit updated data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await fetch(`http://localhost:8000/departments/update/${departmentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(departmentData),
            });
            const result = await response.json();
            setMessage(result.message);
        } catch (err) {
            setMessage("Error updating department.");
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", textAlign: "center" }}>
            <h2>Edit Department Information</h2>

            {/* Input field for Department ID */}
            <input 
                type="text" 
                placeholder="Enter Department ID" 
                value={departmentId} 
                onChange={(e) => setDepartmentId(e.target.value)} 
                style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
            />
            <button onClick={fetchDepartmentData} style={{ padding: "10px", marginBottom: "20px" }}>Edit</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}

            {/* If department data is available, show the form */}
            {departmentData && (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                    <input type="text" name="name" value={departmentData.name} onChange={handleChange} placeholder="Department Name" />
                    <input type="text" name="location" value={departmentData.location} onChange={handleChange} placeholder="Location" />
                    <input type="email" name="dept_email" value={departmentData.dept_email} onChange={handleChange} placeholder="Department Email" />
                    <button type="submit" style={{ marginTop: "10px", padding: "10px" }}>Update</button>
                </form>
            )}
        </div>
    );
}

export default AdminDepartmentEdit;
