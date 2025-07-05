import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Services from './pages/Services';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            {/* Placeholder routes for future implementation */}
            <Route path="/login" element={<div className="placeholder-page">Login Page - Coming Soon</div>} />
            <Route path="/register" element={<div className="placeholder-page">Register Page - Coming Soon</div>} />
            <Route path="/dashboard" element={<div className="placeholder-page">Dashboard - Coming Soon</div>} />
            <Route path="/create-event" element={<div className="placeholder-page">Create Event - Coming Soon</div>} />
            <Route path="/add-service" element={<div className="placeholder-page">Add Service - Coming Soon</div>} />
            <Route path="/events/:id" element={<div className="placeholder-page">Event Details - Coming Soon</div>} />
            <Route path="/services/:id" element={<div className="placeholder-page">Service Details - Coming Soon</div>} />
            <Route path="/services/:category" element={<div className="placeholder-page">Service Category - Coming Soon</div>} />
            <Route path="/contact" element={<div className="placeholder-page">Contact - Coming Soon</div>} />
            <Route path="/privacy" element={<div className="placeholder-page">Privacy Policy - Coming Soon</div>} />
            <Route path="/terms" element={<div className="placeholder-page">Terms of Service - Coming Soon</div>} />
            {/* 404 Route */}
            <Route path="*" element={<div className="placeholder-page">404 - Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

