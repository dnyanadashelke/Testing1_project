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
const Amended_po = () => {
 const [TotalAmount,setTotalAmount] =useState();
  const [nextItemNumber, setNextItemNumber] = useState();
  const [file2, setFile2] = useState(null);
    const [loading1, setLoading1] = useState(false);
    const [entities, setentities] = useState([]);
    const [customers, setCustomers] = useState([]);
    const { po_id } = useParams();
    const [showDialog, setShowDialog] = useState(false);  
    const [showDialog1, setShowDialog1] = useState(false);  
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [items, setItems] = useState([]);
    const [isLoading1, setIsLoading1] = useState(false);
    const [shedular, setshedular] = useState([]);
    const [partners, setPartners] = useState([]);
    const [showCustomerDetails, setShowCustomerDetails] = useState(false);
    const[showPartnerDetails , setshowPartnerDetails]=useState(false);
    const [selectedpartner, setSelectedPartner] = useState(null);
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSrno, setSelectedSrno] = useState(null);
    const [file1, setFile1] = useState(null);
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
   
    const handleShowCustomerDetails = () => {
    
      setShowCustomerDetails(true);
      
      
    };
  
    const handleCloseCustomerDetails = () => {
      setShowCustomerDetails(false);
    };
    const handleInvoiceShedule = (srno) => {
        setShowDialog1(true);
        setSelectedSrno(srno);
      console.log("Item Sr. No:", srno);
    };
    const handleSubmitShedular =  async () => {
       try{ setIsLoading1(true);
        const stage = document.getElementById('stage').value;
        const Amount = document.getElementById('Amount').value;
        const Expected_invoice_date = document.getElementById('Expected_invoice_date').value;
        const Actual_invoice_date = document.getElementById('Actual_invoice_date').value;
        const Expected_receipt_date = document.getElementById('Expected_receipt_date').value;
        const Actual_receipt_date = document.getElementById('Actual_receipt_date').value;
        const item_number  = selectedSrno
        
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
              po_id, 
              item_number 
            })
          });
      
          if (response.ok) {
            console.log('Details inserted successfully');
            handleCloseDialog1(); // Close the dialog box on success
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
      if(!poDetails.partner_id==''){
         setshowPartnerDetails(true)};
    }
  
    const handleClosePartnerDetails =() =>{
      setshowPartnerDetails(false);
    }
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInputChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleCustomerSelect = (customerName) => {
      
      console.log("Selected customer:", selectedCustomer);
      const selected = customers.find(customer => customer.name === customerName);
     
      setSelectedCustomer(selected);
      setPODetails({
        
        ...poDetails,
        cm_id: selected ? selected.cm_id : '' ,// Set customer ID in formData
        customer_name :selected ? selected.customer_name:''
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
      setPODetails({
        ...poDetails,
        partner_id : selected ? selected.partner_id : '' ,// Set customer ID in formData
        partner_name :selected ? selected.partner_name :''
      });
    };
    const POTotalAmount = calculateTotalAmount();

    const handleRemoveItem = async (itemNumber) => {
      try {
         console.log(itemNumber);
         // Make an API call to delete the item
         const response = await axios.delete(`http://192.168.10.42:3001/api/item/${itemNumber}/${po_id}`);
         console.log(response.data); 
         window.location.href = `/Update_po/${po_id}`;
         fetchData ();
         fetchScheduler();
       } catch (error) {
         console.error("Error removing item:", error);
         // Handle the error, such as displaying an error message to the user
       }
     
   };
 
   
    
    // Find the element to display the error message
    
  
   

    const handleRemoveItem1 = async (idr) => {
        try {
          console.log(idr);
          // Make an API call to delete the item
          const response = await axios.delete(`http://192.168.10.42:3001/api/invoice-schedule/${idr}`);
          console.log(response.data); 
          window.location.href = `/Update_po/${po_id}`;
          fetchScheduler();
        } catch (error) {
          console.error("Error removing item:", error);
          // Handle the error, such as displaying an error message to the user
        }
      };
      
      const [editedItem, setEditedItem] = useState({

        item_type: '',
          item_description: '',
          per_unit_price: '',
          quantity: '',
          start_date: '',
          end_date: ''
    });
    const [showEditDialog, setShowEditDialog] = useState(false);
    
    const handleEditItem = (item) => {
      setEditedItem(item);
      setShowEditDialog(true);
    };
  
    const handleCloseEditDialog = () => {
        setShowEditDialog(false); // Set showEditDialog state to false to hide the edit dialog
        
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
      
        setEditedScheduler(prevEditedScheduler => ({
          ...prevEditedScheduler,
          [name]: value,
        }));
      };
      const handleItemInputChange =(e) =>{
        const { name, value } = e.target;
      
        setEditedItem(prevEditedScheduler => ({
          ...prevEditedScheduler,
          [name]: value,
        }));
      }
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
    quotation_number: '',
    quotation_date: '',
    po_number: '',
    po_date: '',
    po_amount: '',
    currency: '',
    bill_to: '',
    customer_name:'',
    partner_name :'',
    po_file:'',
    cm_id:'',
   partner_id:'',
   entities_name:'',

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
      const fetchedItems = response.data;
    
      // Calculate total amount sum
      const totalAmountSum = fetchedItems.reduce((sum, item) => sum + parseFloat(item.total_amount), 0);
      
      // Set total amount sum
      setTotalAmount(totalAmountSum);
     
      console.log("last row"+totalAmountSum )
    //  const lastItemNumber = response.data.length > 0 ? response.data[response.data.length - 1].item_number : 0;
      const lastItemNumber = response.data.length > 0 ? parseInt(response.data[response.data.length - 1].item_number) : 0;
    // Set the nextItemNumber to the last item's item_number + 1
    setNextItemNumber(lastItemNumber+ 1);
    
     
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

  const handleSubmitItem =  async () => {
    setNextItemNumber(prevNumber => prevNumber + 1);
  
    const newItemNumber = nextItemNumber;
   const type = document.getElementById('type').value; 
    const description = document.getElementById('description').value;
    const unitPrice = document.getElementById('unitprice').value;
    const quantity = document.getElementById('quntity').value;
    const TotalAmount =  document.getElementById('quntity').value * document.getElementById('unitprice').value;
    const start_date = document.getElementById('start_date').value;
  const end_date = document.getElementById('end_date').value;
    //const TotalAmount = (document.getElementById('quntity').value * document.getElementById('unitprice').value)-document.getElementById('discount').value +document.getElementById('tax').value;
  
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
      quantity:quantity,
      TotalAmount:TotalAmount ,
      start_date:start_date,
      end_date:end_date,
      po_id:po_id,
    };
  
    // Update the items state by adding the new item
    setItems(prevItems => [...prevItems, newItem]);
    try {
      const response = await axios.post('http://192.168.10.42:3001/insertItem', newItem); // Adjust the endpoint URL as per your server setup
      console.log('Item inserted successfully:', response.data);
  } catch (error) {
      console.error('Error inserting item:', error);
      // Handle error, display error message, etc.
  }
    // Reset the form fields or close the modal
    handleCloseDialog();
    fetchData ();
    fetchScheduler ();
  };
 //---------------------------------------
  
 const handleAddItem = () => {
  setShowDialog(true);
};
const handleCloseDialog = () => {
  // Reset form fields if needed
  setShowDialog(false);
 
  document.getElementById('description').value = '';
  document.getElementById('unitprice').value = '';
  document.getElementById('quntity').value = null;
  
};




const handleInputChange = (e) => {
  const { name, value } = e.target;
  setPODetails({
    ...poDetails,
 
    [name]: value
  });
};



const validateForm  = () => {}

const handleSubmit = async () => {
    try {
        const requestBody = new FormData();
        
        const requestBody1 = new FormData();
        if (!validateForm()){
          console.error('Failed to fetch status');
          //return
        }

        if (items.length === 0) {
            throw new Error("No items added. Please add items to proceed.");
        }

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
                  if (totalAmountInScheduler > parseFloat(total_amount)) {
                      throw new Error(`Validation failed for item number ${item_number}. The total amount in Scheduler details (${totalAmountInScheduler}) for item number ${item_number} does not match the expected Item total amount (${total_amount}).`);
                  }
              }
          });
      }
      setLoading1(true);
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
requestBody.append('sessionToken', sessionToken);
requestBody.append('poDetails', JSON.stringify(poDetails));

requestBody.append('po_id', po_id);


if (file1) {
  requestBody.append('poFile', file1);
}
if (file2) {
  requestBody.append('quotation_file', file2);
}
    // Iterate over FormData entries
for (let entry of requestBody1.entries()) {
  console.log(entry);
}

// Convert FormData to plain object
const plainObject = {};
requestBody1.forEach((value, key) => {
  plainObject[key] = value;
});
console.log(plainObject);
    const response = await fetch('http://192.168.10.42:3001/Update_sales_order', {
      method: 'POST',
      body: requestBody,
    });
   
    const requestBody2 = {
      po_id: po_id 
    };

   
    if (response.ok  )  {
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

  const handleSubmitEditedItem = async() => {
    try {
      console.log("Edited Scheduler:", editedItem);
     
      const  im_id =editedItem.im_id;
      console.log("PO ID:", im_id);
     
      const response = await axios.put(`http://192.168.10.42:3001/api/Po_Item/${im_id}`, editedItem);
    
      handleCloseEditDialog(false);
    
      setShowEditDialogShedular(false);
      fetchScheduler();
      fetchData();

    } catch (error) {
      // Handle error
      console.error("Error handling edited scheduler:", error);
      // You might want to display an error message to the user or handle the error in another way
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
<Link to="/PO_Dashboard" className="btn btn-secondary" style={{ borderRadius: '20px' }}>
  Back
</Link>
<h2 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'blue', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', margin: 'auto' }}>
  Edit PO
</h2>
</div>
<br/>

{loading1 && (
  <div className="loader">
    <div className="spinner" style={{ borderColor: 'darkblue transparent transparent transparent' }}></div>
  </div>
)}
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
              name="quotation_number"
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
      name="po_number"
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
      name="po_date"
      className="form-control"
      style={{ maxWidth: "320px" }}
      placeholder="PO Date"
      value={poDetails.po_date}
      onChange={handleInputChange}
    />
  </div>
  {errors && errors.poDate && <div className="text-danger">{errors.poDate}</div>}
</div>
<div className="col">
  <div className="form-group d-flex align-items-center">
    <label className="form-label" htmlFor="po_file" style={{ minWidth: "150px" }}>PO File:</label>
    <input
          type="file"
          style={{ maxWidth: "320px" }}
          name="po_file"
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
     value={TotalAmount}
      onChange={handleInputChange}
    />
  </div>
  
</div>

<div className="col">
  <div className="form-group d-flex align-items-center">
    <label className="form-label" htmlFor="currency" style={{ minWidth: "150px" }}>Currency: <span className="text-danger">*</span></label>
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
      name="bill_to"
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
  
  <select
      name="customer_name"
      className="form-select"
      style={{ maxWidth: "320px" }}
      value={poDetails.customer_name}
     
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


<div className='col'>
<label htmlFor="entitySelect"><b>Entities Name:</b><span className="text-danger"> *</span></label>
<select id="entitySelect" value={poDetails.entities_name} onChange={(e) => setPODetails({ ...poDetails, entities_name: e.target.value })} style={{ marginLeft: '10px', borderRadius: '5px', padding: '5px' }}>
  <option value="">Select an entity</option>
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
      name="partner_name"
      className="form-select"
      style={{ maxWidth: "320px" }}
     
      value={poDetails.partner_name}
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
<div style={{ display: showDetails ? 'inline-block' : 'none', position: 'absolute', top: '10%', left: '300%', transform: 'translateX(-50%)', backgroundColor: '#ADD8E6', padding: '1px', borderRadius: '1px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', zIndex: 999, width: '100px' }}>
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
            <button
              className="remove-button"
              onClick={() => handleEditItem(item)}
              style={{ marginRight: '20px', marginLeft: '20px', padding: '5px', display: 'flex', alignItems: 'center', color: 'green' }}
            >
              <FontAwesomeIcon icon={faEdit} size="lg" />
              <span className="hover-text1" style={{ marginLeft: '5px' }}>Edit Item</span>
            </button>
            <span style={{ margin: '0 10px' }}></span>
            <button
              className="remove-button"
              onClick={() => handleRemoveItem(item.item_number)}
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
  
      <div className="modal-footer d-flex justify-content-between">


         
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
{showDialog1 && (
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
              <label htmlFor="stage" className="form-label">Stage: <span className="text-danger"> *</span></label>
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
              <select className="form-select" id="type" value={editedItem.item_type} onChange={(e) => setEditedItem({ ...editedItem, item_type: e.target.value })}>
                <option value="">Select Item Type</option>
                <option value="ps">PS</option>
                <option value="license">License</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="description" className="form-label">Description:<span className="text-danger"> *</span></label>
              <textarea type="text" className="form-control" id="description" value={editedItem.item_description} onChange={(e) => setEditedItem({ ...editedItem, item_description: e.target.value })} required />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="quantity" className="form-label">Quantity: <span className="text-danger">*</span></label>
              <input type="number" className="form-control" id="quantity" value={editedItem.quantity} onChange={(e) => setEditedItem({ ...editedItem, quantity: e.target.value })} required />
            </div>
            <div className="col">
              <label htmlFor="unitprice" className="form-label">Per Unit Price: <span className="text-danger"> *</span></label>
              <input type="number" className="form-control" id="unitprice" value={editedItem.per_unit_price} onChange={(e) => setEditedItem({ ...editedItem, per_unit_price: e.target.value })} required />
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
              <input type="number" className="form-control" id="TotalAmount" value={(editedItem.quantity)*(editedItem.per_unit_price)}  onChange={(e) => setEditedItem({ ...editedItem, total_amount: e.target.value })} required />
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


  </div>
  );
};

export default Amended_po;
