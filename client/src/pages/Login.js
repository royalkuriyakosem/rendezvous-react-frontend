import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
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
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
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
