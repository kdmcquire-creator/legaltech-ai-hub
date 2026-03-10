import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
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
        <p>If you have any questions about this Privacy Policy, please contact us at contact@aiproductivityhub.co.</p>
      </section>
    </div>
  );
}
