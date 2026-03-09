import { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "AI Legal Tools Directory | LegalTech AI Hub",
  description: "Browse our comprehensive directory of AI-powered legal technology tools. Find the best solutions for your legal practice.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsDirectory() {
  return (
    <div className="bg-white min-h-screen">
      {/* Directory Hero */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-4">All AI Legal Tools</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Explore our complete database of AI solutions for the legal industry. 
            Filtered by category and functionality.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <div key={tool.slug} className="p-8 border rounded-xl hover:shadow-lg transition-shadow bg-white flex flex-col h-full">
                <div className="text-xs font-bold text-blue-600 uppercase mb-2">
                  {tool.category.replace("-", " ")}
                </div>
                <h3 className="text-xl font-bold mb-3">{tool.name}</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tool.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/tools/${tool.slug}`}
                  className="bg-blue-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
