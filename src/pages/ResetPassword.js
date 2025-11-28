import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const reset = async () => {
    try {
      await axios.post(`/api/reset-password/${token}`, { password });
      setMessage("Password reset successfully!");
    } catch (err) {
      setMessage("Invalid link");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input 
        type="password" 
        placeholder="Enter new password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={reset}>Reset</button>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;
