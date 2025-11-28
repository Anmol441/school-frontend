import React from "react";
import "./footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section about">
          <h2>V.H.P Convent School</h2>
          <p>
            Nurturing young minds with quality education and holistic development. 
            Join us to build a brighter future.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/admission">Admission</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><FaPhoneAlt /> +91 9516772366</p>
          <p><MdEmail /> vhpschool@gmail.com</p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} V.H.P Convent School. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
