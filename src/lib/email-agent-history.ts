import { promises as fs } from "fs";
import path from "path";
import { ReplyDraft } from "./reply-generator";

export type EmailStatus = "pending" | "drafts-sent" | "replied" | "ignored";

export interface EmailRecord {
  id: string;
  receivedAt: string;
  from: string;
  to: string;
  subject: string;
  bodyPreview: string;
  type: "contact" | "tool-submission";
  status: EmailStatus;
  drafts: ReplyDraft[];
  updatedAt: string;
}

export interface HistoryData {
  emails: EmailRecord[];
}

const DATA_DIR = path.join(process.cwd(), "email-agent-data");
const HISTORY_FILE = path.join(DATA_DIR, "history.json");

async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // directory already exists
  }
}

export async function readHistory(): Promise<HistoryData> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(HISTORY_FILE, "utf-8");
    return JSON.parse(raw) as HistoryData;
  } catch {
    return { emails: [] };
  }
}

export async function writeHistory(data: HistoryData): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(HISTORY_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function addEmailRecord(
  record: EmailRecord
): Promise<void> {
  const history = await readHistory();
  history.emails.unshift(record);
  // Keep last 500 records
  if (history.emails.length > 500) {
    history.emails = history.emails.slice(0, 500);
  }
  await writeHistory(history);
}

export async function updateEmailStatus(
  id: string,
  status: EmailStatus
): Promise<boolean> {
  const history = await readHistory();
  const record = history.emails.find((e) => e.id === id);
  if (!record) return false;
  record.status = status;
  record.updatedAt = new Date().toISOString();
  await writeHistory(history);
  return true;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
