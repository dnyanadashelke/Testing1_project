import React from 'react';
import { Link } from "react-router-dom";
import Header from '../Login/Header';
import Footer from '../Login/Footer';

const Dropdown1 = () => {
    const Hospital = 'su'; // Placeholder for Hospital data

    return (
        <div className="bg-custom">
            <Header />
            <div className="container-fluid">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link to="/dashboard" className="btn btn-secondary" style={{ borderRadius: '20px' }}>
                        Back
                    </Link>
                    <h2 className="text-center" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'blue', textShadow: '2px 2px 4px rgba(0,0,0,0.2)', margin: 'auto' }}>
                        Customer
                    </h2>
                </div>
                <br />
                <div style={{ border: '2px solid black', borderRadius: '20px', padding: '20px' }}>
                    <div className="row">
                        <div className="center border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-2">
                                <img className="mt-1" width="5px" src="" alt="" style={{
                                    width: 300,
                                    height: 350,
                                    borderRadius: 140 / 2,
                                    backgroundColor: '#FF6F00',
                                    transform: [
                                        { scaleX: 2 }
                                    ]
                                }} />
                                <span className="font-weight-bold">{Hospital.Hospital_name}</span>
                                <span className="text-black-50">{Hospital.Hospital_name}</span>
                            </div>
                        </div>
                        <div className="center border-right">
                            <div className="d-grid gap-4">
                                <br />
                                <br />
                                <br />
                                <br />
                                <div className='row'>
                                  <div className='col'>
                                <Link to={`/NewCustomerCreation`}>
                                    <button className="btn btn-primary col-4 rounded-pill mt-2" style={{
                                        width: '100%', // Set width to 100% to fill the container
                                        height: 50,
                                        borderRadius: '50px', // Use borderRadius for rounded corners
                                        backgroundColor: '#194D33',
                                        // Remove transform or adjust as needed
                                    }}>Create Customer</button>
                                </Link>
                                </div>
                                <div className='col'>
                                <Link to={`/Show_Customer`}>
                                    <button className="btn btn-danger col-4 ms-3 rounded-pill mt-2" style={{
                                        width: '100%',
                                        height: 50,
                                        borderRadius: '50px',
                                        backgroundColor: '#FCDC00',
                                    }}>Update Customer</button>
                                </Link>
                                </div>
                                </div>
                                <Link to={`/PatientList/${Hospital.id}`}>
                                    <button className="btn btn-danger col-4 rounded-pill mt-2" style={{
                                        width: '100%',
                                        height: 50,
                                        borderRadius: '50px',
                                        backgroundColor: '#0288D1',
                                    }}>Patient List</button>
                                </Link>

                                <Link to={`/Request/${Request.id}`}>
                                    <button className="btn btn-danger col-4 ms-3 rounded-pill mt-2" style={{
                                        width: '100%',
                                        height: 50,
                                        borderRadius: '50px',
                                        backgroundColor: '#FF6F00',
                                    }}>Request Status</button>
                                </Link>

                                <Link to={``}>
                                    <button className="btn btn-danger col-4 ms-3 rounded-pill mt-2 mb-2" style={{
                                        width: '100%',
                                        height: 50,
                                        borderRadius: '50px',
                                        backgroundColor: 'green',
                                    }}>Contact Us</button>
                                </Link>

                                <Link to={``}>
                                    <button className="btn btn-danger col-4 ms-3 rounded-pill mt-2 mb-2" style={{
                                        width: '100%',
                                        height: 50,
                                        borderRadius: '50px',
                                        backgroundColor: '#0288D1',
                                    }}>Logout</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
            <Footer />
        </div>
    )
}

export default Dropdown1;
