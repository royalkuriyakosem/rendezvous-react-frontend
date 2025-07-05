import React from 'react';
import { useParams } from 'react-router-dom';

function ServiceCategory() {
  const { category } = useParams();

  return (
    <div className="service-category-page">
      <h1>Service Category: {category}</h1>
      {/* Add list of services in this category */}
    </div>
  );
}

export default ServiceCategory;