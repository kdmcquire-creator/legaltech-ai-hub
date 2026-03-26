export type Review = {
  slug: string;
  title: string;
  description: string;
  type: "comparison" | "review" | "guide";
  date: string;
  readTime: string;
  tags: string[];
  color: string;
};

export const reviews: Review[] = [
  {
    slug: "legalzoom-vs-lawdepot-vs-legalnature",
    title: "LegalZoom vs. LawDepot vs. LegalNature: Which Online Legal Service is Best?",
    description:
      "A detailed comparison of three leading online legal services — covering pricing, document libraries, and the best use case for each.",
    type: "comparison",
    date: "2026-02-10",
    readTime: "8 min read",
    tags: ["Document Services", "Business Formation", "Comparison"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    slug: "best-ai-contract-review-tools-2026",
    title: "Best AI Contract Review Tools in 2026: A Side-by-Side Comparison",
    description:
      "We compare the top AI-powered contract review platforms on accuracy, speed, integrations, and pricing to help you pick the right one for your firm.",
    type: "comparison",
    date: "2026-03-15",
    readTime: "10 min read",
    tags: ["Contract Analysis", "Comparison", "Enterprise"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    slug: "best-ai-tools-for-solo-practitioners",
    title: "Best AI Legal Tools for Solo Practitioners in 2026",
    description:
      "Solo lawyers need affordable tools that punch above their weight. Here are our top picks across research, drafting, and practice management.",
    type: "guide",
    date: "2026-03-12",
    readTime: "9 min read",
    tags: ["Solo Practice", "Buyer Guide", "Budget-Friendly"],
    color: "from-amber-500 to-orange-600",
  },
  {
    slug: "ai-legal-research-showdown",
    title: "AI Legal Research Showdown: Westlaw Edge vs. CoCounsel vs. Casetext",
    description:
      "The three heavyweights of AI-assisted legal research go head to head. We break down search quality, AI summarization, and real-world usability.",
    type: "comparison",
    date: "2026-03-08",
    readTime: "11 min read",
    tags: ["Legal Research", "Comparison", "AI Search"],
    color: "from-violet-500 to-purple-600",
  },
  {
    slug: "how-to-choose-ai-contract-analysis-software",
    title: "How to Choose AI Contract Analysis Software: A Buyer's Guide",
    description:
      "Not sure what to look for in a contract analysis tool? This guide walks you through the must-have features, red flags, and questions to ask vendors.",
    type: "guide",
    date: "2026-03-01",
    readTime: "7 min read",
    tags: ["Contract Analysis", "Buyer Guide", "Evaluation"],
    color: "from-rose-500 to-pink-600",
  },
  // ─── NEW REVIEWS (6) ─────────────────────────────────
  {
    slug: "clio-review-ai-practice-management",
    title: "Clio Review: The AI-Powered Practice Management Platform",
    description:
      "An in-depth review of Clio's AI features for practice management — covering case tracking, billing automation, client intake, and integrations for modern law firms.",
    type: "review",
    date: "2026-03-25",
    readTime: "10 min read",
    tags: ["Practice Management", "Review", "Billing"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    slug: "harvey-ai-review-legal-research-llm",
    title: "Harvey AI Review: Legal Research Meets Large Language Models",
    description:
      "Harvey AI brings GPT-class language models to legal research and drafting. We evaluate accuracy, hallucination risk, workflow integration, and where it excels for BigLaw and in-house teams.",
    type: "review",
    date: "2026-04-01",
    readTime: "11 min read",
    tags: ["Legal Research", "Review", "LLM"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    slug: "casetext-cocounsel-review-ai-research-assistant",
    title: "CaseText/CoCounsel Review: AI Legal Research Assistant",
    description:
      "CoCounsel by Thomson Reuters (formerly CaseText) was the first GPT-4-powered legal research assistant. We review its search quality, document analysis, and day-to-day usability for litigators.",
    type: "review",
    date: "2026-04-08",
    readTime: "10 min read",
    tags: ["Legal Research", "Review", "AI Assistant"],
    color: "from-violet-500 to-purple-600",
  },
  {
    slug: "ironclad-review-ai-contract-lifecycle-management",
    title: "Ironclad Review: AI Contract Lifecycle Management",
    description:
      "Ironclad combines AI-powered contract review with end-to-end lifecycle management. We assess its workflow automation, redlining, analytics, and fit for legal operations teams.",
    type: "review",
    date: "2026-04-15",
    readTime: "9 min read",
    tags: ["Contract Lifecycle", "Review", "CLM"],
    color: "from-amber-500 to-orange-600",
  },
  {
    slug: "relativity-review-ai-ediscovery-platform",
    title: "Relativity Review: AI-Powered E-Discovery Platform",
    description:
      "Relativity is the dominant platform for e-discovery and document review. We evaluate its AI-assisted review, analytics dashboards, and how it handles privilege logging at scale.",
    type: "review",
    date: "2026-04-22",
    readTime: "10 min read",
    tags: ["E-Discovery", "Review", "Document Review"],
    color: "from-rose-500 to-pink-600",
  },
  {
    slug: "kira-systems-review-ai-contract-analysis",
    title: "Kira Systems Review: AI Contract Analysis",
    description:
      "Kira Systems is a pioneer in machine-learning-based contract analysis. We review its extraction models, due diligence capabilities, and accuracy on complex commercial agreements.",
    type: "review",
    date: "2026-04-29",
    readTime: "9 min read",
    tags: ["Contract Analysis", "Review", "Due Diligence"],
    color: "from-cyan-500 to-blue-600",
  },
  // ─── NEW COMPARISONS / TRENDS (4) ────────────────────
  {
    slug: "best-ai-legal-research-westlaw-casetext-harvey",
    title: "Best AI Legal Research Tools: Westlaw Edge vs. CaseText vs. Harvey",
    description:
      "A head-to-head comparison of the three leading AI legal research platforms on database depth, AI quality, citation verification, and pricing for firms of every size.",
    type: "comparison",
    date: "2026-03-27",
    readTime: "12 min read",
    tags: ["Legal Research", "Comparison", "AI Search"],
    color: "from-indigo-500 to-blue-600",
  },
  {
    slug: "ai-contract-management-ironclad-docusign-agiloft",
    title: "AI Contract Management: Ironclad vs. DocuSign CLM vs. Agiloft",
    description:
      "Three top contract lifecycle management platforms compared on AI capabilities, workflow automation, integrations, and total cost of ownership for legal operations teams.",
    type: "comparison",
    date: "2026-05-06",
    readTime: "11 min read",
    tags: ["Contract Lifecycle", "Comparison", "CLM"],
    color: "from-teal-500 to-emerald-600",
  },
  {
    slug: "state-of-ai-legal-tech-2026-trends",
    title: "The State of AI in Legal Tech: 2026 Trends Report",
    description:
      "A comprehensive look at the biggest AI trends shaping legal technology in 2026 — from agentic AI workflows to regulatory scrutiny and the consolidation of legal AI startups.",
    type: "guide",
    date: "2026-05-08",
    readTime: "13 min read",
    tags: ["Trends", "Industry Report", "2026"],
    color: "from-gray-600 to-gray-800",
  },
  {
    slug: "ai-changing-billing-time-tracking-law-firms",
    title: "How AI is Changing Billing and Time Tracking for Law Firms",
    description:
      "AI-powered time capture and billing tools are eliminating lost billable hours and compliance headaches. We explore the tools, the ROI, and what firms are getting wrong.",
    type: "guide",
    date: "2026-05-14",
    readTime: "8 min read",
    tags: ["Billing", "Time Tracking", "Practice Management"],
    color: "from-purple-500 to-violet-600",
  },
];

export const typeLabels: Record<Review["type"], string> = {
  comparison: "Comparison",
  review: "Review",
  guide: "Buyer Guide",
};

export const typeColors: Record<Review["type"], string> = {
  comparison: "bg-blue-100 text-blue-700",
  review: "bg-emerald-100 text-emerald-700",
  guide: "bg-amber-100 text-amber-700",
};
