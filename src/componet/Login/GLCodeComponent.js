import React, { useState, useEffect ,useRef  } from 'react';
//import './GLCodeComponent.css'; // Import your CSS file for component-specific styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Header from '../Login/Header';
import Footer from '../Login/Footer';
import './GLCodeComponent.css';
import { Button, Modal, Form } from 'react-bootstrap';
const GLCodeComponent = () => {
  const [selectedSrno, setSelectedSrno] = useState(null);
  const [nextItemNumber, setNextItemNumber] = useState(1);
  const [glCode1, setGLCode1] = useState('');
  const [glCode2, setGLCode2] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showDialog1, setShowDialog1] = useState(false);
  const [glName, setGLName] = useState('');
  const [glDescription, setGLDescription] = useState('');
  const [glCodes, setGLCodes] = useState([]);
  const [accountHeaders, setAccountHeaders] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [selectedGLCodeIndex, setSelectedGLCodeIndex] = useState(1);
  const [selectedAccountHeaderIndex, setSelectedAccountHeaderIndex] = useState(null);
 
  const [checkboxStatesMap, setCheckboxStatesMap] = useState({});

  const handleAddButtonClick = () => {
    setShowDialog(true);
  };

  const handleDialogClose = () => {
      // Clear the input values
      setGLName('');
      setGLDescription('');
    setShowDialog(false);
  };



  const handleDialogSubmit = () => {
    if (glName.trim() === '' || glDescription.trim() === '') {
      alert('Both fields are required!');
      return; // Do not proceed with form submission
    }
    // Replace spaces with underscores in the GL code
    const formattedGLCode = glName.replaceAll(' ', '_');
    const formattedglDescription = glDescription.replaceAll(' ', '_');
    const newGLCode = { id: nextItemNumber, glName: formattedGLCode, glDescription:formattedglDescription };
    setGLCodes([...glCodes, newGLCode]);
    
    setGLName('');
    setGLDescription('');
    setShowDialog(false);
    setNextItemNumber(prevItemNumber => prevItemNumber + 1);
  };
  




  const handleAddButtonClick1 = () => {
    setShowDialog1(true);
  };

  const handleDialogClose1 = () => {
    setGLName('');
    setShowDialog1(false);
  };

  const handleDeleteGLCode = (e, id) => {
    e.stopPropagation(); // Prevent the onClick event of the row from firing when the button is clicked
    const updatedGLCodes = glCodes.filter(code => code.id !== id);
    setGLCodes(updatedGLCodes);
    // If the deleted code was selected, reset the selectedGLCodeIndex
    if (selectedGLCodeIndex === id) {
      setSelectedGLCodeIndex(null);
    }
  };
  const handleDialogSubmit1 = () => {
    if (glName.trim() === '' ) {
      alert('fields are required!');
      return; // Do not proceed with form submission
    }
    const formattedGLCode = glName.replaceAll(' ', '_');
    const newHeader = { id: accountHeaders.length + 1, glName:formattedGLCode, glDescription };
    setAccountHeaders([...accountHeaders, newHeader]);
    // Initialize checkbox state for the new header
    setCheckboxStates([...checkboxStates, { adderChecked: false, reducerChecked: false }]);
    setGLName('');
    setGLDescription('');
    setShowDialog1(false);
  };
  const handleGLCodeSelect = (id) => {
    setSelectedGLCodeIndex(id);
    console.log("suhas")
    // If checkbox states for the selected GL code exist, set them; otherwise, initialize them
    const checkboxStates = checkboxStatesMap[id] || Array(accountHeaders.length).fill({ adderChecked: false, reducerChecked: false });
    setCheckboxStatesMap({ ...checkboxStatesMap, [id]: checkboxStates });
  };

  const handleCheckboxChange = (index, type) => {
    try {
      const updatedCheckboxStates = [...checkboxStatesMap[selectedGLCodeIndex]];
    
      // Update the checkbox state for the selected GL code
      if (index >= 0 ) {
        if (type === 'adder') {
          updatedCheckboxStates[index] = {
            ...updatedCheckboxStates[index],
            adderChecked: !updatedCheckboxStates[index]?.adderChecked
          };
          // If Adder checkbox is checked, disable Reducer checkbox
          if (updatedCheckboxStates[index].adderChecked) {
            updatedCheckboxStates[index].reducerChecked = false;
          }
        } else if (type === 'reducer') {
          updatedCheckboxStates[index] = {
            ...updatedCheckboxStates[index],
            reducerChecked: !updatedCheckboxStates[index]?.reducerChecked
          };
          // If Reducer checkbox is checked, disable Adder checkbox
          if (updatedCheckboxStates[index].reducerChecked) {
            updatedCheckboxStates[index].adderChecked = false;
          }
        }
        setCheckboxStatesMap({ ...checkboxStatesMap, [selectedGLCodeIndex]: updatedCheckboxStates });
      } else {
        console.error('Invalid index:', index);
      }
    } catch (error) {
      // Display an alert message if an error occurs
      alert('An error occurred while handling checkbox change. Please try again.');
      console.error('Error:', error);
    }
  };
  

 
 
  /*
  const handleGLRowSubmit = () => {
    let allConcatenatedValuesString = '..';
    if (glCodes && glCodes.length > 0) {
      const concatenatedValues = [];
      glCodes.forEach((glCode) => {
        const checkboxStates = checkboxStatesMap[glCode.id];
        if (checkboxStates) {
          const glCodeValues = [];
          const adderValues = []; // Store values with '+' operator
          const reducerValues = []; // Store values with '-' operator
          checkboxStates.forEach(({ adderChecked, reducerChecked }, index) => {
            const header = accountHeaders[index];
            if (header && (adderChecked || reducerChecked)) {
              const operation = adderChecked ? '+' : '-';
              const value = `${operation}${header.glName}`;
              if (adderChecked) {
                adderValues.push(value);
              } else {
                reducerValues.push(value);
              }
            }
          });
          // Concatenate values with '+' operator followed by values with '-' operator
          const sortedValues = adderValues.concat(reducerValues);
          const concatenatedValuesString = `${glCode.glName}=${sortedValues.join('')}`;
          concatenatedValues.push(concatenatedValuesString);
        } else {
          console.error('Checkbox states for GL code are undefined:', glCode);
        }
      });
      if (concatenatedValues.length > 0) {
         allConcatenatedValuesString = concatenatedValues.join(' ,\n');
        console.log('All Concatenated Values:', allConcatenatedValuesString);
      } else {
        console.error('No concatenated values found.');
        alert('No concatenated values found.')
      }
    } else {
      console.error('GL codes are undefined or empty.');
      alert('GL codes are undefined or empty.')
    }
  
    // Send data to the server
    fetch('http://localhost:3001/saveDatadl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: allConcatenatedValuesString }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data); // Output success or error message from the server
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };  */

  const handleGLRowSubmit = () => {
    let allConcatenatedValuesString = '..';
    if (glCodes && glCodes.length > 0) {
      const concatenatedValues = [];
      glCodes.forEach((glCode) => {
        const checkboxStates = checkboxStatesMap[glCode.id];
        if (checkboxStates) {
          const glCodeValues = [];
          const adderValues = []; // Store values with '+' operator
          const reducerValues = []; // Store values with '-' operator
          checkboxStates.forEach(({ adderChecked, reducerChecked }, index) => {
            const header = accountHeaders[index];
            if (header && (adderChecked || reducerChecked)) {
              const operation = adderChecked ? '+' : '-';
              const value = `${operation}${header.glName}`;
              if (adderChecked) {
                adderValues.push(value);
              } else {
                reducerValues.push(value);
              }
            }
          });
          // Concatenate values with '+' operator followed by values with '-' operator
          const sortedValues = adderValues.concat(reducerValues);
          let concatenatedValuesString = `${glCode.glName}=${sortedValues.join('')}`;
          // Remove the first '+' operator after the '=' sign
          concatenatedValuesString = concatenatedValuesString.replace('=+', '=');
          concatenatedValues.push(concatenatedValuesString);
        } else {
          console.error('Checkbox states for GL code are undefined:', glCode);
        }
      });
      if (concatenatedValues.length > 0) {
         allConcatenatedValuesString = concatenatedValues.join(' ,\n');
        console.log('All Concatenated Values:', allConcatenatedValuesString);
      } else {
        console.error('No concatenated values found.');
        alert('No concatenated values found.')
      }
    } else {
      console.error('GL codes are undefined or empty.');
      alert('GL codes are undefined or empty.')
    }
  
    // Send data to the server
    fetch('http://localhost:3001/saveDatadl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: allConcatenatedValuesString }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data); // Output success or error message from the server
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
  

  
  
  
  
  
  
  
  const [editMode, setEditMode] = useState(false); // State to track edit mode
const [editRowIndex, setEditRowIndex] = useState(null); // State to track which row is in edit mode
const editButtonRef = useRef(null); // Ref for the edit button

  // Function to handle clicking on the edit button
  const handleEditButtonClick = (index) => {
    setEditMode(!editMode); // Toggle edit mode
    setEditRowIndex(index); // Set the index of the row in edit mode

    // Focus on the edit button
    if (editButtonRef.current) {
      editButtonRef.current.focus();
    }
  };
  
  return (
    <div className="bg-custom1">
        <Header />
        <div className="container-fluid"> 
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  
  <h2 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'blue', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', margin: 'auto' }}>
    Add GL
  </h2>
 
</div>
        <div style={{ border: '2px solid black', borderRadius: '20px', padding: '22px' }} >  
      <div className="row">
        <div className="col">
       
        
      

  <div className="row justify-content-between">
  <h5><span style={{ marginRight: '40px' }}>Add GL Components</span> <button className="btn btn-primary" onClick={handleAddButtonClick}>Add</button></h5> 

</div>
<Modal show={showDialog} onHide={handleDialogClose}  >
  <Modal.Header >
    <Modal.Title>Add GL Components</Modal.Title>
  </Modal.Header>
  <Modal.Body  >
  
  <div className="dialog"  >
  <label htmlFor="glName" className="fw-bold" style={{ fontSize: '1.1rem', color: '#333', marginBottom: '10px', display: 'block' }}>GL Components:</label>
<input
  type="text"
  value={glName}
  onChange={(e) => setGLName(e.target.value)}
  className="form-control mb-2"
  style={{ borderRadius: '5px', border: '1px solid #ccc', padding: '10px', fontSize: '1rem' }}
  id="glName"
  placeholder="Enter GL Components"
 
  required 
/>

<label htmlFor="glDescription" className="fw-bold" style={{ fontSize: '1.1rem', color: '#333', marginBottom: '10px', display: 'block' }}>GL Components Description:</label>
<input
  type="text"
  value={glDescription}
  onChange={(e) => setGLDescription(e.target.value)}
  className="form-control mb-2"
  style={{ borderRadius: '5px', border: '1px solid #ccc', padding: '10px', fontSize: '1rem' }}
  id="glDescription"
  placeholder="Enter GL Components Description"
  
  required 
/>

             
              <hr/>
              <div  className="d-flex justify-content-center">
                <button className="btn btn-primary mr-2" onClick={handleDialogSubmit}>Submit</button>
                <span style={{ margin: '0 10px' }}></span>
                <button className="btn btn-secondary" onClick={handleDialogClose}>Cancel</button>
              </div>
            </div>
 
 
 



  </Modal.Body>
 
</Modal>
         
          <div>
         <br/>
          

<table className="customer-table">
  <thead className="thead-dark">
    <tr>
      <th style={{ padding: '8px', fontSize: '16px', lineHeight: '1' }}>GL Components</th>
      <th style={{ padding: '8px', fontSize: '16px', lineHeight: '1' }}>GL Components Description</th>
      <th style={{ padding: '8px', fontSize: '16px', lineHeight: '1' }}>Action</th> {/* New column for the delete button */}
    </tr>
  </thead>
  <tbody>
    {glCodes.map((code, index) => (
      <tr key={code.id} onClick={() => handleGLCodeSelect(code.id)} className={selectedGLCodeIndex === code.id ? 'selected' : ''}>
        <style>
          {`
            .selected {
              background-color: red;
            }
          `}
        </style>
        <td style={{ padding: '2px', fontSize: '14px', lineHeight: '0.2' }}>{code.glName}</td>
        <td style={{ padding: '2px', fontSize: '14px', lineHeight: '0.2' }}>{code.glDescription}</td>
        <td style={{ padding: '2px', width:'10px',fontSize: '14px', lineHeight: '0.2' }}>
          <button className="remove-button" onClick={(e) => handleDeleteGLCode(e, code.id)}>
            <FontAwesomeIcon icon={faTrash} className="remove-icon" style={{ fontSize: '15px', color: 'red' }} />
            <span className="hover-text1" style={{ marginLeft: '5px' }}>Delete GL</span>
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>



          </div>
        </div>
       
        <div className="col">
        <div className="row justify-content-between ">
          <h5><span style={{ marginRight: '40px' }}>Account Headers</span><button className="btn btn-primary" onClick={handleAddButtonClick1}>Add</button>             <button className="btn btn-info mb-2" onClick={() => handleEditButtonClick(null)}>
        {editMode ? 'Cancel' : 'Edit'}
      </button></h5>
         
          </div>
          <Modal show={showDialog1} onHide={handleDialogClose1}  >
  <Modal.Header >
    <Modal.Title>Add GL Components</Modal.Title>
  </Modal.Header>
  <Modal.Body  >
  
  <div className="dialog"  >

              <label htmlFor="region" className="fw-bold" style={{ fontSize: '1.1rem', color: '#333', marginBottom: '10px', display: 'block' }}>Account Header Name:</label>        
<input
    type="text"
    value={glName}
    onChange={(e) => setGLName(e.target.value)}
    className="form-control mb-2"
    style={{ borderRadius: '5px', border: '1px solid #ccc', padding: '10px', fontSize: '1rem' }}
    placeholder="Enter Account Header Name"
/>

             
              <hr/>
              <div className="d-flex justify-content-center">
                <button className="btn btn-primary mr-2" onClick={handleDialogSubmit1}>Submit</button>
                <span style={{ margin: '0 10px' }}></span>
                <button className="btn btn-secondary" onClick={handleDialogClose1}>Cancel</button>
              </div>
            </div>
  </Modal.Body>
 
</Modal>
        
          <div className="row mt-3">
            <div className="col">
         {/*   <button className="btn btn-info mb-2" onClick={() => handleEditButtonClick(null)}>
        {editMode ? 'Cancel' : 'Edit'}
          </button> */}
              
              <table className="customer-table">
  <thead className="thead-dark">
    <tr>
      <th style={{ padding: '8px', fontSize: '14px', lineHeight: '1.2' }}>Adder</th>
      <th style={{ padding: '8px', fontSize: '14px', lineHeight: '1.2' }}>subtracter</th>
    </tr>
  </thead>
  <tbody>
    {accountHeaders.map((header, index) => (
      <tr key={index} className={selectedAccountHeaderIndex === index ? 'selected' : ''}>
        <td style={{ padding: '8px', fontSize: '14px', lineHeight: '1.2' }}>
          <input
            type="checkbox"
            checked={checkboxStatesMap[selectedGLCodeIndex]?.[index]?.adderChecked || false}
            onChange={() => handleCheckboxChange(index, 'adder')}
            disabled={selectedGLCodeIndex === null || !editMode}
          />
          {header.glName}
        </td>
        <td style={{ padding: '8px', fontSize: '14px', lineHeight: '1.2' }}>
          <input
            type="checkbox"
            checked={checkboxStatesMap[selectedGLCodeIndex]?.[index]?.reducerChecked || false}
            onChange={() => handleCheckboxChange(index, 'reducer')}
            disabled={selectedGLCodeIndex === null || !editMode}
          />
          {header.glName}
        </td>
      </tr>
    ))}
  </tbody>
</table>

            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className="row justify-content-center mt-3">
  <button className="btn btn-primary" onClick={handleGLRowSubmit}>Submit</button>
</div>
    </div>
    </div>
    </div>
  );
};

export default GLCodeComponent;


