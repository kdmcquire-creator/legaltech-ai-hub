import { NextRequest, NextResponse } from "next/server";
import {
  getAllNewsletters,
  saveNewsletter,
  generateId,
  type Newsletter,
  type NewsletterFormat,
  type NewsletterStatus,
} from "@/lib/newsletters";

export const dynamic = "force-dynamic";

const VALID_FORMATS: NewsletterFormat[] = [
  "the-docket",
  "hot-take",
  "crystal-ball",
  "the-gold-standard",
  "practitioners-playbook",
];

const VALID_STATUSES: NewsletterStatus[] = ["draft", "queued", "sent"];

function checkAuth(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${adminKey}`;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const newsletters = await getAllNewsletters();
  return NextResponse.json({ newsletters });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { title, subject, bodyHtml, format, sendDate, status } = body;

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }
  if (!subject || typeof subject !== "string") {
    return NextResponse.json({ error: "subject is required" }, { status: 400 });
  }
  if (!bodyHtml || typeof bodyHtml !== "string") {
    return NextResponse.json({ error: "bodyHtml is required" }, { status: 400 });
  }
  if (!format || !VALID_FORMATS.includes(format as NewsletterFormat)) {
    return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  }
  if (!sendDate || typeof sendDate !== "string") {
    return NextResponse.json({ error: "sendDate is required" }, { status: 400 });
  }

  const nlStatus: NewsletterStatus =
    status && VALID_STATUSES.includes(status as NewsletterStatus)
      ? (status as NewsletterStatus)
      : "draft";

  const newsletter: Newsletter = {
    id: generateId(),
    title: title as string,
    subject: subject as string,
    bodyHtml: bodyHtml as string,
    format: format as NewsletterFormat,
    sendDate: new Date(sendDate as string).toISOString(),
    status: nlStatus,
    createdAt: new Date().toISOString(),
  };

  await saveNewsletter(newsletter);
  return NextResponse.json({ newsletter }, { status: 201 });
}
