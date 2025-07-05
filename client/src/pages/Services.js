import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  // Sample services data - this will be replaced with API calls later
  const [services] = useState([
    {
      id: 1,
      title: 'Professional Wedding Photography',
      category: 'Photography',
      vendor: 'Capture Moments Studio',
      rating: 4.9,
      reviews: 127,
      price: '$1,500 - $3,000',
      location: 'New York, NY',
      description: 'Stunning wedding photography that captures your special day with artistic flair and professional quality.',
      features: ['Full day coverage', 'Edited photos', 'Online gallery', 'Print rights'],
      image: '📸'
    },
    {
      id: 2,
      title: 'Gourmet Catering Services',
      category: 'Catering',
      vendor: 'Delicious Delights',
      rating: 4.8,
      reviews: 89,
      price: '$45 - $85 per person',
      location: 'Los Angeles, CA',
      description: 'Exquisite catering services featuring fresh, locally-sourced ingredients and customizable menus.',
      features: ['Custom menus', 'Dietary accommodations', 'Professional staff', 'Setup & cleanup'],
      image: '🍽️'
    },
    {
      id: 3,
      title: 'Live DJ & Entertainment',
      category: 'Entertainment',
      vendor: 'Beat Masters',
      rating: 4.7,
      reviews: 156,
      price: '$800 - $1,500',
      location: 'Chicago, IL',
      description: 'Professional DJ services with state-of-the-art sound systems and extensive music libraries.',
      features: ['Professional equipment', 'Music requests', 'MC services', 'Lighting effects'],
      image: '🎵'
    },
    {
      id: 4,
      title: 'Elegant Venue Rental',
      category: 'Venues',
      vendor: 'Grand Ballroom',
      rating: 4.9,
      reviews: 203,
      price: '$2,000 - $5,000',
      location: 'Miami, FL',
      description: 'Beautiful ballroom venue perfect for weddings, corporate events, and special celebrations.',
      features: ['Capacity 200-500', 'Full kitchen', 'Parking available', 'Event coordination'],
      image: '🏛️'
    },
    {
      id: 5,
      title: 'Floral Design & Decoration',
      category: 'Decoration',
      vendor: 'Bloom & Blossom',
      rating: 4.8,
      reviews: 94,
      price: '$500 - $2,000',
      location: 'Seattle, WA',
      description: 'Creative floral arrangements and event decoration services to transform your venue.',
      features: ['Custom arrangements', 'Venue decoration', 'Bridal bouquets', 'Centerpieces'],
      image: '🌸'
    },
    {
      id: 6,
      title: 'Transportation Services',
      category: 'Transportation',
      vendor: 'Luxury Rides',
      rating: 4.6,
      reviews: 78,
      price: '$200 - $800',
      location: 'Boston, MA',
      description: 'Premium transportation services including luxury cars, limousines, and party buses.',
      features: ['Professional drivers', 'Multiple vehicle types', 'Hourly rates', 'Special occasions'],
      image: '🚗'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  // Get unique categories
  const categories = ['all', ...new Set(services.map(service => service.category))];

  // Filter and sort services
  const filteredServices = services
    .filter(service => {
      const matchesFilter = filter === 'all' || service.category === filter;
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0;
    });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  return (
    <div className="services-page">
      <div className="container">
        {/* Header */}
        <div className="services-header">
          <h1>Professional Event Services</h1>
          <p>Find trusted vendors and service providers for your perfect event</p>
        </div>

        {/* Search and Filter Controls */}
        <div className="services-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search services, vendors, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filter-section">
            <div className="filter-group">
              <label>Category:</label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Add Service Button */}
        <div className="add-service-section">
          <Link to="/add-service" className="btn btn-primary">
            + List Your Service
          </Link>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-image">
                  <div className="service-icon">{service.image}</div>
                  <div className="service-category">{service.category}</div>
                </div>
                
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-vendor">by {service.vendor}</p>
                  
                  <div className="service-rating">
                    <span className="stars">{renderStars(service.rating)}</span>
                    <span className="rating-text">
                      {service.rating} ({service.reviews} reviews)
                    </span>
                  </div>
                  
                  <p className="service-description">{service.description}</p>
                  
                  <div className="service-features">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="feature-tag">
                        ✓ {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="feature-more">
                        +{service.features.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="service-footer">
                    <div className="service-info">
                      <div className="service-price">{service.price}</div>
                      <div className="service-location">📍 {service.location}</div>
                    </div>
                    
                    <div className="service-actions">
                      <Link to={`/services/${service.id}`} className="btn btn-outline">
                        View Details
                      </Link>
                      <button className="btn btn-primary">
                        Contact Vendor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-services">
              <h3>No services found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;

