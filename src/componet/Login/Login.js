import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Login.css';
import Dashboard from './Dashboard';
import Header from './Header';
import Footer from './Footer'

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false); // State to track loading state
  const [authError, setAuthError] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true); // Set loading to true when submitting the form
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        
      });
     
      const result = await response.json();

      if (result.success) {
        alert(JSON.stringify(result.success));
        window.location.href = './Dashboard';
        console.log('Login Successful');
      } else {
        console.error('Authentication failed:', result.message);
        setAuthError(true); // Set authError to true if authentication fails
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false); // Reset loading to false when request is complete
    }
  };

  return (
    <div className="container-fluid position-relative">
     <Header/>
   
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-4">
          <div className="card p-4 login-card">
            <h3 className="text-center mb-4">Login</h3>
            {authError && <div className="alert alert-danger mb-3">Incorrect username or password.</div>}
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
              <div className="mb-3">
                <label className="form-label">Email ID:</label>
                <input type="text" className={`form-control ${errors.username ? 'is-invalid' : ''}`} {...register('username', { required: 'Username is required' })} />
                {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} {...register('password', { required: 'Password is required' })} />
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
