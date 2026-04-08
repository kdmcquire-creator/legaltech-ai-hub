import Link from "next/link";
import { reviews, typeLabels, typeColors, type Review } from "@/lib/reviews";

interface RelatedReviewsProps {
  currentSlug: string;
  currentTags: string[];
  maxItems?: number;
}

export default function RelatedReviews({
  currentSlug,
  currentTags,
  maxItems = 3,
}: RelatedReviewsProps) {
  // Score by shared tags
  const scored = reviews
    .filter((r) => r.slug !== currentSlug)
    .map((review) => {
      let score = 0;
      for (const tag of review.tags) {
        if (currentTags.includes(tag)) score += 1;
      }
      return { review, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxItems);

  const related: Review[] = scored.map((s) => s.review);

  if (related.length === 0) return null;

  return (
    <section className="mt-10 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((review) => (
          <Link
            key={review.slug}
            href={`/reviews/${review.slug}`}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden p-5 hover:shadow-lg hover:border-blue-200 transition-all"
          >
            <div
              className={`h-1.5 w-full bg-gradient-to-r ${review.color} rounded-t-xl -mt-5 -mx-5 mb-4`}
            />
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[review.type]}`}>
                {typeLabels[review.type]}
              </span>
              <span className="text-xs text-gray-400">
                {review.readTime}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition leading-snug">
              {review.title}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
              {review.description}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/reviews"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View all reviews &rarr;
        </Link>
      </div>
    </section>
  );
}
