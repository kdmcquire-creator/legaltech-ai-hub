import { MetadataRoute } from "next";
import { tools, categories } from "@/lib/tools";
import { reviews } from "@/lib/reviews";
import { caseStudies } from "@/lib/case-studies";
import { guides } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://legaltech-ai-hub.com";

  const siteLastUpdated = new Date("2026-04-07");
  const toolEntries = tools.map((t) => ({
    url: `${baseUrl}/tools/${t.slug}`,
    lastModified: siteLastUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const reviewEntries = reviews.map((r) => ({
    url: `${baseUrl}/reviews/${r.slug}`,
    lastModified: new Date(r.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyEntries = caseStudies
    .filter((cs) => cs.published)
    .map((cs) => ({
      url: `${baseUrl}/case-studies/${cs.slug}`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const guideEntries = guides
    .filter((g) => g.published)
    .map((g) => ({
      url: `${baseUrl}/guides/${g.slug}`,
      lastModified: new Date(g.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const categoryEntries = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: siteLastUpdated,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: siteLastUpdated,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: siteLastUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/legal-readiness`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/clause-checker`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/doc-diff`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/argument-gap`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...toolEntries,
    {
      url: `${baseUrl}/reviews`,
      lastModified: siteLastUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...reviewEntries,
    {
      url: `${baseUrl}/guides`,
      lastModified: siteLastUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...guideEntries,
    {
      url: `${baseUrl}/case-studies`,
      lastModified: siteLastUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...caseStudyEntries,
    ...categoryEntries,
    {
      url: `${baseUrl}/glossary`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/advertise`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: siteLastUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: siteLastUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclosure`,
      lastModified: siteLastUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
