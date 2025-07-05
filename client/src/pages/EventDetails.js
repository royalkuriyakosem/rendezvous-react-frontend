import React from 'react';
import { useParams } from 'react-router-dom';

function EventDetails() {
  const { id } = useParams();

  return (
    <div className="event-details-page">
      <h1>Event Details</h1>
      <p>Event ID: {id}</p>
      {/* Add event details content here */}
    </div>
  );
}

export default EventDetails;