// ---------------------------------------------------------------------------
// POST /api/admin/crawler/generate — Generate articles from selected items
// ---------------------------------------------------------------------------

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { ArticleDraft } from "@/lib/crawler-config";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are the editorial voice of LegalTech AI Hub — a knowledgeable, opinionated, and slightly irreverent authority on legal technology.

Your writing style:
- Authoritative but accessible. You translate complex legaltech concepts without dumbing them down.
- Opinionated but fair. You have a clear point of view yet acknowledge nuance.
- Dry wit. A well-placed sardonic observation is worth a dozen buzzwords.
- Concise. Every sentence earns its place. No filler, no corporate-speak.
- You write for an audience of legal professionals, in-house counsel, law firm partners, legal ops leaders, and legal technology enthusiasts.

When generating articles:
1. Synthesize the provided news items into engaging, original articles. Do NOT simply rewrite the source text.
2. Add analysis: what does this mean for the legal industry? Who benefits? What are the risks?
3. Include a punchy headline and a one-sentence summary suitable for a newsletter subject line.
4. Suggest placement: "newsletter" for roundup-style pieces, "breaking-news" for major announcements, "case-study" for deep dives, "homepage" for general interest features.

Return valid JSON — an array of article objects with this shape:
{
  "headline": string,
  "body": string (markdown),
  "summary": string (one sentence),
  "placement": "newsletter" | "breaking-news" | "case-study" | "homepage",
  "sourceUrls": string[]
}

Return between 1 and 3 articles depending on how many distinct angles the source material supports.`;

interface NewsItem {
  title: string;
  url: string;
  summary: string;
}

export async function POST(req: NextRequest) {
  // --- Admin auth ---
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // --- Validate Anthropic key ---
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 },
    );
  }

  // --- Parse body ---
  let items: NewsItem[];
  try {
    const body = await req.json();
    items = body.items as NewsItem[];
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Body must include a non-empty `items` array." },
        { status: 400 },
      );
    }
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // --- Call Claude ---
  const client = new Anthropic({ apiKey: anthropicKey });

  const userContent = items
    .map(
      (item, i) =>
        `### Source ${i + 1}\n**Title:** ${item.title}\n**URL:** ${item.url}\n**Summary:** ${item.summary}`,
    )
    .join("\n\n");

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Generate articles from the following ${items.length} news source(s):\n\n${userContent}`,
        },
      ],
    });

    // Extract text from response
    const textBlock = message.content.find((b) => b.type === "text");
    const raw = textBlock?.text ?? "[]";

    // Parse JSON from the response — handle markdown code fences
    const jsonStr = raw.replace(/^```json?\s*/i, "").replace(/\s*```$/i, "").trim();
    let drafts: ArticleDraft[];
    try {
      const parsed = JSON.parse(jsonStr);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      drafts = arr.map((d: Record<string, unknown>) => ({
        headline: String(d.headline || ""),
        body: String(d.body || ""),
        summary: String(d.summary || ""),
        placement: (["newsletter", "breaking-news", "case-study", "homepage"].includes(
          d.placement as string,
        )
          ? d.placement
          : "newsletter") as ArticleDraft["placement"],
        sourceUrls: Array.isArray(d.sourceUrls)
          ? d.sourceUrls.map(String)
          : items.map((i) => i.url),
        generatedAt: new Date().toISOString(),
      }));
    } catch {
      // If Claude didn't return valid JSON, wrap the raw text as a single draft
      drafts = [
        {
          headline: "Generated Article",
          body: raw,
          summary: "Auto-generated article from crawler results.",
          placement: "newsletter",
          sourceUrls: items.map((i) => i.url),
          generatedAt: new Date().toISOString(),
        },
      ];
    }

    return NextResponse.json({ ok: true, drafts });
  } catch (err: unknown) {
    console.error("[crawler/generate]", err);
    return NextResponse.json(
      { error: "Article generation failed", detail: String(err) },
      { status: 500 },
    );
  }
}
