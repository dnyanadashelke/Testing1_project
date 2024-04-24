import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Login.css';
import Dashboard from './Dashboard';
import Header from './Header';
import Footer from './Footer';
import backgroundImage from '../../asset/boy-with-rocket-light.png'; // Import your background image
import logo from '../../asset/favicon.png'; // Import your logo
 
function LoginApp() {
 
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false); // State to track loading state
    const [authError, setAuthError] = useState(false);
    const [title, setTitle] = useState('');
    const originalText = "LMS Login";
    const words = originalText.split(' ');
 
    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
          if (index < words.length) {
              setTitle(prevTitle => prevTitle === '' ? words[index] : prevTitle + ' ' + words[index-1]);
              index++;
          } else {
              clearInterval(interval);
          }
      }, 200); // Adjust the interval as needed
 
      return () => clearInterval(interval); // Cleanup function to clear interval on component unmount
  }, []);
 
 
    const onSubmit = async (data) => {
        const { username, password } = data;
        let lowercaseUsername = username.toLowerCase();
        setLoading(true); 
        if ((lowercaseUsername === 'suhas' || lowercaseUsername === 'pratik.doke@automationedge.com') && password === '123') {
           
            sessionStorage['username'] = lowercaseUsername;
            window.location.href = '/GLCodeComponent'; // Redirecting to the dashboard
        } else {
            setAuthError(true); // Set authentication error
        }
       
        setLoading(false); // Stop loading
    };
 
    const handleCancel = () => {
        reset(); 
    };
 
    return (
        <div>
            <header id="headerContainer" className="Header__header Header__defaultContent blue-background" role="banner">
                <div className="Header__navbar" id="navBar">
                    <div className="Header__container" id="navBarContainer">
                        <div className="Header__logo">
                            <a data-id="portal_linback_url" href="/">
                                <img alt="AutomationEdge" data-id="portal_logo" src="https://contacts.zoho.in/file?ot=8&amp;t=serviceorg&amp;ID=60001911841" aria-label="AutomationEdge home" />
                            </a>
                        </div>
                    </div>
                </div>
            </header>
           
            <div className="container-fluid position-relative">
                <div className="text-center">
                    <h1>Software Asset Management Solution for Creating, Managing and Distributing AutomationEdge Licenses</h1>
                </div>
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-md-6 login-image">
                        <img src={backgroundImage} alt="Login Background" className="img-fluid" />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <div className="card p-4 login-card">
                            <div className="container login-container">
                                <div className="text-container">
                                    <h3 className="text-center mb-4">{title}</h3>
                                </div>
                                {authError && <div className="alert alert-danger mb-3">Incorrect username or password.</div>}
                                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                                <div className="mb-3">
    <label className="form-label">Email ID:</label>
    <input type="text" className={`form-control square-input ${errors.username ? 'is-invalid' : ''}`} {...register('username', { required: 'Username is required' })} />
    {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
</div>
<div className="mb-3">
    <label className="form-label">Password:</label>
    <input type="password" className={`form-control square-input ${errors.password ? 'is-invalid' : ''}`} {...register('password', { required: 'Password is required' })} />
    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
</div>
 
 
                                    <br/>
                                    <div className="text-center">
                                    <div className="text-center">
    <div className="button-container">
        <button type="submit" className="btn btn-primary btn-lg square-button" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Login'}
        </button>
        <button type="button" className="btn btn-secondary btn-lg ml-2 square-button" onClick={handleCancel}>Cancel</button>
    </div>
</div>
 
 
                                    </div>
                                    <div className="text-center mt-4">
                                        {/*<img src={logo} alt="Logo" style={{ width: '200px' }} /> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
 
export default LoginApp;