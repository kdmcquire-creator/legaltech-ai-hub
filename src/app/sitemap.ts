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

  const toolEntries = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...toolEntries,
  ];
}
