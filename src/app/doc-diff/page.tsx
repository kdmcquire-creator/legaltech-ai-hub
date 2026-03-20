"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Legal-impact clause patterns                                       */
/* ------------------------------------------------------------------ */

interface LegalFlag {
  name: string;
  severity: "high" | "medium" | "low";
  description: string;
  patterns: RegExp[];
}

const LEGAL_FLAGS: LegalFlag[] = [
  {
    name: "Liability / Indemnification Changed",
    severity: "high",
    description:
      "Changes to indemnification or liability provisions can significantly shift financial risk between parties.",
    patterns: [/indemnif/i, /hold\s+harmless/i, /liability/i, /liable/i],
  },
  {
    name: "Termination Terms Changed",
    severity: "high",
    description:
      "Modifications to termination clauses can affect your ability to exit the agreement or change notice requirements.",
    patterns: [/terminat/i, /right\s+to\s+cancel/i, /expir/i],
  },
  {
    name: "Payment / Compensation Changed",
    severity: "high",
    description:
      "Changes to payment terms, amounts, or schedules directly impact financial obligations.",
    patterns: [/payment/i, /compensation/i, /fee/i, /price/i, /invoice/i, /net\s+\d+/i],
  },
  {
    name: "Governing Law / Jurisdiction Changed",
    severity: "high",
    description:
      "A change in governing law or jurisdiction can fundamentally alter your legal rights and where disputes are resolved.",
    patterns: [/governing\s+law/i, /jurisdiction/i, /governed\s+by/i, /venue/i],
  },
  {
    name: "Intellectual Property Terms Changed",
    severity: "high",
    description:
      "Changes to IP ownership, licensing, or assignment clauses can affect who owns work product.",
    patterns: [/intellectual\s+property/i, /ip\s+rights/i, /copyright/i, /patent/i, /license/i, /work.*for.*hire/i],
  },
  {
    name: "Confidentiality / NDA Terms Changed",
    severity: "medium",
    description:
      "Modifications to confidentiality provisions can expose or protect sensitive information differently.",
    patterns: [/confidential/i, /non-disclosure/i, /proprietary/i, /trade\s+secret/i],
  },
  {
    name: "Non-Compete / Non-Solicitation Changed",
    severity: "medium",
    description:
      "Changes to restrictive covenants can expand or limit post-contract competitive restrictions.",
    patterns: [/non-compete/i, /noncompete/i, /non-solicitation/i, /nonsolicitation/i],
  },
  {
    name: "Warranty / Representations Changed",
    severity: "medium",
    description:
      "Modified warranties or representations can change the guarantees and recourse available if something goes wrong.",
    patterns: [/warrant/i, /represent/i, /as-is/i, /disclaimer/i],
  },
  {
    name: "Force Majeure Changed",
    severity: "medium",
    description:
      "Changes to force majeure clauses affect what events excuse non-performance.",
    patterns: [/force\s+majeure/i, /act\s+of\s+god/i, /unforeseeable/i],
  },
  {
    name: "Data Protection / Privacy Changed",
    severity: "medium",
    description:
      "Modifications to data handling provisions can affect regulatory compliance obligations.",
    patterns: [/data\s+protection/i, /personal\s+data/i, /privacy/i, /GDPR/i, /CCPA/i],
  },
  {
    name: "Assignment Terms Changed",
    severity: "low",
    description:
      "Changes to assignment clauses affect whether obligations can be transferred to third parties.",
    patterns: [/assignment/i, /assign.*rights/i, /transferab/i],
  },
  {
    name: "Dispute Resolution Changed",
    severity: "medium",
    description:
      "Changes to arbitration, mediation, or litigation provisions affect how disputes will be resolved.",
    patterns: [/arbitrat/i, /mediat/i, /dispute\s+resolution/i],
  },
];

/* ------------------------------------------------------------------ */
/*  Diff algorithm                                                     */
/* ------------------------------------------------------------------ */

type DiffSegment = {
  type: "equal" | "added" | "removed";
  text: string;
};

function computeWordDiff(oldText: string, newText: string): DiffSegment[] {
  const oldWords = oldText.split(/(\s+)/);
  const newWords = newText.split(/(\s+)/);

  // Simple LCS-based diff
  const m = oldWords.length;
  const n = newWords.length;

  // For very large documents, fall back to a simpler approach
  if (m * n > 2_000_000) {
    return simpleDiff(oldWords, newWords);
  }

  // Build LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldWords[i - 1] === newWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack
  const segments: DiffSegment[] = [];
  let i = m;
  let j = n;
  const stack: DiffSegment[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldWords[i - 1] === newWords[j - 1]) {
      stack.push({ type: "equal", text: oldWords[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({ type: "added", text: newWords[j - 1] });
      j--;
    } else {
      stack.push({ type: "removed", text: oldWords[i - 1] });
      i--;
    }
  }

  stack.reverse();

  // Merge consecutive segments of the same type
  for (const seg of stack) {
    if (segments.length > 0 && segments[segments.length - 1].type === seg.type) {
      segments[segments.length - 1].text += seg.text;
    } else {
      segments.push({ ...seg });
    }
  }

  return segments;
}

function simpleDiff(oldWords: string[], newWords: string[]): DiffSegment[] {
  // Simple line-by-line comparison for large documents
  const segments: DiffSegment[] = [];
  const maxLen = Math.max(oldWords.length, newWords.length);

  let i = 0;
  let j = 0;
  while (i < oldWords.length || j < newWords.length) {
    if (i < oldWords.length && j < newWords.length && oldWords[i] === newWords[j]) {
      if (segments.length > 0 && segments[segments.length - 1].type === "equal") {
        segments[segments.length - 1].text += oldWords[i];
      } else {
        segments.push({ type: "equal", text: oldWords[i] });
      }
      i++;
      j++;
    } else if (i < oldWords.length && (j >= newWords.length || i < maxLen)) {
      if (segments.length > 0 && segments[segments.length - 1].type === "removed") {
        segments[segments.length - 1].text += oldWords[i];
      } else {
        segments.push({ type: "removed", text: oldWords[i] });
      }
      i++;
    } else {
      if (segments.length > 0 && segments[segments.length - 1].type === "added") {
        segments[segments.length - 1].text += newWords[j];
      } else {
        segments.push({ type: "added", text: newWords[j] });
      }
      j++;
    }
  }

  return segments;
}

/* ------------------------------------------------------------------ */
/*  Legal implication detection                                        */
/* ------------------------------------------------------------------ */

interface FlaggedChange {
  flag: LegalFlag;
  removedExcerpt: string;
  addedExcerpt: string;
}

function detectLegalImplications(diff: DiffSegment[]): FlaggedChange[] {
  const flagged: FlaggedChange[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < diff.length; i++) {
    const seg = diff[i];
    if (seg.type === "equal") continue;

    // Get surrounding context
    const contextBefore = diff
      .slice(Math.max(0, i - 2), i)
      .map((s) => s.text)
      .join("");
    const contextAfter = diff
      .slice(i + 1, Math.min(diff.length, i + 3))
      .map((s) => s.text)
      .join("");
    const fullContext = contextBefore + seg.text + contextAfter;

    for (const flag of LEGAL_FLAGS) {
      if (seen.has(flag.name)) continue;
      for (const pattern of flag.patterns) {
        if (pattern.test(seg.text) || pattern.test(fullContext)) {
          // Find corresponding added/removed text nearby
          let removedText = "";
          let addedText = "";
          for (let j = Math.max(0, i - 3); j < Math.min(diff.length, i + 4); j++) {
            if (diff[j].type === "removed") removedText += diff[j].text;
            if (diff[j].type === "added") addedText += diff[j].text;
          }
          flagged.push({
            flag,
            removedExcerpt: removedText.trim().slice(0, 200),
            addedExcerpt: addedText.trim().slice(0, 200),
          });
          seen.add(flag.name);
          break;
        }
      }
    }
  }

  return flagged.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.flag.severity] - order[b.flag.severity];
  });
}

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */

function computeStats(diff: DiffSegment[]) {
  let addedWords = 0;
  let removedWords = 0;
  let unchangedWords = 0;

  for (const seg of diff) {
    const count = seg.text.trim().split(/\s+/).filter(Boolean).length;
    if (seg.type === "added") addedWords += count;
    else if (seg.type === "removed") removedWords += count;
    else unchangedWords += count;
  }

  const totalWords = addedWords + removedWords + unchangedWords;
  const changePct = totalWords > 0 ? Math.round(((addedWords + removedWords) / totalWords) * 100) : 0;

  return { addedWords, removedWords, unchangedWords, changePct };
}

/* ------------------------------------------------------------------ */
/*  Severity badge                                                     */
/* ------------------------------------------------------------------ */

function SeverityBadge({ severity }: { severity: "high" | "medium" | "low" }) {
  const styles = {
    high: "bg-red-100 text-red-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-gray-100 text-gray-600",
  };
  const labels = { high: "High Impact", medium: "Medium Impact", low: "Low Impact" };
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${styles[severity]}`}>
      {labels[severity]}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function DocDiffPage() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [diff, setDiff] = useState<DiffSegment[] | null>(null);
  const [flags, setFlags] = useState<FlaggedChange[]>([]);

  const oldWordCount = useMemo(() => {
    const t = oldText.trim();
    return t ? t.split(/\s+/).length : 0;
  }, [oldText]);

  const newWordCount = useMemo(() => {
    const t = newText.trim();
    return t ? t.split(/\s+/).length : 0;
  }, [newText]);

  function handleCompare() {
    if (!oldText.trim() || !newText.trim()) return;
    const result = computeWordDiff(oldText, newText);
    setDiff(result);
    setFlags(detectLegalImplications(result));
  }

  function handleClear() {
    setOldText("");
    setNewText("");
    setDiff(null);
    setFlags([]);
  }

  const stats = diff ? computeStats(diff) : null;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-purple-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Free Legal Document Diff Checker
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Compare two versions of a contract or legal document. See every
            change highlighted with legal implications flagged automatically.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-sm font-medium px-4 py-2 rounded-full">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Your document text never leaves your browser
          </div>
        </div>
      </section>

      {/* Input */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="old-text" className="block text-lg font-bold text-gray-900 mb-2">
                Original Version
              </label>
              <textarea
                id="old-text"
                rows={14}
                className="w-full border border-gray-300 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-y text-sm"
                placeholder="Paste the original document here..."
                value={oldText}
                onChange={(e) => setOldText(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">
                {oldWordCount.toLocaleString()} words
              </p>
            </div>
            <div>
              <label htmlFor="new-text" className="block text-lg font-bold text-gray-900 mb-2">
                Revised Version
              </label>
              <textarea
                id="new-text"
                rows={14}
                className="w-full border border-gray-300 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-y text-sm"
                placeholder="Paste the revised document here..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">
                {newWordCount.toLocaleString()} words
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleCompare}
              disabled={!oldText.trim() || !newText.trim()}
              className="bg-purple-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-purple-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Compare Documents
            </button>
            {diff && (
              <button
                onClick={handleClear}
                className="border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition"
              >
                Clear &amp; Start Over
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      {diff && stats && (
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-5xl space-y-10">
            {/* Privacy banner */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
              <svg
                className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <p className="text-sm text-green-800">
                <strong>Privacy assured:</strong> This comparison was performed
                entirely in your browser. Your document text was not sent to any
                server.
              </p>
            </div>

            {/* Stats Summary */}
            <div className="bg-white border rounded-xl p-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
                Change Summary
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-extrabold text-gray-900">{stats.changePct}%</p>
                  <p className="text-sm text-gray-500">Changed</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-extrabold text-green-600">+{stats.addedWords}</p>
                  <p className="text-sm text-gray-500">Words Added</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-extrabold text-red-600">-{stats.removedWords}</p>
                  <p className="text-sm text-gray-500">Words Removed</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-extrabold text-purple-600">{flags.length}</p>
                  <p className="text-sm text-gray-500">Legal Flags</p>
                </div>
              </div>
            </div>

            {/* Legal Implications */}
            {flags.length > 0 && (
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                  Legal Implications Detected
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  These changes affect legally significant provisions. Review carefully before signing.
                </p>
                <div className="space-y-3">
                  {flags.map((f, idx) => (
                    <div
                      key={idx}
                      className={`border rounded-xl p-5 border-l-4 ${
                        f.flag.severity === "high"
                          ? "border-l-red-500"
                          : f.flag.severity === "medium"
                          ? "border-l-amber-500"
                          : "border-l-gray-400"
                      } bg-white`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-900">{f.flag.name}</h4>
                        <SeverityBadge severity={f.flag.severity} />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {f.flag.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {f.removedExcerpt && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-xs font-semibold text-red-800 mb-1">Removed:</p>
                            <p className="text-sm text-red-900 font-mono line-clamp-3">
                              {f.removedExcerpt}
                            </p>
                          </div>
                        )}
                        {f.addedExcerpt && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-xs font-semibold text-green-800 mb-1">Added:</p>
                            <p className="text-sm text-green-900 font-mono line-clamp-3">
                              {f.addedExcerpt}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {flags.length === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <p className="text-green-800 font-medium">
                  No legally significant changes detected. The modifications appear to be non-substantive (formatting, typos, etc.).
                </p>
              </div>
            )}

            {/* Inline diff */}
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
                Full Diff
              </h2>
              <div className="bg-gray-50 border rounded-xl p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap max-h-[600px] overflow-y-auto">
                {diff.map((seg, idx) => {
                  if (seg.type === "equal") {
                    return <span key={idx}>{seg.text}</span>;
                  }
                  if (seg.type === "removed") {
                    return (
                      <span
                        key={idx}
                        className="bg-red-200 text-red-900 line-through decoration-red-400"
                      >
                        {seg.text}
                      </span>
                    );
                  }
                  return (
                    <span
                      key={idx}
                      className="bg-green-200 text-green-900"
                    >
                      {seg.text}
                    </span>
                  );
                })}
              </div>
              <div className="flex items-center gap-6 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-red-200 rounded inline-block" /> Removed
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-200 rounded inline-block" /> Added
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Need AI-Powered Contract Review?
              </h3>
              <p className="text-gray-600 mb-4">
                This tool highlights text changes. For AI that understands legal
                meaning, risk-scores clauses, and suggests edits, explore our
                recommended tools.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 bg-purple-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-purple-700 transition"
              >
                Explore AI contract review tools &rarr;
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-50 border rounded-xl p-4 text-xs text-gray-500 text-center">
              <strong>Disclaimer:</strong> This tool is for informational purposes only and does not constitute legal advice. It uses automated text comparison that may miss or mischaracterize changes, and its legal implication flags are based on keyword patterns that may be inaccurate or incomplete. Always have a licensed attorney review contract changes before signing.
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
