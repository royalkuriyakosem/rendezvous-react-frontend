import React from 'react';
import { useParams } from 'react-router-dom';

function ServiceDetails() {
  const { id } = useParams();

  return (
    <div className="service-details-page">
      <h1>Service Details</h1>
      <p>Service ID: {id}</p>
      {/* Add service details content here */}
    </div>
  );
}

export default ServiceDetails;