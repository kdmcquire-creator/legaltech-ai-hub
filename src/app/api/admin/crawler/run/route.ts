// ---------------------------------------------------------------------------
// POST /api/admin/crawler/run — Run the news crawler (admin-only)
// ---------------------------------------------------------------------------

import { NextRequest, NextResponse } from "next/server";
import { runCrawler } from "@/lib/crawler-utils";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // --- Admin auth ---
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const results = await runCrawler();
    return NextResponse.json({ ok: true, count: results.length, results });
  } catch (err: unknown) {
    console.error("[crawler/run]", err);
    return NextResponse.json(
      { error: "Crawler failed", detail: String(err) },
      { status: 500 },
    );
  }
}
