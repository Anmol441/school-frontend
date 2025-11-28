import React from 'react';
import { Link } from 'react-router-dom';
import './infrastructure.css'
const infrastructureData = [
  { title: 'CLASSROOM', text: 'Well equipped classrooms with smart boards and comfortable seating.', icon: '👩‍🏫' },
  { title: 'LIBRARY', text: 'The library is a rich resource with books, e-books, and journals.', icon: '📚' },
  { title: 'TRANSPORT', text: 'School buses equipped with CCTV and GPS for safety.', icon: '🚌' },
  { title: 'SECURITY', text: 'Guards, CCTV surveillance, and safety protocols ensure secure campus.', icon: '🛡' },
  { title: 'SPORTS', text: 'Indoor Games, Outdoor Sports, and fitness facilities for students.', icon: '🏀' },
  { title: 'LABS', text: 'Our computer and science labs are equipped with modern instruments.', icon: '🔬' }
];

const Infrastructure = () => (
  <section>
   

  <h2>INFRASTRUCTURE</h2>
  <div className="grid-container">
    {infrastructureData.map(({ title, text, icon }) => (
      <div key={title} className="card-1">
        <div className="icon">{icon}</div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    ))}
  </div>
</section>

);

export default Infrastructure;
