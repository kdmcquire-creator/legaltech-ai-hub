import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, guideTypeLabels, guideTypeColors } from "@/lib/guides";
import { guideContent } from "@/lib/guide-content";
import AdUnit from "@/components/AdUnit";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    return { title: "Guide Not Found" };
  }

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const content = guideContent[slug];

  return (
    <article className="bg-white min-h-screen">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${guide.color} py-16`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-4">
            <Link
              href="/guides"
              className="text-white/70 hover:text-white transition text-sm"
            >
              &larr; All Guides
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur">
              {guideTypeLabels[guide.type]}
            </span>
            <span className="text-white/70 text-sm">{guide.date}</span>
            <span className="text-white/70 text-sm">{guide.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {guide.title}
          </h1>
          <p className="text-white/80 text-lg mt-4 max-w-3xl">
            {guide.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {content ? (
            content
          ) : (
            <p className="text-gray-500">Full guide coming soon.</p>
          )}

          {/* Ad Unit */}
          <div className="my-10">
            <AdUnit slot="SLOT_GUIDE_BOTTOM" format="auto" />
          </div>

          {/* Disclosure */}
          <div className="mt-12 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800">
            <strong>Disclosure:</strong> Some links in this article may be
            affiliate links. We may earn a commission if you sign up through
            them at no extra cost to you. Affiliate relationships never influence
            our editorial content. See our{" "}
            <Link
              href="/disclosure"
              className="underline font-medium"
            >
              full disclosure
            </Link>
            .
          </div>

          {/* Nav */}
          <div className="mt-12 pt-8 border-t flex justify-between items-center">
            <Link
              href="/guides"
              className="text-blue-600 hover:underline font-medium"
            >
              &larr; Back to Guides
            </Link>
            <Link
              href="/reviews"
              className="text-blue-600 hover:underline font-medium"
            >
              Read Reviews &rarr;
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
