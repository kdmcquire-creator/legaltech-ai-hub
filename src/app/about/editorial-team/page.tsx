import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The LegalTech AI Hub Editorial Team",
  description:
    "LegalTech AI Hub is published by Moonsmoke LLC, a solo-founder business based in Austin, Texas. We document what actually works for small businesses and individual professionals.",
  alternates: {
    canonical: "/about/editorial-team/",
  },
  openGraph: {
    title: "The LegalTech AI Hub Editorial Team",
    description:
      "Published by Moonsmoke LLC. Legal ops documented from the small-business seat.",
    type: "website",
    url: "https://legaltech-ai-hub.com/about/editorial-team/",
  },
};

export default function EditorialTeamPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">
            The LegalTech AI Hub Editorial Team
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-sky-100">
            Legal operations documented from the solo-founder seat &mdash; not
            from an enterprise legal team.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-12">
          <div>
            <p className="text-gray-700 leading-relaxed">
              LegalTech AI Hub is part of the Moonsmoke Network. We set up and
              run legal operations for our own small business (Moonsmoke LLC,
              based in Austin, Texas) as solo founders. We document what
              actually works for small businesses and individual professionals,
              not enterprise legal teams.
            </p>
          </div>

          {/* Brand block */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="flex-shrink-0">
              <Image
                src="/moonsmoke/logo.png"
                alt="Moonsmoke LLC logo"
                width={80}
                height={80}
                className="rounded-lg"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-bold text-gray-900 text-lg mb-1">
                Moonsmoke LLC &bull; Austin, Texas
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Publisher of the Moonsmoke Network
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Our other sites: </span>
                <a
                  href="https://aiproductivityhub.co/"
                  className="text-blue-600 font-medium hover:underline"
                >
                  AI Productivity Hub
                </a>
                {" \u00b7 "}
                <a
                  href="https://clarity-engine.ai/"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Clarity Engine
                </a>
                {" \u00b7 "}
                <a
                  href="https://aifinancehub.ai/"
                  className="text-blue-600 font-medium hover:underline"
                >
                  AI Finance Hub
                </a>
              </p>
            </div>
          </div>

          {/* How we work */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Work
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 font-bold mt-0.5">&#8226;</span>
                <span>
                  We use AI tools to help research and draft content. Every
                  article is reviewed and edited by a human before publication.
                  We never publish raw AI output.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 font-bold mt-0.5">&#8226;</span>
                <span>
                  We only recommend tools we&apos;ve actually used. If we
                  haven&apos;t used it, we say so.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 font-bold mt-0.5">&#8226;</span>
                <span>
                  Affiliate disclosures appear on every review. Recommendations
                  are never paid placements.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-blue-600 font-bold mt-0.5">&#8226;</span>
                <span>
                  We update posts when tools change pricing, features, or
                  positioning.
                </span>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Find Us Elsewhere
            </h2>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/company/moonsmoke/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-700 font-semibold px-4 py-2 rounded-lg transition"
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/MoonsmokeNetwrk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-700 font-semibold px-4 py-2 rounded-lg transition"
              >
                X (Twitter)
              </a>
              <a
                href="https://www.pinterest.com/moonsmokecontent/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-700 font-semibold px-4 py-2 rounded-lg transition"
              >
                Pinterest
              </a>
            </div>
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

          {/* Footer links */}
          <div className="border-t border-gray-200 pt-6 flex flex-wrap gap-6 text-sm">
            <Link
              href="/about/editorial-standards/"
              className="text-blue-600 hover:underline font-medium"
            >
              Editorial Standards &rarr;
            </Link>
            <Link
              href="/contact"
              className="text-blue-600 hover:underline font-medium"
            >
              Contact Us &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
