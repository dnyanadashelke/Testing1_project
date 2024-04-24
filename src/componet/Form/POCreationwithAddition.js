import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateCustomer.css';
import Header from '../Login/Header';
import Footer from '../Login/Footer';
import { Link } from 'react-router-dom'
const POCreationwithAddition = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [items, setItems] = useState([]);
  const [shedular, setshedular] = useState([]);
  const [partners, setPartners] = useState([]);
  const [selectedpartner, setSelectedPartner] = useState(null);
  const [showDialog, setShowDialog] = useState(false);  
  const [showDialog1, setShowDialog1] = useState(false);  
  const [showDiscountDialog, setShowDiscountDialog] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [showAddition, setshowAddition] = useState(false);
  const [Addition, setAddition] = useState([]);
  const [formData, setFormData] = useState({
  
    quotation:'',
    quotation_date:'',
    poAmount: '', // PO Amount
    poDate: '', // PO Date
    firstParty: '', // First Party
    poNumber: '', // PO Number
    type: '', // Type
    poStatus: '', // PO Status
    paidAmount: '', // Paid Amount
    totalDiscount: '', // Total Discount %
    currency: '', // Currency
    conversionRate: '' ,// Conversion Rate
    customerid:'' ,
    partnerid:''
  });

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
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleCustomerSelect = (customerName) => {
    const selected = customers.find(customer => customer.name === customerName);
    setSelectedCustomer(selected);
    setFormData({
      ...formData,
      customerid: selected ? selected.cm_id : '' // Set customer ID in formData
    });
  };


  const handlePartnerSelect = (partnerName) => {
    const selected = partners.find(partner => partner.name === partnerName);
    setSelectedPartner(selected);
    setFormData({
      ...formData,
      partnerid: selected ? selected.partner_id : '' // Set customer ID in formData
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
    // Validate each required field
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== 'note' && key !== 'ae_note' && key !== 'panortin' && key !== 'tan' && key !== 'gstin' && key !== 'spoc_id'  && key !== 'Ae_Spoc_id' && key !== 'tanumber'&& key !== 'panortinnumber' && key !== 'gstnumber') {
        newErrors[key] = 'This field is required';
        valid = false;
      }
    });
    console.log('Form data:', formData);
    console.log('Errors:', newErrors);
   // setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    try {
      const itemNumbers = items.map(item => item.itemNumber).join(',');
      const description = items.map(item => item.description).join(',');
      const unitPrice = items.map(item => item.unitPrice).join(',');
      const noOfUnits = items.map(item => item.noOfUnits).join(',');
      const  totalAmount= items.map(item => item.totalAmount).join(',');
     
      const itemsData = items.map(item => ({
        itemNumber: item.itemNumber,
        description: item.description,
        unitPrice: item.unitPrice,
        noOfUnits: item.noOfUnits,
        totalAmount: item.totalAmount
      }));
      const stages = shedular.map(item => item.stage).join(',');
      const expectedInvoiceDates = shedular.map(item => item.Expected_invoice_date).join(',');
      const actualInvoiceDates = shedular.map(item => item.Actual_invoice_date).join(',');
      const expectedReceiptDates = shedular.map(item => item.Expected_receipt_date).join(',');
      const actualReceiptDates = shedular.map(item => item.Actual_receipt_date).join(',');
      const conversionRates = shedular.map(item => item.Conversion_rate).join(',');
      
      const shedularData = shedular.map(item => ({
        stage: item.stage,
        Expected_invoice_date: item.Expected_invoice_date,
        Actual_invoice_date: item.Actual_invoice_date,
        Expected_receipt_date: item.Expected_receipt_date,
        Actual_receipt_date: item.Actual_receipt_date,
        Conversion_rate: item.Conversion_rate
      }));
      const discountDescriptions = discounts.map(discount => discount.description).join(',');
      const discountAmounts = discounts.map(discount => discount.amount).join(',');
      const discountCurrencies = discounts.map(discount => discount.currency).join(',');
      const discountConversionRates = discounts.map(discount => discount.conversionRate).join(',');
        
      const discountData = discounts.map(discount => ({
        description: discount.description,
        amount: discount.amount,
        currency: discount.currency,
        conversionRate: discount.conversionRate
      }));
      const AdDescriptions = Addition.map(adition => adition.description).join(',');
      const AdAmounts =Addition.map(adition => adition.amount).join(',');
      const AdCurrencies = Addition.map(adition => adition.currency).join(',');
      const AdConversionRates = Addition.map(adition => adition.conversionRate).join(',');
        
      const AdData = Addition.map(adition  => ({
        description: adition.description,
        amount: adition.amount,
        currency: adition.currency,
        conversionRate:adition.conversionRate
      }));
      setFormData(prevFormData => ({
        ...prevFormData,
        items: itemsData,
        shedular:shedularData ,
        discount:discountData ,
        Addition:AdData,
      }));
      const response = await fetch('http://192.168.10.42:3001/submit_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }
      // Handle success
      console.log('Form data submitted successfully');
    } catch (error) {
      console.error('Error submitting form data:', error);
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
      type: '', // Type
      poStatus: '', // PO Status
      paidAmount: '', // Paid Amount
      totalDiscount: '', // Total Discount %
      currency: '', // Currency
      conversionRate: '', // Conversion Rate
      customerid: '',
      partnerid: ''
    });
  };
  
  const handleAddItem = () => {
    setShowDialog(true);
  };
  
   
 
  const handleSubmitItem = () => {
    // Get references to the input fields
   

    const itemNumberInput = document.getElementById('itemNumber');
    const descriptionInput = document.getElementById('description');
    const unitPriceInput = document.getElementById('unitPrice');
    const noOfUnitsInput = document.getElementById('noOfUnits');
    
    // Log whether each input field exists
  

    console.log("itemNumberInput exists:", !!itemNumberInput);
    console.log("descriptionInput exists:", !!descriptionInput);
    console.log("unitPriceInput exists:", !!unitPriceInput);
    console.log("noOfUnitsInput exists:", !!noOfUnitsInput);
    

    
    // Check if all input fields exist before accessing their values
    if (
       itemNumberInput && descriptionInput && unitPriceInput && noOfUnitsInput ) {
      // Get the values from the input fields
      const newItem = {
       
        itemNumber: itemNumberInput.value,
        description: descriptionInput.value,
        unitPrice: unitPriceInput.value,
        noOfUnits: noOfUnitsInput.value,
        totalAmount: unitPriceInput.value  *   noOfUnitsInput.value// Calculate total amount
      };
        
      // Add the new item to the items array in state
      setItems([...items, newItem]);
  
      // Close the dialog box
      handleCloseDialog();
    } else {
    
      console.error("One or more input fields are missing in the DOM.");
    }
};

  
  const handleCloseDialog = () => {
    setShowDialog(false);
  
    // Clear the input fields after closing the dialog
    
  
    document.getElementById('itemNumber').value = '';
    document.getElementById('description').value = '';
    document.getElementById('unitPrice').value = '';
    document.getElementById('noOfUnits').value = '';
    
  };
  const handleRemoveItem = (index) => {
    // Create a copy of the items array
    const updatedItems = [...items];
    // Remove the item at the specified index
    updatedItems.splice(index, 1);
    // Update the items state with the modified array
    setItems(updatedItems);
    ///---------------------------------------------------------sheduar
    
  };

  const handleInvoiceShedule = () => {
    setShowDialog1(true);
  };
  const handleSubmitShedular = () => {
    // Get references to the input fields
    const stage = document.getElementById('stage');
    const Expected_invoice_date = document.getElementById('Expected_invoice_date');
    const Actual_invoice_date = document.getElementById('Actual_invoice_date');
    const Expected_receipt_date = document.getElementById('Expected_receipt_date');
    const Actual_receipt_date = document.getElementById('Actual_receipt_date');
    const Conversion_rate = document.getElementById('Conversion_rate');
    
    // Log the values of each input field
    console.log("Stage:", stage ? stage.value : "Not found");
    console.log("Expected_invoice_date:", Expected_invoice_date ? Expected_invoice_date.value : "Not found");
    console.log("Actual_invoice_date:", Actual_invoice_date ? Actual_invoice_date.value : "Not found");
    console.log("Expected_receipt_date:", Expected_receipt_date ? Expected_receipt_date.value : "Not found");
    console.log("Actual_receipt_date:", Actual_receipt_date ? Actual_receipt_date.value : "Not found");
    console.log("Conversion_rate:", Conversion_rate ? Conversion_rate.value : "Not found");
    
    // Check if all input fields exist before accessing their values
    if (stage && Expected_invoice_date && Actual_invoice_date && Expected_receipt_date && Actual_receipt_date && Conversion_rate) {
      // Get the values from the input fields
      const newshedular= {
        stage: stage.value,
        Expected_invoice_date: Expected_invoice_date.value,
        Actual_invoice_date: Actual_invoice_date.value,
        Actual_receipt_date: Actual_receipt_date.value,
        Expected_receipt_date: Expected_receipt_date.value,
        Conversion_rate:  Conversion_rate.value
      };
          
      // Add the new item to the items array in state
      setshedular([...shedular, newshedular]);
    
      // Close the dialog box
      handleCloseDialog1();
    } else {
      console.error("One or more input fields are missing in the DOM.");
    }
  };
  
  const handleCloseDialog1 = () => {
    setShowDialog1(false);
  
    // Clear the input fields after closing the dialog
    document.getElementById('stage').value = '';
    document.getElementById('Expected_invoice_date').value = '';
    document.getElementById('Actual_invoice_date').value = '';
    document.getElementById('Expected_receipt_date').value = '';
    document.getElementById('Actual_receipt_date').value = '';
    document.getElementById('Conversion_rate').value = '';
  };
  
const handleRemoveItem1 = (index) => {
  // Create a copy of the items array
  const updatedItems = [...shedular];
  // Remove the item at the specified index
  updatedItems.splice(index, 1);
  // Update the items state with the modified array
  setshedular(updatedItems);

  
};
  ///--------------------------------------------------------discount
  const handleAddDiscount = () => {
    setShowDiscountDialog(true);
  };
  
  const handleSubmitDiscount = () => {
    const discountDescriptionInput = document.getElementById('discountDescription');
    const discountAmountInput = document.getElementById('discountAmount');
    const discountCurrencyInput = document.getElementById('discountCurrency');
    const discountConversionRateInput = document.getElementById('discountConversionRate');
  
    if (discountDescriptionInput && discountAmountInput && discountCurrencyInput && discountConversionRateInput) {
      const newDiscount = {
        description: discountDescriptionInput.value,
        amount: discountAmountInput.value,
        currency: discountCurrencyInput.value,
        conversionRate: discountConversionRateInput.value
      };
  
      setDiscounts([...discounts, newDiscount]);
      handleCloseDiscountDialog();
    } else {
      console.error("One or more input fields are missing in the DOM.");
    }
  };
  
  const handleCloseDiscountDialog = () => {
    setShowDiscountDialog(false);
  
    document.getElementById('discountDescription').value = '';
    document.getElementById('discountAmount').value = '';
    document.getElementById('discountCurrency').value = '';
    document.getElementById('discountConversionRate').value = '';
  };
  
  const handleRemoveDiscount = (index) => {
    const updatedDiscounts = [...discounts];
    updatedDiscounts.splice(index, 1);
    setDiscounts(updatedDiscounts);
  };
  
/////------------Addition
const handleAddAddition = () => {
  setshowAddition(true);

 
};


const handleRemoveAdition = (index) => {
  const updatedDiscounts = [...Addition];
  updatedDiscounts.splice(index, 1);
  setAddition(updatedDiscounts);
};


const handleCloseAddition = () => {
  setshowAddition(false);

  document.getElementById('AdDescription').value = '';
  document.getElementById('AdAmount').value = '';
  document.getElementById('AdCurrency').value = '';
  document.getElementById('AdConversionRate').value = '';
};

const handleSubmitAddition = () => {
  const AdDescriptionInput = document.getElementById('AdDescription');
  const AdAmountInput = document.getElementById('AdAmount');
  const AdCurrencyInput = document.getElementById('AdCurrency');
  const AdConversionRateInput = document.getElementById('AdConversionRate');

  if (AdDescriptionInput && AdAmountInput && AdCurrencyInput && AdConversionRateInput) {
    const newDiscount = {
      description: AdDescriptionInput.value,
      amount: AdAmountInput.value,
      currency: AdCurrencyInput.value,
      conversionRate: AdConversionRateInput.value
    };

    setAddition([...Addition, newDiscount]);
    handleCloseAddition();
  } else {
    console.error("One or more input fields are missing in the DOM.");
  }
};
  return (
    <div className="bg-custom">
      <Header />
      <div className="container mt-1">
      <Link to="/dashboard" className=" btn btn-secondary btn-block" style={{ borderRadius: '20px' }}>
                Back
</Link>
        <h2 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'blue', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}> Create PO</h2>

        <div style={{ border: '2px solid black', borderRadius: '20px', padding: '20px' }}>
        <h3
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '2px solid black',
              borderRadius: '20px',
              padding: '10px',
              position: 'relative'
            }}
          >
            PO Deatils
            <span style={{ position: 'absolute', right: '10px' }}></span>
          </h3>
          <br/>
          <div>
          <div className="row mb-3">
              <div className="col">
                <div className="form-group">
                  <label className="form-label" htmlFor="quotation">Quotation Referance Number: <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="quotation"
                    className="form-control"
                    placeholder="Quotation Referance Number"
                    value={formData.quotation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label className="form-label" htmlFor="address">Quotation Referance Date: <span className="text-danger"> *</span></label>
                  <input
                    type="date"
                    name="quotation_date"
                    className="form-control"
                    placeholder="Quotation Referance Date"
                    value={formData.quotation_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <div className="form-group">
                  <label className="form-label" htmlFor="firstParty">First Party:<span className="text-danger"> *</span></label>
                  <select
                    name="firstParty"
                    className="form-select"
                    value={formData.firstParty}
                    onChange={handleInputChange}
                  >
                    <option value="">Select First Party</option>
                    <option value="Customer">Customer</option>
                    <option value="Partner">Partner</option>
                  </select>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label className="form-label" htmlFor="poNumber">PO Number: <span className="text-danger"> *</span></label>
                  <input
                    type="text"
                    name="poNumber"
                    className="form-control"
                    placeholder="PO Number"
                    value={formData.poNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
             
             
              <div className="col">
                <div className="form-group">
                  <label className="form-label" htmlFor="customerName">PO Amount: <span className="text-danger">*</span></label>
                  <input
                    type="Number"
                    name="poAmount"
                    className="form-control"
                    placeholder="PO Amount"
                    value={formData.poAmount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label className="form-label" htmlFor="currency">Currency <span className="text-danger">*</span></label>
                  <select
                    name="currency"
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
              </div>
            </div>

            

            <div className="row mb-3">
            <div className="col">
                <div className="form-group">
                  <label className="form-label" htmlFor="address">PO Date:<span className="text-danger"> *</span></label>
                  <input
                    type="date"
                    name="poDate"
                    className="form-control"
                    placeholder="PO Date"
                    value={formData.poDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label className="form-label" htmlFor="type">Type: </label>
                  <select
                    name="type"
                    className="form-select"
                    onChange={handleInputChange}d Amount
                  >
                    <option value="">Select Type</option>
                    <option value="License">License</option>
                    <option value="PS">PS</option>
                  </select>
                </div>
              </div>
              
            </div>

            <div className="row mb-3">
             
              <div className="col">
                <div className="form-group">
                  <label className="form-label" htmlFor="startDate">Total Discount %<span className="text-danger">*</span></label>
                  < select
                    name="poStatus"
                    className="form-select"
                    onChange={handleInputChange}
                  >
                   < option value=''> Select PO Statusoption</option>
                    <option value='Open'>Openoption</option>
                    <option value='Closed'>Closeoption</option>
                </select>
              </div>
              
              <div className="col">
                <div className="form-group">
                  <label className="form-label" htmlFor="poStatusPO">PO StatusPO<span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="poStatusPOt"
                    placeholder="poStatusPO"
                    className="form-control"
                    value={formData.totalDiscount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

        
           <br/>
           <div className="row mb-3">
          <div className="col">
            <div className="form-group">
              <label className="form-label" htmlFor="startDate">Customer Details<span className="text-danger">*</span></label>
              <select
                name="customerName"
                className="form-select"
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
           
          </div>
        </div>
        {selectedCustomer && (
          <div className="row mb-3">
            <div className="col">
              <div className="card">
                <div className="card-header">Customer Details</div>
                <div className="card-body">
                  <p><strong>Name:</strong> {selectedCustomer.name}</p>
                  <p><strong>Address:</strong> {selectedCustomer.address}</p>
                  <p><strong>Country:</strong> {selectedCustomer.country}</p>
                  <p><strong>Region:</strong> {selectedCustomer.region}</p>
                  {/* Add more customer details as needed */}
                </div>
              </div>
            </div>
          </div>
        )}
</div>
        {/* Your remaining JSX for other form fields */}
        <div className="row mb-3">
          <div className="col">
            <div className="form-group">
              <label className="form-label" htmlFor="startDate">Partner Details</label>
              <select
                name="Partnername"
                className="form-select"
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
           
          </div>
        </div>
        {selectedpartner && (
          <div className="row mb-3">
            <div className="col">
              <div className="card">
                <div className="card-header">Partner Details</div>
                <div className="card-body">
                  <p><strong>Name:</strong> {selectedpartner.name}</p>
                  <p><strong>Address:</strong> {selectedpartner.address}</p>
                  <p><strong>Country:</strong> {selectedpartner.country}</p>
                  <p><strong>Region:</strong> {selectedpartner.region}</p>
                  {/* Add more customer details as needed */}
                </div>
              </div>
            </div>
          </div>
        )}
</div>
<h3
            style={{
              backgroundColor: 'white',
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

            <table className="table">
  <thead>
    <tr>
   
      <th>Item Number</th>
      <th>Description</th>
      <th>Unit Price</th>
      <th>No of Units</th>
      <th>Total Amount</th> 
      <th>Remove</th>
    </tr>
  </thead>
  <tbody>
    {items.map((item, index) => (
      <tr key={index}>
       {/* Display row number */}
        <td>{item.itemNumber}</td>
        <td>{item.description}</td>
        <td>{item.unitPrice}</td>
        <td>{item.noOfUnits}</td>
        <td>{item.unitPrice * item.noOfUnits}</td>
        <td>
          <button className="btn btn-danger" onClick={() => handleRemoveItem(item.id)}>Remove</button>
        </td>
      </tr>
    ))}
  </tbody>

</table>
            <br/>   
<h3
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '2px solid black',
              borderRadius: '20px',
              padding: '10px',
              position: 'relative'
            }}
          >
            InvoiceSchedule

            <span style={{ position: 'absolute', right: '10px' }}></span>
          </h3>         {/* Add fields for quantity and unit price similarly */}
     
          <div className="row mb-3">
              <div className="col">
                <button className="btn btn-primary"  onClick={handleInvoiceShedule}>Add Shedule</button>
              </div>
            </div>
            <table className="table">
  <thead>
    <tr>
   
      <th>stage</th>
      <th>Expected Invoice Date</th>
      <th>Actual Invoice Date</th>
      <th>Expected Receipt Date</th>
      <th>Actual Receipt Date</th> 
      <th>Conversion Rate</th>
      <th>Remove</th>
    </tr>
  </thead>
  <tbody>
    {shedular.map((item, index) => (
      <tr key={index}>
       {/* Display row number */}
        <td>{item.stage}</td>
        <td>{item.Expected_invoice_date}</td>
        <td>{item.Actual_invoice_date}</td>
        <td>{item.Expected_receipt_date}</td>
        <td>{item.Actual_receipt_date }</td>
        <td>{item.Conversion_rate}</td>
        <td>
          <button className="btn btn-danger" onClick={() => handleRemoveItem1(item.id)}>Remove</button>
        </td>
      </tr>
    ))}
  </tbody>

</table>
<br/>
<h3
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '2px solid black',
              borderRadius: '20px',
              padding: '10px',
              position: 'relative'
            }}
          >
          Discount

            <span style={{ position: 'absolute', right: '10px' }}></span>
          </h3>   

          <button  className="btn btn-primary" onClick={handleAddDiscount}>Add Discount</button>
          <table className="table">
          <thead>
    <tr>
   
      <th>Description</th>
      <th>Amount</th>
      <th>Currency</th>
      <th>Conversion Rate</th>
      
      <th>Remove</th>
    </tr>
  </thead>
            <tbody>
              {discounts.map((discount, index) => (
                <tr key={index}>
                  {/* Display discount details */}
                  <td>{discount.description}</td>
                  <td>{discount.amount}</td>
                  <td>{discount.currency}</td>
                  <td>{discount.conversionRate}</td>
                  <td>
                    <button  className="btn btn-danger"  onClick={() => handleRemoveDiscount(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
          <h3
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '2px solid black',
              borderRadius: '20px',
              padding: '10px',
              position: 'relative'
            }}
          >
          Addition

            <span style={{ position: 'absolute', right: '10px' }}></span>
          </h3>  
          <button  className="btn btn-primary" onClick={handleAddAddition}>Add Addition </button>
          <table className="table">
          <thead>
    <tr>
   
      <th>Description</th>
      <th>Amount</th>
      <th>Currency</th>
      <th>Conversion Rate</th>
      
      <th>Remove</th>
    </tr>
  </thead>
            <tbody>
              {Addition.map((discount, index) => (
                <tr key={index}>
                  {/* Display discount details */}
                  <td>{discount.description}</td>
                  <td>{discount.amount}</td>
                  <td>{discount.currency}</td>
                  <td>{discount.conversionRate}</td>
                  <td>
                    <button  className="btn btn-danger"  onClick={() => handleRemoveAdition(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
<br/>
<div className="row mb-3">
  <div className="col"></div> 
 
  <div className="col">
    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    <span style={{ margin: '0 10px' }}></span>
    <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
  </div>
  <div className="col"></div> 
</div>

          </div>
          <br />
        </div>
      </div>
      {showDialog && (
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Item</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseDialog}></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="itemNumber" className="form-label">Item Number</label>
            <input type="text" className="form-control" id="itemNumber" />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" />
          </div>
          <div className="mb-3">
            <label htmlFor="unitPrice" className="form-label">Unit Price</label>
            <input type="Number" className="form-control" id="unitPrice" />
          </div>
          <div className="mb-3">
            <label htmlFor="noOfUnits" className="form-label">No of Units</label>
            <input type="number" className="form-control" id="noOfUnits" />
          </div>
         
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleCloseDialog}>Close</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmitItem}>Submit</button>
        </div>
      </div>
    </div>
  </div>
)}
{showDialog1 && (
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog" role="document">
      <div className="modal-content">handleCloseDialog
        <div className="modal-header">
          <h5 className="modal-title">Add Invoice Schedule</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseDialog1}></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="stage" className="form-label">Stage:<span className="text-danger">*</span></label>
            <input type="text" className="form-control" id="stage" required />
          </div>
          <div className="mb-3">
            <label htmlFor="Expected_invoice_date" className="form-label">Expected Invoice Date:<span className="text-danger">*</span></label>
            <input type="date" className="form-control" id="Expected_invoice_date" required />
          </div>
          <div className="mb-3">
            <label htmlFor="Actual_invoice_date" className="form-label">Actual Invoice Date:<span className="text-danger">*</span></label>
            <input type="date" className="form-control" id="Actual_invoice_date" required />
          </div>
          <div className="mb-3">
            <label htmlFor="Expected_receipt_date" className="form-label">Expected Receipt Date:<span className="text-danger">*</span></label>
            <input type="date" className="form-control" id="Expected_receipt_date" required />
          </div>
          <div className="mb-3">
            <label htmlFor="Actual_receipt_date" className="form-label">Actual Receipt Date:<span className="text-danger">*</span></label>
            <input type="date" className="form-control" id="Actual_receipt_date" required />
          </div> 
          <div className="mb-3">
            <label htmlFor="Conversion_rate" className="form-label">Conversion Rate:<span className="text-danger">*</span></label>
            <input type="number" className="form-control" id="Conversion_rate" required />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleCloseDialog1}>Close</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmitShedular}>Submit</button>
        </div>
      </div>
    </div>
  </div>
)}
{showDiscountDialog && (
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Discount</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseDiscountDialog}></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="discountDescription" className="form-label">Description</label>
            <input type="text" className="form-control" id="discountDescription" />
          </div>
          <div className="mb-3">
            <label htmlFor="discountAmount" className="form-label">Amount</label>
            <input type="number" className="form-control" id="discountAmount" />
          </div>
          <div className="mb-3">
            <label htmlFor="discountCurrency" className="form-label">Currency</label>
            <select className="form-select" id="discountCurrency">
              <option value="">Select Currency</option>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="INR">INR - Indian Rupee</option>
              {/* Add more currency options here */}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="discountConversionRate" className="form-label">Conversion Rate</label>
            <input type="number" className="form-control" id="discountConversionRate" />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleCloseDiscountDialog}>Close</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmitDiscount}>Submit</button>
        </div>
      </div>
    </div>
  </div>
)}

{showAddition && (
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Addition</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseAddition}></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="AdDescription" className="form-label">Description</label>
            <input type="text" className="form-control" id="AdDescription" />
          </div>
          <div className="mb-3">
            <label htmlFor="AdAmount" className="form-label">Amount</label>
            <input type="number" className="form-control" id="AdAmount" />
          </div>
          <div className="mb-3">
            <label htmlFor="AdCurrency" className="form-label">Currency</label>
            <select className="form-select" id="AdCurrency">
              <option value="">Select Currency</option>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="INR">INR - Indian Rupee</option>
              {/* Add more currency options here */}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="AdConversionRate" className="form-label">Conversion Rate</label>
            <input type="number" className="form-control" id="AdConversionRate" />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleCloseAddition}>Close</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmitAddition}>Submit</button>
        </div>
      </div>
    </div>
  </div>
)}

</div>

      <Footer />
    </div>
  );
};

export default POCreationwithAddition;
