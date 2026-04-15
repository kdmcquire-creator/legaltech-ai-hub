import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Standards",
  description:
    "How LegalTech AI Hub researches, produces, and updates reviews. Our methodology, affiliate disclosures, corrections policy, and YMYL disclaimer.",
  alternates: {
    canonical: "/about/editorial-standards/",
  },
  openGraph: {
    title: "Editorial Standards | LegalTech AI Hub",
    description:
      "How we research, review, and update legal technology software coverage.",
    type: "website",
    url: "https://legaltech-ai-hub.com/about/editorial-standards/",
  },
};

export default function EditorialStandardsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Editorial Standards
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-sky-100">
            How we research, review, and update legal technology coverage.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-10">
          <div>
            <p className="text-gray-700 leading-relaxed">
              LegalTech AI Hub is published by the{" "}
              <Link
                href="/about/editorial-team/"
                className="text-blue-600 font-medium hover:underline"
              >
                LegalTech AI Hub Editorial Team
              </Link>
              , part of the Moonsmoke Network. Here&apos;s how we work.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Research Process
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Hands-on use first. Documentation and vendor claims second.
              Public user reviews third. We set up the legal tech tools we
              cover inside our own small business &mdash; contract review,
              e-signature, document automation, clause checking &mdash; and
              use them on real documents before we form an opinion. We only
              fall back to documentation or marketing claims when hands-on
              testing isn&apos;t possible, and we say so when that&apos;s the
              case.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Content Production
            </h2>
            <p className="text-gray-700 leading-relaxed">
              AI-assisted research and drafting. Human review and editing
              before publication. Fact-checking against primary sources. We
              use AI as a research and drafting aid, but every article passes
              through a human editor. For legal content, we double-check
              citations against the source material and verify pricing and
              feature claims against vendor documentation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Review Methodology
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We evaluate legal tech tools on five dimensions: accuracy on
              real documents, suitability for solo practitioners and small
              firms (not enterprise legal departments), pricing transparency,
              data privacy and security posture, and how well marketing
              claims hold up in practice. We don&apos;t use a proprietary
              scoring system &mdash; we tell you where each tool wins and
              where it falls short for small business use.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Affiliate Disclosure
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We earn commissions on some links. See our{" "}
              <Link
                href="/disclosure"
                className="text-blue-600 font-medium hover:underline"
              >
                affiliate disclosure
              </Link>{" "}
              for details. We only link to products we recommend. Affiliate
              relationships never influence a recommendation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Update Cadence
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We re-review tools on a 90-day rolling schedule. Pricing and
              feature changes trigger immediate updates. When a legal tech
              vendor ships a new AI model, changes data handling, or raises
              prices, we update the relevant posts as soon as we notice.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Corrections Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Found an error?{" "}
              <Link
                href="/contact"
                className="text-blue-600 font-medium hover:underline"
              >
                Contact us
              </Link>
              . We correct errors and note the update date at the top of any
              edited post.
            </p>
          </div>

          {/* YMYL disclaimer */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-lg">
            <p className="text-sm text-amber-900 font-bold mb-1">
              Not legal advice.
            </p>
            <p className="text-sm text-amber-800 leading-relaxed">
              Nothing on this site constitutes legal advice, and no
              attorney-client relationship is formed by reading this content.
              Consult a licensed attorney in your jurisdiction for matters
              requiring legal counsel.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
