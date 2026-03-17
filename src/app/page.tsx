import Link from "next/link";
import { tools, categories } from "@/lib/tools";
import { reviews } from "@/lib/reviews";

export default function Home() {
  const freeTools = tools.filter((t) => t.isFree);
  const featuredTools = tools.filter((t) => !t.isFree).slice(0, 4);
  const latestReviews = reviews.slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            LegalTech AI Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            Discover, compare, and use the best AI-powered legal technology
            tools. Honest reviews, real products, and free tools you can try
            right now.
          </p>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto">
            Built for solo practitioners, law firms, and in-house teams.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/legal-readiness"
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              Free Legal Readiness Quiz
            </Link>
            <Link
              href="/clause-checker"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Free Contract Checker
            </Link>
            <Link
              href="/tools"
              className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Browse All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section className="py-16 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Free Tools
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-3">
              Tools You Can Use Right Now
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              No signup, no cost, no data collected. Built by LegalTech AI Hub
              to give legal professionals genuinely useful free resources.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {freeTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.websiteUrl || `/tools/${tool.slug}`}
                className="group bg-white rounded-xl border-2 border-emerald-200 p-8 hover:shadow-xl hover:border-emerald-400 transition block"
              >
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition mb-3">
                  {tool.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.features.slice(0, 3).map((f, i) => (
                    <span
                      key={i}
                      className="bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <span className="text-emerald-600 font-bold">
                  Try it free &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-10">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="p-6 border rounded-xl hover:shadow-lg transition-shadow bg-white flex items-center space-x-4"
              >
                <span className="text-4xl">{category.icon}</span>
                <div>
                  <h3 className="text-lg font-bold">{category.name}</h3>
                  <p className="text-gray-500 text-sm">
                    Explore AI tools for {category.name.toLowerCase()}.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold">Featured Tools</h2>
              <p className="text-gray-600">
                Real products used by legal professionals worldwide.
              </p>
            </div>
            <Link
              href="/tools"
              className="text-blue-600 font-semibold hover:underline"
            >
              View all tools &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-lg transition-shadow block group"
              >
                <div
                  className={`h-32 bg-gradient-to-br ${tool.color || "from-gray-400 to-gray-600"} flex items-center justify-center`}
                >
                  <span className="text-white text-sm font-bold uppercase tracking-wider opacity-80">
                    {tool.category.replace(/-/g, " ")}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {tool.description}
                  </p>
                  {tool.isFree ? (
                    <span className="text-emerald-600 font-bold text-xs">
                      Free
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">
                      {tool.pricing?.[0]?.price || "Contact for pricing"}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Reviews */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold">Latest Reviews</h2>
              <p className="text-gray-600">
                Honest, in-depth comparisons and buyer guides.
              </p>
            </div>
            <Link
              href="/reviews"
              className="text-blue-600 font-semibold hover:underline"
            >
              All reviews &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestReviews.map((review) => (
              <Link
                key={review.slug}
                href={`/reviews/${review.slug}`}
                className="group border rounded-xl overflow-hidden hover:shadow-lg transition block"
              >
                <div
                  className={`h-3 bg-gradient-to-r ${review.color}`}
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400 text-xs">{review.date}</span>
                    <span className="text-gray-400 text-xs">
                      {review.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition mb-2 leading-snug">
                    {review.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {review.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
