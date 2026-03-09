import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools, categories } from "@/lib/tools";

type Props = {
  params: { "category-slug": string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categorySlug = params["category-slug"];
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return {
      title: "Category Not Found - LegalTech AI Hub",
    };
  }

  return {
    title: `Best AI Tools for ${category.name} | LegalTech AI Hub`,
    description: `Discover the top AI-powered technology tools for ${category.name.toLowerCase()} in our curated directory.`,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const categorySlug = params["category-slug"];
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter((t) => t.category === categorySlug);

  return (
    <div className="bg-white min-h-screen">
      {/* Category Hero */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-gray-400 hover:text-white transition">
              &larr; All Categories
            </Link>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <h1 className="text-4xl font-extrabold">{category.name} AI Tools</h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl">
            A comprehensive directory of AI solutions designed to streamline {category.name.toLowerCase()} workflows.
          </p>
        </div>
      </section>

      {/* Tools List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {categoryTools.length} Tools Found
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryTools.map((tool) => (
              <div key={tool.slug} className="p-8 border rounded-xl hover:shadow-lg transition-shadow bg-white flex flex-col h-full">
                <h3 className="text-xl font-bold mb-3">{tool.name}</h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tool.features.slice(0, 2).map((feature, idx) => (
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

          {categoryTools.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg italic">
                No tools listed in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
