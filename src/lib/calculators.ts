export interface Calculator {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  keywords: string[];
}

export const calculatorCategories = [
  { name: "Fee & Budget", slug: "fee-budget" },
  { name: "Efficiency & ROI", slug: "efficiency-roi" },
  { name: "Case & Practice", slug: "case-practice" },
];

export const calculators: Calculator[] = [
  {
    slug: "legal-fee-estimator",
    name: "Legal Fee Estimator",
    description:
      "Estimate legal fees by practice area, complexity, and hours. Compare against national hourly-rate benchmarks.",
    icon: "dollar",
    category: "fee-budget",
    keywords: ["legal fees", "hourly rate", "attorney cost", "lawyer fees"],
  },
  {
    slug: "matter-budget-calculator",
    name: "Matter Budget Calculator",
    description:
      "Build a phase-by-phase budget for any legal matter. Track costs across discovery, motions, trial prep, and more.",
    icon: "briefcase",
    category: "fee-budget",
    keywords: ["matter budget", "litigation budget", "case cost", "phase budget"],
  },
  {
    slug: "billable-hours-calculator",
    name: "Billable Hours Tracker",
    description:
      "Calculate required billable hours to hit your revenue target. Identify utilization gaps and lost revenue.",
    icon: "clock",
    category: "fee-budget",
    keywords: ["billable hours", "utilization rate", "revenue target", "time tracking"],
  },
  {
    slug: "document-review-cost-estimator",
    name: "Document Review Cost Estimator",
    description:
      "Compare manual vs. AI-assisted document review costs. See potential savings in time and money.",
    icon: "document",
    category: "efficiency-roi",
    keywords: ["document review", "e-discovery", "AI review", "review cost"],
  },
  {
    slug: "settlement-value-calculator",
    name: "Settlement Value Calculator",
    description:
      "Evaluate the expected value of going to trial vs. settling. Factor in win probability, costs, and delay.",
    icon: "scale",
    category: "case-practice",
    keywords: ["settlement", "expected value", "litigation risk", "case value"],
  },
  {
    slug: "paralegal-vs-attorney-cost",
    name: "Paralegal vs. Attorney Cost Analyzer",
    description:
      "Compare attorney-only staffing against a blended paralegal/attorney team. Quantify delegation savings.",
    icon: "users",
    category: "efficiency-roi",
    keywords: ["paralegal", "attorney", "delegation", "staffing cost"],
  },
  {
    slug: "case-volume-forecaster",
    name: "Case Volume Forecaster",
    description:
      "Project your active caseload over the next 12 months and see when you will hit capacity.",
    icon: "chart",
    category: "case-practice",
    keywords: ["case volume", "caseload", "capacity planning", "forecast"],
  },
  {
    slug: "client-intake-roi",
    name: "Client Intake ROI Calculator",
    description:
      "Measure the revenue impact of improving your intake process with AI. See monthly and annual uplift.",
    icon: "funnel",
    category: "efficiency-roi",
    keywords: ["client intake", "conversion rate", "ROI", "AI intake"],
  },
];

export function getCalculatorBySlug(slug: string): Calculator | undefined {
  return calculators.find((c) => c.slug === slug);
}
