import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://legaltech-ai-hub.com"; // Replace with actual domain

  const tools = [
    "contract-analyzer",
    "legal-research-assistant",
    "case-management-pro",
    "document-automation-ai",
    "e-discovery-scanner",
    "compliance-risk-checker",
    "intellectual-property-bot",
    "litigation-predictor",
    "notary-verification-tool",
    "legal-chat-assistant",
  ];

  const reviewSlugs = [
    "legalzoom-vs-lawdepot-vs-legalnature",
    "best-ai-contract-review-tools-2026",
    "best-ai-tools-for-solo-practitioners",
    "ai-legal-research-showdown",
    "how-to-choose-ai-contract-analysis-software",
  ];

  const toolEntries = tools.map((tool) => ({
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

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
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
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
