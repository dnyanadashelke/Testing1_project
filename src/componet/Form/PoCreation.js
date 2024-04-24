import React, { useState, useEffect } from 'react';
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
//import { TextField, FormControl, InputLabel,  MenuItem, Button, Grid } from '@mui/material';

import Select from 'react-select';


const PoCreation = () => {
  const [selectedSrno, setSelectedSrno] = useState(null);
  const [nextItemNumber, setNextItemNumber] = useState(1);
  const [loading1, setLoading1] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [items, setItems] = useState([]);
  const [shedular, setshedular] = useState([]);
  const [partners, setPartners] = useState([]);
  const [entities, setentities] = useState([]);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const[showPartnerDetails , setshowPartnerDetails]=useState(false);
  const [selectedpartner, setSelectedPartner] = useState(null);
  const [showDialog, setShowDialog] = useState(false);  
  const [showDialog1, setShowDialog1] = useState(false);  
  const [showDiscountDialog, setShowDiscountDialog] = useState(false);
  const [item_amount , setItemsAmount]=useState(0);
  const [discounts, setDiscounts] = useState([]);
  const [showAddition, setshowAddition] = useState(false);
  const [Addition, setAddition] = useState([]);
  const [errors, setErrors] = useState(null);
  
  const [selectedEntity, setSelectedEntity] = useState('');
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
    entities_name:'AutomationEdge Technologies Private Limited'
    
  });

  const [showDetails, setShowDetails] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

  const handleSelectChange = (event) => {
    setSelectedEntity(event.target.value);
   
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
      try {
        const EntitiesResponse = await fetch('http://192.168.10.42:3001/Enities_master');
        if (!EntitiesResponse.ok) {
          throw new Error('Failed to fetch partners');
        }
        const EntitiesData = await EntitiesResponse.json();
        setentities(EntitiesData);
      } catch (error) {
        console.error('Error fetching Error:', error);
      }
    };
  
    fetchData();
  }, []);
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShowCustomerDetails = () => {
    if(!formData.customerid==''){
    setShowCustomerDetails(true);}
    
    // Here you can fetch additional details of the selected customer from your data source
    // For now, let's assume you have the customer details in selectedCustomer state
  };

  // Function to close the customer details dialog
  const handleCloseCustomerDetails = () => {
    setShowCustomerDetails(false);
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

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    // Validate each required field
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== 'note' && key !== 'ae_note' &&  key !== 'quotation_file'  &&  key !== 'po_File' && key !== 'panortin' && key !== 'tan' && key !== 'gstin' && key !== 'spoc_id'  && key !== 'Ae_Spoc_id' && key !== 'tanumber'&& key !== 'panortinnumber' && key !== 'gstnumber' && key !=='partnername' && key !=='poAmount' && key !=='partnerid') {
        newErrors[key] = 'This field is required';
        valid = false;
      }
    });
    console.log('Form data:', formData);
    console.log('Errors:', newErrors);
   setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    try {
        // Your existing validation and form submission code...
        if (!validateForm()){
          console.error('Failed to fetch status');
          return 
        }


         
       
       

        // Check if items are added
        if (items.length === 0) {
            throw new Error("No items added. Please add items to proceed.");
        }

      // Perform amount validation if scheduler is present
const totalAmountMap = new Map();
if (shedular.length > 0) {
    shedular.forEach(shedularItem => {
        if (totalAmountMap.has(shedularItem.itemNumber)) {
            totalAmountMap.set(shedularItem.itemNumber, totalAmountMap.get(shedularItem.itemNumber) + parseFloat(shedularItem.Amount));
        } else {
            totalAmountMap.set(shedularItem.itemNumber, parseFloat(shedularItem.Amount));
        }
    });
    items.forEach(item => {
        const totalAmountInScheduler = totalAmountMap.get(item.Item_Number) || 0;
        // Check if there are schedulers for this item
        if (totalAmountInScheduler !== 0) { // Only perform validation if there are schedulers
            if (totalAmountInScheduler > parseFloat(item.TotalAmount)) {
                throw new Error(`Validation failed for item number ${item.Item_Number}. The total amount in Scheduler details (${totalAmountInScheduler}) for item number ${item.Item_Number} does not match the expected Item total amount (${item.TotalAmount}).`);
            }
        }
    });
}

      setLoading1(true);
      const formData1 = new FormData();
    
      const itemsData = items.map(item => ({
        Item_Number: item.Item_Number,
        description: item.description,
        unitPrice: item.unitPrice,
        quntity: item.quntity,
        TotalAmount: item.TotalAmount,
        type: item.type,
        start_date:item.start_date,
        end_date:item.end_date,
      }));
    
      const ShedularData = shedular.map(item => ({
        itemNumber: item.itemNumber,
        Expected_invoice_date: item.Expected_invoice_date,
        Actual_invoice_date: item.Actual_invoice_date,
        Expected_receipt_date: item.Expected_receipt_date,
        Actual_receipt_date: item.Actual_receipt_date,
        stage: item.stage,
        Amount: item.Amount,
      }));
    
      formData1.append('items', JSON.stringify(itemsData));
      formData1.append('shedular', JSON.stringify(ShedularData));
      formData1.append('quotation', formData.quotation);
      formData1.append('quotation_date', formData.quotation_date);
      formData1.append('poAmount', POTotalAmount );
      formData1.append('poDate', formData.poDate);
      formData1.append('firstParty', formData.firstParty);
      formData1.append('poNumber', formData.poNumber);
      formData1.append('currency', formData.currency);
      formData1.append('customerid', formData.customerid);
      formData1.append('partnerid', formData.partnerid);
      formData1.append('entities_name', formData.entities_name);
  
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
      formData1.append('sessionToken', sessionToken);
      if (file1) {
        formData1.append('poFile', file1);
      }
      if (file2) {
        formData1.append('quotation_file', file2);
      }
    
      const response = await fetch('http://192.168.10.42:3001/submit_form', {
        method: 'POST',
        body: formData1,
      });
     
      
      if (response.ok ) {
        console.log('Execution successful');
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
          sessionStorage['statusData'] = statusData.status;
          window.location.href = '/StatusDisplay';
          alert(statusData.status);
        } else {
          console.error('Failed to fetch status');
        }
  
        if (!response.ok) {
          throw new Error('Failed to submit data');
        }
      }
      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }
  
      console.log('Form data submitted successfully');
    } catch (error) {
      console.error('Error submitting form data:', error);
      const errorMessageElement = document.getElementById('errorMessage');
      errorMessageElement.textContent = error.message;
    }
  };
  
  
  const handleCancel = () => {
    // Handle cancel logic here
    setFormData({
      quotation:'',
      quotation_date:'',
      poAmount: '', // PO Amount
      poDate: '', // PO Date
      firstParty: '', // First Party
      poNumber: '', // PO Number
      currency: '', // Currency
      customerid: '',
      partnerid: ''
    });
  };
  
  const handleAddItem = () => {
    setShowDialog(true);
  };
  
   
 
 const handleSubmitItem = () => {
  setNextItemNumber(prevNumber => prevNumber + 1);
  const newItemNumber = nextItemNumber;
 const type = document.getElementById('type').value; 
  const description = document.getElementById('description').value;
  const unitPrice = document.getElementById('unitprice').value;
  const quantity = document.getElementById('quntity').value;
  const start_date = document.getElementById('start_date').value;
  const end_date = document.getElementById('end_date').value;
  const TotalAmount =  document.getElementById('quntity').value * document.getElementById('unitprice').value;
  console.log(newItemNumber)
 

  // Perform validation
  if ( !description || !unitPrice || !quantity  || !TotalAmount  || !newItemNumber || !type || !start_date || !end_date ) {
    alert('Please fill in all required fields.');
    return;
  }

  // Create a new item object
  const newItem = {
    type:type,
    Item_Number:newItemNumber,
    description: description,
    unitPrice: unitPrice,
    quntity: quantity,
    TotalAmount:TotalAmount ,
    start_date:start_date,
    end_date:end_date,
    scheduler: [] 
  };

  // Update the items state by adding the new item
  setItems(prevItems => [...prevItems, newItem]);

  // Reset the form fields or close the modal
  handleCloseDialog();
};

  
  const handleCloseDialog = () => {
    // Reset form fields if needed
    setShowDialog(false);
   
    document.getElementById('description').value = '';
    document.getElementById('unitprice').value = '';
    document.getElementById('quntity').value = null;
    document.getElementById('start_date').value='';
    document.getElementById('end_date').value='';
  };
 

  
    

  const handleRemoveItem = (itemNumber) => {
   
    const updatedItems = items.filter(item => item.Item_Number !== itemNumber);
    // Update the items state with the filtered array
    setItems(updatedItems);
  
    // Remove the corresponding scheduler entry based on the removed item's Item_Number
    const updatedScheduler =  shedular.filter(scheduler => scheduler.itemNumber !== itemNumber);
    setshedular(updatedScheduler);
    
  };

 
  
  // Find the element to display the error message
  

  const handleInvoiceShedule = (srno) => {
    // Now you have access to item.srno inside this function
    setShowDialog1(true);
    setSelectedSrno(srno);
    console.log("Item Sr. No:", srno);
  };
  // Add the new shedular to the shedular array

  

  const handleSubmitShedular = () => {
   
   
 
    
    const stage = document.getElementById('stage').value;
    const Amount = document.getElementById('Amount').value;
   
    const Expected_invoice_date = document.getElementById('Expected_invoice_date').value;
    const Actual_invoice_date = document.getElementById('Actual_invoice_date').value;
    const Expected_receipt_date = document.getElementById('Expected_receipt_date').value;
    const Actual_receipt_date = document.getElementById('Actual_receipt_date').value;
    const selectedItem = items[selectedSrno - 1];
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

    // Get the corresponding item number
    const itemNumber = items[selectedSrno - 1].Item_Number;
  
    const newShedular = {
      Amount:Amount,
      srno:selectedSrno,
      itemNumber:itemNumber, // Include item number here
      stage:stage,
      Expected_invoice_date:Expected_invoice_date,
      Actual_invoice_date:Actual_invoice_date,
      Actual_receipt_date:Actual_receipt_date,
      Expected_receipt_date:Expected_receipt_date,

    };
  
    // Add the new shedular to the shedular array
    setshedular([...shedular, newShedular]);
  
    handleCloseDialog1();
  };
  

  
  const handleCloseDialog1 = () => {

    setShowDialog1(false);
  
   
    document.getElementById('Expected_invoice_date').value = '';
    document.getElementById('Actual_invoice_date').value = '';
    document.getElementById('Expected_receipt_date').value = '';
    document.getElementById('Actual_receipt_date').value = '';
   
  };
  


  const handleRemoveItem1 = (idr, itemNumber) => {
    console.log(idr, itemNumber + " sa");

    const updatedItems = shedular.filter(item => item.idr !== idr || item.itemNumber !== itemNumber);
    console.log(updatedItems);
    setshedular(updatedItems);
};


  


 const [editedItem, setEditedItem] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
 
  
  const handleQuantityChange = (e) => {
    const quntity = parseInt(e.target.value);
    const TotalAmount = quntity * editedItem.unitPrice; // Recalculate TotalAmount
    setEditedItem({ ...editedItem, quntity, TotalAmount });
  };

  // Function to handle changes in unit price
  const handleUnitPriceChange = (e) => {
    const unitPrice = parseFloat(e.target.value);
    const TotalAmount = editedItem.quntity * unitPrice; // Recalculate TotalAmount
    setEditedItem({ ...editedItem, unitPrice, TotalAmount });
  };


  const handleEditItem = (item) => {
    setEditedItem(item);
    setShowEditDialog(true);
  };

  // Function to handle the submission of the edited item
  const handleSubmitEditedItem = () => {
    // Find the index of the edited item in the items array
    const index = items.findIndex((item) => item.Item_Number === editedItem.Item_Number);
    
    if (index !== -1) {
      // Update the item in the items array with the editedItem
      const updatedItems = [...items];
      updatedItems[index] = editedItem;
      setItems(updatedItems);
    }
    // Close the edit dialog
    setShowEditDialog(false);
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
  //--

  

  const [showEditDialogShedular, setShowEditDialogShedular] = useState(false);
  
  // Define state for scheduler data and edited scheduler item
  const [scheduler, setScheduler] = useState([]);
  const [editedScheduler, setEditedScheduler] = useState({
    stage: '',
    Amount: '',
    Expected_invoice_date: '',
    Actual_invoice_date: '',
    Expected_receipt_date: '',
    Actual_receipt_date: ''
  });

  const handleEditShedular = (item) => {
    setEditedScheduler(item); // Set the edited scheduler item
    setShowEditDialogShedular(true); // Show the edit scheduler modal
  };
  
 

  // Function to handle closing edit scheduler modal
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

  // Function to handle submission of edited scheduler
 


  const handleSubmitEditedScheduler = () => {
    
     

   const index = shedular.findIndex(scheduler => scheduler.idr === editedScheduler.idr && scheduler.itemNumber === editedScheduler.itemNumber);
      

  console.log(index)
    if (index !== -1) {
      // If found, create a new array with the updated scheduler
      const updatedSchedulerArray = [...shedular];
      updatedSchedulerArray[index] = editedScheduler;
   
      // Update the state with the new array
      setshedular(updatedSchedulerArray);
   
      // Close the edit dialog box
      setShowEditDialogShedular(false);
   
      // Optionally, log the updated state of the scheduler
      console.log('Updated Scheduler State:', updatedSchedulerArray);
    } else {
      // If the edited scheduler is not found in the array
      console.error('Edited scheduler not found in the array');
      // Optionally, display an error message to the user
    }
  };
  
  // Function to handle input change in the edit scheduler form
  const handleEditSchedulerInputChange = (e) => {
    const { name, value } = e.target;
    // Update the editedScheduler state with the new value
    setEditedScheduler(prevEditedScheduler => ({
      ...prevEditedScheduler,
      [name]: value,
    }));
  };
  
  const [selectedItemForScheduler, setSelectedItemForScheduler] = useState(null);
  const [showSchedulerDetails, setShowSchedulerDetails] = useState(false);

  // Function to handle showing scheduler details for a specific item
  const handleShowScheduler = (item) => {
    setSelectedItemForScheduler(item);
    setShowSchedulerDetails(true);
  };
//-------------------------------------------------
 // State variable to track scheduler visibility
 const [showSchedulerIndices, setShowSchedulerIndices] = useState([]);
const toggleScheduler = (index) => {
  // Check if the index is already in the array, if not, add it, otherwise remove it
  if (showSchedulerIndices.includes(index)) {
    setShowSchedulerIndices(showSchedulerIndices.filter((idx) => idx !== index)); // Remove index from array
  } else {
    setShowSchedulerIndices([...showSchedulerIndices, index]); // Add index to array
  }
};

  return (
    <div className="bg-custom ">
      <Header />
      <div className="container-fluid">  
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <Link to="/dashboard" className="btn btn-secondary" style={{ borderRadius: '20px' }}>
    Back
  </Link>
  <h2 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'blue', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', margin: 'auto' }}>
    Create Sales Order
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
      value={formData.quotation}
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
        value={formData.quotation_date}
        onChange={handleInputChange}
      />
    </div>
    {errors && errors.quotation_date && <div className="text-danger">{errors.quotation_date}</div>}
  </div>

  <div className="col">
    <div className="form-group d-flex align-items-center">
      <label className="form-label" htmlFor="quotation_file" style={{ minWidth: "150px" }} >Quotation File: </label>
      <input
        type="file"
        name="quotation_file"
        className="form-control"
        placeholder="Quotation File"
        style={{ maxWidth: "320px" }}
        value={formData.quotation_file}
        onChange={(e) => setFile2(e.target.files[0])}
      />
    </div>
  </div>
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
        value={formData.poNumber}
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
        value={formData.poDate}
        onChange={handleInputChange}
      />
    </div>
    {errors && errors.poDate && <div className="text-danger">{errors.poDate}</div>}
  </div>
  <div className="col">
    <div className="form-group d-flex align-items-center">
      <label className="form-label" htmlFor="poFile" style={{ minWidth: "150px" }}>PO File:</label>
      <input
        type="file"
        style={{ maxWidth: "320px" }}
        name="poFile"
        className="form-control"
        onChange={(e) => setFile1(e.target.files[0])}
      />
    </div>
  </div>
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
        value={calculateTotalAmount()}
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
        value={formData.firstParty}
        onChange={handleInputChange}
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
    <label className="form-label" htmlFor="startDate" style={{ minWidth: "140px" }}>Customer Name:<span className="text-danger"> *</span></label>
    {errors && errors.customerid && <div className="text-danger">{errors.customerid}</div>}
    <select
   
      name="customerName"
      className="form-select"
      style={{ maxWidth: "320px" }}
      value={formData.customerName}
      onChange={(e) => {
        handleInputChange(e);
        handleCustomerSelect(e.target.value);
      }}
    >
      <option value="">Select Customer</option>
      {customers.map(customer => (
        <option key={customer.cm_id} value={customer.name}>{customer.name}</option>
      ))}
     
    </select>
    
    <span style={{ margin: '0 10px' }}></span>
    <button
  onClick={handleShowCustomerDetails}
  style={{ border: 'none', background: 'none', position: 'relative', cursor: 'pointer' }}
>
 
  <span className="hover-text1"> Show Details</span>
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="blue" className="bi bi-person-vcard-fill" viewBox="0 0 16 16" style={{ border: 'none' }}>
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
  </svg>
</button>

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

<div className='col' style={{ display: 'inline-block'}}>
<label htmlFor="entitySelect"><b>Entities Name:</b><span className="text-danger"> *</span></label>
<select id="entitySelect" value={formData.entities_name} onChange={(e) => setFormData({ ...formData, entities_name: e.target.value })} style={{ marginLeft: '10px', borderRadius: '5px', padding: '5px' }}>
  
  {entities.map((entity, index) => (
    <option key={index} value={entity.entity_name}>
      {entity.entity_name}
    </option>
  ))}
</select>
</div>


  <div className="col">
    <div className="form-group  d-flex align-items-center">
      <label className="form-label"  style={{ minWidth: "130px" }} >Partner Name:</label>
      <select
        name="Partnername"
        className="form-select"
        style={{ maxWidth: "320px" }}
        value={formData.partnername}
        onChange={(e) => {
          handleInputChange(e);
          handlePartnerSelect(e.target.value);
        }}
      >
        <option value="">Select Partner</option>
        {partners.map(partner => (
          <option key={partner.partner_id} value={partner.name}>{partner.name}</option>
        ))}
      </select>
      <span style={{ margin: '0 10px' }}></span>
      <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleShowPartnerDetails}
      style={{ border: 'none', background: 'none', position: 'relative' }}
    >
<div  className="hover-text1">
  Show Details
</div>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="blue" className="bi bi-person-vcard-fill" viewBox="0 0 16 16" style={{ border: 'none' }}>
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0"/>
      </svg>
    </button>
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
          <div className="row mb-3">
              <div className="col">
                <button className="btn btn-primary"  onClick={handleAddItem}>Add Item</button>
              </div>
         </div>

 
           


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
          <th style={{ width: '170px' }}>Per Unit Price</th>
          <th style={{ width: '140px' }}>Total Amount</th>
          <th style={{ width: '140px' }}>Actions</th>
        </tr>
        <tr>
          <td>{index + 1}</td>
          <td>{item.Item_Number}</td>
          <td>{item.type}</td>
          <td>{item.description}</td>
          <td>{item.start_date}</td>
          <td>{item.end_date}</td>
          <td>{item.quntity}</td>
          <td>{item.unitPrice}</td>
          <td>{item.TotalAmount}</td>
          <td>
            <div style={{ display: 'flex' }}>
              <button
                className="remove-button"
                onClick={() => handleInvoiceShedule(index + 1)}
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
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="blue" class="bi bi-calendar4-week" viewBox="0 0 16 16">
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
  <path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
</svg>
</button>
<span style={{ margin: '0 10px' }}></span>
              <button
                className="remove-button"
                onClick={() => handleEditItem(item)}
                style={{ marginRight: '20px', marginLeft: '20px', padding: '5px', display: 'flex', alignItems: 'center', color: 'green' }}
              >
                <FontAwesomeIcon icon={faEdit} size="lg" />
                <span className="hover-text1" style={{ marginLeft: '5px' }}>Edit Item</span>
              </button>
              <span style={{ margin: '0 5px' }}></span>
              <button
                className="remove-button"
                onClick={() => handleRemoveItem(item.Item_Number)}
                style={{ padding: '5px', display: 'flex', alignItems: 'center' }}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="remove-icon"
                  style={{ fontSize: '24px', color: 'red', marginLeft: '10px' }}
                />
                <span className="hover-text1" style={{ marginLeft: '5px' }}>Delete Item</span>
              </button>

              
            </div>
          </td>
        </tr>
        {/* Render scheduler row only if scheduler belongs to the current item */}
        {showSchedulerIndices.includes(index) && shedular.some(scheduler => scheduler.itemNumber === item.Item_Number) && (
          <tr>
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
                    .filter(scheduler => scheduler.itemNumber === item.Item_Number)
                    .map((scheduler, idx) => (
                      <tr key={idx}>
                        <td>{scheduler.idr=(idx + 1)}</td>
                        <td>{scheduler.itemNumber}</td>
                        <td>{scheduler.stage}</td>
                        <td>{scheduler.Amount}</td>
                        <td>{scheduler.Expected_invoice_date}</td>
                        <td>{scheduler.Actual_invoice_date}</td>
                        <td>{scheduler.Expected_receipt_date}</td>
                        <td>{scheduler.Actual_receipt_date}</td>
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
                              onClick={() => handleRemoveItem1(scheduler.idr ,scheduler.itemNumber)}
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
          </tr>
        )}
      </React.Fragment>
    ))}
  </tbody>
</table>



<div id="errorMessage" style={{ color: 'red', marginTop: '10px' }}></div>






            <br/>   
 
 

                        <br/>

                        <div className="col d-flex justify-content-center">
    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    <span style={{ margin: '0 10px' }}></span>
    <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
  </div>
            <hr/>
          
            </div>
           
          <br />
        </div>
    
        {showDialog && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Item</h5>
          
        </div>
        <div className="modal-body">
        
          <div className="row mb-3">
       <div className="col">
         <label htmlFor="type" className="form-label">Type:<span className="text-danger"> *</span></label>
          <select className="form-select" id="type" >
         <option value="" id="type">Select Item Type</option>
    <option value="ps" id="type">PS</option>
     <option value="license" id="type">License</option>
 
   </select>
</div>
 
            <div className="col">
              <label htmlFor="description" className="form-label">Description:<span className="text-danger"> *</span></label>
              <textarea type="text" className="form-control" id="description" required />
            </div>
          </div>
          
          {/* Additional fields */}
          <div className="row mb-3">
          <div className="col">
              <label htmlFor="quntity" className="form-label">Quantity: <span className="text-danger">*</span></label>
              <input type="number" className="form-control" id="quntity" required />
            </div>
            <div className="col">
              <label htmlFor="unitprice" className="form-label">Per Unit Price: <span className="text-danger"> *</span></label>
              <input type="number" className="form-control" id="unitprice" required />
            </div>
           
          </div>
          <div className="row mb-3">
          <div className="col">
              <label htmlFor="start_date" className="form-label">Start Date<span className="text-danger">*</span></label>
              <input type="Date" className="form-control" id="start_date" required />
            </div>
            <div className="col">
              <label htmlFor="end_date" className="form-label">End Date<span className="text-danger"> *</span></label>
              <input type="Date" className="form-control" id="end_date" required />
            </div>
           
          </div>
        
          
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={handleSubmitItem}>Submit</button>
          <button type="button" className="btn btn-secondary" onClick={handleCloseDialog}>Close</button>
         
        </div>
      </div>
    </div>
  </div>
)}


{showDialog1 && (
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Scheduler Details</h5>
        
        </div>
        <div className="modal-body">
        <div className="row mb-3">
        
            <div className="col">
              <label htmlFor="stage" className="form-label">Stage: <span className="text-danger"> *</span></label>
              <input type="text" className="form-control" id="stage" required />
            </div>
            <div className="col">
              <label htmlFor="Amount" className="form-label">Amount: <span className="text-danger"> *</span></label>
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

{loading1 && (
<div className="loader">
<div className="spinner"></div>
</div>
      )}
{showSchedulerDetails && (
  <div>
    <h3>Scheduler Details</h3>
          <table className="table partner-table">
            <thead>
              <tr>
                <th style={{ width: '100px' }}>Sr. No.</th>
                <th style={{ width: '160px' }}>Ref. Item Number</th>
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
              {shedular.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.itemNumber}</td>
                  <td>{item.stage}</td>
                  <td>{item.Amount}</td>
                  <td>{item.Expected_invoice_date}</td>
                  <td>{item.Actual_invoice_date}</td>
                  <td>{item.Expected_receipt_date}</td>
                  <td>{item.Actual_receipt_date}</td>
                  <td>
                    <div style={{ display: 'inline-block' }}>
                      <button className="remove-button" onClick={() => handleEditShedular(item)}>
                        <FontAwesomeIcon icon={faEdit} size="lg" />
                        <span className="hover-text1" style={{ marginLeft: '5px' }}>Edit Scheduler</span>
                      </button>
                      <button className="remove-button" onClick={() => handleRemoveItem1(index)}>
                        <FontAwesomeIcon icon={faTrash} className="remove-icon" style={{ fontSize: '24px', color: 'red' }} />
                        <span className="hover-text1" style={{ marginLeft: '5px' }}>Delete Scheduler</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  </div>
)}

{showEditDialog && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Item</h5>
                <button type="button" className="btn-close" onClick={handleCloseEditDialog}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="type" className="form-label">Type:<span className="text-danger"> *</span></label>
                    <select className="form-select" id="type" value={editedItem.type} onChange={(e) => setEditedItem({ ...editedItem, type: e.target.value })}>
                      <option value="">Select Item Type</option>
                      <option value="ps">PS</option>
                      <option value="license">License</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="description" className="form-label">Description:<span className="text-danger"> *</span></label>
                    <textarea type="text" className="form-control" id="description" value={editedItem.description} onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="quantity" className="form-label">Quantity: <span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="quntity" value={editedItem.quntity} onChange={handleQuantityChange} required />
                  </div>
                  <div className="col">
                    <label htmlFor="unitprice" className="form-label">Per Unit Price: <span className="text-danger"> *</span></label>
                    <input type="number" className="form-control" id="unitprice" value={editedItem.unitPrice} onChange={handleUnitPriceChange} required />
                  </div>
                </div>
                <div className="row mb-3">
            <div className="col">
              <label htmlFor="start_date" className="form-label">Start Date <span className="text-danger">*</span></label>
              <input type="Date" className="form-control" id="start_date" value={editedItem.start_date} onChange={(e) => setEditedItem({ ...editedItem, start_date: e.target.value })} required />
            </div>
            <div className="col">
              <label htmlFor="end_date" className="form-label">End Date<span className="text-danger"> *</span></label>
              <input type="Date" className="form-control" id="end_date" value={editedItem.end_date} onChange={(e) => setEditedItem({ ...editedItem, end_date: e.target.value })} required />
            </div>
          </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="TotalAmount" className="form-label">Total Amount <span className="text-danger">*</span></label>
                    <input type="number" className="form-control" id="TotalAmount" value={editedItem.TotalAmount} readOnly />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSubmitEditedItem}>Submit</button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseEditDialog}>Close</button>
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
          <button type="button" className="btn-close" onClick={handleCloseEditDialog}></button>
        </div>
        <div className="modal-body">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="stage" className="form-label">Stage:</label>
              <input type="text" className="form-control" id="stage" name="stage" value={editedScheduler.stage} onChange={handleEditSchedulerInputChange} />
            </div>
            <div className="col">
              <label htmlFor="Amount" className="form-label">Amount:</label>
              <input type="number" className="form-control" id="Amount" name="Amount" value={editedScheduler.Amount} onChange={handleEditSchedulerInputChange} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="Expected_invoice_date" className="form-label">Expected Invoice Date</label>
              <input type="date" className="form-control" id="Expected_invoice_date" name="Expected_invoice_date" value={editedScheduler.Expected_invoice_date} onChange={handleEditSchedulerInputChange} />
            </div>
            <div className="col">
              <label htmlFor="Actual_invoice_date" className="form-label">Actual Invoice Date</label>
              <input type="date" className="form-control" id="Actual_invoice_date" name="Actual_invoice_date" value={editedScheduler.Actual_invoice_date} onChange={handleEditSchedulerInputChange} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="Expected_receipt_date" className="form-label">Expected Receipt Date</label>
              <input type="date" className="form-control" id="Expected_receipt_date" name="Expected_receipt_date" value={editedScheduler.Expected_receipt_date} onChange={handleEditSchedulerInputChange} />
            </div>
            <div className="col">
              <label htmlFor="Actual_receipt_date" className="form-label">Actual Receipt Date</label>
              <input type="date" className="form-control" id="Actual_receipt_date" name="Actual_receipt_date" value={editedScheduler.Actual_receipt_date} onChange={handleEditSchedulerInputChange} />
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
   <br/>
        <br/>
 </div>
      <Footer />
    </div>
  );
};

export default PoCreation;
