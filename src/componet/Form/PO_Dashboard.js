import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Login/Header';
import Footer from '../Login/Footer';
import './All_customer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash,faFilePen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
const PO_Dashboard = () => {
  const [poData, setPOData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [poPerPage] = useState(10);

  useEffect(() => {
    fetchPODetails();
  }, []);

  const fetchPODetails = async () => {
    try {
      const response = await axios.get('http://192.168.10.42:3001/api/po_data');
      setPOData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching PO data:', error);
      alert(error);
    }
  };

  const handleDeletePO = async (poId) => {
    try {
      await axios.put(`http://192.168.10.42:3001/delete_po/${poId}`);
      window.location.reload(); // Refresh the page after deleting PO
    } catch (error) {
      console.error('Error deleting PO:', error);
      alert('An error occurred while deleting PO.');
    }
  };

  const indexOfLastPO = currentPage * poPerPage;
  const indexOfFirstPO = indexOfLastPO - poPerPage;
  const currentPO = poData.slice(indexOfFirstPO, indexOfLastPO);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="page-container">
      <Header />
      {isLoading ? ( // Render loading spinner if isLoading is true
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="container-fluid">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link to="/dashboard" className="btn btn-secondary" style={{ borderRadius: '20px' }}>
              Back
            </Link>
            <h2 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'blue', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', margin: 'auto' }}>
              PO Dashboard
            </h2>
          </div>
          <br />
          <div style={{ border: '2px solid black', borderRadius: '20px', padding: '20px' }}>
          <div className="customer-details">
            
            <div style={{ position: 'relative' }} className='row align-items-center'>
<div className='col '>
            <label htmlFor="search" className="search-label"><h6> PO Number:</h6> </label>
  </div>
  <div className='col-md-8'>
  <input
    type="text"
    id="search"
    placeholder="Search                               &#x1F50D;" // Unicode for magnifying glass
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-box"
    style={{
      width: '250px',
      padding: '8px',
      borderRadius: '20px', /* Adjust the value to change the roundness */
      border: '1px solid #ccc',
      paddingLeft: '30px' // To provide space for the icon in the placeholder
    }}
  />
   </div>
   
   
   <div className='col'></div>
   <div className='col'></div>
   <div className='col'></div>
   <div className='col'>
   <button style={{border: 'none', background: 'none', padding: '0'}}  onClick={() => window.location.reload()}>
  <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="green" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
  </svg>
</button>


   </div>
</div>

            <br/>
           
            <span style={{
                width: '200px',
                padding: '8px',
              
              }}> </span>
            <table className="customer-table">
              <thead>
                <tr>
                  
                  <th>PO Number</th>
                  <th>PO Date</th>
                  <th>PO Amount</th>
                  <th>Entities Name</th>
                  <th>Customer Name</th>
                  <th>Partner Name</th>
                  <th style={{ width: '250px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPO.filter(po => po.po_number.toLowerCase().includes(searchTerm.toLowerCase())).map((po,index) => (
                  <tr key={po.po_id}>
                  
                      <td>{po.po_number}</td>
                      <td>{po.po_date}</td>
                      <td>{po.po_amount}</td>
                      <td>{po.entities_name}</td>
                    <td>{po.customer_name}</td>
                    <td>{po.partner_name}</td>
                    <td className="action-buttons" style={{ textAlign: 'center' }}>
                    <Link to={`/Update_po/${po.po_id}`} className="edit-link" style={{ borderRadius: '20px', position: 'relative' }}>
                          <FontAwesomeIcon icon={faFilePen} style={{ fontSize: '25px' , color:'green' }} />
                          <span className="hover-text">Edit PO</span>
                        </Link>
                        <span style={{ margin: '0 20px' }}></span>
                    <Link to={`/edit_po/${po.po_id}`} className="edit-link" style={{ borderRadius: '20px', position: 'relative', marginRight: '10px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-calendar-plus" viewBox="0 0 16 16">
                  <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7"/>
                   <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                    </svg>
                          <span className="hover-text">Edit Scheduler</span>
                        </Link>
                         
                       
  <span style={{ margin: '0 20px' }}></span>
  <button className="delete-button" onClick={() => handleDeletePO(po.po_id)}>
  <span className="hover-text1"   >Delete PO</span>
    <FontAwesomeIcon icon={faTrash} className="remove-icon" style={{ fontSize: '25px', color: 'red' }}/>
  </button>
</td>

                  </tr>
                ) )}
              </tbody>
            </table>
            <div className="pagination">
  {currentPage > 1 && (
    <button onClick={() => paginate(currentPage - 1)} className="pagination-btn">
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>
  )}
  {Array.from({ length: Math.ceil(poData.length / poPerPage) }, (_, i) => (
    <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'pagination-btn active' : 'pagination-btn'}>
      {i + 1}
    </button>
  ))}
  {currentPage < Math.ceil(poData.length / poPerPage) && (
    <button onClick={() => paginate(currentPage + 1)} className="pagination-btn">
      <FontAwesomeIcon icon={faAngleRight} />
    </button>
  )}
</div>
          </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PO_Dashboard;
