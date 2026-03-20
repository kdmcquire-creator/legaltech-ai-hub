import { NextRequest, NextResponse } from "next/server";
import { getAllNewsletters, getNewsletter, saveNewsletter } from "@/lib/newsletters";

export const dynamic = "force-dynamic";

function checkAuth(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${adminKey}`;
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

  // Expect an array of { id, sendDate } objects
  const order = body.order;
  if (!Array.isArray(order)) {
    return NextResponse.json(
      { error: "order must be an array of { id, sendDate }" },
      { status: 400 }
    );
  }

  for (const item of order) {
    if (!item.id || !item.sendDate) {
      return NextResponse.json(
        { error: "Each item must have id and sendDate" },
        { status: 400 }
      );
    }

    const newsletter = await getNewsletter(item.id);
    if (!newsletter) continue;

    newsletter.sendDate = new Date(item.sendDate).toISOString();
    await saveNewsletter(newsletter);
  }

  const updated = await getAllNewsletters();
  return NextResponse.json({ newsletters: updated });
}
