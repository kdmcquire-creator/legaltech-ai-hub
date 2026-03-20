import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About LegalTech AI Hub",
  description:
    "LegalTech AI Hub helps legal professionals discover, compare, and evaluate the best AI-powered legal technology tools.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">
            About LegalTech AI Hub
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-sky-100">
            Your go-to resource for discovering and evaluating AI-powered legal
            technology.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-12">
          {/* Mission */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              AI is transforming legal work at an unprecedented pace. New tools
              launch every week, each promising to streamline research, automate
              contracts, or simplify compliance. The problem is not a lack of
              options — it is knowing which ones are actually worth your time.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              LegalTech AI Hub exists to solve that problem. We curate a
              comprehensive directory of AI-powered legal tools and pair it with
              honest, in-depth reviews so legal professionals can make informed
              decisions without the guesswork.
            </p>
          </div>

          {/* What We Do */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-base md:text-lg font-bold mb-2">Tool Directory</h3>
                <p className="text-gray-600 text-sm">
                  A searchable, categorized directory of AI legal tools — from
                  contract analysis and e-discovery to compliance and case
                  management.
                </p>
              </div>
              <div className="border rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-base md:text-lg font-bold mb-2">Reviews &amp; Comparisons</h3>
                <p className="text-gray-600 text-sm">
                  Expert reviews, side-by-side comparisons, and practical
                  breakdowns that cut through the marketing and tell you what
                  actually works.
                </p>
              </div>
              <div className="border rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-base md:text-lg font-bold mb-2">Buyer Guides</h3>
                <p className="text-gray-600 text-sm">
                  Category-specific guides to help solo practitioners, law
                  firms, and in-house teams find the right fit for their budget
                  and workflow.
                </p>
              </div>
              <div className="border rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-base md:text-lg font-bold mb-2">Industry Insights</h3>
                <p className="text-gray-600 text-sm">
                  Coverage of trends, funding rounds, and shifts in the legal AI
                  landscape so you stay ahead of the curve.
                </p>
              </div>
            </div>
          </div>

          {/* Who It's For */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Who It&#39;s For
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 font-bold mt-0.5">&#8226;</span>
                <span>
                  <strong>Solo practitioners and small firms</strong> looking
                  for affordable AI tools that punch above their weight.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 font-bold mt-0.5">&#8226;</span>
                <span>
                  <strong>Mid-size and large law firms</strong> evaluating
                  enterprise solutions for their teams.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 font-bold mt-0.5">&#8226;</span>
                <span>
                  <strong>In-house legal departments</strong> seeking tools to
                  streamline operations and reduce outside counsel spend.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 font-bold mt-0.5">&#8226;</span>
                <span>
                  <strong>Legal tech vendors</strong> who want to get their
                  product in front of the right audience.
                </span>
              </li>
            </ul>
          </div>

          {/* Transparency */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Transparency
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Some of the links on this site are affiliate links, which means we
              may earn a commission if you sign up through them — at no extra
              cost to you. Affiliate relationships never influence our reviews or
              rankings. We recommend tools based on merit, not payouts. For full
              details, see our{" "}
              <Link
                href="/disclosure"
                className="text-blue-600 font-medium hover:underline"
              >
                Affiliate Disclosure
              </Link>
              .
            </p>
          </div>

          {/* CTA */}
          <div className="bg-blue-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Have a tool to submit?
            </h2>
            <p className="text-gray-600 mb-6">
              If you have built or know of an AI-powered legal tool that should
              be listed here, we want to hear about it.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Submit Your Tool
              </Link>
              <Link
                href="/contact"
                className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
