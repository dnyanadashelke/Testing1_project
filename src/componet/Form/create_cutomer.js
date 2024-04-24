import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import './CreateCustomer.css'
import Header from '../Login/Header';
import Footer from '../Login/Footer';
import StatusDisplay from './StatusDisplay'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';

const CustomerForm = (e) => {
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    contactPerson: '',
    contactNumber: '',
    emailAddress: '',
    salesPersonEmailAddress: '',
    maxTrialLicenseAllowed: '',
    licenseType: '',
    startDate: '',
    endDate: '',
    gracePeriod: '',
    processStudio: '',
    stepUnit: '',
    workerThread: '',
    assistedWorkerThreads: '',
    UATmacAddress: '',
    DEVmacAddress:'',
    PRODmacAddress:'',
    poAmount: '',
    PONumber: '',
    PODate: '',
    poFile: null,
  });


  
  const [uploadStatus, setUploadStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [redirectToStatusDisplay, setRedirectToStatusDisplay] = useState(false); // State for redirection


  
const macAddressRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    // Validate each required field
    Object.keys(formData).forEach(key => {
      if (!formData[key] && key !== 'poFile' && key !== 'PONumber' && key !== 'PODate' && key !== 'assistedWorkerThreads') {
        newErrors[key] = 'This field is required';
        valid = false;
      }

      if (
        (key === "UATmacAddress" ||
          key === "DEVmacAddress" ||
          key === "PRODmacAddress") &&
        formData[key] !== ""
      ) {
        const macAddresses = formData[key].split(",");
        for (let macAddress of macAddresses) {
          macAddress = macAddress.trim();
          if (!isValidMACAddress(macAddress)) {
            newErrors[key] = "Invalid MAC Address";
            valid = false;
            break;
          }
        }
      }
    });
  
    setErrors(newErrors);
    return valid;
  };
  const isValidMACAddress = macAddress => {
    const macAddressRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    const asteriskRegex = /^\*+$/;
    return macAddressRegex.test(macAddress)  || asteriskRegex.test(macAddress);;
  };

  
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = e => {
    setFormData({
      ...formData,
      poFile: e.target.files[0],
    });
  };
  const CustomerForm = ({ history }) => {
    // Your component code
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true); // Set loading state to true
        setStatus('Your status message');
        setShowStatus(true);
        setRedirectToStatusDisplay(true);
        // Step 1: Authentication
        const authResponse = await fetch('http://localhost:3001/login', {
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
          if (key !== 'poFile') {
            formDataToSubmit.append(key, value);
          }
        });
        formDataToSubmit.append('sessionToken', sessionToken);
        formDataToSubmit.append('poFile', formData.poFile);
        // Step 3: Execute form submission
        const executionResponse = await fetch('http://localhost::3001/upload', {
          method: 'POST',
          body: formDataToSubmit,
        });
        if (executionResponse.ok) {
          console.log('Execution successful');
          // Check status after successful execution
          const statusResponse = await fetch('http://localhost::3001/status', {
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
          // Reset form data if needed
          setFormData({
            customerName: '',
            address: '',
            contactPerson: '',
            contactNumber: '',
            emailAddress: '',
            salesPersonEmailAddress: '',
            maxTrialLicenseAllowed: '',
            licenseType: '',
            startDate: '',
            endDate: '',
            gracePeriod: '',
            processStudio: '',
            stepUnit: '',
            workerThread: '',
            assistedWorkerThreads: '',
            UATmacAddress: '',
            DEVmacAddress: '',
            PRODmacAddress: '',
            poAmount: '',
            PONumber: '',
            PODate: '',
            poFile: null,
          });
        } else {
          console.error('Execution failed');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Reset loading state
      }
    } else {
      console.error('Form validation failed');
    }
  };
  const handleCancel = () => {
    // Reset form data
    setFormData({
      customerName: '',
      address: '',
      contactPerson: '',
      contactNumber: '',
      emailAddress: '',
      salesPersonEmailAddress: '',
      maxTrialLicenseAllowed: '',
      licenseType: '',
      startDate: '',
      endDate: '',
      gracePeriod: '',
      processStudio: '',
      stepUnit: '',
      workerThread: '',
      assistedWorkerThreads: '',
      UATmacAddress: '',
      DEVmacAddress: '',
      PRODmacAddress: '',
      poAmount: '',
      PONumber: '',
      PODate: '',
      poFile: null,
     
    });
  };
  return (
<div class='bg-custom' >
<Header/>
<div className="container-fluid bg-custom"  ></div>
<div className={`container mt-1 ${loading ? 'blurred' : ''}`} >
      {loading && (
<div className="loader">
<div className="spinner"></div>
</div>
      )}
<Link to="/dashboard" className=" btn btn-secondary btn-block" style={{ borderRadius: '20px' }}>
                Back
</Link>

<h2 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'blue', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>Create Customer</h2>
<br/>
<form onSubmit={handleSubmit} style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
<div><div>
<h3 style={{ backgroundColor: 'white', color: 'black' ,border: '2px solid black',borderRadius: '20px' , padding: '10px'  }}>Customer Details :</h3>
</div>
<br/>
<div className="row mb-3">
<div className="col">

<label className="form-label">Customer Name:<span className="text-danger">*</span></label>
<input type="text" className="form-control" placeholder="Customer Name" name="customerName" value={formData.customerName} onChange={handleChange} />
            {errors.customerName && <div className="text-danger">{errors.customerName}</div>}
</div>
<div className="col">
<label className="form-label">Customer Address:<span className="text-danger">*</span></label>
<input type="text" className="form-control" placeholder="Address" name="address" value={formData.address} onChange={handleChange} />
            {errors.address && <div className="text-danger">{errors.address}</div>}
</div>
</div>
</div>
<div className="row mb-3">
<div className="col">
<label className="form-label">Contact Person Name:<span className="text-danger">*</span></label>
<input type="text" className="form-control" placeholder="Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleChange} />
            {errors.contactPerson && <div className="text-danger">{errors.contactPerson}</div>}
</div>
<div className="col">
<label className="form-label">Contact Number:<span className="text-danger">*</span></label>
<input type="number" className="form-control" placeholder="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
            {errors.contactNumber && <div className="text-danger">{errors.contactNumber}</div>}
</div>
</div>
<div className="row mb-3">
<div className="col">
<label className="form-label">Email Address:<span className="text-danger">*</span></label>
<input type="text" className="form-control" placeholder="Email Address" name="emailAddress" value={formData.emailAddress} onChange={handleChange} />
            {errors.emailAddress && <div className="text-danger">{errors.emailAddress}</div>}
</div>
<div className="col">
<label className="form-label">Sales Person Email Address:<span className="text-danger">*</span></label>
<input type="text" className="form-control" placeholder="Sales Person Email Address" name="salesPersonEmailAddress" value={formData.salesPersonEmailAddress} onChange={handleChange} />
            {errors.salesPersonEmailAddress && <div className="text-danger">{errors.salesPersonEmailAddress}</div>}
</div>
</div>
        {/* Additional fields */}
        {/* Maximum Trial License Allowed */}
<br/>
<h3  style={{ backgroundColor: 'white', color: 'black' ,border: '2px solid black',borderRadius: '20px' , padding: '10px'  }}>License Details :</h3>
<br/>
<div className="row mb-3">
<div className="col">
<label className="form-label">Maximum Trial License Allowed:<span className="text-danger">*</span></label>
<input type="number" className="form-control" placeholder="Maximum Trial License Allowed" name="maxTrialLicenseAllowed" value={formData.maxTrialLicenseAllowed} onChange={handleChange} />
            {errors.maxTrialLicenseAllowed && <div className="text-danger">{errors.maxTrialLicenseAllowed}</div>}
</div>
<div className="col">
<label className="form-label">License Type:<span className="text-danger">*</span></label>
<select className="form-control" name="licenseType" value={formData.licenseType} onChange={handleChange}>
<option value="">Select License Type</option>
<option value="Enterprise">Enterprise</option>
<option value="Subscription">Subscription</option>
</select>
            {errors.licenseType && <div className="text-danger">{errors.licenseType}</div>}
</div>
</div>
        {/* Start Date and End Date */}
<div className="row mb-3">
<div className="col">
<label className="form-label">Start Date:<span className="text-danger">*</span></label>
<input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} />
            {errors.startDate && <div className="text-danger">{errors.startDate}</div>}
</div>
<div className="col">
<label className="form-label">End Date:<span className="text-danger">*</span></label>
<input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleChange} />
            {errors.endDate && <div className="text-danger">{errors.endDate}</div>}
</div>
</div>
        {/* Other fields */}
        {/* Grace Period */}
<div className="row mb-3">
<div className="col">
<label className="form-label">Grace Period:<span className="text-danger">*</span></label>
<input type="number" className="form-control" placeholder="Grace Period" name="gracePeriod" value={formData.gracePeriod} onChange={handleChange} />
            {errors.gracePeriod && <div className="text-danger">{errors.gracePeriod}</div>}
</div>
          {/* Process Studio */}
<div className="col">
<label className="form-label">Process Studio:<span className="text-danger">*</span></label>
<input type="number" className="form-control" placeholder="Process Studio" name="processStudio" value={formData.processStudio} onChange={handleChange} />
            {errors.processStudio && <div className="text-danger">{errors.processStudio}</div>}
</div>
</div>
        {/* Step Unit and Worker Thread */}
<div className="row mb-3">
<div className="col">
<label className="form-label">Step Unit:<span className="text-danger">*</span></label>
<input type="number" className="form-control" placeholder="Step Unit" name="stepUnit" value={formData.stepUnit} onChange={handleChange} />
            {errors.stepUnit && <div className="text-danger">{errors.stepUnit}</div>}
</div>
<div className="col">
<label className="form-label">Worker Thread:<span className="text-danger">*</span></label>
<input type="number" className="form-control" placeholder="Worker Thread" name="workerThread" value={formData.workerThread} onChange={handleChange} />
            {errors.workerThread && <div className="text-danger">{errors.workerThread}</div>}
</div>
</div>


<div className="row mb-3">
<div className="col">
  <label className="form-label">UAT MAC Address:<span className="text-danger">*</span></label>
  <input type="text" className="form-control" placeholder="UAT MAC Address" name="UATmacAddress" value={formData.UATmacAddress} onChange={handleChange} />
  {errors.UATmacAddress && <div className="text-danger">{errors.UATmacAddress}</div>}
</div>
<div className="col">
  <label className="form-label">DEV MAC Address:<span className="text-danger">*</span></label>
  <input type="text" className="form-control" placeholder="DEV MAC Address" name="DEVmacAddress" value={formData.DEVmacAddress} onChange={handleChange} />
  {errors.DEVmacAddress && <div className="text-danger">{errors.DEVmacAddress}</div>}
</div>
<div className="col">
  <label className="form-label">PROD MAC Address:<span className="text-danger">*</span></label>
  <input type="text" className="form-control" placeholder="PROD MAC Address" name="PRODmacAddress" value={formData.PRODmacAddress} onChange={handleChange} />
  {errors.PRODmacAddress && <div className="text-danger">{errors.PRODmacAddress}</div>}
</div>
</div>
<div className="row mb-3">
<div className="col">
<label className="form-label">Assisted Worker Threads:</label>
<input type="number" className="form-control" placeholder="Assisted Worker Threads" name="assistedWorkerThreads" value={formData.assistedWorkerThreads} onChange={handleChange} />
</div>
</div>
        {/* PO Number and PO Date */}
<br/>
<h3  style={{ backgroundColor: 'white', color: 'black' ,border: '2px solid black',borderRadius: '20px' , padding: '10px'  }}>PO Details :</h3>
<br/>
<div className="row mb-3">
<div className="col">
<label className="form-label">PO Number:</label>
<input type="text" className="form-control" placeholder="PO Number" name="PONumber" value={formData.PONumber} onChange={handleChange} />
</div>
<div className="col">
<label className="form-label">PO Date:</label>
<input type="date" className="form-control" placeholder="PO Date" name="PODate" value={formData.PODate} onChange={handleChange} />
</div>
</div>
        {/* PO Amount and PO File */}
<div className="row mb-3">
<div className="col">
<label className="form-label">PO Amount:<span className="text-danger">*</span></label>
<input type="number" className="form-control" placeholder="PO Amount" name="poAmount" value={formData.poAmount} onChange={handleChange} />
          {errors.poAmount && <div className="text-danger">{errors.poAmount}</div>}
</div>
<div className="col">
<label className="form-label">PO File:</label>
<div className="input-group">
<input type="file" className="form-control" accept=".pdf" name="poFile" onChange={handleFileChange} />
    {uploadStatus !== null && (
<div className="input-group-append">
        {uploadStatus ? (
<span className="input-group-text text-success">&#10004;</span>
        ) : (
<span className="input-group-text text-danger">&#10008;</span>
        )}
</div>
    )}
</div>
</div>
</div>
<br/>
<div className="row mb-4 justify-content-center">
<div className="col-md-2">
<button type="submit" className="btn btn-success mr-2" style={{ borderRadius: '20px' }} onClick={handleSubmit} >Submit</button>
</div>
<div className="col-md-1">
<button type="button" className="btn btn-secondary btn-block" onClick={handleCancel} style={{ borderRadius: '20px' }}>
    Cancel
</button>
</div>
</div>
</form>
</div>

<Footer/>
</div>
  );
};
export default CustomerForm;