import React from 'react';

export default function AdvertisePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Advertise with LegalTech AI Hub</h1>
      <div className="bg-white border rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Featured Listing</h2>
        <p className="text-gray-600 mb-6">Get your tool featured at the top of our directory for 30 days. Increased visibility and traffic from legal professionals.</p>
        <div className="text-3xl font-bold mb-6">$199.00 <span className="text-lg font-normal text-gray-500">/ 30 days</span></div>
        <a 
          href="https://buy.stripe.com/cNi6oI5lU2YNcDOh0D8IU00"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          Purchase Featured Listing
        </a>
      </div>
    </div>
  );
}
