import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { escapeHtml, isValidEmail } from "@/lib/sanitize";
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

  const { email } = body;

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error("SENDGRID_API_KEY is not set");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const fromEmail =
    process.env.SENDGRID_NEWSLETTER_FROM_EMAIL || "updates@legaltech-ai-hub.com";
  const ownerEmail =
    process.env.CONTACT_TO_EMAIL || "moonsmoke.contact@gmail.com";

  sgMail.setApiKey(apiKey);

  // Try adding the contact to SendGrid Marketing Contacts first
  let addedToContacts = false;
  try {
    const contactRes = await fetch(
      "https://api.sendgrid.com/v3/marketing/contacts",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contacts: [{ email }],
        }),
      }
    );

    if (contactRes.ok) {
      addedToContacts = true;
    } else {
      const errData = await contactRes.json().catch(() => null);
      console.warn(
        "SendGrid Marketing API responded with non-OK status:",
        contactRes.status,
        errData
      );
    }
  } catch (err) {
    console.warn("SendGrid Marketing Contacts API unavailable:", err);
  }

  // Send a welcome email to the subscriber
  try {
    await sgMail.send({
      to: email,
      from: fromEmail,
      subject: "Welcome to LegalTech AI Hub — Weekly Insights",
      text: [
        "Thanks for subscribing to the LegalTech AI Hub newsletter!",
        "",
        "Every Tuesday you'll receive:",
        "- Analysis of new AI-powered legal tools",
        "- Practical implementation tips for legal teams",
        "- Industry trends and what they mean for your practice",
        "",
        "In the meantime, explore our latest content at https://legaltech-ai-hub.com",
        "",
        "— The LegalTech AI Hub Team",
      ].join("\n"),
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Welcome to LegalTech AI Hub!</h2>
          <p>Thanks for subscribing to our newsletter.</p>
          <p>Every Tuesday you&rsquo;ll receive:</p>
          <ul>
            <li>Analysis of new AI-powered legal tools</li>
            <li>Practical implementation tips for legal teams</li>
            <li>Industry trends and what they mean for your practice</li>
          </ul>
          <p>In the meantime, <a href="https://legaltech-ai-hub.com">explore our latest content</a>.</p>
          <p style="color: #6b7280; font-size: 13px; margin-top: 32px;">
            &mdash; The LegalTech AI Hub Team
          </p>
        </div>`,
    });
  } catch (err) {
    console.error("Failed to send welcome email:", err);
    // If we at least added them to contacts, still consider it a success
    if (!addedToContacts) {
      return NextResponse.json(
        { error: "Failed to complete subscription. Please try again later." },
        { status: 500 }
      );
    }
  }

  // Notify the site owner about the new subscriber (sanitize email in HTML)
  const safeEmail = escapeHtml(email);
  try {
    await sgMail.send({
      to: ownerEmail,
      from: fromEmail,
      subject: `New Newsletter Subscriber: ${email}`,
      text: `New newsletter signup:\n\nEmail: ${email}\nDate: ${new Date().toISOString()}\nAdded to Marketing Contacts: ${addedToContacts ? "Yes" : "No (fallback to email only)"}`,
      html: `
        <div style="font-family: sans-serif;">
          <h3>New Newsletter Subscriber</h3>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Date:</strong> ${new Date().toISOString()}</p>
          <p><strong>Added to Marketing Contacts:</strong> ${addedToContacts ? "Yes" : "No (fallback to email only)"}</p>
        </div>`,
    });
  } catch (err) {
    // Non-critical — log but don't fail the request
    console.warn("Failed to send owner notification:", err);
  }

  return NextResponse.json({ success: true });
}
