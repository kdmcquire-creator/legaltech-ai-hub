import { Metadata } from "next";
import Link from "next/link";
import { guides, guideTypeLabels, guideTypeColors } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Practical guides for evaluating, implementing, and getting the most out of AI-powered legal technology tools.",
  alternates: {
    canonical: "/guides",
  },
};

export default function GuidesIndexPage() {
  const published = guides.filter((g) => g.published);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Guides
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Practical, actionable guides for evaluating, buying, and
            implementing AI legal tools — written for legal professionals, not
            tech enthusiasts.
          </p>
        </div>
      </section>

      {/* Type Filters */}
      <section className="border-b">
        <div className="container mx-auto px-4 max-w-5xl py-4 flex flex-wrap gap-2">
          <span className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium">
            All
          </span>
          {(Object.keys(guideTypeLabels) as Array<keyof typeof guideTypeLabels>).map((type) => (
            <span
              key={type}
              className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 transition cursor-default"
            >
              {guideTypeLabels[type]}
            </span>
          ))}
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {published.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group block border rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <div className={`h-3 bg-gradient-to-r ${guide.color}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${guideTypeColors[guide.type]}`}
                    >
                      {guideTypeLabels[guide.type]}
                    </span>
                    <span className="text-gray-400 text-sm">{guide.date}</span>
                    <span className="text-gray-400 text-sm">
                      {guide.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition mb-2 leading-snug">
                    {guide.title}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {guide.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {guide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 border-t py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Need help choosing the right tool?
          </h2>
          <p className="text-gray-600 mb-6">
            Take our free Legal AI Readiness Quiz to find out which AI tools
            are the best fit for your practice.
          </p>
          <Link
            href="/legal-readiness"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
          >
            Take the Free Quiz
          </Link>
        </div>
      </section>
    </div>
  );
}
