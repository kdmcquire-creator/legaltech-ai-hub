// ---------------------------------------------------------------------------
// Crawler Configuration — RSS feeds, keywords, scoring weights, and types
// ---------------------------------------------------------------------------

/** RSS feeds to monitor for legal-tech news. */
export const RSS_FEEDS = [
  {
    name: "Artificial Lawyer",
    url: "https://www.artificiallawyer.com/feed/",
    weight: 1.2, // highly relevant source
  },
  {
    name: "Above the Law",
    url: "https://abovethelaw.com/feed/",
    weight: 1.0,
  },
  {
    name: "Law.com Legal Tech",
    url: "https://feeds.feedburner.com/LawcomLegalTechnology",
    weight: 1.1,
  },
  {
    name: "TechCrunch AI",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    weight: 0.8, // broader tech — needs keyword filtering
  },
];

/** Keywords tracked for relevance scoring. */
export const TRACKED_KEYWORDS = [
  "legal technology",
  "AI law",
  "legaltech",
  "legal AI",
  "contract AI",
  "e-discovery AI",
  "legal automation",
  "legal tech",
  "law firm AI",
  "generative AI legal",
  "AI compliance",
  "AI regulation",
  "machine learning legal",
  "legal ops",
  "legal operations",
];

/** Scoring weights — each dimension is 0–1, then combined. */
export const SCORING_WEIGHTS = {
  /** How many tracked keywords appear relative to text length. */
  relevance: 0.50,
  /** How recent the article is (exponential decay). */
  recency: 0.30,
  /** Penalty for items that overlap with previously-seen URLs. */
  novelty: 0.20,
};

/** Half-life for recency scoring in hours. */
export const RECENCY_HALF_LIFE_HOURS = 48;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CrawlerResult {
  title: string;
  url: string;
  summary: string;
  source: string;
  publishedAt: string; // ISO-8601
  score: number;
  keywordMatches: string[];
}

export type ArticlePlacement =
  | "newsletter"
  | "breaking-news"
  | "case-study"
  | "homepage";

export interface ArticleDraft {
  headline: string;
  body: string;
  summary: string;
  placement: ArticlePlacement;
  sourceUrls: string[];
  generatedAt: string; // ISO-8601
}
