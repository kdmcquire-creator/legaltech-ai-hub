import { NextRequest, NextResponse } from "next/server";
import { getAllNewsletters, saveNewsletter } from "@/lib/newsletters";

export const dynamic = "force-dynamic";

function checkAuth(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${adminKey}`;
}

async function sendViaSendGrid(
  subject: string,
  htmlContent: string
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    return { success: false, error: "SENDGRID_API_KEY not configured" };
  }

  const fromEmail =
    process.env.SENDGRID_NEWSLETTER_FROM_EMAIL || "updates@legaltech-ai-hub.com";

  // Use SendGrid Marketing API Single Send
  // Step 1: Create the single send
  const createRes = await fetch(
    "https://api.sendgrid.com/v3/marketing/singlesends",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `Newsletter: ${subject} - ${new Date().toISOString()}`,
        send_to: { all: true },
        email_config: {
          subject,
          html_content: htmlContent,
          sender_id: undefined,
          custom_unsubscribe_url: "https://legaltech-ai-hub.com",
          generate_plain_content: true,
        },
      }),
    }
  );

  if (!createRes.ok) {
    const errData = await createRes.json().catch(() => null);
    // Fallback: try sending via v3 mail send to all contacts
    return await sendViaMailApi(apiKey, fromEmail, subject, htmlContent);
  }

  const createData = (await createRes.json()) as { id?: string };
  if (!createData.id) {
    return await sendViaMailApi(apiKey, fromEmail, subject, htmlContent);
  }

  // Step 2: Schedule the single send for immediate delivery
  const scheduleRes = await fetch(
    `https://api.sendgrid.com/v3/marketing/singlesends/${createData.id}/schedule`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ send_at: "now" }),
    }
  );

  if (!scheduleRes.ok) {
    const errData = await scheduleRes.json().catch(() => null);
    console.error("Failed to schedule single send:", errData);
    return {
      success: false,
      error: `Failed to schedule: ${JSON.stringify(errData)}`,
    };
  }

  return { success: true };
}

async function sendViaMailApi(
  apiKey: string,
  fromEmail: string,
  subject: string,
  htmlContent: string
): Promise<{ success: boolean; error?: string }> {
  // Fallback: fetch all contacts and send via mail/send
  const contactsRes = await fetch(
    "https://api.sendgrid.com/v3/marketing/contacts",
    {
      headers: { Authorization: `Bearer ${apiKey}` },
    }
  );

  if (!contactsRes.ok) {
    return { success: false, error: "Failed to fetch contacts" };
  }

  const contactsData = (await contactsRes.json()) as {
    contact_count?: number;
    result?: Array<{ email: string }>;
  };
  const contacts = contactsData.result || [];

  if (contacts.length === 0) {
    return { success: false, error: "No contacts found" };
  }

  // SendGrid v3 mail/send supports up to 1000 personalizations
  const batchSize = 1000;
  for (let i = 0; i < contacts.length; i += batchSize) {
    const batch = contacts.slice(i, i + batchSize);
    const personalizations = batch.map((c) => ({ to: [{ email: c.email }] }));

    const sendRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations,
        from: { email: fromEmail },
        subject,
        content: [{ type: "text/html", value: htmlContent }],
      }),
    });

    if (!sendRes.ok) {
      const errData = await sendRes.text();
      console.error("Mail send failed:", errData);
      return { success: false, error: `Mail send failed: ${errData}` };
    }
  }

  return { success: true };
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const newsletters = await getAllNewsletters();
  const queued = newsletters
    .filter((n) => n.status === "queued")
    .sort(
      (a, b) =>
        new Date(a.sendDate).getTime() - new Date(b.sendDate).getTime()
    );

  if (queued.length === 0) {
    return NextResponse.json(
      { error: "No queued newsletters to send" },
      { status: 404 }
    );
  }

  const next = queued[0];
  const result = await sendViaSendGrid(next.subject, next.bodyHtml);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || "Failed to send newsletter" },
      { status: 500 }
    );
  }

  next.status = "sent";
  next.sentAt = new Date().toISOString();
  await saveNewsletter(next);

  return NextResponse.json({
    success: true,
    newsletter: { id: next.id, title: next.title, sentAt: next.sentAt },
  });
}
