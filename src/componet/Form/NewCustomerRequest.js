// Login.js

import React, { useState } from 'react';
import './Login.css';
import Footer from '../Login/Footer';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(false);

  const onSubmit = async (data) => {
    const { username, password } = data;
    setLoading(true);

    // Simulate authentication logic
    if ((username === 'suhas' || username === 'pratik.doke@automationedge.com') && password === '123') {
      sessionStorage['username'] = username;
      window.location.href = '/dashboard';
    } else {
      setAuthError(true);
    }

    setLoading(false);
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="login-page">
      <header className="header-container blue-background">
        <div className="navbar">
          <div className="container">
            <div className="logo">
              <img
                src="https://contacts.zoho.in/file?ot=8&t=serviceorg&ID=60001911841"
                alt="AutomationEdge"
                aria-label="AutomationEdge home"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="login-container">
        <div className="login-content">
          <h1>Welcome to AutomationEdge</h1>
          <p>Software Asset Management Solution for Creating, Managing, and Distributing AutomationEdge Licenses</p>
          {authError && <div className="alert alert-danger mb-3">Incorrect username or password.</div>}
          <form onSubmit={handleSubmit(onSubmit)} className="login-form" >
            <h2>LMS Login</h2>
            <br/>
            <div className="form-group">
              <label>Email ID:</label>
              <input type="text" className={`form-control ${errors.username ? 'is-invalid' : ''}`} {...register('username', { required: 'Username is required' })}  style={{ border: '2px solid black', borderRadius: '10px', padding: '10px' }}/>
              {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} {...register('password', { required: 'Password is required' })}  style={{ border: '2px solid black', borderRadius: '10px', padding: '10px' }} />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>
            <div className="button-container">
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Login'}
              </button>
              <span style={{ margin: '0 10px' }}></span>
              <button type="button" className="btn btn-secondary btn-lg ml-2" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>

    
    </div>
  );
};

export default Login
