"use client";

import { useState, useEffect, useCallback } from "react";

interface ReplyDraft {
  tone: string;
  subject: string;
  html: string;
}

type EmailStatus = "pending" | "drafts-sent" | "replied" | "ignored";

interface EmailRecord {
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

const STATUS_COLORS: Record<EmailStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  "drafts-sent": "bg-blue-100 text-blue-800",
  replied: "bg-green-100 text-green-800",
  ignored: "bg-gray-100 text-gray-600",
};

const STATUS_LABELS: Record<EmailStatus, string> = {
  pending: "Pending",
  "drafts-sent": "Drafts Sent",
  replied: "Replied",
  ignored: "Ignored",
};

export default function EmailAgentPage() {
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<EmailStatus | "all">("all");

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/email-agent?secret=${encodeURIComponent(secret)}`);
      if (!res.ok) {
        if (res.status === 401) {
          setAuthenticated(false);
          setError("Invalid admin secret.");
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setEmails(data.emails || []);
      setAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch emails");
    } finally {
      setLoading(false);
    }
  }, [secret]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchEmails();
  };

  useEffect(() => {
    if (authenticated) {
      const interval = setInterval(fetchEmails, 60_000);
      return () => clearInterval(interval);
    }
  }, [authenticated, fetchEmails]);

  const updateStatus = async (id: string, status: EmailStatus) => {
    try {
      const res = await fetch("/api/admin/email-agent", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Update failed");
      setEmails((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, status, updatedAt: new Date().toISOString() } : e
        )
      );
    } catch {
      setError("Failed to update status");
    }
  };

  const filteredEmails =
    filter === "all" ? emails : emails.filter((e) => e.status === filter);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Email Agent Admin
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Enter the admin secret to access the email agent dashboard.
          </p>
          {error && (
            <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Admin secret"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-4"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Email Agent Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {emails.length} total emails tracked
            </p>
          </div>
          <button
            onClick={fetchEmails}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Status Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "pending", "drafts-sent", "replied", "ignored"] as const).map(
            (s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === s
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {s === "all" ? "All" : STATUS_LABELS[s]}
                <span className="ml-1.5 opacity-70">
                  (
                  {s === "all"
                    ? emails.length
                    : emails.filter((e) => e.status === s).length}
                  )
                </span>
              </button>
            )
          )}
        </div>

        {/* Email List */}
        {filteredEmails.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-gray-400 text-lg">No emails found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Summary Row */}
                <button
                  onClick={() =>
                    setExpandedId(expandedId === email.id ? null : email.id)
                  }
                  className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${STATUS_COLORS[email.status]}`}
                  >
                    {STATUS_LABELS[email.status]}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      email.type === "tool-submission"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {email.type === "tool-submission" ? "Tool" : "Contact"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {email.subject}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      From: {email.from}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(email.receivedAt).toLocaleDateString()}{" "}
                    {new Date(email.receivedAt).toLocaleTimeString()}
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedId === email.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Expanded Details */}
                {expandedId === email.id && (
                  <div className="border-t border-gray-100 px-6 py-5">
                    {/* Status actions */}
                    <div className="flex gap-2 mb-5">
                      <span className="text-sm text-gray-500 mr-2 self-center">
                        Mark as:
                      </span>
                      {(
                        ["pending", "drafts-sent", "replied", "ignored"] as const
                      ).map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(email.id, s)}
                          disabled={email.status === s}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            email.status === s
                              ? "bg-gray-200 text-gray-500 cursor-default"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {STATUS_LABELS[s]}
                        </button>
                      ))}
                    </div>

                    {/* Original email */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-5">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Original Email
                      </h4>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {email.bodyPreview}
                      </p>
                    </div>

                    {/* Drafts */}
                    {email.drafts.length > 0 ? (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Generated Reply Drafts ({email.drafts.length})
                        </h4>
                        <div className="space-y-4">
                          {email.drafts.map((draft, i) => (
                            <div
                              key={i}
                              className="border border-gray-200 rounded-lg p-4"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-700">
                                  {draft.tone}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {draft.subject}
                                </span>
                              </div>
                              <div
                                className="text-sm text-gray-700 prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: draft.html }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic">
                        No drafts generated yet.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
