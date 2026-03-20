import Link from "next/link";
import { tools, categories } from "@/lib/tools";
import { reviews } from "@/lib/reviews";
import { caseStudies } from "@/lib/case-studies";
import { guides } from "@/lib/guides";
import AdUnit from "@/components/AdUnit";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Home() {
  const freeTools = tools.filter((t) => t.isFree);
  const featuredTools = tools.filter((t) => !t.isFree).slice(0, 4);
  const latestReviews = reviews.slice(0, 3);
  const latestCaseStudies = caseStudies.filter((cs) => cs.published).slice(0, 3);
  const latestGuides = guides.filter((g) => g.published).slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 py-14 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 md:mb-6 tracking-tight">
            LegalTech AI Hub
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-3 md:mb-4">
            Discover, compare, and use the best AI-powered legal technology
            tools. Honest reviews, real products, and free tools you can try
            right now.
          </p>
          <p className="text-sm md:text-base text-gray-500 mb-8 md:mb-10 max-w-xl mx-auto">
            Built for solo practitioners, law firms, and in-house teams.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
            <Link
              href="/legal-readiness"
              className="bg-emerald-600 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg font-semibold hover:bg-emerald-700 hover:shadow-lg transition-all text-sm md:text-base"
            >
              Free Legal Readiness Quiz
            </Link>
            <Link
              href="/clause-checker"
              className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all text-sm md:text-base"
            >
              Free Contract Checker
            </Link>
            <Link
              href="/doc-diff"
              className="bg-purple-600 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg font-semibold hover:bg-purple-700 hover:shadow-lg transition-all text-sm md:text-base"
            >
              Free Document Diff Checker
            </Link>
            <Link
              href="/argument-gap"
              className="bg-amber-600 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg font-semibold hover:bg-amber-700 hover:shadow-lg transition-all text-sm md:text-base"
            >
              Free Argument Gap Analyzer
            </Link>
            <Link
              href="/tools"
              className="bg-white border border-gray-300 text-gray-700 px-6 md:px-8 py-3 md:py-3.5 rounded-lg font-semibold hover:bg-gray-50 hover:shadow-lg transition-all text-sm md:text-base"
            >
              Browse All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8 md:mb-10">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Free Tools
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-3">
              Tools You Can Use Right Now
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              No signup, no cost, no data collected. Built by LegalTech AI Hub
              to give legal professionals genuinely useful free resources.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {freeTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.websiteUrl || `/tools/${tool.slug}`}
                className="group bg-white rounded-xl border-2 border-emerald-200 p-6 md:p-8 hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 block"
              >
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-3">
                  {tool.name}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
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
                <span className="text-emerald-600 font-bold group-hover:translate-x-1 inline-block transition-transform">
                  Try it free &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="p-5 md:p-6 border rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 bg-white flex items-center space-x-4 group"
              >
                <span className="text-3xl md:text-4xl">{category.icon}</span>
                <div>
                  <h3 className="text-base md:text-lg font-bold group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm">
                    Explore AI tools for {category.name.toLowerCase()}.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Unit */}
      <div className="container mx-auto px-4 max-w-5xl py-6">
        <AdUnit slot="SLOT_HOME_MID" format="horizontal" />
      </div>

      {/* Featured Tools */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-10 gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Tools</h2>
              <p className="text-sm md:text-base text-gray-600">
                Real products used by legal professionals worldwide.
              </p>
            </div>
            <Link
              href="/tools"
              className="text-blue-600 font-semibold hover:underline text-sm md:text-base"
            >
              View all tools &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block group"
              >
                <div
                  className={`h-28 md:h-32 bg-gradient-to-br ${tool.color || "from-gray-400 to-gray-600"} flex items-center justify-center`}
                >
                  <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wider opacity-80">
                    {tool.category.replace(/-/g, " ")}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-base md:text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm line-clamp-2 mb-2">
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
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-10 gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Latest Reviews</h2>
              <p className="text-sm md:text-base text-gray-600">
                Honest, in-depth comparisons and buyer guides.
              </p>
            </div>
            <Link
              href="/reviews"
              className="text-blue-600 font-semibold hover:underline text-sm md:text-base"
            >
              All reviews &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {latestReviews.map((review) => (
              <Link
                key={review.slug}
                href={`/reviews/${review.slug}`}
                className="group border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block bg-white"
              >
                <div
                  className={`h-2 md:h-3 bg-gradient-to-r ${review.color}`}
                />
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400 text-xs">{review.date}</span>
                    <span className="text-gray-400 text-xs">
                      {review.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug text-sm md:text-base">
                    {review.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm line-clamp-2">
                    {review.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Guides */}
      <section className="bg-emerald-50 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-10 gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Latest Guides</h2>
              <p className="text-sm md:text-base text-gray-600">
                Practical guides for evaluating and implementing AI legal tools.
              </p>
            </div>
            <Link
              href="/guides"
              className="text-blue-600 font-semibold hover:underline text-sm md:text-base"
            >
              All guides &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {latestGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group bg-white border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block"
              >
                <div className={`h-2 md:h-3 bg-gradient-to-r ${guide.color}`} />
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400 text-xs">{guide.date}</span>
                    <span className="text-gray-400 text-xs">
                      {guide.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug text-sm md:text-base">
                    {guide.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm line-clamp-2">
                    {guide.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-10 gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Case Studies</h2>
              <p className="text-sm md:text-base text-gray-600">
                Real results from firms and teams using AI legal tools.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="text-blue-600 font-semibold hover:underline text-sm md:text-base"
            >
              All case studies &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {latestCaseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group border rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block bg-white"
              >
                <div className={`h-2 md:h-3 bg-gradient-to-r ${cs.color}`} />
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded">
                      {cs.metric}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {cs.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug text-sm md:text-base">
                    {cs.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm line-clamp-2">
                    {cs.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup variant="banner" />
    </div>
  );
}
