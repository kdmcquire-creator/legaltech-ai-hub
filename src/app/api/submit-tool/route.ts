import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export async function POST(req: NextRequest) {
  const { name, url, description } = await req.json();

  if (!name || !url || !description) {
    return NextResponse.json(
      { error: "Tool name, URL, and description are required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  sgMail.setApiKey(apiKey);

  const msg = {
    to: process.env.CONTACT_TO_EMAIL || "moonsmoke.contact@gmail.com",
    from: process.env.SENDGRID_FROM_EMAIL || "contact@legaltech-ai-hub.com",
    subject: `New Tool Submission: ${name}`,
    text: `Tool Name: ${name}\nTool URL: ${url}\nDescription: ${description}`,
    html: `<h2>New Tool Submission</h2>
<p><strong>Tool Name:</strong> ${name}</p>
<p><strong>Tool URL:</strong> <a href="${url}">${url}</a></p>
<hr />
<p><strong>Description:</strong></p>
<p>${description.replace(/\n/g, "<br />")}</p>`,
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
