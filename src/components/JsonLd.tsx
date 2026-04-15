import type { LegalTool } from "@/lib/tools";

const BASE_URL = "https://legaltech-ai-hub.com";

// Generic JSON-LD script injector
// Safe: only serializes our own static data objects, never user input
function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Website schema — used on homepage
export function WebSiteJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Legaltech AI Hub",
        url: BASE_URL,
        description:
          "Comprehensive directory of AI-powered legal technology tools and solutions. Honest reviews, free tools, and practical guides for legal professionals.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/tools/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

// Organization schema
export function OrganizationJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Legaltech AI Hub",
        url: BASE_URL,
        logo: `${BASE_URL}/moonsmoke/logo.png`,
        sameAs: [
          "https://www.linkedin.com/company/moonsmoke/",
          "https://twitter.com/MoonsmokeNetwrk",
          "https://www.pinterest.com/moonsmokecontent/",
        ],
      }}
    />
  );
}

// Breadcrumb schema
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

// SoftwareApplication schema for tool pages
export function ToolJsonLd({ tool }: { tool: LegalTool }) {
  const offers = (tool.pricing || []).map((p) => ({
    "@type": "Offer",
    name: p.tier,
    price: p.price === "Free" ? "0" : p.price.replace(/[^0-9.]/g, "") || "0",
    priceCurrency: "USD",
    description: p.note || p.tier,
  }));

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: tool.name,
        description: tool.description,
        url: `${BASE_URL}/tools/${tool.slug}/`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        ...(offers.length > 0
          ? { offers: offers.length === 1 ? offers[0] : offers }
          : {}),
      }}
    />
  );
}

// Article schema for blog/review posts
export function ArticleJsonLd({
  post,
}: {
  post: {
    title: string;
    description: string;
    dateISO?: string;
    author?: string;
    authorSlug?: string;
    slug: string;
    basePath?: string;
  };
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        ...(post.dateISO ? { datePublished: post.dateISO } : {}),
        author: {
          "@type": "Organization",
          name: "The LegalTech AI Hub Editorial Team",
          url: `${BASE_URL}/about/editorial-team/`,
        },
        publisher: {
          "@type": "Organization",
          name: "Legaltech AI Hub",
          url: BASE_URL,
          logo: `${BASE_URL}/moonsmoke/logo.png`,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${BASE_URL}/${post.basePath || "blog"}/${post.slug}/`,
        },
      }}
    />
  );
}

// FAQ schema (rich snippets in Google)
export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  if (faqs.length === 0) return null;
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

// ItemList schema for directory pages
export function ToolDirectoryJsonLd({
  tools,
}: {
  tools: { name: string; slug: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Legaltech AI Tools Directory",
        numberOfItems: tools.length,
        itemListElement: tools.map((tool, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: tool.name,
          url: `${BASE_URL}/tools/${tool.slug}/`,
        })),
      }}
    />
  );
}
