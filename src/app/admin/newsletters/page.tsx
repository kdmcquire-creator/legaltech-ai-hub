"use client";

import { useState, useEffect, useCallback } from "react";

type NewsletterFormat =
  | "the-docket"
  | "hot-take"
  | "crystal-ball"
  | "the-gold-standard"
  | "practitioners-playbook";

type NewsletterStatus = "draft" | "queued" | "sent";

interface Newsletter {
  id: string;
  title: string;
  subject: string;
  bodyHtml: string;
  format: NewsletterFormat;
  sendDate: string;
  status: NewsletterStatus;
  createdAt: string;
  sentAt?: string;
}

const FORMAT_LABELS: Record<NewsletterFormat, string> = {
  "the-docket": "The Docket",
  "hot-take": "Hot Take",
  "crystal-ball": "Crystal Ball",
  "the-gold-standard": "The Gold Standard",
  "practitioners-playbook": "Practitioner's Playbook",
};

const FORMAT_COLORS: Record<NewsletterFormat, string> = {
  "the-docket": "bg-blue-100 text-blue-800",
  "hot-take": "bg-red-100 text-red-800",
  "crystal-ball": "bg-purple-100 text-purple-800",
  "the-gold-standard": "bg-amber-100 text-amber-800",
  "practitioners-playbook": "bg-emerald-100 text-emerald-800",
};

const STATUS_COLORS: Record<NewsletterStatus, string> = {
  draft: "bg-gray-100 text-gray-700",
  queued: "bg-yellow-100 text-yellow-800",
  sent: "bg-green-100 text-green-800",
};

const ALL_FORMATS: NewsletterFormat[] = [
  "the-docket",
  "hot-take",
  "crystal-ball",
  "the-gold-standard",
  "practitioners-playbook",
];

const ALL_STATUSES: NewsletterStatus[] = ["draft", "queued", "sent"];

function getNextWednesday10AMET(): string {
  const now = new Date();
  const day = now.getUTCDay();
  // Wednesday = 3
  let daysUntilWed = (3 - day + 7) % 7;
  if (daysUntilWed === 0) daysUntilWed = 7; // next week if today is Wednesday
  const wed = new Date(now);
  wed.setUTCDate(wed.getUTCDate() + daysUntilWed);
  wed.setUTCHours(14, 0, 0, 0); // 10 AM ET = 14:00 or 15:00 UTC depending on DST; use 14 for EDT
  return wed.toISOString().slice(0, 16);
}

export default function AdminNewslettersPage() {
  const [apiKey, setApiKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formBodyHtml, setFormBodyHtml] = useState("");
  const [formFormat, setFormFormat] = useState<NewsletterFormat>("the-docket");
  const [formSendDate, setFormSendDate] = useState(getNextWednesday10AMET());
  const [formStatus, setFormStatus] = useState<NewsletterStatus>("draft");

  const headers = useCallback(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    }),
    [apiKey]
  );

  const fetchNewsletters = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/newsletters", { headers: headers() });
      if (!res.ok) {
        if (res.status === 401) {
          setAuthenticated(false);
          setError("Invalid API key");
          return;
        }
        throw new Error("Failed to fetch");
      }
      const data = await res.json();
      setNewsletters(data.newsletters || []);
    } catch (e) {
      setError("Failed to load newsletters");
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_api_key");
    if (stored) {
      setApiKey(stored);
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated && apiKey) {
      fetchNewsletters();
    }
  }, [authenticated, apiKey, fetchNewsletters]);

  function handleLogin() {
    if (!apiKey.trim()) return;
    sessionStorage.setItem("admin_api_key", apiKey);
    setAuthenticated(true);
  }

  function resetForm() {
    setFormTitle("");
    setFormSubject("");
    setFormBodyHtml("");
    setFormFormat("the-docket");
    setFormSendDate(getNextWednesday10AMET());
    setFormStatus("draft");
    setEditingId(null);
  }

  function openCreate() {
    resetForm();
    setShowModal(true);
  }

  function openEdit(nl: Newsletter) {
    setFormTitle(nl.title);
    setFormSubject(nl.subject);
    setFormBodyHtml(nl.bodyHtml);
    setFormFormat(nl.format);
    setFormSendDate(nl.sendDate.slice(0, 16));
    setFormStatus(nl.status);
    setEditingId(nl.id);
    setShowModal(true);
  }

  async function handleSave() {
    setError("");
    const payload = {
      title: formTitle,
      subject: formSubject,
      bodyHtml: formBodyHtml,
      format: formFormat,
      sendDate: new Date(formSendDate).toISOString(),
      status: formStatus,
    };

    try {
      const url = editingId
        ? `/api/admin/newsletters/${editingId}`
        : "/api/admin/newsletters";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: headers(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save");
        return;
      }

      setShowModal(false);
      resetForm();
      fetchNewsletters();
    } catch {
      setError("Failed to save newsletter");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this newsletter?")) return;
    try {
      await fetch(`/api/admin/newsletters/${id}`, {
        method: "DELETE",
        headers: headers(),
      });
      fetchNewsletters();
    } catch {
      setError("Failed to delete");
    }
  }

  async function handleSendNext() {
    if (!confirm("Send the next queued newsletter now?")) return;
    setError("");
    try {
      const res = await fetch("/api/admin/newsletters/send", {
        method: "POST",
        headers: headers(),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send");
        return;
      }
      alert(`Sent: ${data.newsletter?.title || "Newsletter sent"}`);
      fetchNewsletters();
    } catch {
      setError("Failed to send newsletter");
    }
  }

  async function handleMoveUp(index: number) {
    if (index === 0) return;
    const reordered = [...newsletters];
    // Swap sendDates between index and index-1
    const tempDate = reordered[index].sendDate;
    reordered[index].sendDate = reordered[index - 1].sendDate;
    reordered[index - 1].sendDate = tempDate;

    try {
      await fetch("/api/admin/newsletters/reorder", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          order: [
            { id: reordered[index].id, sendDate: reordered[index].sendDate },
            {
              id: reordered[index - 1].id,
              sendDate: reordered[index - 1].sendDate,
            },
          ],
        }),
      });
      fetchNewsletters();
    } catch {
      setError("Failed to reorder");
    }
  }

  async function handleMoveDown(index: number) {
    if (index >= newsletters.length - 1) return;
    const reordered = [...newsletters];
    const tempDate = reordered[index].sendDate;
    reordered[index].sendDate = reordered[index + 1].sendDate;
    reordered[index + 1].sendDate = tempDate;

    try {
      await fetch("/api/admin/newsletters/reorder", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({
          order: [
            { id: reordered[index].id, sendDate: reordered[index].sendDate },
            {
              id: reordered[index + 1].id,
              sendDate: reordered[index + 1].sendDate,
            },
          ],
        }),
      });
      fetchNewsletters();
    } catch {
      setError("Failed to reorder");
    }
  }

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-xl font-bold mb-4 text-gray-900">
            Newsletter Admin
          </h1>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-sm"
            placeholder="Enter admin API key"
          />
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Newsletter Queue
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleSendNext}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700"
            >
              Send Next Queued
            </button>
            <button
              onClick={openCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700"
            >
              + New Newsletter
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : newsletters.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No newsletters yet. Create your first one!
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Order
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Format
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Send Date
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {newsletters.map((nl, i) => (
                  <tr key={nl.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleMoveUp(i)}
                          disabled={i === 0}
                          className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs"
                          title="Move up"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => handleMoveDown(i)}
                          disabled={i === newsletters.length - 1}
                          className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs"
                          title="Move down"
                        >
                          ▼
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {nl.title}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${FORMAT_COLORS[nl.format]}`}
                      >
                        {FORMAT_LABELS[nl.format]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[nl.status]}`}
                      >
                        {nl.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(nl.sendDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPreviewHtml(nl.bodyHtml)}
                          className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => openEdit(nl)}
                          className="text-gray-600 hover:text-gray-800 text-xs font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(nl.id)}
                          className="text-red-600 hover:text-red-800 text-xs font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {editingId ? "Edit Newsletter" : "New Newsletter"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title (internal)
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder="e.g. Week 12 - AI Contract Review Roundup"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Subject
                  </label>
                  <input
                    type="text"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    placeholder="Subject line subscribers will see"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Format
                    </label>
                    <select
                      value={formFormat}
                      onChange={(e) =>
                        setFormFormat(e.target.value as NewsletterFormat)
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      {ALL_FORMATS.map((f) => (
                        <option key={f} value={f}>
                          {FORMAT_LABELS[f]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formStatus}
                      onChange={(e) =>
                        setFormStatus(e.target.value as NewsletterStatus)
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      {ALL_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Send Date
                  </label>
                  <input
                    type="datetime-local"
                    value={formSendDate}
                    onChange={(e) => setFormSendDate(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Default: Wednesday 10:00 AM ET
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Body HTML
                  </label>
                  <textarea
                    value={formBodyHtml}
                    onChange={(e) => setFormBodyHtml(e.target.value)}
                    rows={12}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm font-mono"
                    placeholder="<h1>Newsletter Title</h1><p>Content here...</p>"
                  />
                </div>

                {formBodyHtml && (
                  <div>
                    <button
                      type="button"
                      onClick={() => setPreviewHtml(formBodyHtml)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Preview HTML
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <p className="text-red-600 text-sm mt-3">{error}</p>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 font-medium"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewHtml !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-gray-900">
                Email Preview
              </h2>
              <button
                onClick={() => setPreviewHtml(null)}
                className="text-gray-500 hover:text-gray-700 text-xl leading-none"
              >
                x
              </button>
            </div>
            <div className="p-6">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
