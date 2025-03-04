import { useState } from "react";

function AdminTeacherEdit() {
    const [teacherId, setTeacherId] = useState("");
    const [teacherData, setTeacherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Fetch teacher details
    const fetchTeacherData = async () => {
        setLoading(true);
        setError("");
        setMessage("");
        try {
            const response = await fetch(`http://localhost:8000/teacher/read/${teacherId}`);
            if (!response.ok) {
                throw new Error("Teacher not found.");
            }
            const data = await response.json();
            
            // Ensure teacherId is set in teacherData
            setTeacherData({ ...data, teacherId });
        } catch (err) {
            setError(err.message);
            setTeacherData(null);
        }
        setLoading(false);
    };
    

    // Handle form field updates
    const handleChange = (e) => {
        setTeacherData({ ...teacherData, [e.target.name]: e.target.value });
    };

    // Submit updated data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
    
        if (!teacherData.teacherId) {
            setMessage("Teacher ID is required.");
            return;
        }
    
        const updatedTeacherData = {
            teacher_id: teacherData.teacherId,
            name: `${teacherData.teacherFirstName} ${teacherData.teacherMiddleName} ${teacherData.teacherLastName}`.trim(),
            date_of_birth: teacherData.teacherDateOfBirth,
            blood_group: teacherData.teacherBloodGroup,
            department_name: teacherData.teacherDepartment,
            department_id: teacherData.teacherDepartmentID,
            email: teacherData.teacherEmail,
            phone_number: teacherData.teacherPhone,
            address: `${teacherData.teacherStreetAddress}, ${teacherData.teacherCity}, ${teacherData.teacherState}, ${teacherData.teacherCountry}, ${teacherData.teacherZipCode}`,
            password: teacherData.teacherPass, // Include password only if it's changed
        };
    
        try {
            const response = await fetch(`http://localhost:8000/teacher/update/${teacherId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTeacherData),
            });
            const result = await response.json();
            setMessage(result.message);
        } catch (err) {
            setMessage("Error updating teacher.");
        }
    };
    

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", textAlign: "center" }}>
            <h2>Edit Teacher Information</h2>

            {/* Input field for Teacher ID */}
            <input 
                type="text" 
                placeholder="Enter Teacher ID" 
                value={teacherId} 
                onChange={(e) => setTeacherId(e.target.value)} 
                style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
            />
            <button onClick={fetchTeacherData} style={{ padding: "10px", marginBottom: "20px" }}>Edit</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}

            {/* If teacher data is available, show the form */}
            {teacherData && (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                    <input type="text" name="teacherFirstName" value={teacherData.teacherFirstName} onChange={handleChange} placeholder="First Name" />
                    <input type="text" name="teacherMiddleName" value={teacherData.teacherMiddleName} onChange={handleChange} placeholder="Middle Name" />
                    <input type="text" name="teacherLastName" value={teacherData.teacherLastName} onChange={handleChange} placeholder="Last Name" />
                    <input type="date" name="teacherDateOfBirth" value={teacherData.teacherDateOfBirth} onChange={handleChange} />
                    <input type="text" name="teacherBloodGroup" value={teacherData.teacherBloodGroup} onChange={handleChange} placeholder="Blood Group" />
                    <input type="text" name="teacherDesignation" value={teacherData.teacherDesignation} onChange={handleChange} placeholder="Designation" />
                    <input type="text" name="teacherDepartment" value={teacherData.teacherDepartment} onChange={handleChange} placeholder="Department" />
                    <input type="text" name="teacherDepartmentID" value={teacherData.teacherDepartmentID} onChange={handleChange} placeholder="Department ID" />
                    <input type="text" name="teacherStreetAddress" value={teacherData.teacherStreetAddress} onChange={handleChange} placeholder="Street Address" />
                    <input type="text" name="teacherCity" value={teacherData.teacherCity} onChange={handleChange} placeholder="City" />
                    <input type="text" name="teacherState" value={teacherData.teacherState} onChange={handleChange} placeholder="State / Province" />
                    <input type="text" name="teacherCountry" value={teacherData.teacherCountry} onChange={handleChange} placeholder="Country" />
                    <input type="text" name="teacherZipCode" value={teacherData.teacherZipCode} onChange={handleChange} placeholder="ZIP Code" />
                    <input type="email" name="teacherEmail" value={teacherData.teacherEmail} onChange={handleChange} placeholder="E-mail" />
                    <input type="text" name="teacherPhone" value={teacherData.teacherPhone} onChange={handleChange} placeholder="Phone" />
                    <button type="submit" style={{ marginTop: "10px", padding: "10px" }}>Update</button>
                </form>
            )}
        </div>
    );
}

export default AdminTeacherEdit;
