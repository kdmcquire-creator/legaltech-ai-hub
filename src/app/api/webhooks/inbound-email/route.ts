import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { generateReplyDrafts, EmailInput, ReplyDraft } from "@/lib/reply-generator";
import {
  addEmailRecord,
  generateId,
} from "@/lib/email-agent-history";
import { escapeHtml } from "@/lib/sanitize";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Inbound email webhook for SendGrid Inbound Parse.
 * SendGrid posts multipart/form-data with fields: from, to, subject, text, html, etc.
 */
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let from = "";
    let to = "";
    let subject = "";
    let textBody = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      from = (formData.get("from") as string) || "";
      to = (formData.get("to") as string) || "";
      subject = (formData.get("subject") as string) || "";
      textBody = (formData.get("text") as string) || "";
    } else {
      // Fallback: JSON body (for testing or alternative integrations)
      const body = await req.json();
      from = body.from || "";
      to = body.to || "";
      subject = body.subject || "";
      textBody = body.text || body.body || "";
    }

    if (!from || !subject) {
      return NextResponse.json(
        { error: "Missing required fields: from, subject" },
        { status: 400 }
      );
    }

    // Determine email type based on to-address or subject
    const emailType: "contact" | "tool-submission" =
      to.includes("submit") ||
      subject.toLowerCase().includes("tool submission") ||
      subject.toLowerCase().includes("submit a tool")
        ? "tool-submission"
        : "contact";

    const emailInput: EmailInput = {
      from,
      subject,
      body: textBody,
      type: emailType,
    };

    // Generate reply drafts
    let drafts: ReplyDraft[];
    try {
      drafts = await generateReplyDrafts(emailInput);
    } catch (err) {
      console.error("Reply generation failed:", err);
      drafts = [];
    }

    // Store in history
    const recordId = generateId();
    await addEmailRecord({
      id: recordId,
      receivedAt: new Date().toISOString(),
      from,
      to,
      subject,
      bodyPreview: textBody.slice(0, 500),
      type: emailType,
      status: drafts.length > 0 ? "drafts-sent" : "pending",
      drafts,
      updatedAt: new Date().toISOString(),
    });

    // Send draft options to owner via SendGrid
    if (drafts.length > 0) {
      await sendDraftsToOwner(from, subject, textBody, drafts);
    }

    return NextResponse.json({ success: true, id: recordId, draftsCount: drafts.length });
  } catch (error) {
    console.error("Inbound email webhook error:", error);
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
  drafts: ReplyDraft[]
) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error("SENDGRID_API_KEY not set, cannot send drafts to owner");
    return;
  }
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
      <h2 style="color:#1e40af;">Email Agent: Draft Replies Ready</h2>
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
