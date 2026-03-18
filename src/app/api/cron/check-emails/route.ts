import { NextRequest, NextResponse } from "next/server";
import { readHistory, writeHistory } from "@/lib/email-agent-history";
import { generateReplyDrafts } from "@/lib/reply-generator";
import sgMail from "@sendgrid/mail";
import { escapeHtml } from "@/lib/sanitize";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Cron-based email checker — fallback to the webhook approach.
 * Called 4x/day by Cloudflare Cron Trigger (every 6 hours).
 * Auth: requires CRON_SECRET query param or Authorization header.
 *
 * This route re-processes any "pending" emails in history that
 * didn't get drafts generated (e.g., if Anthropic API was down).
 */
export async function GET(req: NextRequest) {
  // Auth check (cron secret or admin key, via Authorization, x-cron-secret, or query param)
  const cronSecret = process.env.CRON_SECRET;
  const adminKey = process.env.ADMIN_API_KEY;
  const validTokens = [cronSecret, adminKey].filter(Boolean);

  if (validTokens.length === 0) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 500 }
    );
  }

  const providedSecret =
    req.headers.get("authorization")?.replace("Bearer ", "") ||
    req.headers.get("x-cron-secret") ||
    req.nextUrl.searchParams.get("secret");

  if (!providedSecret || !validTokens.includes(providedSecret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const history = await readHistory();
    const pending = history.emails.filter((e) => e.status === "pending");

    if (pending.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No pending emails to process",
        processed: 0,
      });
    }

    let processed = 0;
    let failed = 0;

    for (const record of pending) {
      try {
        const drafts = await generateReplyDrafts({
          from: record.from,
          subject: record.subject,
          body: record.bodyPreview,
          type: record.type,
        });

        record.drafts = drafts;
        record.status = "drafts-sent";
        record.updatedAt = new Date().toISOString();

        // Send drafts to owner
        await sendDraftsToOwner(
          record.from,
          record.subject,
          record.bodyPreview,
          drafts
        );

        processed++;
      } catch (err) {
        console.error(`Failed to process email ${record.id}:`, err);
        failed++;
      }
    }

    await writeHistory(history);

    return NextResponse.json({
      success: true,
      processed,
      failed,
      remainingPending: pending.length - processed,
    });
  } catch (error) {
    console.error("Cron check-emails error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function sendDraftsToOwner(
  originalFrom: string,
  originalSubject: string,
  originalBody: string,
  drafts: { tone: string; subject: string; html: string }[]
) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) return;
  sgMail.setApiKey(apiKey);

  const ownerEmail =
    process.env.CONTACT_TO_EMAIL || "moonsmoke.contact@gmail.com";
  const fromEmail =
    process.env.SENDGRID_FROM_EMAIL || "contact@legaltech-ai-hub.com";

  const safeFrom = escapeHtml(originalFrom);
  const safeSubject = escapeHtml(originalSubject);
  const safeBody = escapeHtml(originalBody).replace(/\n/g, "<br />");

  const draftsHtml = drafts
    .map(
      (draft, i) => `
      <div style="margin-bottom:32px;padding:20px;border:1px solid #d1d5db;border-radius:8px;background:#f9fafb;">
        <h3 style="margin:0 0 8px;color:#1d4ed8;">Option ${i + 1}: ${escapeHtml(draft.tone)}</h3>
        <p style="margin:0 0 4px;font-size:13px;color:#6b7280;"><strong>Subject:</strong> ${escapeHtml(draft.subject)}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:12px 0;" />
        <div style="font-size:14px;line-height:1.6;color:#374151;">${draft.html}</div>
      </div>`
    )
    .join("\n");

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:680px;margin:0 auto;">
      <h2 style="color:#1e40af;">Email Agent (Cron): Draft Replies Ready</h2>
      <p style="color:#6b7280;font-size:14px;">Pick your preferred reply below, copy it, and send it from your email client.</p>
      ${draftsHtml}
      <div style="margin-top:40px;padding:20px;background:#f3f4f6;border-radius:8px;border-left:4px solid #3b82f6;">
        <h3 style="margin:0 0 8px;color:#374151;">Original Email</h3>
        <p style="margin:0 0 4px;font-size:13px;color:#6b7280;"><strong>From:</strong> ${safeFrom}</p>
        <p style="margin:0 0 4px;font-size:13px;color:#6b7280;"><strong>Subject:</strong> ${safeSubject}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:12px 0;" />
        <div style="font-size:13px;color:#4b5563;">${safeBody}</div>
      </div>
    </div>`;

  await sgMail.send({
    to: ownerEmail,
    from: fromEmail,
    subject: `[Agent Drafts] Re: ${originalSubject}`,
    html,
    text: `Draft replies generated for email from ${originalFrom}. View in HTML email client.`,
  });
}
