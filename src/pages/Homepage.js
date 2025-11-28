import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Button, Typography, AppBar, Toolbar } from '@mui/material';
import Students from "../assets/logo.png";
import { LightPurpleButton } from '../components/buttonStyles';
import Footer from './Footer';
import About from './About';
import Admission from './Admission';
import Infrastructure from './Infrastructure';
import { useState } from 'react';
import School from "../assets/school.jpeg"


const Homepage = () => {
    const [scale, setScale] = useState(1);
    return (
        <div>
            {/* Header */}
            <AppBar position="static" sx={{ backgroundColor: '#7f56da', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px' }}>
                   
                    
         <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={Students}
        alt="V.H.P School Logo"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',     
          objectFit: 'cover',
          transition: 'transform 0.3s', 
          transform: `scale(${scale})`
          
        }}
        onMouseEnter={() => setScale(1.2)}
        onMouseLeave={() => setScale(1)}   
      />
      <h1
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#fff',
          marginLeft: '12px'
        }}
        
      >
        V.H.P Convent School
      </h1>
     
    </div>

     <div>
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

  <Link to="/about" className="nav-link">About</Link>
  <Link to="/admission" className="nav-link">Admission</Link>
  <Link to="/contact" className="nav-link">Contact</Link>
</>

  <Link to="/choose" style={{ textDecoration: 'none', marginRight: '12px' }}>
     <LightPurpleButton
   variant="contained"
       sx={{ backgroundColor: '#fff', color: '#7f56da', fontWeight: 'bold', '&:hover': { backgroundColor: '#f0f0f0' } }}
        >
           Login
         </LightPurpleButton>
           </Link>
                        {/* <Link to="/chooseasguest" style={{ textDecoration: 'none', marginRight: '12px' }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: '#fff',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: '#fff' }
                                }}
                            >
                                Login as Guest
                            </Button>
                        </Link> */}
                        <Link to="/Adminregister" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="text"
                                sx={{
                                    color: '#ffea00',
                                    fontWeight: 'bold',
                                    fontSize: '0.95rem',
                                    '&:hover': { backgroundColor: 'rgba(255,255,0,0.1)' }
                                }}
                            >
                                Sign Up
                            </Button>
                        </Link>

                    </div>
                </Toolbar>
            </AppBar>

            {/* Main content */}
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 64px)',
                    background: 'linear-gradient(135deg, #f3f0ff, #e0d6ff)'
                }}
            >
                <Grid container spacing={0} sx={{ alignItems: 'center' }}>
                    <Grid item xs={12} md={6}>
                        <img src={School} alt="students" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div style={{ padding: '24px', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '3rem', color: '#550080', fontWeight: 'bold', marginBottom: '20px' }}>
                                Welcome to<br />V.H.P<br />Convent School
                            </h1>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#252525', marginBottom: '30px' }}>
                                V.H.P. Convent School is committed to providing quality education in a disciplined and nurturing environment. Our school focuses on academic excellence, moral values, and overall personality development, helping students grow into confident and responsible individuals.
                            </p>
                        </div>
                    </Grid>
                </Grid>
            </Container>


            <Infrastructure />
            <Footer />
        </div>
    );
};

export default Homepage;
