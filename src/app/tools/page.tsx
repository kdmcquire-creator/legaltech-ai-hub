import Link from "next/link";
import { tools, categories } from "@/lib/tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Legal Tools Directory",
  description: "Browse our comprehensive directory of the best AI-powered legal technology tools.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsDirectory() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">AI Legal Tools Directory</h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl">
          Explore our curated collection of legal technology tools powered by artificial intelligence. 
          Filter by category or browse all tools below.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider text-gray-400">Categories</h2>
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
          </div>

          {/* Tools Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool) => (
                <div key={tool.slug} className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xs font-bold text-blue-600 uppercase mb-2">
                    {tool.category.replace("-", " ")}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{tool.name}</h3>
                  <p className="text-gray-600 mb-6 text-sm line-clamp-3">
                    {tool.description}
                  </p>
                  <Link 
                    href={`/tools/${tool.slug}`} 
                    className="inline-flex items-center text-blue-600 font-bold hover:underline"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
