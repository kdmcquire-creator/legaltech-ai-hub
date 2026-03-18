import { Metadata } from "next";
import Link from "next/link";
import { reviews, typeLabels, typeColors } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Reviews & Comparisons",
  description:
    "In-depth reviews, head-to-head comparisons, and buyer guides for AI-powered legal technology tools.",
  alternates: {
    canonical: "/reviews",
  },
};

export default function ReviewsIndexPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block bg-white/20 backdrop-blur text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Unbiased, In-Depth Analysis
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            AI Legal Tool Reviews That Cut Through the Noise
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            We test the tools so you don&apos;t have to guess. Head-to-head comparisons,
            honest verdicts, and buyer guides for every budget and practice size.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b">
        <div className="container mx-auto px-4 max-w-5xl py-4 flex flex-wrap gap-2">
          <span className="bg-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium">
            All
          </span>
          {(["comparison", "review", "guide"] as const).map((type) => (
            <span
              key={type}
              className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 transition cursor-default"
            >
              {typeLabels[type]}s
            </span>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <Link
                key={review.slug}
                href={`/reviews/${review.slug}`}
                className="group block border rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                {/* Colored header bar */}
                <div
                  className={`h-3 bg-gradient-to-r ${review.color}`}
                />
                <div className="p-6">
                  {/* Type badge + date */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeColors[review.type]}`}
                    >
                      {typeLabels[review.type]}
                    </span>
                    <span className="text-gray-400 text-sm">{review.date}</span>
                    <span className="text-gray-400 text-sm">
                      {review.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition mb-2 leading-snug">
                    {review.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {review.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {review.tags.map((tag) => (
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
            Want your tool reviewed?
          </h2>
          <p className="text-gray-600 mb-6">
            If you have built an AI-powered legal tool and want it featured in a
            review or comparison, let us know.
          </p>
          <Link
            href="/submit"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Your Tool
          </Link>
        </div>
      </section>
    </div>
  );
}
