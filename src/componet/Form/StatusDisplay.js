import React, { useEffect, useState } from 'react';
import './CreateCustomer.css';
import axios from 'axios';
import Header from '../Login/Header'
import Footer from '../Login/Footer'
import { Link } from 'react-router-dom'
import { FaDownload } from 'react-icons/fa';
import image from '../../asset/img.avif'; // Import your image
import { Alert } from 'react-bootstrap';
axios.defaults.timeout = 36000000;
const StatusDisplay = () => {
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [status, setStatus] = useState('');
  const [str, setStr] = useState(null); // State to store the status
  
  useEffect(() => {
    let isMounted = true; // Flag to track component mount status
    const fetchData = async () => {
      try {
        // Assuming you have correct login and session handling
        const authResponse = await axios.post('http://192.168.10.42:3001/login', { username: 'Suhas', password: 'Suhas@123' });
        const { sessionToken } = authResponse.data;
        // Execute request only if component is still mounted
        if (isMounted) {
         // setLoading(true); // Set loading state to true
          const executionResponse = await axios.post('http://192.168.10.42:3001/execute', null, {
            headers: {
              'Authorization': `Bearer ${sessionToken}` // Assuming token-based authentication
            }
          });
          // Fetch status only if component is still mounted
          if (isMounted) {
            const statusResponse = await axios.get('http://192.168.10.42:3001/statusfile', {
              headers: {
                'Authorization': `Bearer ${sessionToken}`
              }
            });
           
            setStatus(statusResponse.data.status);
           // sessionStorage['createcustomerstatus']=statusResponse.data.status
            alert(statusResponse.data.status)
            setStr(statusResponse.data.status);
           
          }
        }
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        if (isMounted) {
          setLoading(false); // Reset loading state
        }
      }
    };
    fetchData();
    // Cleanup function to update isMounted flag when component unmounts
    return () => {
      isMounted = false;
    };
  }, []);
 

  const handleDownloadClick = async () => {
    try {
      const downloadResponse = await fetch('http://192.168.10.42:3001/download', {
        method: 'GET',
        headers: {
          // Add any additional headers if needed
        },
      });
      if (downloadResponse.ok) {
        // Convert the response to Blob
        const blob = await downloadResponse.blob();
        // Create a URL from the Blob
        const url = window.URL.createObjectURL(blob);
        // Create a temporary <a> element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        // Extract filename from content-disposition header or set a default name
        const contentDisposition = downloadResponse.headers.get('content-disposition');
        const fileName = contentDisposition ? contentDisposition.split('filename=')[1] : 'Status_Report.xlsx';
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        // Clean up: remove the temporary <a> element and revoke the URL
        window.URL.revokeObjectURL(url);
        a.remove();
        console.log('File downloaded successfully');
      } else {
        console.error('Failed to download file');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
 
  
  return (
<div>
<Header/>
<div className={`container-fluid ${loading ? 'blurred' : ''}`} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
<div className="row  " style={{ minHeight: '100vh' }}>
<div className="col-md-3 "> {/* Reduced the size of this column */}
<br/>
<br/>

<br/>
<br/>
            {loading && (
<div className="loader">
<div className="spinner"></div>
</div>
            )}
<Link to="/dashboard" className="btn btn-secondary btn-block mb-8">
              Back
</Link>
</div>
<div className="col-md-4"> {/* Reduced the size of this column */}
<br/>
<br/>
<br/>
<br/>
<button
      className="file-download-box"
      onClick={handleDownloadClick}
      style={{
        backgroundColor: 'red',
        width: '400px', // Increased width
        height: '100px', // Increased height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        borderRadius: '8px', // Increased border radius for rounded corners
        cursor: 'pointer',
        outline: 'none',
        fontSize: '18px', // Increased font size for the text
      }}
>
<span className="download-icon"><FaDownload /></span>
<span className="download-text">Click here to download status report</span>
</button>

</div>
</div>
{str && (
          <Alert variant="success" style={{ position: 'absolute', bottom: '400px', right: '1000px', zIndex: '99999' }}>
            {str}
          </Alert>
        )}
</div>
<Footer/>
</div>
  );
            };  
export default StatusDisplay;