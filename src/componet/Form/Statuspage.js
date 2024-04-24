import React from 'react';
import Header from '../Login/Header';
import Footer from '../Login/Footer';
import { Link } from 'react-router-dom';

const Statuspage = () => {
  // Retrieve the value from session storage
  const storedStatus = sessionStorage.getItem('statusData');

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-10" style={{ minHeight: '100vh' }}>
        {/* Use justify-content-center and align-items-center to center items */}
        
        <h1 style={{ textAlign: 'center', width: '100%' }}>{storedStatus}</h1>
        <Link to="/dashboard" className="btn btn-secondary btn-block mb-3">
          Back to Dashboard
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Statuspage;
