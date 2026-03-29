import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { reviews, typeLabels, typeColors } from "@/lib/reviews";
import { reviewContent } from "@/lib/review-content";
import AdUnit from "@/components/AdUnit";
import SiteGroundLeaderboard from "@/components/SiteGroundLeaderboard";
import { NordVPNLeaderboard } from "@/components/NordVPNLeaderboard";
import SidebarAmazon from "@/components/SidebarAmazon";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const review = reviews.find((r) => r.slug === slug);

  if (!review) {
    return { title: "Review Not Found" };
  }

  return {
    title: review.title,
    description: review.description,
    alternates: { canonical: `/reviews/${review.slug}` },
    openGraph: {
      title: review.title,
      description: review.description,
    },
  };
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const review = reviews.find((r) => r.slug === slug);

  if (!review) {
    notFound();
  }

  const content = reviewContent[slug];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: review.title,
    description: review.description,
    datePublished: review.date,
    dateModified: review.date,
    author: {
      "@type": "Organization",
      name: "LegalTech AI Hub",
      url: "https://legaltech-ai-hub.com",
    },
    publisher: {
      "@type": "Organization",
      name: "LegalTech AI Hub",
      url: "https://legaltech-ai-hub.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://legaltech-ai-hub.com/reviews/${review.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://legaltech-ai-hub.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Reviews",
        item: "https://legaltech-ai-hub.com/reviews",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: review.title,
        item: `https://legaltech-ai-hub.com/reviews/${review.slug}`,
      },
    ],
  };

  return (
    <article className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero */}
      <section className={`bg-gradient-to-br ${review.color} py-16`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-4">
            <Link
              href="/reviews"
              className="text-white/70 hover:text-white transition text-sm"
            >
              &larr; All Reviews & Comparisons
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur">
              {typeLabels[review.type]}
            </span>
            <span className="text-white/70 text-sm">{review.date}</span>
            <span className="text-white/70 text-sm">{review.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {review.title}
          </h1>
          <p className="text-white/80 text-lg mt-4 max-w-3xl">
            {review.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">

            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Sponsor banner above content */}
              <SiteGroundLeaderboard />

              {content ? (
                content
              ) : (
                <p className="text-gray-500">Full review coming soon.</p>
              )}

              {/* Ad Unit */}
              <div className="my-10">
                <AdUnit slot="SLOT_REVIEW_BOTTOM" format="auto" />
              </div>

              {/* Post-review sponsor */}
              <NordVPNLeaderboard />

              {/* Disclosure */}
              <div className="mt-12 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800">
                <strong>Disclosure:</strong> Some links in this article may be
                affiliate links. We may earn a commission if you sign up through
                them at no extra cost to you. Affiliate relationships never influence
                our editorial content. See our{" "}
                <Link href="/disclosure" className="underline font-medium">
                  full disclosure
                </Link>
                .
              </div>

              {/* Nav */}
              <div className="mt-12 pt-8 border-t flex justify-between items-center">
                <Link href="/reviews" className="text-blue-600 hover:underline font-medium">
                  &larr; Back to Reviews
                </Link>
                <Link href="/tools" className="text-blue-600 hover:underline font-medium">
                  Browse Tools &rarr;
                </Link>
              </div>
            </div>

            {/* Sidebar — sticky */}
            <aside className="mt-12 lg:mt-0">
              <div className="sticky top-6 space-y-6">
                <SidebarAmazon />
              </div>
            </aside>

          </div>
        </div>
      </section>
    </article>
  );
}
