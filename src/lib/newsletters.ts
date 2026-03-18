import { promises as fs } from "fs";
import path from "path";

export type NewsletterFormat =
  | "the-docket"
  | "hot-take"
  | "crystal-ball"
  | "the-gold-standard"
  | "practitioners-playbook";

export type NewsletterStatus = "draft" | "queued" | "sent";

export interface Newsletter {
  id: string;
  title: string;
  subject: string;
  bodyHtml: string;
  format: NewsletterFormat;
  sendDate: string; // ISO string
  status: NewsletterStatus;
  createdAt: string; // ISO string
  sentAt?: string; // ISO string
}

const NEWSLETTERS_DIR = path.join(process.cwd(), "newsletters");

async function ensureDir() {
  await fs.mkdir(NEWSLETTERS_DIR, { recursive: true });
}

function filePath(id: string): string {
  // Sanitize id to prevent path traversal
  const safeId = id.replace(/[^a-zA-Z0-9_-]/g, "");
  return path.join(NEWSLETTERS_DIR, `${safeId}.json`);
}

export async function getAllNewsletters(): Promise<Newsletter[]> {
  await ensureDir();
  const files = await fs.readdir(NEWSLETTERS_DIR);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));
  const newsletters: Newsletter[] = [];

  for (const file of jsonFiles) {
    try {
      const raw = await fs.readFile(path.join(NEWSLETTERS_DIR, file), "utf-8");
      newsletters.push(JSON.parse(raw) as Newsletter);
    } catch {
      // Skip malformed files
    }
  }

  // Sort by sendDate ascending
  newsletters.sort(
    (a, b) => new Date(a.sendDate).getTime() - new Date(b.sendDate).getTime()
  );
  return newsletters;
}

export async function getNewsletter(
  id: string
): Promise<Newsletter | null> {
  try {
    const raw = await fs.readFile(filePath(id), "utf-8");
    return JSON.parse(raw) as Newsletter;
  } catch {
    return null;
  }
}

export async function saveNewsletter(newsletter: Newsletter): Promise<void> {
  await ensureDir();
  await fs.writeFile(filePath(newsletter.id), JSON.stringify(newsletter, null, 2), "utf-8");
}

export async function deleteNewsletter(id: string): Promise<boolean> {
  try {
    await fs.unlink(filePath(id));
    return true;
  } catch {
    return false;
  }
}

export function generateId(): string {
  return `nl_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export const FORMAT_LABELS: Record<NewsletterFormat, string> = {
  "the-docket": "The Docket",
  "hot-take": "Hot Take",
  "crystal-ball": "Crystal Ball",
  "the-gold-standard": "The Gold Standard",
  "practitioners-playbook": "Practitioner's Playbook",
};

export const FORMAT_COLORS: Record<NewsletterFormat, string> = {
  "the-docket": "#2563eb",
  "hot-take": "#dc2626",
  "crystal-ball": "#7c3aed",
  "the-gold-standard": "#d97706",
  "practitioners-playbook": "#059669",
};
