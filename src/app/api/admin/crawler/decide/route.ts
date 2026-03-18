// ---------------------------------------------------------------------------
// POST /api/admin/crawler/decide — Record approve/reject for preference learning
// ---------------------------------------------------------------------------

import { NextRequest, NextResponse } from "next/server";
import { recordDecision } from "@/lib/crawler-preferences";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // --- Admin auth ---
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { url, title, source, keywords, decision } = body as {
    url: string;
    title: string;
    source: string;
    keywords: string[];
    decision: "approved" | "rejected";
  };

  if (!url || !title || !decision) {
    return NextResponse.json(
      { error: "url, title, and decision are required." },
      { status: 400 },
    );
  }

  if (decision !== "approved" && decision !== "rejected") {
    return NextResponse.json(
      { error: 'decision must be "approved" or "rejected".' },
      { status: 400 },
    );
  }

  try {
    await recordDecision(
      { url, title, source: source || "", keywords: keywords || [] },
      decision,
    );
    return NextResponse.json({ ok: true, decision });
  } catch (err: unknown) {
    console.error("[crawler/decide]", err);
    return NextResponse.json(
      { error: "Failed to record decision", detail: String(err) },
      { status: 500 },
    );
  }
}
