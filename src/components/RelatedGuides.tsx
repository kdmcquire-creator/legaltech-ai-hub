import Link from "next/link";
import { guides, guideTypeLabels, guideTypeColors, type Guide } from "@/lib/guides";

interface RelatedGuidesProps {
  currentSlug: string;
  currentTags: string[];
  maxItems?: number;
}

export default function RelatedGuides({
  currentSlug,
  currentTags,
  maxItems = 3,
}: RelatedGuidesProps) {
  // Score by shared tags, only published
  const scored = guides
    .filter((g) => g.slug !== currentSlug && g.published)
    .map((guide) => {
      let score = 0;
      for (const tag of guide.tags) {
        if (currentTags.includes(tag)) score += 1;
      }
      return { guide, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxItems);

  const related: Guide[] = scored.map((s) => s.guide);

  if (related.length === 0) return null;

  return (
    <section className="mt-10 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Related Guides
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden p-5 hover:shadow-lg hover:border-blue-200 transition-all"
          >
            <div
              className={`h-1.5 w-full bg-gradient-to-r ${guide.color} rounded-t-xl -mt-5 -mx-5 mb-4`}
            />
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${guideTypeColors[guide.type]}`}>
                {guideTypeLabels[guide.type]}
              </span>
              <span className="text-xs text-gray-400">
                {guide.readTime}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition leading-snug">
              {guide.title}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
              {guide.description}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/guides"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View all guides &rarr;
        </Link>
      </div>
    </section>
  );
}
