import React from 'react';
import { Link } from 'react-router-dom';
import RendezvousAnimation from '../components/RendezvousAnimation';
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
      
          <RendezvousAnimation />
          
          
    </div>
  );
};

export default Home;
