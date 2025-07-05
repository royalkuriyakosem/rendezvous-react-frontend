import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Login successful:', response.data);
      // Store the token in localStorage or a secure storage method
      localStorage.setItem('token', response.data.token);
      // Redirect to dashboard or home page
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="login-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Login to Rendezvous</h1>
          <p className="hero-description">Access your account and manage your events</p>
        </div>
      </section>

      <section className="login-form">
        <div className="container">
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </section>
    </div>
  );
};

export default Login;