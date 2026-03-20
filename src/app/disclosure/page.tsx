import React from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "Learn about LegalTech AI Hub's affiliate and advertising relationships and how they may influence our content.",
  alternates: { canonical: "/disclosure" },
  openGraph: {
    title: "Affiliate Disclosure - LegalTech AI Hub",
    description: "Learn about LegalTech AI Hub's affiliate and advertising relationships and how they may influence our content.",
    url: "https://legaltech-ai-hub.com/disclosure",
    siteName: "LegalTech AI Hub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Affiliate Disclosure - LegalTech AI Hub",
    description: "Learn about LegalTech AI Hub's affiliate and advertising relationships.",
  },
};

export default function DisclosurePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-600 via-gray-600 to-zinc-700 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Affiliate & Advertising Disclosure
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Transparency about how we earn revenue and how it does — and doesn&apos;t — influence our editorial content.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
      <p className="mb-4">
        This website is a participant in various affiliate marketing programs, which means we may get paid commissions on products purchased through our links to retailer sites.
      </p>
      <p className="mb-4">
        Our editorial content is not influenced by any commissions we receive. We only recommend products and services that we believe will provide value to our readers.
      </p>
      <p className="mb-4">
        We also display advertisements via Google AdSense and other advertising networks. These advertisements are clearly marked and help support the operation of this website.
      </p>
      <p className="mb-4">
        If you have any questions about our disclosure policy, please feel free to contact us.
      </p>
      </div>
    </div>
  );
}
