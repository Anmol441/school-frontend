import React from 'react';
import { Link } from "react-router-dom";


const admissionSteps = [
  "Fill the Inquiry Form",
  "Procure the Admission form and syllabus for entrance test by paying the Non refundable Registration amount.",
  "Take the Entrance Test / Interaction date.",
  "Submit the completed Admission form and proof of payment of registration fee.",
  "Once the interaction/ test is done, the admission department will declare the results."
];



const SchoolInfo = () => {
  return (
    
      
      

      <div>
        

      {/* ADMISSION PROCEDURE Section */}
      <section>
         <>
  <style>
    {`
      .nav-link {
        text-decoration: none;
        margin-right: 15px;
        color: white;
        transition: color 0.3s ease;
        
      }

      .nav-link:hover {
        color: #3d2ff7ff;
      }
    `}
  </style>

  <Link to="/home" className="nav-link">Back to 🏠Home</Link>
  
</>
        <h2>ADMISSION PROCEDURE</h2>
        <p>
          The process of admission in to V.H.P Convent given below. (Please feel free to contact the admissions team at any stage of the process for help and clarification on 9516772366 ).
        </p>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {admissionSteps.map((step, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#991B36',
                color: 'white',
                borderRadius: '50%',
                width: '200px',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                fontSize: '0.9rem',
              }}
            >
              <div
                style={{
                  backgroundColor: 'white',
                  color: '#991B36',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  textAlign: 'center',
                  lineHeight: '30px',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  fontSize: '1.1rem',
                }}
              >
                {index + 1}
              </div>
              <div>{step}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '20px' }}>
          On receiving the confirmation of the admission, pay the enrolment fee. Receipt of payment by the school office and acknowledgement of payment by way of a hard copy receipt signifies completion of the process of admission.
        </p>
      </section>

     </div> 
  );
};

export default SchoolInfo;
