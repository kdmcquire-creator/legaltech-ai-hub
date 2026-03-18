import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { escapeHtml, isValidEmail, isNonEmptyString } from "@/lib/sanitize";
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

  const { name, email, message } = body;

  // --- Input validation ---
  if (!isNonEmptyString(name, 200)) {
    return NextResponse.json(
      { error: "A valid name is required (max 200 characters)." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  if (!isNonEmptyString(message, 5000)) {
    return NextResponse.json(
      { error: "A message is required (max 5,000 characters)." },
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
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const msg = {
    to: process.env.CONTACT_TO_EMAIL || "moonsmoke.contact@gmail.com",
    from: process.env.SENDGRID_FROM_EMAIL || "contact@legaltech-ai-hub.com",
    replyTo: email,
    subject: `Contact Form: Message from ${safeName}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${safeName}</p>
<p><strong>Email:</strong> ${safeEmail}</p>
<hr />
<p>${safeMessage}</p>`,
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("SendGrid error:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
