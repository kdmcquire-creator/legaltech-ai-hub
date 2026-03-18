import { Metadata } from "next";
import Link from "next/link";
import { caseStudies, industryColors } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real-world case studies showing how law firms, legal teams, and businesses use AI-powered legal tools to save time and money.",
  alternates: {
    canonical: "/case-studies",
  },
};

export default function CaseStudiesIndexPage() {
  const published = caseStudies.filter((cs) => cs.published);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-blue-600 to-violet-700 py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <span className="inline-block bg-white/20 backdrop-blur text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Real Stories, Real Results
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            How Legal Professionals Are Winning with AI
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            From solo practitioners saving 70% of their review time to litigation firms
            cutting $1.2M in e-discovery costs — these are the stories behind the numbers.
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 max-w-5xl py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">{caseStudies.length}</p>
            <p className="text-gray-500 text-sm">Case Studies</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-emerald-600">8+</p>
            <p className="text-gray-500 text-sm">Industries</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-violet-600">70%</p>
            <p className="text-gray-500 text-sm">Avg. Time Saved</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-amber-600">$1.4M+</p>
            <p className="text-gray-500 text-sm">Total Savings Documented</p>
          </div>
        </div>
      </section>

      {/* Published Case Studies */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {published.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group block border rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <div className={`h-3 bg-gradient-to-r ${cs.color}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${industryColors[cs.industry] || "bg-gray-100 text-gray-700"}`}
                    >
                      {cs.industry}
                    </span>
                    <span className="text-gray-400 text-sm">{cs.date}</span>
                    <span className="text-gray-400 text-sm">{cs.readTime}</span>
                  </div>

                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition mb-2 leading-snug">
                    {cs.title}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {cs.description}
                  </p>

                  {/* Metric highlight */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded">
                      {cs.metric}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cs.tags.map((tag) => (
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
            Have a success story?
          </h2>
          <p className="text-gray-600 mb-6">
            If your firm or team has achieved great results with AI legal tools,
            we&apos;d love to feature your story.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Share Your Story
          </Link>
        </div>
      </section>
    </div>
  );
}
