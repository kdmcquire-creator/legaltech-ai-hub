// ---------------------------------------------------------------------------
// Shared crawler utilities — RSS parsing, scoring, seen-URL management
// ---------------------------------------------------------------------------

import { promises as fs } from "node:fs";
import path from "node:path";
import {
  RSS_FEEDS,
  TRACKED_KEYWORDS,
  SCORING_WEIGHTS,
  RECENCY_HALF_LIFE_HOURS,
  type CrawlerResult,
} from "./crawler-config";
import { scoreWithPreferences } from "./crawler-preferences";

const SEEN_URLS_PATH = path.join(process.cwd(), "crawler-data", "seen-urls.json");

// ---------------------------------------------------------------------------
// Seen-URL persistence
// ---------------------------------------------------------------------------

async function readSeenUrls(): Promise<string[]> {
  try {
    const raw = await fs.readFile(SEEN_URLS_PATH, "utf-8");
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

async function writeSeenUrls(urls: string[]): Promise<void> {
  await fs.mkdir(path.dirname(SEEN_URLS_PATH), { recursive: true });
  // Keep last 5000 to prevent unbounded growth
  const trimmed = urls.slice(-5000);
  await fs.writeFile(SEEN_URLS_PATH, JSON.stringify(trimmed, null, 2), "utf-8");
}

// ---------------------------------------------------------------------------
// RSS Fetching & Parsing
// ---------------------------------------------------------------------------

interface RawItem {
  title: string;
  url: string;
  summary: string;
  source: string;
  publishedAt: string;
}

/**
 * Minimal RSS/Atom XML parser using regex.
 * Works for standard RSS 2.0 and Atom feeds without requiring a heavy dep.
 */
function parseRssXml(xml: string, sourceName: string): RawItem[] {
  const items: RawItem[] = [];

  // Try RSS 2.0 <item> blocks first
  const rssItemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = rssItemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = extractTag(block, "title");
    const link = extractTag(block, "link") || extractGuidPermalink(block);
    const description = extractTag(block, "description");
    const pubDate = extractTag(block, "pubDate");

    if (title && link) {
      items.push({
        title: stripCdata(title),
        url: link.trim(),
        summary: stripHtml(stripCdata(description || "")).slice(0, 500),
        source: sourceName,
        publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      });
    }
  }

  // Fall back to Atom <entry> if no RSS items found
  if (items.length === 0) {
    const atomEntryRegex = /<entry[\s>]([\s\S]*?)<\/entry>/gi;
    while ((match = atomEntryRegex.exec(xml)) !== null) {
      const block = match[1];
      const title = extractTag(block, "title");
      const link = extractAtomLink(block);
      const summary = extractTag(block, "summary") || extractTag(block, "content");
      const updated = extractTag(block, "updated") || extractTag(block, "published");

      if (title && link) {
        items.push({
          title: stripCdata(title),
          url: link.trim(),
          summary: stripHtml(stripCdata(summary || "")).slice(0, 500),
          source: sourceName,
          publishedAt: updated ? new Date(updated).toISOString() : new Date().toISOString(),
        });
      }
    }
  }

  return items;
}

function extractTag(block: string, tag: string): string | null {
  // Match both <tag>...</tag> and <tag ...>...</tag>
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(regex);
  return m ? m[1] : null;
}

function extractGuidPermalink(block: string): string | null {
  const m = block.match(/<guid[^>]*isPermaLink\s*=\s*["']true["'][^>]*>([\s\S]*?)<\/guid>/i);
  return m ? m[1] : null;
}

function extractAtomLink(block: string): string | null {
  const m = block.match(/<link[^>]*href\s*=\s*["']([^"']+)["'][^>]*\/?>/i);
  return m ? m[1] : null;
}

function stripCdata(text: string): string {
  return text.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "").trim();
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

function computeRelevance(text: string): { score: number; matches: string[] } {
  const lower = text.toLowerCase();
  const matches: string[] = [];
  let total = 0;

  for (const kw of TRACKED_KEYWORDS) {
    const kwLower = kw.toLowerCase();
    const idx = lower.indexOf(kwLower);
    if (idx !== -1) {
      matches.push(kw);
      total += 1;
    }
  }

  // Normalise: perfect score at 5+ keyword matches
  const score = Math.min(total / 5, 1);
  return { score, matches };
}

function computeRecency(publishedAt: string): number {
  const ageMs = Date.now() - new Date(publishedAt).getTime();
  const ageHours = Math.max(ageMs / (1000 * 60 * 60), 0);
  // Exponential decay with half-life
  return Math.pow(0.5, ageHours / RECENCY_HALF_LIFE_HOURS);
}

function computeNovelty(url: string, seenUrls: Set<string>): number {
  return seenUrls.has(url) ? 0 : 1;
}

// ---------------------------------------------------------------------------
// Public: run the full crawl pipeline
// ---------------------------------------------------------------------------

export async function runCrawler(): Promise<CrawlerResult[]> {
  const seenUrls = new Set(await readSeenUrls());
  const allItems: RawItem[] = [];

  // Fetch all feeds in parallel
  const feedResults = await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15_000);
      try {
        const res = await fetch(feed.url, {
          signal: controller.signal,
          headers: { "User-Agent": "LegalTechAIHub-Crawler/1.0" },
        });
        if (!res.ok) return [];
        const xml = await res.text();
        return parseRssXml(xml, feed.name).map((item) => ({
          ...item,
          _sourceWeight: feed.weight,
        }));
      } catch {
        console.warn(`[crawler] Failed to fetch ${feed.name}: ${feed.url}`);
        return [];
      } finally {
        clearTimeout(timeout);
      }
    }),
  );

  for (const result of feedResults) {
    if (result.status === "fulfilled") {
      allItems.push(...result.value);
    }
  }

  // Score each item
  const scored: CrawlerResult[] = [];

  for (const item of allItems) {
    const textBlob = `${item.title} ${item.summary}`;
    const { score: relevance, matches } = computeRelevance(textBlob);

    // Skip items with zero relevance from broad sources
    const sourceWeight = (item as RawItem & { _sourceWeight?: number })._sourceWeight ?? 1;
    if (relevance === 0 && sourceWeight < 1) continue;

    const recency = computeRecency(item.publishedAt);
    const novelty = computeNovelty(item.url, seenUrls);

    const rawScore =
      SCORING_WEIGHTS.relevance * relevance +
      SCORING_WEIGHTS.recency * recency +
      SCORING_WEIGHTS.novelty * novelty;

    const weightedScore = rawScore * sourceWeight;

    scored.push({
      title: item.title,
      url: item.url,
      summary: item.summary,
      source: item.source,
      publishedAt: item.publishedAt,
      score: Math.round(weightedScore * 1000) / 1000,
      keywordMatches: matches,
    });
  }

  // Apply preference learning
  const adjusted = await Promise.all(
    scored.map(async (item) => {
      const multiplier = await scoreWithPreferences(item);
      return { ...item, score: Math.round(item.score * multiplier * 1000) / 1000 };
    }),
  );

  // Sort descending and take top results
  adjusted.sort((a, b) => b.score - a.score);
  const top = adjusted.slice(0, 10);

  // Persist seen URLs
  const newSeen = [...Array.from(seenUrls), ...allItems.map((i) => i.url)];
  await writeSeenUrls(Array.from(new Set(newSeen)));

  return top;
}
