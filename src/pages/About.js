import React from "react";
import "./About.css";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';



const About = () => {
  return (
    
    <div className="about-container">
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
     
       <Link to="/home" className="nav-link" >Back to 🏠Home</Link>
       
     </>
      <h1>About V.H.P Convent School</h1>
      <p className="about-intro">
        At V.H.P Convent School, we believe in nurturing young minds to become responsible, confident, and compassionate individuals. Our mission is to provide quality education that goes beyond textbooks and encourages holistic development.
      </p>
      <div className="about-cards" >
      
      {/* Philosophy Card */}
      <Card border="primary" style={{ width: '18rem' }}>
        <Card.Header style={{ backgroundColor: '#6a0dad', color: 'white' }}>Our Philosophy</Card.Header>
        <Card.Body>
          <Card.Title>Learning Beyond Limits</Card.Title>
          <Card.Text>
            We create an environment that fosters creativity, curiosity, and critical thinking in every student.
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Vision Card */}
      <Card border="success" style={{ width: '18rem' }}>
        <Card.Header style={{ backgroundColor: '#2a00b7', color: 'white' }}>Our Vision</Card.Header>
        <Card.Body>
          <Card.Title>Excellence in Education</Card.Title>
          <Card.Text>
            To be a center of excellence, shaping future leaders who are ethical, knowledgeable, and socially responsible.
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Principal's Message Card */}
      <Card border="warning" style={{ width: '18rem' }}>
        <Card.Header style={{ backgroundColor: '#bf04ee', color: 'white' }}>Principal's Message</Card.Header>
        <Card.Body>
          <Card.Title>Welcome!</Card.Title>
          <Card.Text>
            Our goal is to provide a safe and stimulating environment, encouraging students to explore talents and develop lifelong skills.
          </Card.Text>
        </Card.Body>
      </Card>

    </div>
    </div>
  );
};

export default About;
