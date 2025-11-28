import React, { useEffect, useState } from "react";

const AdminContact = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/school/contact/all")
      .then(res => res.json())
      .then(data => {
        if (data.success) setMessages(data.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>📩 Contact Messages</h1>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.subject}</td>
              <td>{msg.message}</td>
              <td>{new Date(msg.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContact;
