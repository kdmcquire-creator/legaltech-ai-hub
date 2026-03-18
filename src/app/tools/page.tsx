import Link from "next/link";
import { tools, categories } from "@/lib/tools";
import { Metadata } from "next";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "AI Legal Tools Directory",
  description:
    "Browse our curated directory of real AI-powered legal technology tools — including free tools you can use right now.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsDirectory() {
  const freeTools = tools.filter((t) => t.isFree);
  const paidTools = tools.filter((t) => !t.isFree);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 text-gray-900">
            AI Legal Tools Directory
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl">
            Real tools used by real legal professionals. Browse our curated
            directory, try our free tools, and read honest editorial coverage on
            every product.
          </p>
        </div>
      </section>

      {/* Free Tools Banner */}
      {freeTools.length > 0 && (
        <section className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b py-10">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Free Tools — Use Right Now
            </h2>
            <p className="text-gray-600 mb-6">
              Built by LegalTech AI Hub. No signup, no cost, no data collected.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freeTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.websiteUrl || `/tools/${tool.slug}`}
                  className="group bg-white rounded-xl border-2 border-emerald-200 p-6 hover:shadow-lg hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">
                      Free
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {tool.description}
                  </p>
                  <span className="text-emerald-600 font-bold text-sm">
                    Use it now &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ad Unit */}
      <div className="container mx-auto px-4 max-w-5xl py-4">
        <AdUnit slot="SLOT_TOOLS_TOP" format="horizontal" />
      </div>

      {/* Main Directory */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-gray-400">
                Categories
              </h2>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition font-medium text-gray-700"
                  >
                    {cat.icon} {cat.name}
                  </Link>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 text-sm mb-2">
                  Looking for reviews?
                </h3>
                <p className="text-blue-700 text-xs mb-3">
                  Read our in-depth comparisons and buyer guides.
                </p>
                <Link
                  href="/reviews"
                  className="text-blue-600 text-sm font-bold hover:underline"
                >
                  Reviews & Comparisons &rarr;
                </Link>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                All Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paidTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 block group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-blue-600 uppercase">
                        {tool.category.replace(/-/g, " ")}
                      </span>
                      {tool.reviewSlug && (
                        <span className="text-xs font-medium text-gray-400">
                          Reviewed
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
                    {tool.bestFor && (
                      <p className="text-gray-500 text-xs italic mb-2">
                        Best for: {tool.bestFor.split(".")[0]}.
                      </p>
                    )}
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                      {tool.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tool.features.slice(0, 3).map((f, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <span className="text-blue-600 font-bold text-sm">
                      Full Overview &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
