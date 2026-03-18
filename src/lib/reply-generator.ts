import Anthropic from "@anthropic-ai/sdk";

export interface EmailInput {
  from: string;
  subject: string;
  body: string;
  type: "contact" | "tool-submission";
}

export interface ReplyDraft {
  tone: string;
  subject: string;
  html: string;
}

const SYSTEM_PROMPT = `You are the email reply assistant for LegalTech AI Hub (legaltech-ai-hub.com).

About LegalTech AI Hub:
- A comprehensive directory of AI-powered legal technology tools and solutions
- Offers honest reviews, free tools (Contract Clause Checker, Document Diff, Argument Gap Analyzer, Legal Readiness Quiz), and practical guides for legal professionals
- Helps lawyers, paralegals, and legal teams discover and compare AI tools
- Contact email: contact@legaltech-ai-hub.com

Your job: generate polished, professional reply drafts to inbound emails. Each reply should be formatted as HTML suitable for email (use <p>, <br>, <strong>, <ul>/<li> tags — no <html>/<body> wrappers). Sign off as "The LegalTech AI Hub Team".

IMPORTANT: Output valid JSON only. No markdown fences, no commentary outside the JSON.`;

function buildUserPrompt(email: EmailInput): string {
  const typeLabel =
    email.type === "tool-submission"
      ? "TOOL SUBMISSION (someone submitted their AI legal tool for listing)"
      : "CONTACT FORM INQUIRY";

  const tones =
    email.type === "tool-submission"
      ? [
          "Professional & concise",
          "Warm & detailed",
          "Quick acknowledgment + follow-up promise",
          "Enthusiastic + specific questions about the tool",
        ]
      : [
          "Professional & concise",
          "Warm & detailed",
          "Quick acknowledgment + follow-up promise",
        ];

  return `Email type: ${typeLabel}
From: ${email.from}
Subject: ${email.subject}

Body:
${email.body}

Generate ${tones.length} reply drafts, one for each tone: ${tones.join(", ")}.

Return a JSON array of objects with keys: "tone" (string), "subject" (string — a suitable Re: subject line), "html" (string — the HTML reply body).`;
}

export async function generateReplyDrafts(
  email: EmailInput
): Promise<ReplyDraft[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserPrompt(email) }],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Anthropic API");
  }

  const raw = textBlock.text.trim();
  // Strip possible markdown code fences
  const cleaned = raw.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");

  const drafts: ReplyDraft[] = JSON.parse(cleaned);

  // Basic validation
  if (!Array.isArray(drafts) || drafts.length === 0) {
    throw new Error("Anthropic API returned invalid drafts structure");
  }

  for (const d of drafts) {
    if (!d.tone || !d.subject || !d.html) {
      throw new Error("Draft missing required fields (tone, subject, html)");
    }
  }

  return drafts;
}
