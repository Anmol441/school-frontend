import React, { useState } from "react";
import "./contact.css";
import { Link } from "react-router-dom";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://school-backend-4gsg.onrender.com/school/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
         body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Message sent successfully!");
        setForm({ name: "", email: "", subject: "", message: "" }); // reset form
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("❌ Contact form error:", err);
      alert("⚠️ Could not connect to the server. Please try again later.");
    }
  };

  return (
    <div className="contact-container">
   
      {/* Contact Info */}
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p><strong>📍 Address:</strong> 123 Main Street, Sijahta, Satna, Madhya Pradesh</p>
        <p><strong>📞 Phone:</strong> +91 9516772366</p>
        <p><strong>📧 Email:</strong> vhpschool@gmail.com</p>
        <p>We’re here to answer any questions you may have. Reach out to us and we’ll respond as soon as we can.</p>


         <>
  <style>
    {`
      .nav-link {
        text-decoration: none;
        margin-right: 15px;
        transition: color 0.3s ease;
      }

      .nav-link:hover {
        color: #3d2ff7ff;
      }
    `}
  </style>

  <Link to="/home" className="nav-link">Back to 🏠Home</Link>
  
</>
      </div>

      {/* Contact Form */}
      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <form className="input" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
