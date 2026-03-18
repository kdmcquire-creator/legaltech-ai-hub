"use client";

import React, { useState } from "react";
import Link from "next/link";

type Answer = "yes" | "no" | "not-sure";

interface Question {
  text: string;
  actionItem: string;
}

interface Category {
  name: string;
  icon: string;
  questions: Question[];
}

const categories: Category[] = [
  {
    name: "Business Formation",
    icon: "🏢",
    questions: [
      {
        text: "Do you have a registered business entity (LLC, corporation, etc.)?",
        actionItem:
          "Consider forming an LLC or corporation to protect your personal assets from business liabilities. This is one of the most important steps for any business owner.",
      },
      {
        text: "Do you have an operating agreement or bylaws?",
        actionItem:
          "Draft an operating agreement (for LLCs) or bylaws (for corporations) to define ownership structure, member responsibilities, and decision-making processes. This prevents costly disputes later.",
      },
      {
        text: "Is your business registered in all states where you operate?",
        actionItem:
          "Register as a foreign entity in every state where you have employees, offices, or significant business activity. Operating without proper registration can result in fines and loss of legal protections.",
      },
    ],
  },
  {
    name: "Contracts & Agreements",
    icon: "📝",
    questions: [
      {
        text: "Do you use written contracts with all clients and customers?",
        actionItem:
          "Implement written contracts for every client and customer relationship. Verbal agreements are difficult to enforce and leave you exposed to disputes over scope, payment, and deliverables.",
      },
      {
        text: "Do your contracts include limitation of liability clauses?",
        actionItem:
          "Add limitation of liability clauses to your contracts to cap your potential exposure. Without them, a single dispute could result in damages that far exceed the value of the contract.",
      },
      {
        text: "Do you have standard NDAs for sharing confidential information?",
        actionItem:
          "Create a standard NDA template for use before sharing proprietary information with potential partners, vendors, or employees. This protects your trade secrets and confidential business data.",
      },
    ],
  },
  {
    name: "Intellectual Property",
    icon: "💡",
    questions: [
      {
        text: "Have you registered your business name or trademark?",
        actionItem:
          "File for federal trademark registration to protect your brand name and logo. Unregistered marks have limited geographic protection and are harder to enforce against infringers.",
      },
      {
        text: "Do you have IP assignment clauses in employee and contractor agreements?",
        actionItem:
          "Add intellectual property assignment clauses to all employment and contractor agreements to ensure your business owns the work product created for it. Without these, contractors may retain ownership of their work.",
      },
      {
        text: "Do you have a process for protecting trade secrets?",
        actionItem:
          "Establish a trade secret protection program including access controls, confidentiality agreements, and employee training. Document what constitutes a trade secret in your business to strengthen legal claims if misappropriation occurs.",
      },
    ],
  },
  {
    name: "Employment & HR",
    icon: "👥",
    questions: [
      {
        text: "Do you have written employment agreements for all employees?",
        actionItem:
          "Create written employment agreements that cover compensation, benefits, termination conditions, non-compete clauses, and confidentiality obligations. This protects both you and your employees.",
      },
      {
        text: "Do you have an employee handbook with key policies?",
        actionItem:
          "Develop an employee handbook covering anti-discrimination, harassment, leave policies, remote work, and disciplinary procedures. A well-drafted handbook reduces legal risk and sets clear expectations.",
      },
      {
        text: "Are your independent contractors properly classified?",
        actionItem:
          "Audit your contractor relationships using IRS guidelines and state-specific tests. Misclassification can result in back taxes, penalties, and liability for unpaid benefits. When in doubt, consult an employment attorney.",
      },
    ],
  },
  {
    name: "Compliance & Privacy",
    icon: "🔒",
    questions: [
      {
        text: "Do you have a privacy policy that complies with applicable laws?",
        actionItem:
          "Create or update your privacy policy to comply with CCPA, GDPR, and other applicable privacy regulations. If you collect any personal data — even email addresses — a compliant privacy policy is legally required in most jurisdictions.",
      },
      {
        text: "Are you compliant with industry-specific regulations?",
        actionItem:
          "Identify and document all industry-specific regulations that apply to your business (HIPAA, PCI-DSS, SOX, etc.) and conduct a compliance audit. Non-compliance can result in significant fines and loss of business licenses.",
      },
      {
        text: "Do you have a data breach response plan?",
        actionItem:
          "Develop a written data breach response plan that includes notification procedures, containment steps, and communication templates. Most states require breach notification within a specific timeframe — you need a plan before an incident occurs.",
      },
    ],
  },
  {
    name: "Insurance & Risk",
    icon: "🛡️",
    questions: [
      {
        text: "Do you carry general liability insurance?",
        actionItem:
          "Obtain general liability insurance to cover third-party bodily injury, property damage, and advertising injury claims. This is foundational coverage that most businesses need regardless of size.",
      },
      {
        text: "Do you have professional liability (E&O) insurance?",
        actionItem:
          "Consider professional liability or errors and omissions (E&O) insurance to protect against claims of negligence, mistakes, or failure to deliver services. This is critical for any business that provides professional advice or services.",
      },
      {
        text: "Do you have cyber liability insurance?",
        actionItem:
          "Obtain cyber liability insurance to cover costs associated with data breaches, ransomware attacks, and other cyber incidents. Even small businesses are targets, and breach costs can be devastating without coverage.",
      },
    ],
  },
];

const scoreTier = (
  percentage: number
): { label: string; color: string; bgColor: string; borderColor: string } => {
  if (percentage >= 90)
    return {
      label: "Excellent",
      color: "text-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    };
  if (percentage >= 70)
    return {
      label: "Good",
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    };
  if (percentage >= 50)
    return {
      label: "Needs Improvement",
      color: "text-amber-700",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    };
  return {
    label: "At Risk",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  };
};

const categoryBarColor = (score: number, max: number): string => {
  const pct = (score / max) * 100;
  if (pct >= 90) return "bg-green-500";
  if (pct >= 70) return "bg-blue-500";
  if (pct >= 50) return "bg-amber-500";
  return "bg-red-500";
};

export default function LegalReadinessPage() {
  const [stage, setStage] = useState<"start" | "quiz" | "results">("start");
  const [currentCategory, setCurrentCategory] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const totalQuestions = categories.reduce(
    (sum, cat) => sum + cat.questions.length,
    0
  );

  const answerKey = (catIndex: number, qIndex: number) =>
    `${catIndex}-${qIndex}`;

  const setAnswer = (catIndex: number, qIndex: number, value: Answer) => {
    setAnswers((prev) => ({ ...prev, [answerKey(catIndex, qIndex)]: value }));
  };

  const currentCategoryAllAnswered = () => {
    const cat = categories[currentCategory];
    return cat.questions.every(
      (_, qIdx) => answers[answerKey(currentCategory, qIdx)] !== undefined
    );
  };

  const scoreForAnswer = (answer: Answer): number => {
    if (answer === "yes") return 2;
    if (answer === "not-sure") return 1;
    return 0;
  };

  const categoryScore = (catIndex: number): number => {
    return categories[catIndex].questions.reduce((sum, _, qIdx) => {
      const a = answers[answerKey(catIndex, qIdx)];
      return sum + (a ? scoreForAnswer(a) : 0);
    }, 0);
  };

  const totalScore = categories.reduce(
    (sum, _, catIdx) => sum + categoryScore(catIdx),
    0
  );
  const maxScore = totalQuestions * 2;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const tier = scoreTier(percentage);

  const handleNext = () => {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory((prev) => prev + 1);
    } else {
      setStage("results");
    }
  };

  const handlePrev = () => {
    if (currentCategory > 0) {
      setCurrentCategory((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentCategory(0);
    setStage("start");
  };

  const actionItems: { category: string; question: string; actionItem: string; answer: Answer }[] = [];
  categories.forEach((cat, catIdx) => {
    cat.questions.forEach((q, qIdx) => {
      const a = answers[answerKey(catIdx, qIdx)];
      if (a === "no" || a === "not-sure") {
        actionItems.push({
          category: cat.name,
          question: q.text,
          actionItem: q.actionItem,
          answer: a,
        });
      }
    });
  });

  // --- START SCREEN ---
  if (stage === "start") {
    return (
      <div className="bg-white min-h-screen">
        <section className="bg-gradient-to-br from-rose-600 via-pink-600 to-purple-700 py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold text-white mb-4">
              Legal Readiness Assessment
            </h1>
            <p className="text-xl text-rose-100">
              Evaluate your business&apos;s legal health in under 5 minutes.
              Get a personalized score and action plan — completely free.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="border rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4">
                  <div className="text-3xl mb-2">📋</div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    18 Questions
                  </h3>
                  <p className="text-sm text-gray-600">
                    Across 6 key legal categories for your business
                  </p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">⏱️</div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Under 5 Minutes
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quick yes/no/not sure answers — no legal expertise needed
                  </p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Instant Results
                  </h3>
                  <p className="text-sm text-gray-600">
                    Get your score and prioritized action items immediately
                  </p>
                </div>
              </div>

              <div className="text-left bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Categories Covered:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center gap-2 text-gray-700 text-sm"
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStage("quiz")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Assessment
              </button>
              <p className="text-xs text-gray-500 mt-3">
                No sign-up required. Your answers are not stored.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // --- QUIZ SCREEN ---
  if (stage === "quiz") {
    const cat = categories[currentCategory];
    const answeredCount = Object.keys(answers).length;
    const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

    return (
      <div className="bg-white min-h-screen">
        <section className="bg-blue-50 py-8">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Legal Readiness Assessment
              </h1>
              <span className="text-sm text-gray-600 font-medium">
                Category {currentCategory + 1} of {categories.length}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              {categories.map((c, idx) => (
                <div
                  key={c.name}
                  className={`text-xs font-medium ${
                    idx === currentCategory
                      ? "text-blue-600"
                      : idx < currentCategory
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {idx < currentCategory ? "✓" : idx + 1}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{cat.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">
                  {cat.name}
                </h2>
              </div>

              <div className="space-y-6">
                {cat.questions.map((q, qIdx) => {
                  const current = answers[answerKey(currentCategory, qIdx)];
                  return (
                    <div
                      key={qIdx}
                      className="border rounded-lg p-5 bg-gray-50"
                    >
                      <p className="text-gray-900 font-medium mb-4">
                        {qIdx + 1}. {q.text}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() =>
                            setAnswer(currentCategory, qIdx, "yes")
                          }
                          className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors border ${
                            current === "yes"
                              ? "bg-green-600 text-white border-green-600"
                              : "bg-white text-green-700 border-green-300 hover:bg-green-50"
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() =>
                            setAnswer(currentCategory, qIdx, "not-sure")
                          }
                          className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors border ${
                            current === "not-sure"
                              ? "bg-amber-500 text-white border-amber-500"
                              : "bg-white text-amber-700 border-amber-300 hover:bg-amber-50"
                          }`}
                        >
                          Not Sure
                        </button>
                        <button
                          onClick={() =>
                            setAnswer(currentCategory, qIdx, "no")
                          }
                          className={`px-5 py-2 rounded-lg font-medium text-sm transition-colors border ${
                            current === "no"
                              ? "bg-red-600 text-white border-red-600"
                              : "bg-white text-red-700 border-red-300 hover:bg-red-50"
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrev}
                  disabled={currentCategory === 0}
                  className="px-6 py-2 rounded-lg font-medium text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={!currentCategoryAllAnswered()}
                  className="px-6 py-2 rounded-lg font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {currentCategory === categories.length - 1
                    ? "See Results"
                    : "Next Category"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // --- RESULTS SCREEN ---
  return (
    <div className="bg-white min-h-screen">
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Your Legal Readiness Score
          </h1>
          <p className="text-gray-600">
            Here is a breakdown of your business&apos;s legal health.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Score Badge */}
          <div className="flex justify-center mb-10">
            <div
              className={`border-4 ${tier.borderColor} ${tier.bgColor} rounded-full w-48 h-48 flex flex-col items-center justify-center`}
            >
              <span className={`text-5xl font-extrabold ${tier.color}`}>
                {percentage}%
              </span>
              <span className={`text-lg font-semibold ${tier.color} mt-1`}>
                {tier.label}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                {totalScore} / {maxScore} points
              </span>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="border rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Category Breakdown
            </h2>
            <div className="space-y-4">
              {categories.map((cat, catIdx) => {
                const score = categoryScore(catIdx);
                const maxCat = cat.questions.length * 2;
                const pct = Math.round((score / maxCat) * 100);
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <span>{cat.icon}</span> {cat.name}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {score}/{maxCat} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${categoryBarColor(
                          score,
                          maxCat
                        )} h-3 rounded-full transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Items */}
          {actionItems.length > 0 && (
            <div className="border rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Prioritized Action Items
              </h2>
              <p className="text-sm text-gray-600 mb-5">
                Based on your answers, here are the areas that need attention —
                listed in order of priority.
              </p>
              <div className="space-y-4">
                {actionItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-lg p-4 ${
                      item.answer === "no"
                        ? "border-red-200 bg-red-50"
                        : "border-amber-200 bg-amber-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0 mt-0.5 ${
                          item.answer === "no"
                            ? "bg-red-200 text-red-800"
                            : "bg-amber-200 text-amber-800"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {item.category}: {item.question}
                        </p>
                        <p className="text-sm text-gray-700">
                          {item.actionItem}
                        </p>
                        <span
                          className={`inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded ${
                            item.answer === "no"
                              ? "bg-red-200 text-red-800"
                              : "bg-amber-200 text-amber-800"
                          }`}
                        >
                          {item.answer === "no"
                            ? "Answered: No"
                            : "Answered: Not Sure"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {actionItems.length === 0 && (
            <div className="border border-green-200 rounded-xl p-6 mb-8 bg-green-50 text-center">
              <p className="text-green-800 font-semibold text-lg">
                Outstanding! You answered &quot;Yes&quot; to every question.
              </p>
              <p className="text-green-700 text-sm mt-1">
                Your business appears to have a strong legal foundation. Keep it
                up and review regularly.
              </p>
            </div>
          )}

          {/* CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link
              href="/tools"
              className="border rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600">
                Browse Recommended Tools
              </h3>
              <p className="text-sm text-gray-600">
                Need help implementing these? Explore our curated directory of
                legal tech tools.
              </p>
            </Link>
            <Link
              href="/reviews"
              className="border rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600">
                Read Our Reviews
              </h3>
              <p className="text-sm text-gray-600">
                In-depth reviews and comparisons of the top legal technology
                platforms.
              </p>
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="bg-gray-50 border rounded-xl p-4 text-xs text-gray-500 text-center mb-8">
            <strong>Disclaimer:</strong> This assessment is for informational purposes only and does not constitute legal advice. Results are based on general best practices and may not reflect requirements specific to your industry, jurisdiction, or situation. A passing score does not mean your business is fully legally compliant. Always consult a licensed attorney for advice specific to your circumstances.
          </div>

          {/* Retake */}
          <div className="text-center">
            <button
              onClick={handleRetake}
              className="px-6 py-2 rounded-lg font-medium text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
