import React from 'react';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      description: 'Event planning expert with 10+ years of experience',
      icon: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      description: 'Technology leader passionate about seamless user experiences',
      icon: '👨‍💻'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      description: 'Operations specialist ensuring smooth event execution',
      icon: '👩‍🔧'
    },
    {
      name: 'David Kim',
      role: 'Creative Director',
      description: 'Design expert creating memorable event experiences',
      icon: '👨‍🎨'
    }
  ];

  const values = [
    {
      title: 'Excellence',
      description: 'We strive for perfection in every event we help create',
      icon: '⭐'
    },
    {
      title: 'Innovation',
      description: 'Leveraging technology to revolutionize event planning',
      icon: '💡'
    },
    {
      title: 'Trust',
      description: 'Building lasting relationships with our clients and vendors',
      icon: '🤝'
    },
    {
      title: 'Creativity',
      description: 'Bringing unique and memorable experiences to life',
      icon: '🎨'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About Rendezvous</h1>
            <p className="hero-subtitle">The Art of the Occasion</p>
            <p className="hero-description">
              We believe that every occasion deserves to be extraordinary. Rendezvous is more than 
              just an event planning platform – we're your partners in creating unforgettable moments 
              that bring people together.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2023, Rendezvous was born from a simple observation: event planning 
                shouldn't be stressful. Our founders, having experienced the challenges of organizing 
                events firsthand, set out to create a platform that would connect event organizers 
                with trusted service providers seamlessly.
              </p>
              <p>
                What started as a small team with a big vision has grown into a comprehensive platform 
                serving thousands of events across the country. We've helped create magical weddings, 
                successful corporate gatherings, memorable birthday celebrations, and countless other 
                special occasions.
              </p>
              <p>
                Today, Rendezvous continues to evolve, always with one goal in mind: making event 
                planning accessible, enjoyable, and stress-free for everyone involved.
              </p>
            </div>
            <div className="story-image">
              <div className="story-placeholder">
                🎉 Creating Memories Since 2023 🎊
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <h2>Our Mission</h2>
          <div className="mission-content">
            <div className="mission-card">
              <h3>🎯 Our Purpose</h3>
              <p>
                To democratize event planning by connecting people with the resources and expertise 
                they need to create extraordinary experiences.
              </p>
            </div>
            <div className="mission-card">
              <h3>🌟 Our Vision</h3>
              <p>
                To become the world's most trusted platform for event planning, where every occasion 
                becomes a masterpiece of coordination and creativity.
              </p>
            </div>
            <div className="mission-card">
              <h3>💝 Our Promise</h3>
              <p>
                To provide exceptional service, innovative solutions, and unwavering support to make 
                your event planning journey smooth and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <p className="team-intro">
            The passionate individuals behind Rendezvous, dedicated to making your events extraordinary.
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">{member.icon}</div>
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Events Planned</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1,500+</div>
              <div className="stat-label">Trusted Vendors</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Cities Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Create Your Perfect Event?</h2>
            <p>Join the Rendezvous community and discover how easy event planning can be.</p>
            <div className="cta-buttons">
              <a href="/register" className="btn btn-primary">
                Get Started Today
              </a>
              <a href="/contact" className="btn btn-outline">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

