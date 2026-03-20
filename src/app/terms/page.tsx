import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for LegalTech AI Hub — the rules and guidelines governing your use of our website.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-600 via-gray-600 to-zinc-700 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            The rules and guidelines governing your use of LegalTech AI Hub.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
      <p className="mb-8 text-gray-500">Last updated: March 17, 2026</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-700 leading-relaxed">
          By accessing or using LegalTech AI Hub (&quot;the Site&quot;), you
          agree to be bound by these Terms of Service. If you do not agree to
          all of these terms, you may not access or use the Site. We reserve the
          right to update these terms at any time, and your continued use of the
          Site constitutes acceptance of any changes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
        <p className="text-gray-700 leading-relaxed">
          LegalTech AI Hub is an informational directory and review site that
          helps legal professionals discover AI-powered tools. We provide tool
          listings, reviews, comparisons, and educational content. We do not
          provide legal advice, and nothing on this Site should be construed as
          legal counsel.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Use of Content</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          All content on this Site — including text, graphics, logos, and
          reviews — is the property of LegalTech AI Hub or its content suppliers
          and is protected by copyright law. You may not reproduce, distribute,
          or create derivative works from our content without prior written
          permission.
        </p>
        <p className="text-gray-700 leading-relaxed">
          You may share links to our pages and quote brief excerpts for
          non-commercial purposes, provided you attribute LegalTech AI Hub as
          the source.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. User Submissions</h2>
        <p className="text-gray-700 leading-relaxed">
          When you submit a tool listing, contact form message, or any other
          content through the Site, you grant us a non-exclusive, royalty-free
          license to use, display, and distribute that submission in connection
          with the operation of the Site. You represent that you have the right
          to submit such content and that it does not violate any third-party
          rights.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Affiliate Links & Advertising</h2>
        <p className="text-gray-700 leading-relaxed">
          The Site contains affiliate links and advertisements. When you click
          on an affiliate link and make a purchase, we may earn a commission at
          no additional cost to you. Affiliate relationships do not influence our
          editorial content or reviews. For more information, please see our{" "}
          <Link
            href="/disclosure"
            className="text-blue-600 hover:underline font-medium"
          >
            Affiliate Disclosure
          </Link>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
        <p className="text-gray-700 leading-relaxed">
          The Site and its content are provided on an &quot;as is&quot; and
          &quot;as available&quot; basis without warranties of any kind, either
          express or implied. We do not guarantee the accuracy, completeness, or
          timeliness of any information on the Site, including tool descriptions,
          pricing, and feature lists. Tools and services listed on this Site are
          provided by third parties, and we are not responsible for their
          performance, availability, or policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
        <p className="text-gray-700 leading-relaxed">
          To the fullest extent permitted by law, LegalTech AI Hub and its
          operators shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages arising from your use of the Site,
          reliance on any information provided, or any transactions with
          third-party tools or services linked from the Site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Third-Party Links</h2>
        <p className="text-gray-700 leading-relaxed">
          The Site contains links to third-party websites and services. These
          links are provided for your convenience and do not signify our
          endorsement of those sites. We have no control over, and assume no
          responsibility for, the content, privacy policies, or practices of any
          third-party sites.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Prohibited Conduct</h2>
        <p className="text-gray-700 leading-relaxed mb-3">
          You agree not to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Use the Site for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to any part of the Site</li>
          <li>Scrape, crawl, or use automated tools to extract content in bulk without permission</li>
          <li>Submit false or misleading information through any form on the Site</li>
          <li>Interfere with or disrupt the Site or its hosting infrastructure</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
        <p className="text-gray-700 leading-relaxed">
          These Terms shall be governed by and construed in accordance with the
          laws of the United States, without regard to conflict of law
          principles. Any disputes arising under these Terms shall be resolved
          in the courts of competent jurisdiction.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have questions about these Terms, please{" "}
          <Link
            href="/contact"
            className="text-blue-600 hover:underline font-medium"
          >
            contact us
          </Link>
          .
        </p>
      </section>
      </div>
    </div>
  );
}
