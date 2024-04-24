import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Login/Header';
import Footer from '../Login/Footer';
import '../Form/All_customer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Partner_Spoc = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    pr_spoc_master_id:'',
    name:'', 
    designation:'', 
    email_id:'',
    contact_number:'', 
   
    note:''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);

  useEffect(() => {
    fetchCustomerDetails();
  }, []);


 
  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get('http://192.168.10.42:3001/show_Partner_spoc');
      setCustomers(response.data);
      setIsLoading(false); 
    } catch (error) {
      console.error('Error fetching customer details:', error);
      alert(error);
    }
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);

    setFormData({
      ...customer,
      
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, start_date: date });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleUpdateCustomer = async () => {
    try {
      await axios.put(`http://192.168.10.42:3001/update_Partner_SPOC/${selectedCustomer.pr_spoc_master_id}`, formData);
      setIsModalOpen(false);
      window.location.href = '/show_Partner_SPOC';
      fetchCustomerDetails();
      
    } catch (error) {
      console.error('Error updating customer:', error);
      alert(error);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.put(`http://192.168.10.42:3001/delete_Partner_SPOC/${customerId}`); 
      window.location.href = '/show_Partner_SPOC';
      fetchCustomerDetails();
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('An error occurred while deleting customer.' );
      
    }
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="page-container">
      <Header />
      {isLoading ? (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : (
      <div className="container-fluid" style={{   height: 'auto'  }}> 
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/dashboard" className="btn btn-secondary" style={{ borderRadius: '20px' }}>
          Back
        </Link>
        <h2 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'blue', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', margin: 'auto' }}>
          Partner SPOC
        </h2>
      </div>
      <br/>
      <div className="customer-details" style={{ border: '2px solid black', borderRadius: '20px', padding: '20px' }}>
        <div className="customer-details">
          <div className='row align-items-center'>
            <div className='col'>
              <label htmlFor="search" className="search-label"><h6> Parner SPOC Name:</h6> <span>      </span></label>
            </div>
            <div className='col-md-9'>
              <input
                type="text"
                id="search"
                placeholder="Search                              &#x1F50D;" // Unicode for magnifying glass
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
            <div className='col'>
              <button style={{border: 'none', background: 'none', padding: '0'}}  onClick={() => window.location.reload()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="green" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <br/>
        <table className="customer-table">
          <thead>
            <tr>
              <th style={{ width: '170px' }}>Sr. No</th>
              <th style={{ width: '170px' }}>AE SPOC ID</th>
              <th style={{ width: '200px' }}>Name</th>
              <th style={{ width: '170px' }}>Designation</th>
              <th style={{ width: '250px' }}>email ID</th>
              <th style={{ width: '300px' }}>Contact Number</th>
        
              <th>Note</th>
              
              <th style={{ width: '250px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.filter(customer => customer.name.toLowerCase().includes(searchTerm.toLowerCase())).map((customer ,index)=> (
              <tr key={customer.pr_spoc_master_id}>
                <td>{index+1}</td>
                <td>{customer.pr_spoc_master_id}</td>
                <td>{customer.name}</td>
                <td>{customer.designation}</td>
                <td>{customer.email_id}</td>
                <td>{customer.contact_number}</td>
              
                <td>{customer.note}</td>
                
                <td className="action-buttons">
                  <button className="edit-button" onClick={() => handleEditCustomer(customer)}>
                    <FontAwesomeIcon icon={faEdit} style={{ fontSize: '24px' }}/>
                    <span className="hover-text1"  >Update Partner Spoc</span>
                  </button>
                  <span style={{ margin: '0 10px' }}></span>
                  <button className="delete-button" onClick={() => handleDeleteCustomer(customer.pr_spoc_master_id)}>
                    <FontAwesomeIcon icon={faUserTimes} style={{ fontSize: '24px', color: 'blue' }} />
                    <span className="hover-text1"   >Disable Partner Spoc</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => paginate(currentPage - 1)} className="pagination-btn">
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
          )}
          {Array.from({ length: Math.ceil(customers.length / customersPerPage) }, (_, i) => (
            <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'pagination-btn active' : 'pagination-btn'}>
              {i + 1}
            </button>
          ))}
          {currentPage < Math.ceil(customers.length / customersPerPage) && (
            <button onClick={() => paginate(currentPage + 1)} className="pagination-btn">
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          )}
        </div>
      </div>
      {isModalOpen && (
  <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
    <div className="modal-content" style={{ backgroundColor: '#fff', margin: '15% auto', padding: '20px', width: '50%', border: '2px solid black', borderRadius: '20px', }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', border: '2px solid black', borderRadius: '20px', padding: '20px' }}>{isEditing ? 'Edit Partner SPOC' : 'Update Partner SPOC'}</h2>
      <hr/>
      <form onSubmit={handleUpdateCustomer} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '15px' }}>
          {Object.keys(formData).map((key, index) => (
            !['pr_spoc_master_id'].includes(key) && (index < 5 || key === 'note') && ( // Ensure only 5 input boxes are rendered, but include 'note'
              <div key={key} style={{ flex: '1 1 30%', marginRight: '10px', marginBottom: '10px' }}>
                <label htmlFor={key} style={{ display: 'block', marginBottom: '5px' }}>
                  {key === 'name' && 'Name:'}
                  {key === 'designation' && 'Designation:'}
                  {key === 'email_id' && 'Email ID:'}
                  {key === 'contact_number' && 'Contact Number:'}
                  {key === 'note' && 'Note:'}
                </label>
                <input
                  type={key === 'email_id' ? 'email' : 'text'}
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>
            )
          ))}
        </div>
        <hr/>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="submit" onClick={handleUpdateCustomer}
            style={{ width: '48%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            style={{ width: '48%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      <br/>
      <br/>
      <br/>
      </div> 
    )}
    <Footer />
  </div>
  );
};

export default Partner_Spoc;
