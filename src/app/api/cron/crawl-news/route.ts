// ---------------------------------------------------------------------------
// GET /api/cron/crawl-news — Daily automated crawl + article generation + digest email
// Triggered by Cloudflare Cron or any scheduler with the correct auth header.
// ---------------------------------------------------------------------------

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import sgMail from "@sendgrid/mail";
import { runCrawler } from "@/lib/crawler-utils";
import type { ArticleDraft } from "@/lib/crawler-config";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // --- Auth (cron secret or admin key) ---
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET || process.env.ADMIN_API_KEY;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Run crawler
    const results = await runCrawler();
    if (results.length === 0) {
      return NextResponse.json({ ok: true, message: "No new items found." });
    }

    // 2. Generate articles from top items
    let drafts: ArticleDraft[] = [];
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (anthropicKey) {
      const client = new Anthropic({ apiKey: anthropicKey });

      const userContent = results
        .slice(0, 5) // top 5 for generation
        .map(
          (item, i) =>
            `### Source ${i + 1}\n**Title:** ${item.title}\n**URL:** ${item.url}\n**Summary:** ${item.summary}`,
        )
        .join("\n\n");

      const systemPrompt = `You are the editorial voice of LegalTech AI Hub. Generate 1-3 article drafts from the following news sources. Return valid JSON — an array of objects with: headline, body (markdown), summary (one sentence), placement ("newsletter"|"breaking-news"|"case-study"|"homepage"), sourceUrls (string[]). Be authoritative, concise, with dry wit.`;

      try {
        const message = await client.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          system: systemPrompt,
          messages: [
            {
              role: "user",
              content: `Generate articles from these ${Math.min(results.length, 5)} sources:\n\n${userContent}`,
            },
          ],
        });

        const textBlock = message.content.find((b) => b.type === "text");
        const raw = textBlock?.text ?? "[]";
        const jsonStr = raw.replace(/^```json?\s*/i, "").replace(/\s*```$/i, "").trim();

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
              : [],
            generatedAt: new Date().toISOString(),
          }));
        } catch {
          drafts = [];
        }
      } catch (err) {
        console.error("[cron] Claude generation failed:", err);
      }
    }

    // 3. Send digest email
    const sendgridKey = process.env.SENDGRID_API_KEY;
    const contactTo = process.env.CONTACT_TO_EMAIL || "moonsmoke.contact@gmail.com";

    if (sendgridKey) {
      sgMail.setApiKey(sendgridKey);

      const crawlerSection = results
        .map(
          (r, i) =>
            `${i + 1}. <strong>${escapeHtml(r.title)}</strong> (${escapeHtml(r.source)}, score: ${r.score})<br/><a href="${escapeHtml(r.url)}">${escapeHtml(r.url)}</a><br/>${escapeHtml(r.summary).slice(0, 200)}`,
        )
        .join("<br/><br/>");

      const draftsSection =
        drafts.length > 0
          ? drafts
              .map(
                (d) =>
                  `<h3>${escapeHtml(d.headline)}</h3><p><em>${escapeHtml(d.summary)}</em></p><p>Placement: ${d.placement}</p><hr/>`,
              )
              .join("")
          : "<p><em>No drafts generated (ANTHROPIC_API_KEY may be missing).</em></p>";

      const htmlBody = `
        <h1>Daily LegalTech News Digest</h1>
        <p>Generated on ${new Date().toISOString()}</p>

        <h2>Top Crawler Results</h2>
        <p>${crawlerSection}</p>

        <h2>Generated Article Drafts</h2>
        ${draftsSection}

        <p><a href="https://legaltech-ai-hub.com/admin/crawler">Review in Admin Panel</a></p>
      `;

      try {
        await sgMail.send({
          to: contactTo,
          from: process.env.SENDGRID_FROM_EMAIL || "admin@legaltech-ai-hub.com",
          subject: `[LegalTech AI Hub] Daily News Digest — ${new Date().toLocaleDateString("en-US")}`,
          html: htmlBody,
        });
      } catch (err) {
        console.error("[cron] Email send failed:", err);
      }
    }

    return NextResponse.json({
      ok: true,
      crawlerResults: results.length,
      draftsGenerated: drafts.length,
    });
  } catch (err: unknown) {
    console.error("[cron/crawl-news]", err);
    return NextResponse.json(
      { error: "Cron job failed", detail: String(err) },
      { status: 500 },
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
