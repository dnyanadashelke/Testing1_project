import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateCustomer.css';
import './PO_creation.css';
import Header from '../Login/Header';
import Footer from '../Login/Footer';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
const EditPO = () => {
    const [loading1, setLoading1] = useState(false);
    const [customers, setCustomers] = useState([]);
    const { po_id } = useParams();
   
    const [showDialog1, setShowDialog1] = useState(false);  
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [items, setItems] = useState([]);
    const [shedular, setshedular] = useState([]);
    const [partners, setPartners] = useState([]);
    const [showCustomerDetails, setShowCustomerDetails] = useState(false);
    const[showPartnerDetails , setshowPartnerDetails]=useState(false);
    const [selectedpartner, setSelectedPartner] = useState(null);
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading1, setIsLoading1] = useState(false);
    const [selectedSrno, setSelectedSrno] = useState(null);
    const [formData, setFormData] = useState({
     
      quotation: '',
      quotation_date: '',
      poAmount: '',
      poDate: '',
      firstParty: '',
      poNumber: '',
      currency: '',
      customerid: '',
      partnerid: '' ,
  
      
    });
  
    const [showDetails, setShowDetails] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const handleMouseEnter = () => {
      setShowDetails(true);
    };
  
    const handleMouseLeave = () => {
      setShowDetails(false);
    };
  
   
  
    const buttons = [1, 2, 3];
    useEffect(() => {
      const fetchData = async () => {
        try {
          const customersResponse = await fetch('http://192.168.10.42:3001/customers_master');
          if (!customersResponse.ok) {
            throw new Error('Failed to fetch customers');
          }
          const customersData = await customersResponse.json();
          setCustomers(customersData);
        } catch (error) {
          console.error('Error fetching customers:', error);
        }
    
        try {
          const partnersResponse = await fetch('http://192.168.10.42:3001/Partner_master');
          if (!partnersResponse.ok) {
            throw new Error('Failed to fetch partners');
          }
          const partnersData = await partnersResponse.json();
          setPartners(partnersData);
        } catch (error) {
          console.error('Error fetching partners:', error);
        }
      };
    
      fetchData();
    }, []);
    
  
    const handleCloseEditDialog1 = () => {
        setShowEditDialogShedular(false); // Close the edit scheduler modal
        // Optionally, you can reset the edited scheduler state to clear the form fields
        setEditedScheduler({
          stage: '',
          Amount: '',
          Expected_invoice_date: '',
          Actual_invoice_date: '',
          Expected_receipt_date: '',
          Actual_receipt_date: ''
        });
      };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleShowCustomerDetails = () => {
      if(!poDetails.customer_name==''){
      setShowCustomerDetails(true);}
      
      // Here you can fetch additional details of the selected customer from your data source
      // For now, let's assume you have the customer details in selectedCustomer state
    };
  
    // Function to close the customer details dialog
    const handleCloseCustomerDetails = () => {
      setShowCustomerDetails(false);
    };
    const handleInvoiceShedule = (srno) => {
        setShowDialog1(true);
        setSelectedSrno(srno);
      console.log("Item Sr. No:", srno);
    };
    const handleSubmitShedular =  async () => {
       try{setIsLoading1(true);
         const stage = document.getElementById('stage').value;
        const Amount = document.getElementById('Amount').value;
        const Expected_invoice_date = document.getElementById('Expected_invoice_date').value;
        const Actual_invoice_date = document.getElementById('Actual_invoice_date').value;
        const Expected_receipt_date = document.getElementById('Expected_receipt_date').value;
        const Actual_receipt_date = document.getElementById('Actual_receipt_date').value;
        const selectedItem = items[selectedSrno - 1];
        const item_number  = selectedSrno
        const totalAmountInScheduler = shedular
                          .filter(shedularItem => shedularItem.itemNumber === selectedItem.Item_Number) 
                          .reduce((total, shedularItem) => total + parseFloat(shedularItem.Amount), parseFloat(Amount));

 

  const totalAmountInSchedulerForItem = shedular
    .filter(shedularItem => shedularItem.itemNumber === selectedItem.Item_Number) // Filter schedulers for the current item
    .reduce((total, shedularItem) => total + parseFloat(shedularItem.Amount), 0); // Sum up the amounts

  // Calculate the total amount including the new shedular
  console.log("selectedItemee"+ totalAmountInScheduler )
  const totalAmountIncludingNewScheduler = totalAmountInSchedulerForItem + parseFloat(Amount);

  if (totalAmountInScheduler > parseFloat(selectedItem.TotalAmount)) {// If total amount in the scheduler exceeds total amount for the item, show an error message and prevent submission
    alert('Total amount in the scheduler exceeds total amount for the item.');
    return;
  }

        const response = await fetch('http://192.168.10.42:3001/api/insertInvoiceSchedule', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              stage,
              Amount,
              Expected_invoice_date,
              Actual_invoice_date,
              Expected_receipt_date,
              Actual_receipt_date,
              po_id, // Assuming you have po_id available in the component
              item_number // Assuming you have item_number available in the component
            })
          });
      
          if (response.ok) {
            console.log('Details inserted successfully');
            setIsLoading1(false);
            handleCloseDialog1(); // Close the dialog box on success
           
            fetchScheduler();

          } else {
            console.error('Failed to insert details');
            // Handle error here, such as displaying an error message to the user
          }
        } catch (error) {
          console.error('Error inserting details:', error);
          // Handle error here
        }
       
    
      };
    const handleCloseDialog1 = () => {

        setShowDialog1(false);   
      };
      
    const handleShowPartnerDetails =() =>{
      if(!formData.partnerid==''){
         setshowPartnerDetails(true)};
    }
  
    const handleClosePartnerDetails =() =>{
      setshowPartnerDetails(false);
    }
  
  
    const handleCustomerSelect = (customerName) => {
      const selected = customers.find(customer => customer.name === customerName);
      setSelectedCustomer(selected);
      setFormData({
        ...formData,
        customerid: selected ? selected.cm_id : '' // Set customer ID in formData
      });
    };
  
    const calculateTotalAmount = () => {
      let totalAmount = 0;
      items.forEach(item => {
        totalAmount += parseFloat(item.TotalAmount);
      });
      return totalAmount.toFixed(2); // Round to two decimal places
    }
    const handlePartnerSelect = (partnerName) => {
      const selected = partners.find(partner => partner.name === partnerName);
      setSelectedPartner(selected);
      setFormData({
        ...formData,
        partnerid: selected ? selected.partner_id : '' // Set customer ID in formData
      });
    };
    const POTotalAmount = calculateTotalAmount();

    const handleRemoveItem = (itemNumber) => {
      console.log(itemNumber+" suhas")
      const updatedItems = items.filter(item => item.Item_Number !== itemNumber);
      // Update the items state with the filtered array
      setItems(updatedItems);
    
      // Remove the corresponding scheduler entry based on the removed item's Item_Number
      const updatedScheduler =  shedular.filter(scheduler => scheduler.itemNumber !== itemNumber);
      setshedular(updatedScheduler);
      
    };
  
   
    
    // Find the element to display the error message
    
  
   

    const handleRemoveItem1 = async (idr) => {
        try {
          console.log(idr);
          // Make an API call to delete the item
          const response = await axios.delete(`http://192.168.10.42:3001/api/invoice-schedule/${idr}`);
          console.log(response.data); 
          window.location.href = `/edit_po/${po_id}`;
          fetchScheduler();
        } catch (error) {
          console.error("Error removing item:", error);
          // Handle the error, such as displaying an error message to the user
        }
      };
      
   const [editedItem, setEditedItem] = useState(null);
    const [showEditDialog, setShowEditDialog] = useState(false);
    
    const handleEditItem = (item) => {
      setEditedItem(item);
      setShowEditDialog(true);
    };
  
    const handleCloseEditDialog = () => {
        setShowEditDialog(false); // Set showEditDialog state to false to hide the edit dialog
        // Optionally, you can reset the editedItem state to clear the form fields
        setEditedItem({
          type: '', // Set default or initial values for each field
          description: '',
          quantity: 0,
          unitPrice: 0
        });
      };
      //------------------
      const handleEditSchedulerInputChange = (e) => {
        const { name, value } = e.target;
        // Update the editedScheduler state with the new value
        setEditedScheduler(prevEditedScheduler => ({
          ...prevEditedScheduler,
          [name]: value,
        }));
      };
      const handleSubmitEditedScheduler = async () => {
        try {
          console.log("Edited Scheduler:", editedScheduler);
          console.log("PO ID:", po_id);
          const  is_id =editedScheduler.is_id
          // Update the scheduler in the database
          const response = await axios.put(`http://192.168.10.42:3001/api/invoice-schedule/${is_id}`, editedScheduler);
          const { rowsAffected } = response.data;
          console.log(`${rowsAffected} row(s) updated`);
    
          // Handle success
          // For example, close the edit dialog
          handleCloseEditDialog(false);
        
          setShowEditDialogShedular(false);
          fetchScheduler();
   
        } catch (error) {
          // Handle error
          console.error("Error handling edited scheduler:", error);
          // You might want to display an error message to the user or handle the error in another way
        }
      };
    
    const [showEditDialogShedular, setShowEditDialogShedular] = useState(false);

    const [editedScheduler, setEditedScheduler] = useState({
      
        stage: '',
      amount: '',
      expected_invoice_date: '',
      actual_invoice_date: '',
      expected_receipt_date: '',
      actual_receipt_date: ''
    });
  
    const handleEditShedular = (item) => {
        setEditedScheduler({
            is_id:item.is_id,
            item_number:item.item_number,
          stage: item.stage || '', // Ensure that if item.stage is undefined, it defaults to an empty string
          amount: item.amount || '',
          expected_invoice_date: item.expected_invoice_date || '',
          actual_invoice_date: item.actual_invoice_date || '',
          expected_receipt_date: item.expected_receipt_date || '',
          actual_receipt_date: item.actual_receipt_date || '',
        }); 
        setShowEditDialogShedular(true); 
      };
      
    
   const [showSchedulerIndices, setShowSchedulerIndices] = useState([]);
  const toggleScheduler = (index) => {
    
    if (showSchedulerIndices.includes(index)) {
      setShowSchedulerIndices(showSchedulerIndices.filter((idx) => idx !== index)); // Remove index from array
    } else {
      setShowSchedulerIndices([...showSchedulerIndices, index]); // Add index to array
    }
  };
 //------------------------------------------------
  
  const [poDetails, setPODetails] = useState({
   
    po_id: '',
    quotation_number: '',
    quotation_date: '',
    quotation_file: '',
    po_number: '',
    po_date: '',
    po_file: '',
    po_amount: '',
    currency: '',
    bill_to: '',
    cm_id: '',
    partner_id: '',
    entities_name:''
  });

 
  const fetchPODetails = async () => {
    try {
      const response = await axios.get(`http://192.168.10.42:3001/po_edit/${po_id}`);
      const { data } = response;
      setPODetails(data); // Set fetched PO details to state
    } catch (error) {
      console.error('Error fetching PO details:', error);
    }
  };

 
  useEffect(() => {
    fetchPODetails();
    fetchData ();
    fetchScheduler ();
   
  }, [po_id]);



  const fetchData = async () => {
    try {
      
      const response = await axios.get(`http://192.168.10.42:3001/api/items/${po_id}`); // Replace URL with your backend API endpoint
      // Set the fetched items to the state
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchScheduler = async () => {
    try {

      const response = await axios.get(`http://192.168.10.42:3001/api/scheduler/${po_id}`); // Replace URL with your backend API endpoint
      
      setshedular(response.data);
      setIsLoading(false); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const [shownSchedulerIndex, setShownSchedulerIndex] = useState(null);

const validateForm  = () => {}
  const handleSubmit = async () => {
    try {
        // Your existing validation and form submission code...
        if (!validateForm()){
          console.error('Failed to fetch status');
        }


         
        // Check if sales order details are filled
       

        // Check if items are added
        if (items.length === 0) {
            throw new Error("No items added. Please add items to proceed.");
        }

      // Perform amount validation if scheduler is present
      const totalAmountMap = new Map();

      if (shedular.length > 0) {
       
        shedular.forEach(shedular => {
              const { item_number, amount } = shedular;
              const parsedAmount = parseFloat(amount);
             
              if (totalAmountMap.has(item_number)) {
              
                  totalAmountMap.set(item_number, totalAmountMap.get(item_number) + parsedAmount);
                  console.log(totalAmountMap)
              } else {
                  totalAmountMap.set(item_number, parsedAmount);
              }
          });
      
          items.forEach(item => {
              const { item_number, total_amount} = item;
              const totalAmountInScheduler = totalAmountMap.get(item_number) || 0;
              console.log(totalAmountInScheduler)
              // Check if there are schedulers for this item
              if (totalAmountInScheduler !== 0) {
                  // Only perform validation if there are schedulers
                  if (totalAmountInScheduler !== parseFloat(total_amount)) {
                      throw new Error(`Validation failed for item number ${item_number}. The total amount in Scheduler details (${totalAmountInScheduler}) for item number ${item_number} does not match the expected Item total amount (${total_amount}).`);
                  }
              }
          });
      }
      

       
      console.log('Form data submitted successfully');
      window.location.href='/PO_Dashboard'
    } catch (error) {
      console.error('Error submitting form data:', error);
      const errorMessageElement = document.getElementById('errorMessage');
      errorMessageElement.textContent = error.message;
    }
  };
  
  return (
    <div className="bg-custom ">
    <Header />
    {isLoading ? ( 
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
  Edit PO
</h2>
</div>
<br/>

      
      <div  className={`container-fluid ${loading1 ? 'blurred' : ''}`} >
      <div style={{ border: '2px solid black', borderRadius: '20px', padding: '20px' }}>
      <h3
          style={{
            backgroundColor: '#EBF9ED',
            color: 'black',
            border: '2px solid black',
            borderRadius: '20px',
            padding: '10px',
            position: 'relative'
          }}
        >
         Sales Order Details
          <span style={{ position: 'absolute', right: '10px' }}></span>
        </h3>
        <br/>
        <div>
       <div className="row mb-3">
       <div className="col">
<div className="form-group d-flex align-items-center">
  <label className="form-label" htmlFor="quotation" style={{ minWidth: "190px" }}>Quotation Number: <span className="text-danger">*    </span></label>
  <input
    type="text"
    name="quotation"
    className="form-control"
    style={{ maxWidth: "320px" }}
    placeholder="Quotation Number"
    value={poDetails.quotation_number}
    onChange={handleInputChange}
  />
</div>
{errors && errors.quotation && <div className="text-danger">{errors.quotation}</div>}
</div>

<div className="col">
  <div className="form-group d-flex align-items-center">
    <label className="form-label" htmlFor="address" style={{ minWidth: "150px" }}>Quotation Date: <span className="text-danger"> *</span></label>
    <input
      type="date"
      name="quotation_date"
      className="form-control"
      style={{ maxWidth: "320px" }}
      placeholder="Quotation Date"
      value={poDetails.quotation_date}
      onChange={handleInputChange}
    />
  </div>
  {errors && errors.quotation_date && <div className="text-danger">{errors.quotation_date}</div>}
</div>

<div className="col"></div>
{/*<div className="col">
  <div className="form-group d-flex align-items-center">
    <label className="form-label" htmlFor="quotation_file" style={{ minWidth: "150px" }} >Quotation File: </label>
    <input
      type="file"
      name="quotation_file"
      className="form-control"
      placeholder="Quotation File"
      style={{ maxWidth: "320px" }}
      value={formData.quotation_file}
      
    />
  </div>
</div>
        */}

</div>


<div className="row mb-3">
<div className="col">
  <div className="form-group d-flex align-items-center">
    <label className="form-label" htmlFor="poNumber" style={{ minWidth: "190px" }}>PO Number: <span className="text-danger">*</span></label>
    <input
      type="text"
      name="poNumber"
      className="form-control"
      style={{ maxWidth: "320px" }}
      placeholder="PO Number"
      value={poDetails.po_number}
      
      
      onChange={handleInputChange}
    />
  </div>
  {errors && errors.poNumber && <div className="text-danger">{errors.poNumber}</div>}
</div>
<div className="col">
  <div className="form-group d-flex align-items-center">
    <label className="form-label" htmlFor="poDate" style={{ minWidth: "150px" }}>PO Date: <span className="text-danger">*</span></label>
    <input
      type="date"
      name="poDate"
      className="form-control"
      style={{ maxWidth: "320px" }}
      placeholder="PO Date"
      value={poDetails.po_date}
      onChange={handleInputChange}
    />
  </div>
  {errors && errors.poDate && <div className="text-danger">{errors.poDate}</div>}
</div>
<div className="col"></div>
{/*
<div className="col">
  <div className="form-group d-flex align-items-center">
    <label className="form-label" htmlFor="poFile" style={{ minWidth: "150px" }}>PO File:</label>
    <input
      type="file"
      style={{ maxWidth: "320px" }}
      name="poFile"
      className="form-control"
      
    />
  </div>
</div>
    */}
</div>

<div className="row mb-3">
<div className="col">
  <div className="form-group d-flex align-items-center">
    <label className="form-label" htmlFor="poAmount" style={{ minWidth: "190px" }}>PO Amount: <span className="text-danger">*</span></label>
    <input
      type="Number"
      name="poAmount"
      style={{ maxWidth: "320px" }}
      className="form-control"
      placeholder="PO Amount"
      //value={poDetails.po_amount}
      value={poDetails.po_amount}
      onChange={handleInputChange}
    />
  </div>
  
</div>

<div className="col">
  <div className="form-group d-flex align-items-center">
    <label className="form-label" htmlFor="currency" style={{ minWidth: "150px" }}>Currency <span className="text-danger">*</span></label>
    <select
      name="currency"
      style={{ maxWidth: "320px" }}
      className="form-select"
      onChange={handleInputChange}
      value={poDetails.currency}
    >
      <option value="">Select Currency</option>
      <option value="USD">USD - United States Dollar</option>
      <option value="EUR">EUR - Euro</option>
      <option value="JPY">JPY - Japanese Yen</option>
      <option value="GBP">GBP - British Pound Sterling</option>
      <option value="INR">INR - Indian Rupee</option>
      {/* Add more currency options here */}
    </select>
  </div>
  {errors && errors.currency && <div className="text-danger">{errors.currency}</div>}
</div>

<div className="col">
  <div className="form-group d-flex align-items-center">
    <label className="form-label" htmlFor="firstParty" style={{ minWidth: "150px" }}>Bill To:<span className="text-danger"> *</span></label>
    <select
      name="firstParty"
      className="form-select"
      style={{ maxWidth: "320px" }}
     
      onChange={handleInputChange}
      value={poDetails.bill_to}
    >
      <option value="">Select Bill To</option>
      <option value="Customer">Customer</option>
      <option value="Partner">Partner</option>
    </select>
  </div>
  {errors && errors.firstParty && <div className="text-danger">{errors.firstParty}</div>}
</div>
</div>

            </div>

      
         <hr /> {/* Horizontal line */}

         <div className="row mb-3">
            <div className="col">
<div className="form-group d-flex align-items-center">
  <label className="form-label" htmlFor="startDate" style={{ minWidth: "190px" }}>Customer Name:<span className="text-danger"> *</span></label>
  <input
      type="text"
      name="customerName"
      style={{ maxWidth: "320px" }}
      className="form-control"
      
      //value={poDetails.po_amount}
      value={poDetails.customer_name}
      onChange={handleInputChange}
    />
 
  {errors && errors.customerid && <div className="text-danger">{errors.customerid}</div>}
 

</div>

<br/>
{showCustomerDetails && (
<div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
  <div className="modal-dialog modal-lg" role="document"> {/* modal-lg class for wider modal */}
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Customer Details</h5>
        
      </div>
      <div className="modal-body">
        {selectedCustomer && (
          <div className="row mb-3">
            <div className="col">
              <table className="table partner-table">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Country</th>
                    <th>Region</th>
                    <th>GSTIN</th>
                    <th>TAN</th>
                    <th>PAN or TIN</th>
                  </tr>
                  <tr>
                    <td>{selectedCustomer.name}</td>
                    <td>{selectedCustomer.address}</td>
                    <td>{selectedCustomer.country}</td>
                    <td>{selectedCustomer.region}</td>
                    <td>{selectedCustomer.gstin}</td>
                    <td>{selectedCustomer.tan}</td>
                    <td>{selectedCustomer.pan_tin}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={handleCloseCustomerDetails}>
          Close
        </button>
      </div>
    </div>
  </div>
</div>
)}

</div>
<div className='col'>
<div className="form-group d-flex align-items-center">
<label htmlFor="entitySelect"><b>Entities Name:</b><span className="text-danger"> *</span></label>
<input
      type="text"
      name="Entities name"
      style={{ maxWidth: "320px" }}
      className="form-control"
      
      //value={poDetails.po_amount}
      value={poDetails.entities_name}
      onChange={handleInputChange}
    />
    </div>
</div>


<div className="col">
  <div className="form-group  d-flex align-items-center">
    <label className="form-label"  style={{ minWidth: "130px" }} >Partner Name:</label>
    <input
      type="text"
      name="Partnername"
      style={{ maxWidth: "320px" }}
      className="form-control"
      
      //value={poDetails.po_amount}
      value={poDetails.partner_name}
      onChange={handleInputChange}
    />
  
  </div>
  <br/>


  {showPartnerDetails && (
<div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
  <div className="modal-dialog modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Partner Details</h5>
        
      </div>
      <div className="modal-body">
      {selectedpartner && (
        <div className="row mb-3">
          <div className="col">
            <table className="table partner-table">
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Country</th>
                  <th>Region</th>
                  <th>GSTIN</th>
                  <th>TAN</th>
                  <th>PAN or TIN</th>
                  {/* Add more partner details as needed */}
                </tr>
                <tr>
                  <td>{selectedpartner.name}</td>
                  <td>{selectedpartner.address}</td>
                  <td>{selectedpartner.country}</td>
                  <td>{selectedpartner.region}</td>
                  <td>{selectedpartner.gstin}</td>
                  <td>{selectedpartner.tan}</td>
                  <td>{selectedpartner.pan_tin}</td>
                  {/* Add more partner details as needed */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
            )}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={handleClosePartnerDetails}>
          Close
        </button>
      </div>
    </div>
  </div>
</div>
)}

</div>
</div>
<h3
          style={{
            backgroundColor: '#EBF9ED',
            color: 'black',
            border: '2px solid black',
            borderRadius: '20px',
            padding: '10px',
            position: 'relative'
          }}
        >
         Item Details 

          <span style={{ position: 'absolute', right: '10px' }}></span>
        </h3>
      

         


<hr/>



<table className="table partner-table">
        <tbody>
        {items.map((item, index) => (
      <React.Fragment key={index}>
              <tr>
                <th style={{ width: '80px' }}>Sr. No.</th>
                <th style={{ width: '140px' }}>Item Number</th>
                <th style={{ width: '140px' }}>Type</th>
                <th style={{ width: '300px' }}>Description</th>
                <th style={{ width: '300px' }}>Start Date </th>
                <th style={{ width: '300px' }}>End Date</th>
                <th style={{ width: '140px' }}>Quantity</th>
                <th style={{ width: '140px' }}>Per Unit Price</th>
                <th style={{ width: '140px' }}>Total Amount</th>
                <th style={{ width: '140px' }}>Actions</th>
              </tr>
              <tr>
                <td>{index + 1}</td>
                <td>{item.item_number}</td>
                <td>{item.item_type}</td>
                <td>{item.item_description}</td>
               
                <td>{item.start_date}</td>
                <td>{item.end_date}</td>
                <td>{item.quantity}</td>
                <td>{item.per_unit_price}</td>
                <td>{item.total_amount}</td>
                {/* Add action buttons */}
                <td>
                <div style={{ display: 'flex' }}>
            <button
              className="remove-button"
              onClick={() => handleInvoiceShedule(item.item_number)}
              style={{ marginRight: '20px', marginLeft: '20px', padding: '5px', display: 'flex', alignItems: 'center' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="blue" className="bi bi-calendar-plus" viewBox="0 0 16 16">
                <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7"/>
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
              </svg>
              <span className="hover-text1" style={{ marginLeft: '5px' }}>Add Scheduler</span>
            </button>
            <span style={{ margin: '0 10px' }}></span>
            <button
           onClick={() => toggleScheduler(index)}
               style={{ border: 'none', background: 'none', position: 'relative', cursor: 'pointer' }}
>

    <span className="hover-text1">Scheduler Details</span>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="blue" className="bi bi-person-vcard-fill" viewBox="0 0 16 16" style={{ border: 'none' }}>
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
</svg>
</button>
<span style={{ margin: '0 10px' }}></span>
            
          </div>
                 
                </td>
              </tr>
              {/* Render scheduler row only if scheduler belongs to the current item */}
             
                <tr>
                {showSchedulerIndices.includes(index) && shedular.some(scheduler => scheduler.itemNumber === item.Item_Number) && (    
                  <td colSpan="10" >
                    <table className="scheduler-table"  style={{ backgroundColor: 'lightgrey' , border: '1px solid #666' }}>
                      <thead>
                        <tr>
                          <th style={{ width: '100px' }}>Sr. No.</th>
                          <th style={{ width: '160px' }}>Ref. Item Number</th> {/* New column for item details serial number */}
                          <th style={{ width: '100px' }}>Stage</th>
                          <th style={{ width: '140px' }}>Amount</th>
                          <th style={{ width: '190px' }}>Expected Invoice Date</th>
                          <th style={{ width: '190px' }}>Actual Invoice Date</th>
                          <th style={{ width: '190px' }}>Expected Receipt Date</th>
                          <th style={{ width: '190px' }}>Actual Receipt Date</th>
                          <th style={{ width: '120px' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shedular
                          .filter(scheduler => scheduler.item_number === item.item_number)
                          .map((scheduler, idx) => (
                            <tr key={idx}>
                              <td>{scheduler.idr=(idx + 1)}</td>
                              <td>{scheduler.item_number}</td>
                              <td>{scheduler.stage}</td>
                              <td>{scheduler.amount}</td>
                              <td>{scheduler.expected_invoice_date}</td>
                              <td>{scheduler.actual_invoice_date}</td>
                              <td>{scheduler.expected_receipt_date}</td>
                              <td>{scheduler.actual_receipt_date}</td>
                              <td>
                                <div style={{ display: 'inline-block' }}>
                                  <button
                                    className="remove-button"
                                    onClick={() => handleEditShedular(scheduler)}
                                    style={{ alignItems: 'center', color: 'green' }}
                                  >
                                    <FontAwesomeIcon icon={faEdit} size="lg" />
                                    <span className="hover-text1" style={{ marginLeft: '5px' }}>Edit Scheduler</span>
                                  </button>
                                  <button
                                    className="remove-button"
                                    onClick={() => handleRemoveItem1(scheduler.is_id)}
                                    style={{ marginLeft: '10px' }}
                                  >
                                    <FontAwesomeIcon icon={faTrash} className="remove-icon" style={{ fontSize: '24px', color: 'red' }} />
                                    <span className="hover-text1" style={{ marginLeft: '5px' }}>Delete Scheduler</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </td>
                  )}
                </tr>
           
            </React.Fragment>
          ))}
        </tbody>
      </table>

    
<div id="errorMessage" style={{ color: 'red', marginTop: '10px' }}></div>
<br/>

        <button 
  type="button" 
  className="btn btn-primary btn-lg" // Added btn-lg class for larger size
  style={{ display: 'block', margin: 'auto' }} // Centered button using inline styles
  onClick={handleSubmit}
>
  Submit
</button>

          </div>
         
        <br />
      </div>
  
     
 <br/>
      <br/>
     
</div>
 )} 
    <Footer />
  
    {showCustomerDetails && (
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog modal-lg" role="document"> {/* modal-lg class for wider modal */}
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Customer Details</h5>
          
        </div>
        <div className="modal-body">
          {selectedCustomer && (
            <div className="row mb-3">
              <div className="col">
                <table className="table partner-table">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Country</th>
                      <th>Region</th>
                      <th>GSTIN</th>
                      <th>TAN</th>
                      <th>PAN or TIN</th>
                    </tr>
                    <tr>
                      <td>{selectedCustomer.name}</td>
                      <td>{selectedCustomer.address}</td>
                      <td>{selectedCustomer.country}</td>
                      <td>{selectedCustomer.region}</td>
                      <td>{selectedCustomer.gstin}</td>
                      <td>{selectedCustomer.tan}</td>
                      <td>{selectedCustomer.pan_tin}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleCloseCustomerDetails}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
{showEditDialogShedular && (
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Scheduler</h5>
          
        </div>
        <div className="modal-body">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="stage" className="form-label">Stage:</label>
              <input type="text" className="form-control" id="stage" name="stage" value={editedScheduler.stage} onChange={handleEditSchedulerInputChange} />
            </div>
            <div className="col">
              <label htmlFor="Amount" className="form-label">Amount:</label>
              <input type="number" className="form-control" id="amount" name="amount" value={editedScheduler.amount} onChange={handleEditSchedulerInputChange} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="Expected_invoice_date" className="form-label">Expected Invoice Date</label>
              <input type="date" className="form-control" id="expected_invoice_date" name="expected_invoice_date" value={editedScheduler.expected_invoice_date} onChange={handleEditSchedulerInputChange} />
            </div>
            <div className="col">
              <label htmlFor="Actual_invoice_date" className="form-label">Actual Invoice Date</label>
              <input type="date" className="form-control" id="actual_invoice_date" name="actual_invoice_date" value={editedScheduler.actual_invoice_date} onChange={handleEditSchedulerInputChange} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="Expected_receipt_date" className="form-label">Expected Receipt Date</label>
              <input type="date" className="form-control" id="expected_receipt_date" name="expected_receipt_date" value={editedScheduler.expected_receipt_date} onChange={handleEditSchedulerInputChange} />
            </div>
            <div className="col">
              <label htmlFor="Actual_receipt_date" className="form-label">Actual Receipt Date</label>
              <input type="date" className="form-control" id="actual_receipt_date" name="actual_receipt_date" value={editedScheduler.actual_receipt_date} onChange={handleEditSchedulerInputChange} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSubmitEditedScheduler}>Submit</button>
          <button type="button" className="btn btn-secondary" onClick={handleCloseEditDialog1}>Close</button>
        </div>
     
      </div>
    </div>
  </div>
)}

{showDialog1 &&   (
   
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog modal-lg" role="document">
      
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Scheduler Details</h5>
          {isLoading1 && (
<div className="loader" >
<div className="spinner"   ></div>
</div>
      )}
        </div>
        <div className="modal-body">
        <div className="row mb-3">
        
            <div className="col">
              <label htmlFor="stage" className="form-label">Stage:<span className="text-danger"> *</span> </label>
              <input type="text" className="form-control" id="stage" required />
            </div>
            <div className="col">
              <label htmlFor="Amount" className="form-label">Amount:<span className="text-danger"> *</span> </label>
              <input type="Number" className="form-control" id="Amount" required />
            </div>
            </div>
        <div className="row mb-3">
            <div className="col">
              <label htmlFor="Expected_invoice_date" className="form-label">Expected Invoice Date<span className="text-danger"> *</span></label>
              <input type="Date" className="form-control" id="Expected_invoice_date" required />
            </div>
          
            <div className="col">
              <label htmlFor="Actual_invoice_date" className="form-label">Actual Invoice Date</label>
              <input type="Date" className="form-control" id="Actual_invoice_date"  />
            </div>
          </div>
          
          {/* Additional fields */}
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="Expected_receipt_date" className="form-label">Expected Receipt Date</label>
              <input type="Date" className="form-control" id="Expected_receipt_date"  />
            </div>
            <div className="col">
              <label htmlFor="Actual_receipt_date" className="form-label">Actual Receipt Date </label>
              <input type="Date" className="form-control" id="Actual_receipt_date"  />
            </div>
          </div>

          
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={handleSubmitShedular}>Submit</button>

          <button type="button" className="btn btn-secondary" onClick={handleCloseDialog1}>Close</button>
         
        </div>
      </div>
    </div>
  </div>
)}


  </div>
  );
};

export default EditPO;
