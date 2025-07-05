import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  return (
    <div className="register-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Join Rendezvous</h1>
          <p className="hero-description">Create an account and start planning your events</p>
        </div>
      </section>

      <section className="register-form">
        <div className="container">
          <form>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </section>
    </div>
  );
};

export default Register;