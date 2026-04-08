import Link from "next/link";
import { tools, type LegalTool } from "@/lib/tools";

interface RelatedToolsProps {
  currentSlug: string;
  currentCategory: string;
  maxItems?: number;
}

export default function RelatedTools({
  currentSlug,
  currentCategory,
  maxItems = 3,
}: RelatedToolsProps) {
  const sameCat = tools.filter(
    (t) => t.category === currentCategory && t.slug !== currentSlug
  );
  const otherCat = tools.filter(
    (t) => t.category !== currentCategory && t.slug !== currentSlug
  );

  // Prioritize same category, then fill with others
  const related: LegalTool[] = [...sameCat, ...otherCat].slice(0, maxItems);

  if (related.length === 0) return null;

  return (
    <section className="mt-10 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Related Tools
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-blue-200 transition-all"
          >
            {tool.color && (
              <div
                className={`h-1 w-12 rounded-full bg-gradient-to-r ${tool.color} mb-3`}
              />
            )}
            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition text-sm">
              {tool.name}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/tools"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View all tools &rarr;
        </Link>
      </div>
    </section>
  );
}
