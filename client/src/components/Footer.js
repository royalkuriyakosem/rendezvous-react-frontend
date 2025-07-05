import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <h3>Rendezvous</h3>
            <p className="footer-tagline">The Art of the Occasion</p>
            <p className="footer-description">
              Creating unforgettable moments through seamless event planning and management.
            </p>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Services</h4>
          <ul className="footer-links">
            <li><Link to="/services/wedding">Wedding Planning</Link></li>
            <li><Link to="/services/corporate">Corporate Events</Link></li>
            <li><Link to="/services/birthday">Birthday Parties</Link></li>
            <li><Link to="/services/photography">Photography</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <p>📧 info@rendezvous.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>📍 123 Event Street, City, State 12345</p>
          </div>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-container">
          <p>&copy; 2025 Rendezvous. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

