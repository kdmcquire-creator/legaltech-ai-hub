import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, industryColors } from "@/lib/case-studies";
import { caseStudyContent } from "@/lib/case-study-content";
import AdUnit from "@/components/AdUnit";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: cs.title,
    description: cs.description,
    alternates: { canonical: `/case-studies/${cs.slug}` },
    openGraph: {
      title: cs.title,
      description: cs.description,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);

  if (!cs) {
    notFound();
  }

  const content = caseStudyContent[slug];

  return (
    <article className="bg-white min-h-screen">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${cs.color} py-16`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-4">
            <Link
              href="/case-studies"
              className="text-white/70 hover:text-white transition text-sm"
            >
              &larr; All Case Studies
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur">
              {cs.industry}
            </span>
            <span className="text-white/70 text-sm">{cs.date}</span>
            <span className="text-white/70 text-sm">{cs.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {cs.title}
          </h1>
          <p className="text-white/80 text-lg mt-4 max-w-3xl">
            {cs.description}
          </p>
          <div className="mt-6">
            <span className="bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-bold backdrop-blur">
              Key Result: {cs.metric}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {content ? (
            content
          ) : (
            <p className="text-gray-500">Full case study coming soon.</p>
          )}

          {/* Ad Unit */}
          <div className="my-10">
            <AdUnit slot="SLOT_CASESTUDY_BOTTOM" format="auto" />
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
              href="/case-studies"
              className="text-blue-600 hover:underline font-medium"
            >
              &larr; Back to Case Studies
            </Link>
            <Link
              href="/tools"
              className="text-blue-600 hover:underline font-medium"
            >
              Browse Tools &rarr;
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
