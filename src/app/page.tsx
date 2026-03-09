import Link from "next/link";
import { tools, categories } from "@/lib/tools";

export default function Home() {
  const latestTools = tools.slice(0, 4);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            LegalTech AI Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Discover and compare the best AI-powered legal technology tools. 
            From contract analysis to legal research, we help you find the right solution.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/tools" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Browse Tools
            </Link>
            <Link 
              href="/submit" 
              className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Submit a Tool
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.slug} 
                href={`/categories/${category.slug}`}
                className="p-8 border rounded-xl hover:shadow-lg transition-shadow bg-white flex items-center space-x-4"
              >
                <span className="text-4xl">{category.icon}</span>
                <div>
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-gray-500">Explore AI tools for {category.name.toLowerCase()}.</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Tools Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold">Latest AI Tools</h2>
              <p className="text-gray-600">The most recent additions to our platform.</p>
            </div>
            <Link href="/tools" className="text-blue-600 font-semibold hover:underline">
              View all tools &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestTools.map((tool) => (
              <div key={tool.slug} className="bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-200"></div>
                <div className="p-4">
                  <div className="text-xs font-bold text-blue-600 uppercase mb-1">
                    {tool.category.replace("-", " ")}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{tool.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {tool.description}
                  </p>
                  <Link href={`/tools/${tool.slug}`} className="text-blue-600 text-sm font-bold hover:underline">
                    Learn more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
