import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateCustomer.css';
import Header from '../Login/Header';
import Footer from '../Login/Footer';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {faCheckSquare}  from '@fortawesome/free-solid-svg-icons';

const Create_partner = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [closeButtonHovered, setCloseButtonHovered] = useState(false);
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
  
  const [loading, setLoading] = useState(true);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
 
  const [ae_emp, setaedata] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to control the display of the form
  const [showForm1, setShowForm1] = useState(false); // State to control the display of the form
  const [formData, setFormData] = useState({
    customerName: '', // New field: Customer Name
    address: '', // New field: Address
    country: '', // New field: Country
    region: '', // New field: Region
    panortinnumber: '',
    tanumber: '',
    gstnumber: '',
    spoc_id: '' ,
    Ae_Spoc_id :'' ,
    note:'',
  });

  const handleCancelButtonClick = () => {
    // Clear all form data
    setFormData({
      customerName: '', // New field: Customer Name
    address: '', // New field: Address
    country: '', // New field: Country
    region: '', // New field: Region
    panortinnumber: '',
    tanumber: '',
    gstnumber: '',
    spoc_id: '' ,
    Ae_Spoc_id :''
    });
  };

  const [spcoformData, spocsetFormData] = useState({
    name:'',
    designation: '',
    email_id: '',
    contact_number: '',
    note: ''
  });

  const [AEspocformData, AEspocsetFormData] = useState({
    name:'',
    designation: '',
    email_id: '',
    contact_number: '',
    region:'',
    note: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    // Validate each required field
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== 'note' && key !== 'ae_note' && key !== 'panortin' && key !== 'tan' && key !== 'gstin'  && key !== 'tanumber'&& key !== 'panortinnumber' && key !== 'gstnumber') {
        newErrors[key] = 'This field is required';
        valid = false;
      }
    });

    console.log('Form data:', formData);
    console.log('Errors:', newErrors);
    setErrors(newErrors);
    return valid;
  };
  const handleClose = () => setShowForm(false);
 
  const handleClose1 = () => setShowForm1(false);
  // Function to handle opening the dialog box
  const handleShow = () => setShowForm(true);
  const handleShow1 = () => setShowForm1(true);

  // Function to handle adding selected customer to the table
  

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customers, setCustomers] = useState([]); // Assuming customers are fetched and stored in this state


  // Function to handle adding selected customer to the table
  const handleSelectCustomer = (event) => {
    const selectedCustomerId = event.target.value;
    setSelectedCustomer(selectedCustomerId);
  };
  
  
 
  
  const handleAddSelectedCustomer = () => {
    if (selectedCustomer) {
      // Find the selected customer object from the customers array
      const selectedCustomerObject = customers.find(customer => customer.name === selectedCustomer);
  
      // Ensure selectedCustomerObject is not undefined
      if (selectedCustomerObject) {
        // Check if the selected customer is already in the table
        if (selectedCustomers.some(customer => customer.name === selectedCustomerObject.name)) {
          // If already present, do nothing
          alert("already present");
          return;
        }
  
        // Add the selected customer object to selectedCustomers
        setSelectedCustomers(prevSelectedCustomers => [
          ...prevSelectedCustomers,
          selectedCustomerObject
        ]);
  
        // Extract customer_spoc_master_id from selectedCustomerObject
        const customerSpocId = selectedCustomerObject.pr_spoc_master_id;
  
        // Update spoc_id in the form data
        setFormData(prevFormData => ({
          ...prevFormData,
          spoc_id: prevFormData.spoc_id ? prevFormData.spoc_id + ',' + customerSpocId : customerSpocId
        }));
      }
  
      setSelectedCustomer(''); // Reset selectedCustomer state after adding to the table
    }
  };
  
  
  
  

  const handleRemoveCustomer = index => {
    setSelectedCustomers(prevSelectedCustomers => {
      // Remove the customer at the specified index
      const updatedSelectedCustomers = prevSelectedCustomers.filter((_, i) => i !== index);
  
      // Update the state to include the selected customer IDs
      const selectedCustomerIds = updatedSelectedCustomers.map(customer => customer.pr_spoc_master_id);
  
      // Update the form data with the new list of selected customer IDs
      setFormData(prevFormData => ({
        ...prevFormData,
        spoc_id: selectedCustomerIds.join(',')
      }));
  
      return updatedSelectedCustomers;
    });
  };
  
  const handleSubmitButtonClick = async () => {
    try {
      // Ensure formData is properly populated
       // Set loading state to true
      if (!validateForm()) {
        throw new Error('Form data is not valid');
       
      }
      setLoading1(true);
      // Step 1: Authentication
      const authResponse = await fetch('http://192.168.10.42:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'Suhas', password: 'Suhas@123' }),
      });
  
      if (!authResponse.ok) {
        console.error('Authentication failed');
        return;
      }
  
      const { sessionToken } = await authResponse.json();
  
      // Step 2: Prepare form data
      const formDataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'gstin') {
          formDataToSubmit.append(key, value);
        }
      });
      formDataToSubmit.append('sessionToken', sessionToken);
  
      // Append PAN/TIN file if it exists
      if (file1) {
        formDataToSubmit.append('panortin', file1);
      }
  
      // Append TAN file if it exists
      if (file2) {
        formDataToSubmit.append('tan', file2);
      }
  
      // Append GSTIN file if it exists
      if (file3) {
        formDataToSubmit.append('gstin', file3);
      }
  
      //-----------------------------------
      const response = await fetch('http://192.168.10.42:3001/onsubmitPartner', {
        method: 'POST',
        body: formDataToSubmit, // Send FormData directly as the body
      });
      if (!response.ok) {
        console.log('error');
        
      }
      if (response.ok) {
        console.log('Execution successful');
        // Check status after successful execution
        const statusResponse = await fetch('http://192.168.10.42:3001/status', {
          method: 'GET',
          headers: {
            headers: {
              'Content-Type': 'application/json',
              'X-Session-Token': sessionToken,
            },
          },
        });
        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          console.log('Status:', statusData);
          // Handle status response here, e.g., update UI or show message
          sessionStorage['statusData']=statusData.status
          window.location.href = '/StatusDisplay';
          alert(statusData.status);

        } else {
          console.error('Failed to fetch status');
        }

        
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
       

    }
      // Handle success
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle error
    }
  };
  

  // Fetch customer data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponse = await fetch('http://192.168.10.42:3001/partner_spoc');
        if (!customerResponse.ok) {
          throw new Error('Failed to fetch customer data');
        }
        const customerData = await customerResponse.json();
        setCustomers(customerData);
        
        const aeSpocResponse = await fetch('http://192.168.10.42:3001/partner_ae_spoc');
        if (!aeSpocResponse.ok) {
          throw new Error('Failed to fetch AE SPOC data');
        }
        const aeSpocData = await aeSpocResponse.json();
        setAeSpoc(aeSpocData);
      
        setLoading(false); // Set loading to false only after both fetch operations succeed
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false); // Set loading to false in case of error
      }  
    };
  
    fetchData();
  }, []);
  

  const handleAddToTable = () => {
    if (selectedCustomer) {
      // Add selected customer's name to the table
      setSelectedCustomers(prevSelectedCustomers => [
        ...prevSelectedCustomers,
        selectedCustomer
      ]);
      setSelectedCustomer(''); // Reset selectedCustomer state after adding to the table
    }
  };
  
  // Handle customer selection
  const handleCustomerSelection = customerId => {
  const selectedCustomer = customers.find(
    customer => customer.customer_spoc_master_id === customerId
  );

  // Toggle the selection
  const updatedSelectedCustomers = selectedCustomers.includes(selectedCustomer.name)
    ? selectedCustomers.filter(name => name !== selectedCustomer.name)
    : [...selectedCustomers, selectedCustomer.name];

  // Update the state to include the selected customer IDs
  const selectedCustomerIds = updatedSelectedCustomers.map(name => {
    const customer = customers.find(customer => customer.name === name);
    return customer.pr_spoc_master_id;
  });

  setFormData(prevFormData => ({
    ...prevFormData,
    spoc_id: selectedCustomerIds.join(',')
  }));

  setSelectedCustomers(updatedSelectedCustomers);
};
  // Handle removing a customer from the selected list

 

  // Function to handle form input changes
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading2(true);
    try {
      const response = await fetch('http://192.168.10.42:3001/createpartnerspoc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(spcoformData)
      });
      if (!response.ok) {
        throw new Error('Failed to create customer');
      }
      const createdCustomer = await response.json();
      // Update the UI with the newly created customer
      setCustomers(prevCustomers => [...prevCustomers, createdCustomer]);
      // Clear form data
      spocsetFormData({
        name:'',
        designation: '',
        email_id: '',
        contact_number: '',
        note: ''
      });
      setShowForm(false); // Hide the form
      setLoading2(false);
    } catch (error) {
      console.error('Error creating customer:', error);
      // Handle error
    }
  };

  const alertNewCustomerForm = () => {
    setShowForm(true); // Show the form
  };
//--------------------------------------------------------
// Define state for selected AE SPOCs and AE SPOC data
const [selectedAeSpoc, setSelectedAeSpoc] = useState('');
const [selectedAeSpocs, setSelectedAeSpocs] = useState([]);
const [aeSpoc, setAeSpoc] = useState([]);
  // Function to handle removing AE SPOC from the selected list
  const handleRemoveAeSpoc = index => {
    setSelectedAeSpoc(index); // Set selected AE SPOC index (optional, if you need it for any other purpose)
    setUniqueAeSpocs(prevUniqueAeSpocs => {
      // Create a copy of the uniqueAeSpocs array
      const updatedUniqueAeSpocs = [...prevUniqueAeSpocs];
      // Remove the AE SPOC at the specified index
      const removedAeSpoc = updatedUniqueAeSpocs.splice(index, 1)[0]; // Remove the AE SPOC and get the removed item
      // Get the ID of the removed AE SPOC
      const removedAeSpocId = removedAeSpoc?.partner_ae_spoc_master_id; // Use optional chaining to avoid errors if AE SPOC is undefined
      // Update the state with the modified array
      setFormData(prevFormData => {
        if (removedAeSpocId) {
          // If the removed AE SPOC ID exists, remove it from the Ae_Spoc_id in the form data
          if (typeof prevFormData.Ae_Spoc_id === 'string') {
            const updatedAeSpocIds = prevFormData.Ae_Spoc_id
              .split(',')
              .filter(id => id.trim() !== removedAeSpocId.toString()) // Filter out the removed AE SPOC ID
              .join(','); // Join the remaining IDs back into a string
            return {
              ...prevFormData,
              Ae_Spoc_id: updatedAeSpocIds
            };
          }
        } else {
          // If the AE SPOC was not added initially, set Ae_Spoc_id to null
          return {
            ...prevFormData,
            Ae_Spoc_id: null
          };
        }
        return prevFormData; // Return the original form data if AE SPOC ID is not found and Ae_Spoc_id is not a string
      });
      return updatedUniqueAeSpocs;
    });
  };
  
  
 

  
  
  
  
  // Function to handle AE SPOC selection from the dropdown
const handleSelectAeSpoc = (event) => {
    const selectedAeSpocId = event.target.value;
    console.log('Selected AE SPOC ID:', selectedAeSpocId); // Log the selected AE SPOC ID
    setSelectedAeSpoc(selectedAeSpocId); // Update selected AE SPOC ID state
    
    // Call the function to add the selected AE SPOC to the list
    handleAddSelectedAeSpoc();
};

// Function to handle adding selected AE SPOC to the list
const [uniqueAeSpocs, setUniqueAeSpocs] = useState([]); 

const handleAddSelectedAeSpoc = () => {
    if (selectedAeSpoc) {
        // Find the selected AE SPOC object from the aeSpoc array
        const selectedAeSpocObject = aeSpoc.find(aeSpocItem => aeSpocItem.name === selectedAeSpoc);
        
        console.log('Selected AE SPOC Object:', selectedAeSpocObject); // Log the selected AE SPOC object
        
        // Ensure selectedAeSpocObject is not undefined
        if (selectedAeSpocObject) {
            // Check if the selected AE SPOC is already in the list of unique AE SPOCs
            if (!uniqueAeSpocs.includes(selectedAeSpocObject)) {
                // If not, add it to the list
                setUniqueAeSpocs(prevUniqueAeSpocs => [...prevUniqueAeSpocs, selectedAeSpocObject]);
                const aeSpocId = selectedAeSpocObject.partner_ae_spoc_master_id;
                setFormData(prevFormData => ({
                    ...prevFormData,
                    Ae_Spoc_id: prevFormData.Ae_Spoc_id ? prevFormData.Ae_Spoc_id + ',' + aeSpocId : aeSpocId
                }));
            }
        } else {
            console.log('Selected AE SPOC Object is undefined');
        }
    } else {
        console.log('No AE SPOC selected');
    }
};



// Function to remove AE SPOC from the selected list
const AEhandleSubmit = async e => {
    e.preventDefault();
    setLoading3(true);
    try {
      const response = await fetch('http://192.168.10.42:3001/Ae_spoc_partner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(AEspocformData)
      });
      if (!response.ok) {
        throw new Error('Failed to create customer');
      }
      const createdCustomer = await response.json();
      // Update the UI with the newly created customer
       // Update the UI with the newly created customer
       
       setAeSpoc(prevCustomers => [...prevCustomers, createdCustomer]);
     
      // Clear form data
      AEspocsetFormData({ // Use the updater function
        name:'',
        designation: '',
        email_id: '',
        contact_number: '',
        note: '',
        region:''
      });
      setShowForm1(false); // Hide the form
      setLoading3(false);
    } catch (error) {
      console.error('Error creating customer:', error);
      // Handle error
    }
  };
  

//----------------------------------------------------
const [showCustomerModal, setShowCustomerModal] = useState(false); 
const handleOpenCustomerModal = () => {
  setShowCustomerModal(true);
};

const handleCloseCustomerModal = () => {
  setShowCustomerModal(false);
};
const [showAEspoctable, setShowAEspoctable] = useState(false);

const handleshowAEspoctable = () => {
  setShowAEspoctable(true);
};
//-----------------------------------------------------------
const handleButtonClick = () => {
  setShowDialog(true);
};

const handleCloseDialog = () => {
  setShowDialog(false);
};

const [showAeSpocDialog, setShowAeSpocDialog] = useState(false);

  const handleAeSpocDialogButtonClick = () => {
    setShowAeSpocDialog(true);
  };

  const handleCloseAeSpocDialog = () => {
    setShowAeSpocDialog(false);
  };//maxWidth: '1800px',
  return (
    <div className="bg-custom"> 
      <Header />
      <div className="container-fluid" style={{   height: '850px'  }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <Link to="/dashboard" className="btn btn-secondary btn-block" style={{ borderRadius: '20px' }}>
    Back
  </Link>
 



  <h2
    className="text-center"
    style={{
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: 'blue',
      textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
      margin: '0 auto' // Added margin to center the h2 element
    }}
  >
    Create Partner
  </h2>
</div>

          <div>
          
          <br/>
          <div  >
< div style={{ border: '2px solid black', borderRadius: '20px', padding: '22px' }}>
<div className={`container-fluid ${loading1 ? 'blurred' : ''}`}>  </div>   
        <div>
        
 
          {loading1 && (
<div className="loader" >
<div className="spinner"   ></div>
</div>
      )}
        
          <h3
            style={{
              backgroundColor: '#EBF9ED',
              color: 'black',
              border: '2px solid black',
              borderRadius: '20px',
              padding: '5px',
              position: 'relative'
            }}
          >
            Partner Details
            <span style={{ position: 'absolute', right: '10px' }}></span>
          </h3>
          <br/>
          <div>


          <div className="row mb-4">
  <div className="col ">
    <div className="form-group d-flex align-items-center">
      <label className="form-label" htmlFor="customerName" style={{ minWidth: "130px" }}>Partner Name:<span className="text-danger">*</span></label>
      <input
        type="text"
        name="customerName"
        className="form-control"
        style={{ width: "400px", maxWidth: "100%" }}
        placeholder="Partner Name"
        value={formData.customerName}
        onChange={handleInputChange}
      />
      {errors.customerName && <div className="text-danger">{errors.customerName}</div>}
    </div>
  </div>
  <div className="col-md-2">
            <div className="form-group d-flex align-items-center">
            <label className="form-label" style={{ minWidth: "90px" }}>
        Country: <span className="text-danger">*</span>
      </label>
      <select
        name="country"
        className="form-select"
        style={{  maxWidth: "150px" }}
        value={formData.country}
        onChange={handleInputChange}
      >
        <option value="">Select country </option>
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
        {/* Add more countries as needed */}
      </select>
      {errors.country && <div className="text-danger">{errors.country}</div>}
    </div>
  </div>
  <div className="col-md-2">
    <div className="form-group d-flex align-items-center">
      <label className="form-label" htmlFor="region" style={{ minWidth: "90px"   }}>Region:<span className="text-danger">*</span></label>
      <select
        name="region"
        className="form-select"
        style={{ maxWidth: "150px" }}
        value={formData.region}
        onChange={handleInputChange}
      >
        <option value="">Select Region</option>
        <option value="AMER">AMER</option>
        <option value="ANZ">ANZ</option>
        <option value="ASAARC">ASAARC</option>
        <option value="ROW">ROW</option>
      </select>
      {errors.region && <div className="text-danger">{errors.region}</div>}
    </div>
  </div>
  <div className="col">
    <div className="form-group d-flex ">
      <label className="form-label" htmlFor="Address" style={{ width:'120px' , minWidth: "10px" ,paddingleft: "90px"}}>Address:<span className="text-danger">*</span></label>
      <textarea
        type="text"
        name="address"
        className="form-control"
        style={{ maxWidth: "550px", height: "70px"}}
        placeholder="Address"
        value={formData.address}
        onChange={handleInputChange}
      />
      {errors.address && <div className="text-danger">{errors.address}</div>}
    </div>
  </div>
</div>

            <div className="row mb-3">
              <div className="col">
              <div className="form-group d-flex align-items-center">
                <label className="form-label" htmlFor="panortinnumber" style={{ minWidth: "130px" }}>
                    PAN or TIN: 
                  </label>
                  <input
                    type="text"
                    name="panortinnumber"
                    className="form-control"
                    style={{ maxWidth: "320px" }}
                    placeholder="PAN or TIN"
                    value={formData.panortinnumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col">
              <div className="form-group d-flex align-items-center">
                  <label className="form-label" htmlFor="tannumber" style={{ minWidth: "90px" }}>
                    TAN: </label>
                  <input
                    type="text"
                    name="tanumber"
                    className="form-control"
                    style={{ maxWidth: "320px" }}
                    value={formData.tanumber}
                    placeholder="TAN"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col">
              <div className="form-group d-flex align-items-center">
                  <label className="form-label" htmlFor="gstnumber" style={{ minWidth: "100px" }}>GSTIN: </label>
                  <input
                    type="text"
                    name="gstnumber"
                    className="form-control"
                    style={{ maxWidth: "320px" }}
                    value={formData.gstnumber}
                    placeholder="GSTIN"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
           
            </div>
            <div className="row mb-3">
            <div className="col">
              <div className="form-group d-flex align-items-center">
                  <label className="form-label" htmlFor="pantan" style={{ minWidth: "130px" }}>
                    PAN or TIN File: 
                  </label>
                  <input
                    type="file"
                    name="pantan"
                    className="form-control"
                    style={{ maxWidth: "320px" }}
                    placeholder="PAN or TIN "
                    onChange={(e) => setFile1(e.target.files[0])}
                  />
                </div>
              </div>
             
              <div className="col">
                <div className="form-group d-flex align-items-center">
                  <label className="form-label" htmlFor="tan" style={{ minWidth: "90px" }}>TAN File: </label>
                  <input
                    type="file"
                    name="tan"
                    className="form-control"
                    style={{ maxWidth: "320px" }}
                    placeholder="TAN"
                    onChange={(e) => setFile2(e.target.files[0])}
                    
                  />
                </div>
              </div>
 
              <div className="col">
              <div className="form-group d-flex align-items-center">
                  <label className="form-label" htmlFor="gstin" style={{ minWidth: "100px" }}>GSTIN File: </label>
                  <input
                    type="file"
                    name="gstin"
                    className="form-control"
                    style={{ maxWidth: "320px" }}
                    placeholder="GSTIN"
                    onChange={(e) => setFile3(e.target.files[0])}
                  />
                </div>
              </div>
              </div>
              <div className="row mb-3">
              <div className="col">
                <div className="form-group">
                  <label className="form-label" htmlFor="note">Note: </label>
                  <textarea
                    type="text"
                    name="note"
                    className="form-control"
                    value={formData.note}
                    placeholder="Note"
                    style={{ height: '80px' }} // Adjust height as needed
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
            </div>

          </div>
       <br/>
          <div className="row">
      {/* Left column for Partner SPOC Details */}
      <div className="col-md-6" style={{ borderRight: '1px solid #ccc' }}>
        <h3 style={{ backgroundColor: '#EBF9ED', color: 'black', border: '2px solid black', borderRadius: '20px', padding: '5px', position: 'relative' }}>
          Partner SPOC Details 
         
          <span style={{ position: 'absolute', right: '10px' }}></span>
        </h3>
       
        <br/>
        {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && (
              <div>
              
                 <div>
                
                 
                 <div className="row   ">
           <div className='col'></div>
  <div className="col">
  <div className="btn-group flex-item">
  <Button onClick={handleButtonClick} style={{ borderRadius: '20px 20px 20px 20px' , height :'40px' , width: '145px' }}>Select SPOC</Button>
 
  <Button onClick={() => handleAeSpocDialogButtonClick(true)} style={{ marginLeft: '10px', flex: '1', padding: '0px', height: '40px', borderRadius: '25px 25px 25px 25px'  ,border: 'none', background: 'none', position: 'relative', cursor: 'pointer'}}>
    <span className="hover-text1" style={{ marginLeft: '5px' }}> Show Details</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="blue" className="bi bi-person-vcard-fill" viewBox="0 0 16 16" style={{ border: 'none' }}>
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
  </svg>
  </Button>
</div>
{errors.spoc_id && <div className="text-danger">{errors.spoc_id}</div>}

  <Modal show={showDialog}  onHide={handleCloseDialog} dialogClassName="modal-lg">
  <Modal.Header  closeButton  onMouseEnter={() => setCloseButtonHovered(true)} onMouseLeave={() => setCloseButtonHovered(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Modal.Title>Add Partner SPOC</Modal.Title>
  
</Modal.Header>
        <Modal.Body>
        <div className="row mb-3">
  <div className='col d-flex align-items-center'>
          <Form.Select onChange={handleSelectCustomer} value={selectedCustomer}>
            <option value="">Select Partner SPOC</option>
            {/* Assuming customers are stored in the customers state */}
            {customers.map(customer => (
              <option
                key={customer.pr_spoc_master_id}
                value={customer.name } // Assuming the customer name is used as the value
              >
                {customer.name} <span>  </span>({customer.email_id})
              </option>
            ))}
          </Form.Select>
          </div>
          <div className='col d-flex align-items-center'>
          <Button className="remove-button no-background" onClick={handleAddSelectedCustomer} style={{ width: 'auto' }}>
          <span className="hover-text1" style={{ marginLeft: '5px' }}> Add Partner SPOC</span>
      <FontAwesomeIcon icon={faCheckSquare} style={{ fontSize: '34px', color: "blue" }} />
    </Button></div>
    </div>
    <table className="table partner-table">
  <thead>
    <tr>
      <th scope="col">Sr. No.</th>
      <th scope="col">Partner SPOC Name</th>
     
     
      <th scope="col">Designation</th>
      <th scope="col">Email ID</th>
      <th scope="col">Contact Number</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {selectedCustomers.map((customer, index) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{customer.name}</td>
    <td>{customer.designation}</td>
    <td>{customer.email_id}</td>
    <td>{customer.contact_number}</td>
    <td>
      <button className="remove-button" onClick={() => handleRemoveCustomer(index)}>
        <FontAwesomeIcon icon={faTrash} className="remove-icon" style={{ fontSize: '24px', color: 'red' }} />
      </button>
    </td>
  </tr>
))}
    {/* Ensure at least three rows 
    {selectedCustomers.length < 1 && (
      <>
        {Array(1 - selectedCustomers.length).fill().map((_, i) => (
          <tr key={i + selectedCustomers.length}>
            <td>{selectedCustomers.length + i + 1}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </>
    )}*/}
  </tbody>
</table>
        </Modal.Body>
       
      </Modal>
    
  </div>
 
 
 <div  className="col" >
    <Button onClick={handleShow} className="remove-button no-background" >
    <FontAwesomeIcon icon={faUserPlus} className="icon" style={{ fontSize: '24px', color: 'green' }} />
    <span className="hover-text1" style={{ marginLeft: '5px' }}> Add New Partner SPOC</span>
    </Button>


  </div>
  </div>
  


            </div>
                <div>
                      

<Modal show={showAeSpocDialog} onHide={handleCloseAeSpocDialog} dialogClassName="modal-lg">
  <Modal.Header >
    <Modal.Title>Partner SPOC Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <table className="table partner-table">
  <thead>
    <tr>
      <th scope="col">Sr. No.</th>
      <th scope="col">Partner SPOC Name</th>
     
     
      <th scope="col">Designation</th>
      <th scope="col">Email ID</th>
      <th scope="col">Contact Number</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {selectedCustomers.map((customer, index) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{customer.name}</td>
    <td>{customer.designation}</td>
    <td>{customer.email_id}</td>
    <td>{customer.contact_number}</td>
    <td>
      <button className="remove-button" onClick={() => handleRemoveCustomer(index)}>
        <FontAwesomeIcon icon={faTrash} className="remove-icon" style={{ fontSize: '24px', color: 'red' }} />
      </button>
    </td>
  </tr>
))}
    {/* Ensure at least three rows 
    {selectedCustomers.length < 1 && (
      <>
        {Array(1 - selectedCustomers.length).fill().map((_, i) => (
          <tr key={i + selectedCustomers.length}>
            <td>{selectedCustomers.length + i + 1}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </>
    )}*/}
  </tbody>
</table>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseAeSpocDialog}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
                  



                </div>
                <Modal show={showForm} onHide={handleClose} dialogClassName="modal-lg">
  <Modal.Header >
    <Modal.Title>Add New Partner SPOC</Modal.Title>
  </Modal.Header>
  <Modal.Body >
  <div  className={` ${loading2 ? 'blurred' : ''}`} >
      {loading2 && (
<div className="loader">
<div className="spinner"></div>
</div>
      )} </div>
  <form onSubmit={handleSubmit}>

<div className="row">
  <div className="col-md-6">
    <div className="form-group">
      <label htmlFor="name"><b>Name:</b><span className="text-danger">*</span></label>
      <input 
        type="text" 
        id="name" 
        className="form-control" 
        placeholder="Name" 
        value={spcoformData.name}
        onChange={e => spocsetFormData({ ...spcoformData, name: e.target.value })}
        required
      />
    </div>
  </div>

  <div className="col-md-6">
    <div className="form-group">
      <label htmlFor="designation"><b>Designation:</b><span className="text-danger">*</span></label>
      <input 
        type="text" 
        id="designation" 
        className="form-control" 
        placeholder="Designation" 
        value={spcoformData.designation}
        onChange={e => spocsetFormData({ ...spcoformData, designation: e.target.value })}
        required
      />
    </div>
  </div>
</div>
<br/>
<div className="row">
  <div className="col-md-6">
    <div className="form-group">
      <label htmlFor="email"><b>Email:</b><span className="text-danger">*</span></label>
      <input 
        type="email" 
        id="email" 
        className="form-control" 
        placeholder="Email" 
        value={spcoformData.email_id}
        onChange={e => spocsetFormData({ ...spcoformData, email_id: e.target.value })}
        required
      />
    </div>
  </div>

  <div className="col-md-6">
    <div className="form-group">
      <label htmlFor="contactNumber"><b>Contact Number:</b><span className="text-danger">*</span></label>
      <input 
        type="text" 
        id="contactNumber" 
        className="form-control" 
        placeholder="Contact Number" 
        value={spcoformData.contact_number}
        onChange={e => spocsetFormData({ ...spcoformData, contact_number: e.target.value })}
        required
      />
    </div>
  </div>
</div>
<br/>
<div className="form-group">
  <label htmlFor="note"><b>Note:</b></label>
  <textarea 
    id="note" 
    className="form-control" 
    placeholder="Note"
    value={spcoformData.note}
    onChange={e => spocsetFormData({ ...spcoformData, note: e.target.value })}
  ></textarea>
</div>
<br/>
<div className="d-flex justify-content-center">
<button type="submit" className="btn btn-primary"  onSubmit={handleSubmit} >Submit</button> 
<span style={{ margin: '0 10px' }}></span>
<Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    </div>
</form>

  </Modal.Body>
 
</Modal>



              </div>
            )}
        <br />
        
      </div>
      
      {/* Right column for AE SPOC Details */}

      <div className="col-md-6">
        <h3 style={{ backgroundColor: '#EBF9ED', color: 'black', border: '2px solid black', borderRadius: '20px', padding: '5px', position: 'relative' }}>
          Partner AE SPOC Details
          <span style={{ position: 'absolute', right: '10px' }}></span>
        </h3>
        <br />
        <div className="row ">
          <div className='col'></div>
                  <div className="col">
                  <div className="btn-group flex-item">
                  <Button variant="primary" onClick={handleOpenCustomerModal} style={{ borderRadius: '20px 20px 20px 20px' , height :'40px' , width: '145px' }}>
        Select AE SPOC
      </Button>
      <Button onClick={() => setShowAEspoctable(true)} style={{ marginLeft: '10px', flex: '1', padding: '0px', height: '40px', borderRadius: '25px 25px 25px 25px'  ,border: 'none', background: 'none', position: 'relative', cursor: 'pointer'}}>
      <span className="hover-text1" style={{ marginLeft: '5px' }}> Show Details</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="blue" className="bi bi-person-vcard-fill" viewBox="0 0 16 16" style={{ border: 'none' }}>
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
  </svg> </Button>
</div>
{errors.Ae_Spoc_id && <div className="text-danger">{errors.Ae_Spoc_id}</div>}
      {/* Customer Selection Modal */}
      <Modal show={showCustomerModal} onHide={handleCloseCustomerModal} dialogClassName="modal-lg">
  <Modal.Header closeButton>
    <Modal.Title>Add Partner AE SPOC</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <div className="row mb-3">
  <div className='col d-flex align-items-center'>
    <Form.Select onChange={handleSelectAeSpoc} value={selectedAeSpoc}>
      <option value="">Select AE SPOC</option>
      {aeSpoc.map(aeSpoc => (
        <option
          key={aeSpoc.partner_ae_spoc_master_id}
          value={aeSpoc.name} // Use unique identifier as the value
        >
          {aeSpoc.name}<span> </span>({aeSpoc.email_id})
        </option>
      ))}
    </Form.Select>
  </div>
  <div className='col d-flex align-items-center'>
    <Button className="remove-button no-background" style={{ width: '0px' }} onClick={handleAddSelectedAeSpoc}>
      <span className="hover-text1" style={{ marginLeft: '5px' }}> Add AE SPOC</span>
      <FontAwesomeIcon icon={faCheckSquare} style={{ fontSize: '34px', color: "blue" }} />
    </Button>
  </div>
</div>

    <table className="table partner-table" style={{ width: '100%' }}>
      <thead>
        <tr>
          <th scope="col">Sr. No.</th>
          <th scope="col">AE SPOC Name</th>
          <th scope="col">Designation</th>
          <th scope="col">Email ID</th>
          <th scope="col">Contact Number</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {uniqueAeSpocs.map((aeSpoc, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{aeSpoc.name}</td>
            <td>{aeSpoc.designation}</td>
            <td>{aeSpoc.email_id}</td>
            <td>{aeSpoc.contact_number}</td>
            <td>
              <button className="remove-button" onClick={() => handleRemoveAeSpoc(index)}>
                <FontAwesomeIcon icon={faTrash} className="remove-icon" style={{ fontSize: '24px', color: 'red' }} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Modal.Body>
  
</Modal>

                  </div>

                        
  <div className="col">
    <Button className="remove-button no-background" onClick={handleShow1}>
    <FontAwesomeIcon icon={faUserPlus} className="icon" style={{ fontSize: '24px', color: 'green' }} />
    <span className="hover-text1" style={{ marginLeft: '5px' }}>Add New AE SPOC</span>
    </Button>
  </div>
  </div>
 
      </div>

      
    </div>
          
            
           
          </div>
          
             <div>
                
</div>

               
                <div>
                </div>
                
                

             
 
          <div>
  
   
  <div>
  
  
  

<Modal show={showAEspoctable} onHide={() => setShowAEspoctable(false)} dialogClassName="modal-lg">
  <Modal.Header >
    <Modal.Title>AE SPOC Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <table className="table partner-table">
      <thead>
        <tr>
          <th scope="col">Sr. No.</th>
          <th scope="col">AE SPOC Name</th>
          <th scope="col">Designation</th>
          <th scope="col">Email ID</th>
          <th scope="col">Contact Number</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {uniqueAeSpocs.map((aeSpoc, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{aeSpoc.name}</td>
            <td>{aeSpoc.designation}</td>
            <td>{aeSpoc.email_id}</td>
            <td>{aeSpoc.contact_number}</td>
            <td>
              <button className="remove-button" onClick={() => handleRemoveAeSpoc(index)}>
                <FontAwesomeIcon icon={faTrash} className="remove-icon" style={{ fontSize: '24px', color: 'red' }} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowAEspoctable(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

</div>

</div>

             
<Modal show={showForm1} onHide={handleClose1} dialogClassName="modal-lg">
  <Modal.Header >
    <Modal.Title>Add New AE SPOC</Modal.Title>
  </Modal.Header>
  <Modal.Body >
  <div  className={`${loading3 ? 'blurred' : ''}`} >
      {loading3 && (
<div className="loader">
<div className="spinner"></div>
</div>
      )} </div>
  

  <form onSubmit={AEhandleSubmit}>

<div className="row">
  <div className="col-md-6">
    <div className="form-group">
      <label htmlFor="name" className="fw-bold">Name:<span className="text-danger">*</span></label>
      <input 
        type="text" 
        id="name" 
        className="form-control" 
        placeholder="Name" 
        value={AEspocformData.name}
        onChange={e => AEspocsetFormData({ ...AEspocformData, name: e.target.value })}
        required
        style={{ width: '100%' }} // Increase width
      />
    </div>
  </div>

  <div className="col-md-6">
    <div className="form-group">
      <label htmlFor="designation" className="fw-bold">Designation:<span className="text-danger">*</span></label>
      <input 
        type="text" 
        id="designation" 
        className="form-control" 
        placeholder="Designation" 
        value={AEspocformData.designation}
        onChange={e => AEspocsetFormData({ ...AEspocformData, designation: e.target.value })}
        required
        style={{ width: '100%' }} // Increase width
      />
    </div>
  </div>
</div>
<br/>
<div className="row">
  <div className="col-md-6">
    <div className="form-group">
      <label htmlFor="email" className="fw-bold">Email:<span className="text-danger">*</span></label>
      <input 
        type="email" 
        id="email" 
        className="form-control" 
        placeholder="Email" 
        value={AEspocformData.email_id}
        onChange={e => AEspocsetFormData({ ...AEspocformData, email_id: e.target.value })}
        required
        style={{ width: '100%' }} // Increase width
      />
    </div>
  </div>

  <div className="col-md-6">
    <div className="form-group">
      <label htmlFor="contactNumber" className="fw-bold">Contact Number:<span className="text-danger">*</span></label>
      <input 
        type="text" 
        id="contactNumber" 
        className="form-control" 
        placeholder="Contact Number" 
        value={AEspocformData.contact_number}
        onChange={e => AEspocsetFormData({ ...AEspocformData, contact_number: e.target.value })}
        required
        style={{ width: '100%' }} // Increase width
      />
    </div>
  </div>
</div>
<br/>
<div className="row">
<div className="col-md-6">
    <div className="form-group">
        <label htmlFor="region" className="fw-bold">Region<span className="text-danger">*</span></label>
        <select
            id="region"
            className="form-control"
            value={AEspocformData.region}
            onChange={e => AEspocsetFormData({ ...AEspocformData, region: e.target.value })}
            required
            style={{ width: '100%' }} // Increase width
        >
            <option value="">Select Region</option>
            <option value="AMER">AMER</option>
            <option value="ANZ">ANZ</option>
            <option value="ASAARC">ASAARC</option>
            <option value="ROW">ROW</option>
        </select>
    </div>
</div>


  <div className="col-md-6">
    <div className="form-group">
      <label htmlFor="note" className="fw-bold">Note:</label>
      <textarea 
        id="note" 
        className="form-control" 
        placeholder="Note"
        value={AEspocformData.note}
        onChange={e => AEspocsetFormData({ ...AEspocformData, note: e.target.value })}
        style={{ width: '100%' }} // Increase width
      ></textarea>
    </div>
  </div>
</div>

<br/>
<div className="text-center">
  <button type="submit" className="btn btn-primary" >Submit</button> 
  <span style={{ margin: '0 10px' }}></span>
  <Button variant="secondary" onClick={handleClose1}>Close</Button>
</div>
</form>

  </Modal.Body>
 
</Modal>
<br/>
<hr/>
<div className="text-center"> 
  <Button variant="primary" onClick={handleSubmitButtonClick}>Submit</Button>
  <span style={{ margin: '0 10px' }}></span>
  <Button variant="btn btn-danger" onClick={handleCancelButtonClick}>Cancel</Button>
</div>




<br/>
</div>
</div>
        </div>
     
        </div>
     
      <Footer />
    </div>
  );
};

export default Create_partner ;
