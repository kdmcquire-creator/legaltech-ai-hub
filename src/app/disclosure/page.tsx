import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | LegalTech AI Hub",
  description: "Our commitment to transparency and how we monetize LegalTech AI Hub through affiliate partnerships.",
  alternates: {
    canonical: "/disclosure",
  },
};

export default function DisclosurePage() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Affiliate Disclosure</h1>
        <div className="prose prose-lg text-gray-600">
          <p>
            Transparency is a core value at LegalTech AI Hub. We believe in being upfront about how we maintain and operate this platform for the legal community.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How We Monetize</h2>
          <p>
            LegalTech AI Hub participates in various affiliate marketing programs. This means that when you click on certain links to products or services and subsequently make a purchase, we may receive a small commission from the partner.
          </p>
          <p>
            This comes at <strong>no additional cost to you</strong>. In many cases, our partnerships allow us to provide unique discounts or trials that are not available elsewhere.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Our Integrity</h2>
          <p>
            Our primary goal is to provide value to legal professionals. We only recommend tools and services that we believe provide genuine utility and value to the legal industry. 
          </p>
          <p>
            The presence of an affiliate link does not influence our objective descriptions of the tools. We maintain editorial independence to ensure you get an accurate picture of the technology available.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Why This Model?</h2>
          <p>
            Building and maintaining a comprehensive database of legal technology requires significant resources. Affiliate commissions help cover our hosting costs, research time, and development, allowing us to keep the hub free for all users.
          </p>

          <p className="mt-12 text-sm text-gray-500 italic">
            Last updated: March 9, 2026
          </p>
        </div>
      </div>
    </div>
  );
}
