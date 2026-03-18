// ---------------------------------------------------------------------------
// Approval Learning System — learns from approve / reject decisions
// ---------------------------------------------------------------------------

import { promises as fs } from "node:fs";
import path from "node:path";
import type { CrawlerResult } from "./crawler-config";

const DATA_PATH = path.join(process.cwd(), "crawler-data", "preferences.json");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PreferenceRecord {
  url: string;
  title: string;
  source: string;
  keywords: string[];
  decision: "approved" | "rejected";
  decidedAt: string; // ISO-8601
}

interface PreferencesFile {
  approved: PreferenceRecord[];
  rejected: PreferenceRecord[];
}

// ---------------------------------------------------------------------------
// Persistence helpers
// ---------------------------------------------------------------------------

async function readPreferences(): Promise<PreferencesFile> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw) as PreferencesFile;
  } catch {
    return { approved: [], rejected: [] };
  }
}

async function writePreferences(data: PreferencesFile): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// ---------------------------------------------------------------------------
// Record a decision
// ---------------------------------------------------------------------------

export async function recordDecision(
  item: { url: string; title: string; source: string; keywords: string[] },
  decision: "approved" | "rejected",
): Promise<void> {
  const prefs = await readPreferences();
  const record: PreferenceRecord = {
    ...item,
    decision,
    decidedAt: new Date().toISOString(),
  };

  if (decision === "approved") {
    prefs.approved.push(record);
  } else {
    prefs.rejected.push(record);
  }

  // Keep last 500 records per bucket to avoid unbounded growth
  prefs.approved = prefs.approved.slice(-500);
  prefs.rejected = prefs.rejected.slice(-500);

  await writePreferences(prefs);
}

// ---------------------------------------------------------------------------
// Preference-based score adjustment
// ---------------------------------------------------------------------------

/**
 * Returns a multiplier in the range [0.5, 1.5].
 *  - 1.0  = neutral (no history or balanced)
 *  - >1.0 = item looks similar to historically approved articles
 *  - <1.0 = item looks similar to historically rejected articles
 */
export async function scoreWithPreferences(
  item: CrawlerResult,
): Promise<number> {
  const prefs = await readPreferences();

  if (prefs.approved.length === 0 && prefs.rejected.length === 0) {
    return 1.0; // no history yet
  }

  const approvedSignal = computeAffinity(item, prefs.approved);
  const rejectedSignal = computeAffinity(item, prefs.rejected);

  // Net signal in [-1, 1] — positive means more like approved content
  const total = approvedSignal + rejectedSignal || 1;
  const net = (approvedSignal - rejectedSignal) / total;

  // Map to [0.5, 1.5]
  return 1.0 + net * 0.5;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function computeAffinity(
  item: CrawlerResult,
  records: PreferenceRecord[],
): number {
  if (records.length === 0) return 0;

  let score = 0;

  for (const rec of records) {
    // Source match — strong signal
    if (extractDomain(item.url) === extractDomain(rec.url)) {
      score += 2;
    }

    // Keyword overlap
    const overlap = item.keywordMatches.filter((kw) =>
      rec.keywords.includes(kw),
    ).length;
    score += overlap;

    // Title word overlap (naive but effective)
    const itemWords = new Set(tokenize(item.title));
    const recWords = tokenize(rec.title);
    const titleOverlap = recWords.filter((w) => itemWords.has(w)).length;
    score += titleOverlap * 0.3;
  }

  // Normalise by record count so volume doesn't dominate
  return score / records.length;
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 3);
}
