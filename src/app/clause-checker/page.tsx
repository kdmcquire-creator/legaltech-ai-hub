"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Clause definitions                                                 */
/* ------------------------------------------------------------------ */

type Importance = "critical" | "recommended" | "nice-to-have";

interface ClauseDef {
  name: string;
  description: string;
  patterns: RegExp[];
  importance: Importance;
  recommendation: string;
}

const CLAUSES: ClauseDef[] = [
  {
    name: "Indemnification",
    description:
      "Requires one party to compensate the other for losses or damages. This is essential for allocating financial risk between parties.",
    patterns: [/indemnif/i, /hold\s+harmless/i, /defend\s+and\s+indemnify/i],
    importance: "critical",
    recommendation:
      "Consider adding an indemnification clause to protect against third-party claims and allocate financial risk.",
  },
  {
    name: "Limitation of Liability",
    description:
      "Caps the total amount of damages a party can recover. Protects both sides from disproportionate financial exposure.",
    patterns: [
      /limitation\s+of\s+liability/i,
      /limit.*liability/i,
      /aggregate\s+liability/i,
      /consequential\s+damages/i,
      /indirect\s+damages/i,
    ],
    importance: "critical",
    recommendation:
      "A limitation of liability clause is strongly recommended to cap potential financial exposure for both parties.",
  },
  {
    name: "Termination",
    description:
      "Defines how and when either party can end the agreement. Without this, exiting the contract can become legally complicated.",
    patterns: [
      /terminat/i,
      /right\s+to\s+terminate/i,
      /termination\s+for\s+cause/i,
      /termination\s+for\s+convenience/i,
    ],
    importance: "critical",
    recommendation:
      "Every contract should include clear termination provisions specifying conditions and notice requirements for ending the agreement.",
  },
  {
    name: "Governing Law",
    description:
      "Specifies which jurisdiction's laws will apply to the contract. Critical for knowing which legal framework governs disputes.",
    patterns: [
      /governing\s+law/i,
      /governed\s+by/i,
      /jurisdiction/i,
      /laws\s+of\s+the\s+state/i,
    ],
    importance: "critical",
    recommendation:
      "Include a governing law clause to avoid costly disputes about which jurisdiction's laws apply.",
  },
  {
    name: "Dispute Resolution",
    description:
      "Outlines the process for resolving disagreements — litigation, arbitration, or mediation. Helps avoid expensive and unpredictable court battles.",
    patterns: [
      /dispute\s+resolution/i,
      /arbitrat/i,
      /mediat/i,
      /dispute.*resolved/i,
    ],
    importance: "critical",
    recommendation:
      "Add a dispute resolution clause specifying whether disputes will be resolved through arbitration, mediation, or litigation.",
  },
  {
    name: "Confidentiality",
    description:
      "Protects sensitive information shared between the parties. Essential when proprietary data or trade secrets are involved.",
    patterns: [
      /confidential/i,
      /non-disclosure/i,
      /proprietary\s+information/i,
      /trade\s+secret/i,
    ],
    importance: "recommended",
    recommendation:
      "If any sensitive or proprietary information is being shared, a confidentiality clause is strongly recommended.",
  },
  {
    name: "Force Majeure",
    description:
      "Excuses performance when extraordinary events (natural disasters, pandemics, etc.) prevent a party from fulfilling obligations.",
    patterns: [
      /force\s+majeure/i,
      /act\s+of\s+god/i,
      /beyond.*control/i,
      /unforeseeable/i,
    ],
    importance: "recommended",
    recommendation:
      "A force majeure clause protects both parties from liability when extraordinary events prevent contract performance.",
  },
  {
    name: "Intellectual Property",
    description:
      "Defines ownership and usage rights for intellectual property created or shared under the agreement.",
    patterns: [
      /intellectual\s+property/i,
      /ip\s+rights/i,
      /ip\s+ownership/i,
      /work.*for.*hire/i,
      /copyright.*assign/i,
    ],
    importance: "recommended",
    recommendation:
      "If any creative work, software, or inventions are involved, clarify IP ownership and licensing rights.",
  },
  {
    name: "Non-Compete / Non-Solicitation",
    description:
      "Restricts parties from competing or poaching employees/clients during and after the contract term.",
    patterns: [
      /non-compete/i,
      /noncompete/i,
      /non-solicitation/i,
      /nonsolicitation/i,
      /not.*solicit/i,
    ],
    importance: "recommended",
    recommendation:
      "Consider whether non-compete or non-solicitation protections are appropriate for your business relationship.",
  },
  {
    name: "Data Protection / Privacy",
    description:
      "Addresses handling of personal data and compliance with privacy regulations like GDPR and CCPA.",
    patterns: [
      /data\s+protection/i,
      /personal\s+data/i,
      /privacy/i,
      /GDPR/i,
      /CCPA/i,
      /data\s+processing/i,
    ],
    importance: "recommended",
    recommendation:
      "If personal data is processed, a data protection clause is essential for regulatory compliance (GDPR, CCPA, etc.).",
  },
  {
    name: "Payment Terms",
    description:
      "Specifies compensation amounts, payment schedules, invoicing requirements, and late payment penalties.",
    patterns: [
      /payment.*terms/i,
      /net\s+\d+/i,
      /invoice/i,
      /payment.*due/i,
      /compensation/i,
    ],
    importance: "recommended",
    recommendation:
      "Clear payment terms help prevent disputes about amounts owed, due dates, and payment methods.",
  },
  {
    name: "Warranty / Representations",
    description:
      "Contains promises about the quality of goods/services or the truth of certain statements. Defines remedies if warranties are breached.",
    patterns: [
      /warrant/i,
      /representation/i,
      /represents\s+and\s+warrants/i,
      /as-is/i,
      /as\s+is/i,
    ],
    importance: "recommended",
    recommendation:
      'Include warranty provisions or an explicit "as-is" disclaimer to set clear expectations about quality and performance.',
  },
  {
    name: "Insurance Requirements",
    description:
      "Requires one or both parties to maintain specific insurance coverage, reducing financial risk from unforeseen incidents.",
    patterns: [
      /insurance/i,
      /coverage.*maintain/i,
      /proof\s+of\s+insurance/i,
      /certificate\s+of\s+insurance/i,
    ],
    importance: "nice-to-have",
    recommendation:
      "For higher-risk engagements, consider requiring proof of adequate insurance coverage.",
  },
  {
    name: "Assignment",
    description:
      "Controls whether either party can transfer their rights or obligations under the contract to a third party.",
    patterns: [
      /assign.*agreement/i,
      /assignment/i,
      /not.*assign/i,
      /consent.*assign/i,
    ],
    importance: "nice-to-have",
    recommendation:
      "An assignment clause prevents either party from transferring obligations to an unknown third party without consent.",
  },
  {
    name: "Severability",
    description:
      "Ensures that if one provision is found unenforceable, the rest of the contract remains in effect.",
    patterns: [
      /severab/i,
      /if\s+any\s+provision/i,
      /remaining\s+provisions/i,
      /unenforceable/i,
    ],
    importance: "nice-to-have",
    recommendation:
      "A severability clause protects the entire agreement if any single provision is struck down by a court.",
  },
];

/* ------------------------------------------------------------------ */
/*  Analysis logic                                                     */
/* ------------------------------------------------------------------ */

interface ClauseResult {
  clause: ClauseDef;
  found: boolean;
  excerpt: string | null;
}

function analyzeContract(text: string): ClauseResult[] {
  return CLAUSES.map((clause) => {
    for (const pattern of clause.patterns) {
      const match = pattern.exec(text);
      if (match && match.index !== undefined) {
        const start = Math.max(0, match.index - 40);
        const end = Math.min(text.length, match.index + match[0].length + 60);
        let excerpt = text.slice(start, end).replace(/\n/g, " ").trim();
        if (start > 0) excerpt = "..." + excerpt;
        if (end < text.length) excerpt = excerpt + "...";
        return { clause, found: true, excerpt };
      }
    }
    return { clause, found: false, excerpt: null };
  });
}

/* ------------------------------------------------------------------ */
/*  Helper components                                                  */
/* ------------------------------------------------------------------ */

function ImportanceBadge({ importance }: { importance: Importance }) {
  const styles: Record<Importance, string> = {
    critical: "bg-red-100 text-red-700",
    recommended: "bg-amber-100 text-amber-700",
    "nice-to-have": "bg-gray-100 text-gray-600",
  };
  const labels: Record<Importance, string> = {
    critical: "Critical",
    recommended: "Recommended",
    "nice-to-have": "Nice to Have",
  };
  return (
    <span
      className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${styles[importance]}`}
    >
      {labels[importance]}
    </span>
  );
}

function ScoreRing({
  found,
  total,
}: {
  found: number;
  total: number;
}) {
  const pct = Math.round((found / total) * 100);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const color =
    pct >= 80 ? "text-green-500" : pct >= 50 ? "text-amber-500" : "text-red-500";

  return (
    <div className="flex flex-col items-center">
      <svg width="128" height="128" className="-rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={color}
        />
      </svg>
      <div className="absolute mt-8 flex flex-col items-center">
        <span className={`text-3xl font-extrabold ${color}`}>{found}</span>
        <span className="text-sm text-gray-500">of {total}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function ClauseCheckerPage() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<ClauseResult[] | null>(null);

  const wordCount = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [text]);

  const charCount = text.length;

  function handleAnalyze() {
    if (!text.trim()) return;
    setResults(analyzeContract(text));
  }

  function handleClear() {
    setText("");
    setResults(null);
  }

  const foundCount = results ? results.filter((r) => r.found).length : 0;
  const totalCount = CLAUSES.length;
  const criticalResults = results?.filter(
    (r) => r.clause.importance === "critical"
  );
  const recommendedResults = results?.filter(
    (r) => r.clause.importance === "recommended"
  );
  const niceToHaveResults = results?.filter(
    (r) => r.clause.importance === "nice-to-have"
  );
  const allCriticalPresent = criticalResults?.every((r) => r.found) ?? false;
  const missingCritical = criticalResults?.filter((r) => !r.found) ?? [];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Free Contract Clause Checker
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Paste your contract text below and instantly see which of the 15
            most important standard legal clauses are present or missing.
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
            Your contract text never leaves your browser
          </div>
        </div>
      </section>

      {/* Input */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <label
            htmlFor="contract-text"
            className="block text-lg font-bold text-gray-900 mb-2"
          >
            Contract Text
          </label>
          <textarea
            id="contract-text"
            rows={12}
            className="w-full border border-gray-300 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y"
            placeholder="Paste your contract text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
            <span>
              {charCount.toLocaleString()} characters &middot;{" "}
              {wordCount.toLocaleString()} words
            </span>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleAnalyze}
              disabled={!text.trim()}
              className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Analyze Contract
            </button>
            {results && (
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
      {results && (
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-3xl space-y-10">
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
                <strong>Privacy assured:</strong> This analysis was performed
                entirely in your browser. Your contract text was not sent to any
                server.
              </p>
            </div>

            {/* Summary */}
            <div className="bg-white border rounded-xl p-8 flex flex-col sm:flex-row items-center gap-8">
              <div className="relative flex items-center justify-center">
                <ScoreRing found={foundCount} total={totalCount} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                  Found {foundCount} of {totalCount} Standard Clauses
                </h2>
                {allCriticalPresent ? (
                  <p className="text-green-700 font-medium">
                    Your contract covers all critical protections.
                  </p>
                ) : (
                  <p className="text-red-700 font-medium">
                    Warning: {missingCritical.length} critical clause
                    {missingCritical.length > 1 ? "s are" : " is"} missing (
                    {missingCritical
                      .map((r) => r.clause.name)
                      .join(", ")}
                    ). Review these urgently.
                  </p>
                )}
              </div>
            </div>

            {/* Grouped results */}
            <ResultSection
              title="Critical Clauses"
              description="These clauses are essential in virtually every commercial contract."
              results={criticalResults ?? []}
              accentBorder="border-l-red-500"
            />
            <ResultSection
              title="Recommended Clauses"
              description="Strongly recommended depending on the nature of the agreement."
              results={recommendedResults ?? []}
              accentBorder="border-l-amber-500"
            />
            <ResultSection
              title="Nice-to-Have Clauses"
              description="Good practice to include for a more robust agreement."
              results={niceToHaveResults ?? []}
              accentBorder="border-l-gray-400"
            />

            {/* CTA */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Want a Deeper Analysis?
              </h3>
              <p className="text-gray-600 mb-4">
                This tool provides a basic pattern-matching check. For
                AI-powered clause-by-clause review with risk scoring, explore
                our recommended contract review tools.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                Check out our recommended contract review tools &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Result section component                                           */
/* ------------------------------------------------------------------ */

function ResultSection({
  title,
  description,
  results,
  accentBorder,
}: {
  title: string;
  description: string;
  results: ClauseResult[];
  accentBorder: string;
}) {
  const found = results.filter((r) => r.found).length;
  const total = results.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <span className="text-sm font-medium text-gray-500">
          {found}/{total} found
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <div className="space-y-3">
        {results.map((result) => (
          <div
            key={result.clause.name}
            className={`border rounded-xl p-5 border-l-4 ${accentBorder} ${
              result.found ? "bg-white" : "bg-gray-50"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  {result.found ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Found
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Missing
                    </span>
                  )}
                  <h4 className="font-bold text-gray-900">
                    {result.clause.name}
                  </h4>
                  <ImportanceBadge importance={result.clause.importance} />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {result.clause.description}
                </p>
                {result.found && result.excerpt && (
                  <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs font-semibold text-green-800 mb-1">
                      Detected in your contract:
                    </p>
                    <p className="text-sm text-green-900 font-mono leading-relaxed">
                      &quot;{result.excerpt}&quot;
                    </p>
                  </div>
                )}
                {!result.found && (
                  <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-xs font-semibold text-amber-800 mb-1">
                      Recommendation:
                    </p>
                    <p className="text-sm text-amber-900">
                      {result.clause.recommendation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
