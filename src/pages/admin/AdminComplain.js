import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminComplain = () => {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 👇 Replace with actual school ID (from localStorage or props)
  const schoolId = localStorage.getItem("schoolId");

  const fetchComplains = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/complain/${schoolId}`);
      if (response.data.message === "No complains found") {
        setComplains([]);
      } else {
        setComplains(response.data);
      }
    } catch (err) {
      console.error("Error fetching complains:", err);
      setError("Failed to load complains");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComplains();
  }, []);

  if (loading) return <h3 style={{ textAlign: "center", marginTop: "20px" }}>Loading...</h3>;
  if (error) return <h3 style={{ textAlign: "center", marginTop: "20px", color: "red" }}>{error}</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#4b3cff" }}>All Complains</h2>

      {complains.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No complaints found</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {complains.map((item) => (
            <div
              key={item._id}
              style={{
                padding: "15px",
                marginBottom: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <h4 style={{ marginBottom: "5px", color: "#333" }}>
                {item.title || "Untitled Complaint"}
              </h4>

              <p style={{ marginBottom: "8px" }}>
                {item.message}
              </p>

              <p style={{ fontSize: "14px", color: "#666" }}>
                <strong>By:</strong> {item.user?.name || "Unknown"}
              </p>

              <p style={{ fontSize: "12px", color: "#999" }}>
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminComplain;
