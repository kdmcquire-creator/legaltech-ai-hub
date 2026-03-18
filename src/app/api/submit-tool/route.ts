import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { escapeHtml, isValidHttpUrl, isNonEmptyString } from "@/lib/sanitize";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // --- Rate limiting (5 requests per IP per minute) ---
  const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(ip, { maxRequests: 5, windowMs: 60_000 })) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // --- Parse body safely ---
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, url, description } = body;

  // --- Input validation ---
  if (!isNonEmptyString(name, 200)) {
    return NextResponse.json(
      { error: "A valid tool name is required (max 200 characters)." },
      { status: 400 }
    );
  }

  if (!isValidHttpUrl(url)) {
    return NextResponse.json(
      { error: "A valid HTTP or HTTPS URL is required." },
      { status: 400 }
    );
  }

  if (!isNonEmptyString(description, 5000)) {
    return NextResponse.json(
      { error: "A description is required (max 5,000 characters)." },
      { status: 400 }
    );
  }

  // --- SendGrid setup ---
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  sgMail.setApiKey(apiKey);

  // --- Sanitize for email template ---
  const safeName = escapeHtml(name);
  const safeUrl = escapeHtml(url);
  const safeDescription = escapeHtml(description).replace(/\n/g, "<br />");

  const msg = {
    to: process.env.CONTACT_TO_EMAIL || "moonsmoke.contact@gmail.com",
    from: process.env.SENDGRID_FROM_EMAIL || "contact@legaltech-ai-hub.com",
    subject: `New Tool Submission: ${safeName}`,
    text: `Tool Name: ${name}\nTool URL: ${url}\nDescription: ${description}`,
    html: `<h2>New Tool Submission</h2>
<p><strong>Tool Name:</strong> ${safeName}</p>
<p><strong>Tool URL:</strong> <a href="${safeUrl}">${safeUrl}</a></p>
<hr />
<p><strong>Description:</strong></p>
<p>${safeDescription}</p>`,
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("SendGrid error:", error);
    return NextResponse.json(
      { error: "Failed to send submission. Please try again later." },
      { status: 500 }
    );
  }
}
