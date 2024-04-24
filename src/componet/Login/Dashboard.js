import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import Dashboard.css file
import Header from './Header';
import Footer from './Footer';
const text = {
    color: 'black' ,// Change 'black' to any color you desire
    textDecoration: 'none' ,
    textAlign: 'center', // Centers the text
   
    fontWeight: 'bold' 

  };
  

const Dashboard = () => {
    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      };
    
      const cardHeaderStyle = {
        backgroundColor: '#f0f0f0',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px'
      };
    
      const iconStyle = {
        marginRight: '10px'
      };
    
      const textStyle = {
        color: 'black',
        textDecoration: 'none',
      //  textAlign: 'center',
        fontWeight: 'bold'
      };
    
    return (
        <div>
            <Header/>
            <div className="container-fluid bg-custom " > {/* Use container-fluid for full width */}
            <h1 className="label-control text-center m-12 fw-bold move-left-to-right" style={{ color: 'black', fontSize: '2rem' }}>License Management System</h1>
                <br/>
               
                
                    <br/>
                    <div className="row mt-40 justify-content-center"> {/* Adjust the column size and add offset */}
                        <div className="card-group" >
                        <div>
                                <br/>
                            </div>
                      {/*  <div className="card-wrap ms--6" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                <div className="card-header two" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                    <i className="fas fa-user-plus"></i>
                                    <Link to={"/create-customer"}  style={text}><h4>Customer Creation Request</h4></Link>
                                </div>
                                <div className="card-content">
                                 
                                <Link to={"/create-customer"}  style={text}>  <h6>Send an approval request to the respective person for creating a new customer account in LMS</h6></Link>
                                   
                                </div>
                            </div>
  <div className="card-wrap ms-5" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                <div className="card-header one" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                    <i className="fas fa-list"></i>
                                    <Link to={"/customer-request"} style={text}><h4>Create Customer</h4></Link>
                                </div>
                                <div className="card-content">
                                <Link to={"/customer-request"} style={text}><h6>Create a customer account and generate a customer license in LMS</h6></Link>
                                  
                                </div>
                               
    </div>   */}
 <Link to={"/NewPartnerCreation"} style={text} > 
 <div className="card-wrap ms-5" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                <div className="card-header five" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                    <i className="fas fa-list"></i>
                                    <Link to={"/NewPartnerCreation"} style={text}><h4 >Create Partner</h4></Link>
                                </div>
                                <div className="card-content">
                                <Link to={"/NewPartnerCreation"} style={text}><h6>This process will add the Partner details into a database</h6></Link>
                                 
                                </div>
                               
                               
                            </div>  
                            </Link>
                            <span style={{ margin: '0 -33px' }}></span>
                            <Link to={"/NewCustomerCreation"} style={text}>                      
                            <div className="card-wrap ms-5" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                <div className="card-header one" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                    <i className="fas fa-list"></i>
                                    <Link to={"/NewCustomerCreation"} style={text}><h4>Create Customer</h4></Link>
                                </div>
                                <div className="card-content">
                                <Link to={"/NewCustomerCreation"} style={text}><h6>This process will add the customer details into a database</h6></Link>
                                  
                                </div>
                                
                            </div>  
                            </Link>
                            <Link to={"/NewPoCreation"}  style={text}>
                            <div className="card-wrap ms--6" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                <div className="card-header two" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                    <i className="fas fa-user-plus"></i>
                                    <Link to={"/NewPoCreation"}  style={text}><h4>Create Sales Order</h4></Link>
                                   
                                </div>
                                <div className="card-content">
                                 
                                <Link to={"/NewPoCreation"}  style={text}>  <h6 style={{  height:'60px'}}>This process will create sales order </h6></Link>
                                   
                                </div>
                            </div>
                            </Link>
                            <Link to={"/Show_Customer"}  style={text}>
                            <div className="card-wrap ms--6" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                <div className="card-header seven" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                    <i className="fas fa-user-plus"></i>
                                    <Link to={"/Show_Customer"}  style={text}><h4 >Update Customer</h4></Link>
                                </div>
                                <div className="card-content">
                                 
                                <Link to={"/Show_Customer"}  style={text}>  <h6 style={{  height:'60px'}}>This process will Update Customer</h6></Link>
                                   
                                </div>
                            </div>
                            </Link>
                            <Link to={"/Show_Partner"}  style={text}>  
                            <div className="card-wrap ms--6" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                <div className="card-header six" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                    <i className="fas fa-user-plus"></i>
                                    <Link to={"/Show_Partner"}  style={text}><h4>Update Partner</h4></Link>
                                </div>
                                <div className="card-content">
                                 
                                <Link to={"/Show_Partner"}  style={text}>  <h6  style={{  height:'60px'}}>This process will Update Partner</h6></Link>
                                   
                                </div>
                            </div>
                            </Link>
                            
                        </div>
                    </div>
              
                
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="row mt-40 justify-content-center"> {/* Adjust the column size and add offset */}
                        <div className="card-group" >
                        <div>
                                <br/>
                            </div>
                            
                            <Link to={"/show_Customer_SPOC"} style={text}>                 
  <div className="card-wrap ms-5" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                <div className="card-header five" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                    <i className="fas fa-list"></i>
                                    <Link to={"/show_Customer_SPOC"} style={text}><h4>Customer SPOC Master</h4></Link>
                                </div>
                                <div className="card-content">
                                <Link to={"/show_Customer_SPOC"} style={text}><h6>This process will Update Customer SPOC</h6></Link>
                                  
                                </div>
                               
                            </div> 
                            </Link>

                            <span style={{ margin: '0 -33px' }}></span>
                            <Link to={"/Customer_spoc"} style={text}>  
                            <div className="card-wrap ms-5" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                <div className="card-header one" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                    <i className="fas fa-list"></i>
                                    <Link to={"/Customer_spoc"} style={text}><h4>Customer AE SPOC Master</h4></Link>
                                </div>
                                <div className="card-content">
                                <Link to={"/Customer_spoc"} style={text}><h6>This process will Update Customer AE SPOC</h6></Link>
                                  
                                </div>
                               
                            </div>  </Link>

                            <Link to={"/show_Partner_SPOC"}  style={text}>
                            <div className="card-wrap ms--6" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                <div className="card-header two" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                    <i className="fas fa-user-plus"></i>
                                    <Link to={"/show_Partner_SPOC"}  style={text}><h4>Partner SPOC Master</h4></Link>
                                </div>
                                <div className="card-content">
                                 
                                <Link to={"/show_Partner_SPOC"}  style={text}>  <h6>This process will Update Partner SPOC</h6></Link>
                                   
                                </div>
                            </div></Link>
                            <Link to={"/show_Partner_AESPOC"}  style={text}>
                            <div className="card-wrap ms--6" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                <div className="card-header seven" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                    <i className="fas fa-user-plus"></i>
                                    <Link to={"/show_Partner_AESPOC"}  style={text}><h4>Partner AE SPOC Master</h4></Link>
                                </div>
                                <div className="card-content">
                                 
                                <Link to={"/show_Partner_AESPOC"}  style={text}>  <h6>This process will Update Partner AE SPOC</h6></Link>
                                   
                                </div>
                            </div></Link>
                           
                            <Link to={"/PO_Dashboard"}  style={text}>
                            <div className="card-wrap ms--6" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                <div className="card-header six" style={{ border: '2px solid black',borderRadius: '20px' , padding: '20px' }}>
                                    <i className="fas fa-user-plus"></i>
                                    <Link to={"/PO_Dashboard"}  style={text}><h4>PO Dashboard</h4></Link>
                                </div>
                                <div className="card-content">
                                 
                                <Link to={"/PO_Dashboard"}  style={text}>  <h6>This process will Show PO Dashboard</h6></Link>
                                   
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                    
               

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div >
                    <br/>
                    <br/>
                    
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Dashboard;
