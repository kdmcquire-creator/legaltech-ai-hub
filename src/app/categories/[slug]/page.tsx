import Link from "next/link";
import { tools, categories } from "@/lib/tools";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `Best AI Tools for ${category.name}`,
    description: `Discover the top AI-powered legal technology tools for ${category.name.toLowerCase()}.`,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter((t) => t.category === category.slug);

  return (
    <div className="bg-white min-h-screen">
      {/* Category Hero */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Link href="/tools" className="text-gray-400 hover:text-white transition">
              &larr; All Categories
            </Link>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <h1 className="text-4xl font-extrabold">{category.name} AI Tools</h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl">
            Streamline your legal workflow with the best artificial intelligence solutions for {category.name.toLowerCase()}.
          </p>
        </div>
      </section>

      {/* Tools Listing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryTools.map((tool) => (
              <div key={tool.slug} className="bg-white rounded-xl border p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold mb-4">{tool.name}</h3>
                <p className="text-gray-600 mb-8 line-clamp-3">
                  {tool.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {tool.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded uppercase">
                      {f}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/tools/${tool.slug}`} 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition inline-block text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          {categoryTools.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
              <p className="text-gray-500 text-lg">No tools found in this category yet.</p>
              <Link href="/submit" className="text-blue-600 font-bold hover:underline mt-2 inline-block">
                Suggest a tool &rarr;
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
