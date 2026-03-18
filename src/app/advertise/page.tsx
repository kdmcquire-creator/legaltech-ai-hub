import React from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertise with Us",
  description: "Explore advertising opportunities on LegalTech AI Hub. Reach legal professionals with featured listings and sponsored placements.",
  alternates: { canonical: "/advertise" },
  openGraph: {
    title: "Advertise with Us - LegalTech AI Hub",
    description: "Explore advertising opportunities on LegalTech AI Hub. Reach legal professionals with featured listings and sponsored placements.",
    url: "https://legaltech-ai-hub.com/advertise",
    siteName: "LegalTech AI Hub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Advertise with Us - LegalTech AI Hub",
    description: "Explore advertising opportunities on LegalTech AI Hub.",
  },
};

export default function AdvertisePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-700 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Advertise with LegalTech AI Hub
          </h1>
          <p className="text-base md:text-lg text-amber-100 max-w-2xl mx-auto">
            Put your product in front of thousands of legal professionals actively researching AI tools for their practice.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto py-12 px-4">
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
    </div>
  );
}
