import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Login/Header';
import Footer from '../Login/Footer';
import './All_customer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash ,faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
const All_Partner = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    country: '',
    region: '',
    pan_tin: '',
    tan: '',
    gstin: '',
    note: '',
    start_date: new Date().toISOString().substr(0, 10),
    partner_id: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);

  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get('http://192.168.10.42:3001/show_Partner');
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
      start_date: customer.start_date.substr(0, 10)
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
      await axios.put(`http://192.168.10.42:3001/update_partner/${selectedCustomer.partner_id}`, formData);
      setIsModalOpen(false);
      window.location.href = '/Show_Partner';
      fetchCustomerDetails();
      
    } catch (error) {
      console.error('Error updating customer:', error);
      alert(error);
    }
  };
 /* const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(`http://192.168.10.42:3001/delete_customer/${customerId}`);
      fetchCustomerDetails();
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert(error);
    }
  }; */
  // Logic for pagination


  const handleDeleteCustomer = async (customerId) => {
    try {
      const response = await axios.put(`http://192.168.10.42:3001/delete_Partner/${customerId}`);
      if (response.status === 200) {
        // If the update was successful, redirect to '/Show_Partner'
        window.location.href = '/Show_Partner';
        // Assuming fetchCustomerDetails() fetches the updated customer details, you can call it here
        fetchCustomerDetails();
      } else if (response.status === 400) {
        // If the partner does not exist, display an alert with the error message
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      // Display an alert with the error message if an error occurs
      alert('An error occurred while deleting customer.');
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
      {isLoading ? ( // Render loading spinner if isLoading is true
        <div className="loader">
          <div className="spinner"></div>
        </div>
      ) : (
      <div className="container-fluid" style={{   height: '900x'  }}> 
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <Link to="/dashboard" className="btn btn-secondary" style={{ borderRadius: '20px' }}>
    Back
  </Link>
  <h2 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'blue', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', margin: 'auto' }}>
    Partner Details
  </h2>
 
</div>
<br/>
      <div className="customer-details" style={{ border: '2px solid black', borderRadius: '20px', padding: '20px' }}>
      
<div className='row align-items-center'>
      <div className='col'>
            <label htmlFor="search" className="search-label"><h6> Partner Name:</h6> <span>      </span></label>
  </div>
  

  <div className='col-md-10'>
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
<br/>
        <table className="customer-table">
          <thead>
            <tr>
            <th>Partner ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Country</th>
              <th>Region</th>
              <th>PAN/TIN</th>
              <th>TAN</th>
              <th>GSTIN</th>
              <th>Note</th>
              <th>Start Date</th>
             
              <th style={{ width: '160px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.filter(customer => customer.name.toLowerCase().includes(searchTerm.toLowerCase())).map(customer => (
              <tr key={customer.partner_id}>
              <td>{customer.partner_id}</td>
                <td>{customer.name}</td>
                <td>{customer.address}</td>
                <td>{customer.country}</td>
                <td>{customer.region}</td>
                <td>{customer.pan_tin}</td>
                <td>{customer.tan}</td>
                <td>{customer.gstin}</td>
                <td>{customer.note}</td>
                <td>{(customer.start_date).substring(0, 10)}</td>
                
                <td className="action-buttons">
                  
                  <button className="edit-button" onClick={() => handleEditCustomer(customer)}>
                    <FontAwesomeIcon icon={faEdit} style={{ fontSize: '24px' }}/>
                    <span className="hover-text1"  >Update Partner</span>

                  </button>
                  <span style={{ margin: '0 5px' }}></span>
                  <button className="delete-button" onClick={() => handleDeleteCustomer(customer.partner_id)}>
                    <FontAwesomeIcon icon={faUserTimes} style={{ fontSize: '24px', color: 'blue' }} />
                    <span className="hover-text1"   >Disable Partner</span>
                  </button>
                  <span style={{ margin: '0 10px' }}></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
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
    <div className="modal-content" style={{ backgroundColor: '#fff', margin: '15% auto', padding: '20px', width: '50%', border: '1px solid #ccc' , border: '2px solid black', borderRadius: '20px', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' , border: '2px solid black', borderRadius: '20px', padding: '20px' }}>{isEditing ? 'Edit Partner' : 'Update Partner'}</h2>
      <hr/>
      <form onSubmit={handleUpdateCustomer} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '15px' }}>
          {Object.keys(formData).map(key => (
            !['partner_id', 'cm_id', 'pan_tin_file', 'tan_file', 'gstin_file', 'start_date'].includes(key) && (
              <div key={key} style={{ flex: '1 1 30%', marginRight: '10px', marginBottom: '10px' }}>
                <label htmlFor={key} style={{ display: 'block', marginBottom: '5px' }}>
                  {key === 'name' && 'Name:'}
                  {key === 'address' && 'Address:'}
                  {key === 'country' && 'Country:'}
                  {key === 'region' && 'Region:'}
                  {key === 'pan_tin' && 'Pan & TIN:'}
                  {key === 'tan' && 'TAN:'}
                  {key === 'gstin' && 'GSTIN:'}
                  {key === 'note' && 'Note:'}
                </label>
                {key === 'country' ? (
                  <select
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  >
                    <option value="Afghanistan">Afghanistan</option>
                <option value="Åland Islands">Åland Islands</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote D'ivoire">Cote D'ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">French Southern Territories</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guernsey">Guernsey</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-bissau">Guinea-bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jersey">Jersey</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                <option value="Moldova, Republic of">Moldova, Republic of</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">Netherlands Antilles</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Helena">Saint Helena</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-leste">Timor-leste</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Virgin Islands, British">Virgin Islands, British</option>
                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                <option value="Wallis and Futuna">Wallis and Futuna</option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                )}
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

export default All_Partner;
