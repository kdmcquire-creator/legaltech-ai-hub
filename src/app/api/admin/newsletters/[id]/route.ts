import { NextRequest, NextResponse } from "next/server";
import {
  getNewsletter,
  saveNewsletter,
  deleteNewsletter,
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await getNewsletter(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.title && typeof body.title === "string") existing.title = body.title;
  if (body.subject && typeof body.subject === "string") existing.subject = body.subject;
  if (body.bodyHtml && typeof body.bodyHtml === "string") existing.bodyHtml = body.bodyHtml;
  if (body.format && VALID_FORMATS.includes(body.format as NewsletterFormat)) {
    existing.format = body.format as NewsletterFormat;
  }
  if (body.sendDate && typeof body.sendDate === "string") {
    existing.sendDate = new Date(body.sendDate).toISOString();
  }
  if (body.status && VALID_STATUSES.includes(body.status as NewsletterStatus)) {
    existing.status = body.status as NewsletterStatus;
  }

  await saveNewsletter(existing);
  return NextResponse.json({ newsletter: existing });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteNewsletter(id);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
