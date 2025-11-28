import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/forgot-password", { email, role });
      setMessage(`Reset link: ${res.data.link}`);
    } catch (err) {
      setMessage("User not found");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <select
          onChange={(e) => setRole(e.target.value)}
          style={styles.select}
        >
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>

        <button onClick={handleSubmit} style={styles.button}>
          Send Reset Link
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  page: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
  },

  card: {
    width: "350px",
    padding: "25px",
    borderRadius: "12px",
    background: "white",
    boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
    textAlign: "center",
  },

  title: {
    marginBottom: "20px",
    color: "#333",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },

  select: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#6a11cb",
    color: "white",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    transition: "0.2s",
  },

  message: {
    marginTop: "15px",
    color: "#444",
    fontWeight: "bold",
  },
};

export default ForgotPassword;
