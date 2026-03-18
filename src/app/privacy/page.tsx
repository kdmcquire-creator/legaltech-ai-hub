import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn about LegalTech AI Hub's privacy practices, how we collect and use your information, and your rights.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy - LegalTech AI Hub",
    description: "Learn about LegalTech AI Hub's privacy practices, how we collect and use your information, and your rights.",
    url: "https://legaltech-ai-hub.com/privacy",
    siteName: "LegalTech AI Hub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy - LegalTech AI Hub",
    description: "Learn about LegalTech AI Hub's privacy practices.",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-600 via-gray-600 to-zinc-700 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            How we collect, use, and protect your information when you use LegalTech AI Hub.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
      <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p>We collect information that you provide directly to us when you use our website, including when you contact us or sign up for our services.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Cookies</h2>
        <p>We use cookies and similar tracking technologies to track the activity on our service and hold certain information.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at contact@legaltech-ai-hub.com.</p>
      </section>
      </div>
    </div>
  );
}
