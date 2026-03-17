"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Gap analysis categories                                            */
/* ------------------------------------------------------------------ */

type GapSeverity = "critical" | "important" | "suggestion";

interface GapPattern {
  name: string;
  category: string;
  severity: GapSeverity;
  description: string;
  recommendation: string;
  /** Positive patterns — if found, the argument addresses this area */
  presentPatterns: RegExp[];
  /** The gap fires when NONE of the presentPatterns match */
}

const GAP_PATTERNS: GapPattern[] = [
  // ─── STRUCTURAL GAPS ──────────────────────────────────────
  {
    name: "No Statement of the Legal Standard",
    category: "Structure",
    severity: "critical",
    description:
      "The argument does not appear to state the applicable legal standard, test, or rule that governs the issue.",
    recommendation:
      "State the legal standard or test up front (e.g. 'Under the Chevron two-step framework...' or 'Negligence requires proof of duty, breach, causation, and damages.').",
    presentPatterns: [
      /standard\s+of\s+review/i,
      /legal\s+standard/i,
      /the\s+test\s+(is|for|requires)/i,
      /elements?\s+(of|are|include)/i,
      /requires?\s+proof\s+of/i,
      /must\s+(show|demonstrate|prove|establish)/i,
      /prima\s+facie/i,
      /burden\s+of\s+proof/i,
      /under\s+\w+\s+(v\.|vs\.)/i,
      /pursuant\s+to/i,
      /governed\s+by/i,
    ],
  },
  {
    name: "No Clear Conclusion or Relief Sought",
    category: "Structure",
    severity: "critical",
    description:
      "The argument does not appear to state what outcome or relief is being requested.",
    recommendation:
      "Include an explicit conclusion stating the specific relief or outcome sought (e.g. 'For the foregoing reasons, the Court should grant summary judgment...').",
    presentPatterns: [
      /therefore/i,
      /for\s+(the\s+)?(foregoing|above)\s+reasons/i,
      /in\s+conclusion/i,
      /respectfully\s+request/i,
      /should\s+(grant|deny|dismiss|reverse|affirm|enter|sustain|overrule)/i,
      /relief\s+(sought|requested)/i,
      /prayer\s+for\s+relief/i,
      /wherefore/i,
      /this\s+court\s+should/i,
    ],
  },
  {
    name: "No Factual Foundation",
    category: "Structure",
    severity: "critical",
    description:
      "The argument does not appear to include a factual background or statement of facts.",
    recommendation:
      "Include a clear statement of the relevant facts before applying the law. Courts need a factual foundation to evaluate legal arguments.",
    presentPatterns: [
      /statement\s+of\s+facts/i,
      /factual\s+background/i,
      /the\s+facts\s+(are|show|demonstrate|establish)/i,
      /on\s+or\s+about\s+\w+\s+\d/i,
      /the\s+(plaintiff|defendant|petitioner|respondent|appellant|appellee)\s+(is|was|did|filed|alleged)/i,
      /on\s+\w+\s+\d{1,2},?\s+\d{4}/i,
      /according\s+to\s+the\s+record/i,
    ],
  },

  // ─── AUTHORITY GAPS ────────────────────────────────────────
  {
    name: "No Case Law Citations",
    category: "Authority",
    severity: "critical",
    description:
      "The argument does not appear to cite any case law. Legal arguments generally require authority to be persuasive.",
    recommendation:
      "Cite relevant case law that supports your position. Include binding authority from the applicable jurisdiction where possible.",
    presentPatterns: [
      /\d+\s+\w+\.?\s*(\d+d|\w{2,}\.)\s+\d+/i, // e.g. 570 U.S. 529, 42 F.3d 120
      /v\.\s+\w+/i, // "v. Smith"
      /\d+\s+(U\.S\.|S\.\s*Ct\.|F\.\s*\d|F\.\s*Supp|L\.\s*Ed)/i,
      /supra/i,
      /id\.\s+at/i,
      /see\s+(also\s+)?\w+/i,
      /\(\d{4}\)/i, // year cite (2024)
      /slip\s+op/i,
    ],
  },
  {
    name: "No Statutory or Regulatory Authority",
    category: "Authority",
    severity: "important",
    description:
      "The argument does not appear to cite any statutes, regulations, or codes.",
    recommendation:
      "If applicable, cite the relevant statute, regulation, or code section that governs the issue (e.g. '42 U.S.C. \u00a7 1983' or 'Cal. Civ. Code \u00a7 1542').",
    presentPatterns: [
      /\u00a7\s*\d/i,
      /section\s+\d/i,
      /U\.S\.C\./i,
      /C\.F\.R\./i,
      /stat\./i,
      /code\s+\u00a7/i,
      /(civ|pen|bus|gov|fam|prob|evid|crim)\.\s*code/i,
      /regulation/i,
      /rule\s+\d/i,
      /article\s+\w+/i,
    ],
  },

  // ─── REASONING GAPS ────────────────────────────────────────
  {
    name: "No Application of Law to Facts",
    category: "Reasoning",
    severity: "critical",
    description:
      "The argument states legal rules and facts separately but does not appear to explicitly apply the law to the specific facts of the case.",
    recommendation:
      "After stating each legal element or rule, apply it to your specific facts. Use phrases like 'Here, [fact] satisfies [element] because...' or 'In this case, the evidence shows...'.",
    presentPatterns: [
      /here,?\s+/i,
      /in\s+this\s+case/i,
      /in\s+the\s+present\s+case/i,
      /in\s+the\s+instant\s+case/i,
      /applying\s+(this|the)\s+(test|standard|rule|framework)/i,
      /the\s+evidence\s+(shows|demonstrates|establishes)/i,
      /these\s+facts\s+(show|demonstrate|establish|satisfy)/i,
      /satisf(y|ies)\s+(this|the|each|every|all)\s+(element|prong|factor|requirement)/i,
    ],
  },
  {
    name: "No Counterargument Addressed",
    category: "Reasoning",
    severity: "important",
    description:
      "The argument does not appear to anticipate or address potential counterarguments or opposing positions.",
    recommendation:
      "Address the strongest counterarguments head-on. Acknowledging and rebutting opposing positions strengthens your argument and demonstrates thoroughness.",
    presentPatterns: [
      /although/i,
      /notwithstanding/i,
      /despite/i,
      /even\s+(if|though|assuming)/i,
      /the\s+opposing/i,
      /defendant\s+(argues|contends|claims|asserts)/i,
      /plaintiff\s+(argues|contends|claims|asserts)/i,
      /respondent\s+(argues|contends|claims|asserts)/i,
      /this\s+argument\s+fails/i,
      /however/i,
      /on\s+the\s+contrary/i,
      /contrary\s+to/i,
      /distinguishable/i,
      /misplaced/i,
    ],
  },
  {
    name: "No Analogical Reasoning",
    category: "Reasoning",
    severity: "suggestion",
    description:
      "The argument does not appear to draw analogies to similar cases or distinguish unfavorable precedent.",
    recommendation:
      "Strengthen your argument by analogizing to favorable cases ('Like in [Case], where the court held...') and distinguishing unfavorable ones ('Unlike [Case], here the facts differ because...').",
    presentPatterns: [
      /similar(ly)?\s+to/i,
      /analogous/i,
      /like\s+in\s+\w+/i,
      /as\s+in\s+\w+/i,
      /unlike/i,
      /distinguishable/i,
      /distinguish/i,
      /by\s+contrast/i,
      /on\s+all\s+fours/i,
      /compare/i,
    ],
  },

  // ─── PERSUASIVENESS GAPS ───────────────────────────────────
  {
    name: "No Policy Argument",
    category: "Persuasiveness",
    severity: "suggestion",
    description:
      "The argument does not appear to address the policy rationale behind the legal rule or why the requested outcome serves justice.",
    recommendation:
      "Where appropriate, explain why the legal rule exists and how the requested outcome serves the underlying policy goals (fairness, deterrence, efficiency, etc.).",
    presentPatterns: [
      /polic(y|ies)/i,
      /purpose\s+of\s+the\s+(law|rule|statute)/i,
      /legislative\s+(intent|history|purpose)/i,
      /public\s+(interest|policy)/i,
      /fairness/i,
      /justice\s+requires/i,
      /equit(y|able)/i,
      /would\s+undermine/i,
      /chilling\s+effect/i,
      /slippery\s+slope/i,
    ],
  },
  {
    name: "No Quantified Damages or Harm",
    category: "Persuasiveness",
    severity: "important",
    description:
      "If seeking damages or alleging harm, the argument does not appear to quantify or specifically describe the harm suffered.",
    recommendation:
      "Be specific about the nature and extent of harm. Quantify damages where possible (dollar amounts, time periods, scope of impact).",
    presentPatterns: [
      /\$\s*[\d,]+/i,
      /damages?\s+(of|in\s+the\s+amount|totaling)/i,
      /suffered\s+(harm|loss|damage|injur)/i,
      /irreparable\s+harm/i,
      /quantif/i,
      /economic\s+loss/i,
      /lost\s+(profits|revenue|wages|earnings)/i,
      /injury\s+consist/i,
    ],
  },
  {
    name: "No Standard of Review Identified",
    category: "Structure",
    severity: "important",
    description:
      "For appellate or motion practice, the argument does not identify the applicable standard of review (de novo, abuse of discretion, clearly erroneous, etc.).",
    recommendation:
      "Identify the standard of review early. For motions: state whether the standard is 'more likely than not,' 'substantial likelihood,' etc. For appeals: state 'de novo,' 'abuse of discretion,' or 'clearly erroneous.'",
    presentPatterns: [
      /de\s+novo/i,
      /abuse\s+of\s+discretion/i,
      /clearly\s+erroneous/i,
      /substantial\s+evidence/i,
      /standard\s+of\s+review/i,
      /plenary\s+review/i,
      /reviewed\s+for/i,
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Analysis logic                                                     */
/* ------------------------------------------------------------------ */

interface GapResult {
  pattern: GapPattern;
  found: boolean; // true = addressed, false = gap detected
}

function analyzeArgument(text: string): GapResult[] {
  return GAP_PATTERNS.map((pattern) => {
    const found = pattern.presentPatterns.some((p) => p.test(text));
    return { pattern, found };
  });
}

function computeScore(results: GapResult[]): number {
  let total = 0;
  let earned = 0;
  const weights = { critical: 3, important: 2, suggestion: 1 };

  for (const r of results) {
    const w = weights[r.pattern.severity];
    total += w;
    if (r.found) earned += w;
  }

  return total > 0 ? Math.round((earned / total) * 100) : 0;
}

/* ------------------------------------------------------------------ */
/*  Helper components                                                  */
/* ------------------------------------------------------------------ */

function SeverityBadge({ severity }: { severity: GapSeverity }) {
  const styles = {
    critical: "bg-red-100 text-red-700",
    important: "bg-amber-100 text-amber-700",
    suggestion: "bg-blue-100 text-blue-700",
  };
  const labels = { critical: "Critical", important: "Important", suggestion: "Suggestion" };
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${styles[severity]}`}>
      {labels[severity]}
    </span>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80 ? "text-green-500" : score >= 50 ? "text-amber-500" : "text-red-500";
  const grade =
    score >= 90 ? "A" : score >= 80 ? "B+" : score >= 70 ? "B" : score >= 60 ? "C+" : score >= 50 ? "C" : score >= 40 ? "D" : "F";

  return (
    <div className="flex flex-col items-center">
      <svg width="128" height="128" className="-rotate-90">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="10" />
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
      <div className="absolute mt-6 flex flex-col items-center">
        <span className={`text-3xl font-extrabold ${color}`}>{grade}</span>
        <span className="text-sm text-gray-500">{score}%</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function ArgumentGapPage() {
  const [text, setText] = useState("");
  const [context, setContext] = useState("");
  const [results, setResults] = useState<GapResult[] | null>(null);

  const wordCount = useMemo(() => {
    const t = text.trim();
    return t ? t.split(/\s+/).length : 0;
  }, [text]);

  function handleAnalyze() {
    if (!text.trim()) return;
    // Combine main text and context for analysis
    const combined = text + "\n" + context;
    setResults(analyzeArgument(combined));
  }

  function handleClear() {
    setText("");
    setContext("");
    setResults(null);
  }

  const gaps = results?.filter((r) => !r.found) ?? [];
  const addressed = results?.filter((r) => r.found) ?? [];
  const score = results ? computeScore(results) : 0;

  const criticalGaps = gaps.filter((r) => r.pattern.severity === "critical");
  const importantGaps = gaps.filter((r) => r.pattern.severity === "important");
  const suggestionGaps = gaps.filter((r) => r.pattern.severity === "suggestion");

  const categories = results
    ? Array.from(new Set(GAP_PATTERNS.map((p) => p.category)))
    : [];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-amber-50 py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Free Legal Argument Gap Analyzer
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Paste a legal argument, brief, or memo. Get instant analysis of
            structural gaps, missing authority, weak reasoning, and persuasiveness issues.
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
        <div className="container mx-auto px-4 max-w-3xl">
          <label htmlFor="argument-text" className="block text-lg font-bold text-gray-900 mb-2">
            Legal Argument
          </label>
          <textarea
            id="argument-text"
            rows={14}
            className="w-full border border-gray-300 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-y"
            placeholder="Paste your legal argument, brief, memo, or motion here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
            <span>{wordCount.toLocaleString()} words</span>
          </div>

          <div className="mt-6">
            <label htmlFor="context-text" className="block text-sm font-bold text-gray-900 mb-2">
              Context (optional)
            </label>
            <textarea
              id="context-text"
              rows={4}
              className="w-full border border-gray-300 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-y text-sm"
              placeholder="Describe what you're trying to prove, the type of motion, cause of action, or any other context that helps the analysis..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleAnalyze}
              disabled={!text.trim()}
              className="bg-amber-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-amber-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Analyze Argument
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
                entirely in your browser. Your argument text was not sent to any
                server.
              </p>
            </div>

            {/* Score Summary */}
            <div className="bg-white border rounded-xl p-8 flex flex-col sm:flex-row items-center gap-8">
              <div className="relative flex items-center justify-center">
                <ScoreRing score={score} />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                  Argument Completeness: {score}%
                </h2>
                <p className="text-gray-600 mb-3">
                  {addressed.length} of {results.length} analysis criteria addressed.
                </p>
                {criticalGaps.length > 0 ? (
                  <p className="text-red-700 font-medium">
                    {criticalGaps.length} critical gap{criticalGaps.length > 1 ? "s" : ""} detected.
                    Address {criticalGaps.length > 1 ? "these" : "this"} before filing.
                  </p>
                ) : gaps.length > 0 ? (
                  <p className="text-amber-700 font-medium">
                    No critical gaps, but {gaps.length} area{gaps.length > 1 ? "s" : ""} could be strengthened.
                  </p>
                ) : (
                  <p className="text-green-700 font-medium">
                    Your argument addresses all major areas. Strong foundation.
                  </p>
                )}
              </div>
            </div>

            {/* Gaps Found */}
            {gaps.length > 0 && (
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
                  Gaps Identified
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  These areas were not detected in your argument. Review each and determine if it applies to your case.
                </p>

                {criticalGaps.length > 0 && (
                  <GapSection
                    title="Critical Gaps"
                    description="Address these before filing — they represent fundamental elements expected in most legal arguments."
                    items={criticalGaps}
                    accentBorder="border-l-red-500"
                  />
                )}
                {importantGaps.length > 0 && (
                  <GapSection
                    title="Important Gaps"
                    description="Strongly recommended to address — these strengthen your argument significantly."
                    items={importantGaps}
                    accentBorder="border-l-amber-500"
                  />
                )}
                {suggestionGaps.length > 0 && (
                  <GapSection
                    title="Suggestions"
                    description="Consider adding these for a more polished and persuasive argument."
                    items={suggestionGaps}
                    accentBorder="border-l-blue-400"
                  />
                )}
              </div>
            )}

            {/* Areas Addressed */}
            {addressed.length > 0 && (
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
                  Areas Addressed
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {addressed.map((r) => (
                    <div
                      key={r.pattern.name}
                      className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3"
                    >
                      <svg
                        className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
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
                      <div>
                        <p className="font-semibold text-green-900 text-sm">
                          {r.pattern.name}
                        </p>
                        <p className="text-green-700 text-xs">{r.pattern.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Need AI-Powered Legal Research?
              </h3>
              <p className="text-gray-600 mb-4">
                This tool checks argument structure with pattern matching. For
                AI that finds relevant case law, verifies citations, and drafts
                research memos, explore our recommended tools.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 bg-amber-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-amber-700 transition"
              >
                Explore AI legal research tools &rarr;
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-50 border rounded-xl p-4 text-xs text-gray-500 text-center">
              <strong>Disclaimer:</strong> This tool uses pattern matching to identify
              common structural elements in legal arguments. It is not a substitute for
              legal judgment. Always have a licensed attorney review your filings.
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gap section component                                              */
/* ------------------------------------------------------------------ */

function GapSection({
  title,
  description,
  items,
  accentBorder,
}: {
  title: string;
  description: string;
  items: GapResult[];
  accentBorder: string;
}) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-3">{description}</p>
      <div className="space-y-3">
        {items.map((r) => (
          <div
            key={r.pattern.name}
            className={`border rounded-xl p-5 border-l-4 ${accentBorder} bg-white`}
          >
            <div className="flex items-center gap-3 mb-2">
              <h4 className="font-bold text-gray-900">{r.pattern.name}</h4>
              <SeverityBadge severity={r.pattern.severity} />
              <span className="text-xs text-gray-400">{r.pattern.category}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{r.pattern.description}</p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-amber-800 mb-1">
                Recommendation:
              </p>
              <p className="text-sm text-amber-900">{r.pattern.recommendation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
