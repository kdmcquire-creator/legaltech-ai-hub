import { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { guides } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://legaltech-ai-hub.com";

  const toolSlugs = [
    "legal-readiness-assessment",
    "contract-clause-checker",
    "harvey-ai",
    "casetext-cocounsel",
    "ironclad-ai",
    "spellbook",
    "kira-systems",
    "everlaw",
    "luminance",
    "lex-machina",
    "lawgeex",
    "relativity",
    "legalzoom",
    "lawdepot",
    "legalnature",
    "rocket-lawyer",
    "legal-document-diff-checker",
    "legal-argument-gap-analyzer",
  ];

  const reviewSlugs = [
    "legalzoom-vs-lawdepot-vs-legalnature",
    "best-ai-contract-review-tools-2026",
    "best-ai-tools-for-solo-practitioners",
    "ai-legal-research-showdown",
    "how-to-choose-ai-contract-analysis-software",
  ];

  const toolEntries = toolSlugs.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const reviewEntries = reviewSlugs.map((slug) => ({
    url: `${baseUrl}/reviews/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyEntries = caseStudies
    .filter((cs) => cs.published)
    .map((cs) => ({
      url: `${baseUrl}/case-studies/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const guideEntries = guides
    .filter((g) => g.published)
    .map((g) => ({
      url: `${baseUrl}/guides/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/legal-readiness`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/clause-checker`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/doc-diff`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/argument-gap`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...toolEntries,
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...reviewEntries,
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...guideEntries,
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...caseStudyEntries,
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
