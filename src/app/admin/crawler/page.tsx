"use client";

import { useState, useCallback } from "react";

// ---------------------------------------------------------------------------
// Types (mirrored from crawler-config — keeps this client-only)
// ---------------------------------------------------------------------------

interface CrawlerResult {
  title: string;
  url: string;
  summary: string;
  source: string;
  publishedAt: string;
  score: number;
  keywordMatches: string[];
}

interface ArticleDraft {
  headline: string;
  body: string;
  summary: string;
  placement: string;
  sourceUrls: string[];
  generatedAt: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CrawlerAdminPage() {
  const [apiKey, setApiKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // Crawler state
  const [crawling, setCrawling] = useState(false);
  const [results, setResults] = useState<CrawlerResult[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  // Generator state
  const [generating, setGenerating] = useState(false);
  const [drafts, setDrafts] = useState<ArticleDraft[]>([]);

  // Messages
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  // --- Auth ---
  const handleAuth = useCallback(() => {
    if (apiKey.trim().length > 0) {
      setAuthenticated(true);
      setError("");
    }
  }, [apiKey]);

  // --- Helpers ---
  const authHeaders = useCallback(
    () => ({
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    }),
    [apiKey],
  );

  // --- Run Crawler ---
  const runCrawler = useCallback(async () => {
    setCrawling(true);
    setError("");
    setInfo("");
    setResults([]);
    setDrafts([]);
    setSelected(new Set());

    try {
      const res = await fetch("/api/admin/crawler/run", {
        method: "POST",
        headers: authHeaders(),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Crawler request failed");
        return;
      }

      setResults(data.results || []);
      setInfo(`Found ${data.count} items.`);
    } catch (err) {
      setError(`Network error: ${String(err)}`);
    } finally {
      setCrawling(false);
    }
  }, [authHeaders]);

  // --- Toggle selection ---
  const toggleSelect = useCallback((idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected(new Set(results.map((_, i) => i)));
  }, [results]);

  const selectNone = useCallback(() => {
    setSelected(new Set());
  }, []);

  // --- Generate Articles ---
  const generateArticles = useCallback(async () => {
    if (selected.size === 0) {
      setError("Select at least one item to generate articles.");
      return;
    }

    setGenerating(true);
    setError("");
    setInfo("");
    setDrafts([]);

    const items = Array.from(selected).map((i) => ({
      title: results[i].title,
      url: results[i].url,
      summary: results[i].summary,
    }));

    try {
      const res = await fetch("/api/admin/crawler/generate", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ items }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Generation failed");
        return;
      }

      setDrafts(data.drafts || []);
      setInfo(`Generated ${data.drafts?.length || 0} draft(s).`);
    } catch (err) {
      setError(`Network error: ${String(err)}`);
    } finally {
      setGenerating(false);
    }
  }, [selected, results, authHeaders]);

  // --- Approve / Reject ---
  const handleDecision = useCallback(
    async (draft: ArticleDraft, decision: "approved" | "rejected") => {
      try {
        await fetch("/api/admin/crawler/decide", {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify({
            url: draft.sourceUrls[0] || "",
            title: draft.headline,
            source: "",
            keywords: [],
            decision,
          }),
        });

        setDrafts((prev) => prev.filter((d) => d.headline !== draft.headline));
        setInfo(
          `Draft "${draft.headline}" ${decision}. Preference recorded.`,
        );
      } catch (err) {
        setError(`Decision recording failed: ${String(err)}`);
      }
    },
    [authHeaders],
  );

  // --- Auth gate ---
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            Crawler Admin
          </h1>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admin API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter ADMIN_API_KEY"
          />
          <button
            onClick={handleAuth}
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
          >
            Authenticate
          </button>
        </div>
      </div>
    );
  }

  // --- Main UI ---
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            News Crawler Admin
          </h1>
          <button
            onClick={runCrawler}
            disabled={crawling}
            className="bg-blue-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {crawling ? "Crawling..." : "Run Crawler"}
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}
        {info && (
          <div className="bg-green-50 text-green-700 border border-green-200 rounded-lg px-4 py-3 mb-6 text-sm">
            {info}
          </div>
        )}

        {/* Crawler results */}
        {results.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Crawler Results
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Select All
                </button>
                <button
                  onClick={selectNone}
                  className="text-xs text-gray-500 hover:underline"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {results.map((item, idx) => (
                <div
                  key={item.url}
                  className={`bg-white border rounded-lg p-4 transition ${
                    selected.has(idx)
                      ? "border-blue-400 ring-2 ring-blue-100"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selected.has(idx)}
                      onChange={() => toggleSelect(idx)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                          {item.source}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                          Score: {item.score}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(item.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm mb-1">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition"
                        >
                          {item.title}
                        </a>
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {item.summary}
                      </p>
                      {item.keywordMatches.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {item.keywordMatches.map((kw) => (
                            <span
                              key={kw}
                              className="inline-block bg-gray-100 text-gray-600 rounded px-1.5 py-0.5 text-[10px]"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button
                onClick={generateArticles}
                disabled={generating || selected.size === 0}
                className="bg-emerald-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition"
              >
                {generating
                  ? "Generating..."
                  : `Generate Articles (${selected.size} selected)`}
              </button>
            </div>
          </section>
        )}

        {/* Generated drafts */}
        {drafts.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Generated Drafts
            </h2>
            <div className="space-y-4">
              {drafts.map((draft, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-lg p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700">
                      {draft.placement}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {draft.headline}
                  </h3>
                  <p className="text-sm text-gray-600 italic mb-3">
                    {draft.summary}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-800 whitespace-pre-wrap max-h-64 overflow-y-auto">
                    {draft.body}
                  </div>
                  {draft.sourceUrls.length > 0 && (
                    <div className="text-xs text-gray-400 mb-3">
                      Sources:{" "}
                      {draft.sourceUrls.map((u, i) => (
                        <span key={i}>
                          {i > 0 && ", "}
                          <a
                            href={u}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                          >
                            {new URL(u).hostname}
                          </a>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDecision(draft, "approved")}
                      className="bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecision(draft, "rejected")}
                      className="bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {results.length === 0 && drafts.length === 0 && !crawling && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-2">No data yet.</p>
            <p className="text-sm">
              Click &quot;Run Crawler&quot; to fetch the latest legal-tech news.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
