import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools } from "@/lib/tools";
import { reviews } from "@/lib/reviews";
import AdUnit from "@/components/AdUnit";

type Props = {
  params: Promise<{ "tool-name": string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { "tool-name": toolSlug } = await params;
  const tool = tools.find((t) => t.slug === toolSlug);

  if (!tool) {
    return { title: "Tool Not Found - LegalTech AI Hub" };
  }

  return {
    title: `${tool.name} Review & Overview | LegalTech AI Hub`,
    description: tool.description,
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: { title: `${tool.name} - AI Legal Tool`, description: tool.description },
  };
}

export default async function ToolPage({ params }: Props) {
  const { "tool-name": toolSlug } = await params;
  const tool = tools.find((t) => t.slug === toolSlug);

  if (!tool) {
    notFound();
  }

  const linkedReview = tool.reviewSlug
    ? reviews.find((r) => r.slug === tool.reviewSlug)
    : null;

  // For our own free tools, redirect-style CTA
  const isOwn = tool.isOwnTool;
  const ctaUrl = isOwn ? tool.websiteUrl : tool.websiteUrl;
  const ctaLabel = isOwn ? "Use This Tool — Free" : "Visit Website";
  const ctaRel = isOwn ? undefined : "nofollow noopener";
  const ctaTarget = isOwn ? undefined : "_blank";

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${tool.color || "from-gray-700 to-gray-900"} text-white py-16`}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-4">
            <Link href="/tools" className="text-white/60 hover:text-white transition text-sm">
              &larr; All Tools
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur uppercase tracking-wider">
              {tool.category.replace(/-/g, " ")}
            </span>
            {tool.isFree && (
              <span className="bg-emerald-400/30 text-emerald-100 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur">
                Free Tool
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{tool.name}</h1>
          {tool.tagline && (
            <p className="text-xl text-white/80 max-w-3xl mb-6">{tool.tagline}</p>
          )}
          <div className="flex flex-wrap gap-3">
            {ctaUrl && (
              <Link
                href={ctaUrl}
                target={ctaTarget}
                rel={ctaRel}
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block"
              >
                {ctaLabel} &rarr;
              </Link>
            )}
            {linkedReview && (
              <Link
                href={`/reviews/${linkedReview.slug}`}
                className="bg-white/10 text-white border border-white/30 px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition inline-block"
              >
                Read In-Depth Review
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Best For */}
              {tool.bestFor && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
                  <h3 className="font-bold text-blue-900 mb-1">Best For</h3>
                  <p className="text-blue-800">{tool.bestFor}</p>
                </div>
              )}

              {/* Overview */}
              {tool.overview && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">{tool.overview}</p>
                </div>
              )}

              {/* Features */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tool.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                      <span className="text-blue-600 font-bold mt-0.5">&#10003;</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              {tool.useCases && tool.useCases.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Use Cases</h2>
                  <ul className="space-y-3">
                    {tool.useCases.map((uc, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="text-blue-600 font-bold mt-1">&bull;</span>
                        <span>{uc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pros & Cons */}
              {(tool.pros || tool.cons) && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Pros & Cons</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tool.pros && (
                      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
                        <h3 className="font-bold text-emerald-800 mb-3">Pros</h3>
                        <ul className="space-y-2">
                          {tool.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700">
                              <span className="text-emerald-500 mt-0.5">+</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tool.cons && (
                      <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                        <h3 className="font-bold text-red-800 mb-3">Cons</h3>
                        <ul className="space-y-2">
                          {tool.cons.map((con, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700">
                              <span className="text-red-500 mt-0.5">&ndash;</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Linked Review */}
              {linkedReview && (
                <div className="mb-10 border rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">In-Depth Review</h2>
                  <p className="text-gray-600 mb-4">{linkedReview.description}</p>
                  <Link
                    href={`/reviews/${linkedReview.slug}`}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Read full review: {linkedReview.title} &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing card */}
              {tool.pricing && tool.pricing.length > 0 && (
                <div className="bg-gray-50 border rounded-xl p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Pricing</h3>
                  <div className="space-y-4">
                    {tool.pricing.map((tier, idx) => (
                      <div key={idx} className="border-b last:border-b-0 pb-4 last:pb-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="font-semibold text-gray-800">{tier.tier}</span>
                          <span className="font-bold text-gray-900">{tier.price}</span>
                        </div>
                        {tier.note && (
                          <p className="text-gray-500 text-sm">{tier.note}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {ctaUrl && (
                    <Link
                      href={ctaUrl}
                      target={ctaTarget}
                      rel={ctaRel}
                      className="mt-6 block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                    >
                      {ctaLabel} &rarr;
                    </Link>
                  )}

                  {/* Disclosure */}
                  {!isOwn && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg text-xs text-yellow-800">
                      <strong>Disclosure:</strong> This page may contain affiliate
                      links. We may earn a commission at no extra cost to you. See
                      our{" "}
                      <Link href="/disclosure" className="underline">
                        full disclosure
                      </Link>
                      .
                    </div>
                  )}
                </div>
              )}

              {/* Ad Unit */}
              <div className="border rounded-xl p-4 overflow-hidden">
                <AdUnit slot="SLOT_TOOL_SIDEBAR" format="rectangle" />
              </div>

              {/* Quick links */}
              <div className="border rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Links</h3>
                <div className="space-y-2 text-sm">
                  <Link
                    href="/legal-readiness"
                    className="block text-blue-600 hover:underline"
                  >
                    Take the Legal Readiness Assessment (Free)
                  </Link>
                  <Link
                    href="/clause-checker"
                    className="block text-blue-600 hover:underline"
                  >
                    Try the Contract Clause Checker (Free)
                  </Link>
                  <Link
                    href="/reviews"
                    className="block text-blue-600 hover:underline"
                  >
                    Read Reviews & Comparisons
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
