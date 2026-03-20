import { NextRequest, NextResponse } from "next/server";
import { readHistory, updateEmailStatus, EmailStatus } from "@/lib/email-agent-history";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Admin API for email agent history.
 * GET: returns all email records.
 * PATCH: updates the status of an email record.
 * Auth: requires ADMIN_SECRET header.
 */

function checkAuth(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const provided =
    req.headers.get("x-admin-secret") ||
    req.nextUrl.searchParams.get("secret");
  return provided === secret;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const history = await readHistory();
  return NextResponse.json(history);
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { id?: string; status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.id || !body.status) {
    return NextResponse.json(
      { error: "Missing id or status" },
      { status: 400 }
    );
  }

  const validStatuses: EmailStatus[] = [
    "pending",
    "drafts-sent",
    "replied",
    "ignored",
  ];
  if (!validStatuses.includes(body.status as EmailStatus)) {
    return NextResponse.json(
      { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
      { status: 400 }
    );
  }

  const updated = await updateEmailStatus(body.id, body.status as EmailStatus);
  if (!updated) {
    return NextResponse.json(
      { error: "Email record not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
