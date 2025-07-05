import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const eventTypes = [
    {
      id: 1,
      title: 'Weddings',
      description: 'Make your special day unforgettable',
      icon: '💒',
      link: '/services/wedding'
    },
    {
      id: 2,
      title: 'Corporate Events',
      description: 'Professional events that impress',
      icon: '🏢',
      link: '/services/corporate'
    },
    {
      id: 3,
      title: 'Birthday Parties',
      description: 'Celebrate life\'s precious moments',
      icon: '🎂',
      link: '/services/birthday'
    },
    {
      id: 4,
      title: 'Photography',
      description: 'Capture memories that last forever',
      icon: '📸',
      link: '/services/photography'
    }
  ];

  const features = [
    {
      title: 'Easy Planning',
      description: 'Streamlined process from concept to execution',
      icon: '📋'
    },
    {
      title: 'Expert Vendors',
      description: 'Curated network of professional service providers',
      icon: '⭐'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock assistance for your events',
      icon: '🕐'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-name">Rendezvous</span>
          </h1>
          <p className="hero-subtitle">The Art of the Occasion</p>
          <p className="hero-description">
            Whether you're booking an event or offering services, Rendezvous makes it easy for everyone! 
            Create unforgettable moments with our comprehensive event planning platform.
          </p>
          <div className="hero-buttons">
            <Link to="/events" className="btn btn-primary">
              Explore Events
            </Link>
            <Link to="/services" className="btn btn-secondary">
              Browse Services
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-placeholder">
            🎉 Event Planning Made Simple 🎊
          </div>
        </div>
      </section>

      {/* Event Types Section */}
      <section className="event-types">
        <div className="container">
          <h2 className="section-title">Popular Event Categories</h2>
          <div className="event-grid">
            {eventTypes.map(event => (
              <Link to={event.link} key={event.id} className="event-card">
                <div className="event-icon">{event.icon}</div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Rendezvous?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Plan Your Next Event?</h2>
            <p>Join thousands of satisfied customers who trust Rendezvous for their special occasions.</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-primary">
                Get Started Today
              </Link>
              <Link to="/about" className="btn btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

