import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Events.css';

const Events = () => {
  // Sample events data - this will be replaced with API calls later
  const [events] = useState([
    {
      id: 1,
      title: 'Summer Wedding Celebration',
      date: '2025-08-15',
      location: 'Garden Valley Resort',
      category: 'Wedding',
      description: 'A beautiful outdoor wedding ceremony with garden reception.',
      organizer: 'Sarah Johnson',
      attendees: 150,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Tech Conference 2025',
      date: '2025-09-20',
      location: 'Convention Center',
      category: 'Corporate',
      description: 'Annual technology conference featuring industry leaders.',
      organizer: 'TechCorp Inc.',
      attendees: 500,
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Birthday Bash',
      date: '2025-07-10',
      location: 'Community Hall',
      category: 'Birthday',
      description: 'A fun-filled birthday party with games and entertainment.',
      organizer: 'Mike Davis',
      attendees: 75,
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Art Gallery Opening',
      date: '2025-06-30',
      location: 'Downtown Gallery',
      category: 'Cultural',
      description: 'Grand opening of contemporary art exhibition.',
      organizer: 'Art Society',
      attendees: 200,
      status: 'past'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter events based on category and search term
  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ['all', 'Wedding', 'Corporate', 'Birthday', 'Cultural'];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Wedding': '💒',
      'Corporate': '🏢',
      'Birthday': '🎂',
      'Cultural': '🎨'
    };
    return icons[category] || '🎉';
  };

  return (
    <div className="events-page">
      <div className="container">
        {/* Header */}
        <div className="events-header">
          <h1>Discover Amazing Events</h1>
          <p>Find and join events that match your interests</p>
        </div>

        {/* Search and Filter */}
        <div className="events-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search events by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
              >
                {category === 'all' ? 'All Events' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Create Event Button */}
        <div className="create-event-section">
          <Link to="/create-event" className="btn btn-primary">
            + Create New Event
          </Link>
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div key={event.id} className={`event-card ${event.status}`}>
                <div className="event-header">
                  <div className="event-category">
                    <span className="category-icon">{getCategoryIcon(event.category)}</span>
                    <span className="category-text">{event.category}</span>
                  </div>
                  <div className={`event-status ${event.status}`}>
                    {event.status === 'upcoming' ? '🟢' : '🔴'} {event.status}
                  </div>
                </div>
                
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                
                <div className="event-details">
                  <div className="event-detail">
                    <span className="detail-icon">📅</span>
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="event-detail">
                    <span className="detail-icon">📍</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="event-detail">
                    <span className="detail-icon">👥</span>
                    <span>{event.attendees} attendees</span>
                  </div>
                  <div className="event-detail">
                    <span className="detail-icon">👤</span>
                    <span>by {event.organizer}</span>
                  </div>
                </div>
                
                <div className="event-actions">
                  <Link to={`/events/${event.id}`} className="btn btn-outline">
                    View Details
                  </Link>
                  {event.status === 'upcoming' && (
                    <button className="btn btn-primary">
                      Join Event
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-events">
              <h3>No events found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;

