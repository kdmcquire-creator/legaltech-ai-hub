export type Guide = {
  slug: string;
  title: string;
  description: string;
  type: "buyers-guide" | "how-to" | "educational" | "comparison" | "implementation";
  date: string;
  readTime: string;
  tags: string[];
  color: string;
  published: boolean;
};

export const guides: Guide[] = [
  {
    slug: "evaluating-ai-legal-tools",
    title: "The Complete Guide to Evaluating AI Legal Tools for Your Practice",
    description:
      "A practical framework for evaluating AI legal tools — covering features, pricing, security, and implementation fit for your specific practice.",
    type: "buyers-guide",
    date: "2026-01-06",
    readTime: "12 min read",
    tags: ["Evaluation", "Buyer Guide", "Getting Started"],
    color: "from-blue-500 to-indigo-600",
    published: true,
  },
  {
    slug: "implement-contract-automation",
    title: "How to Implement Contract Automation Without Disrupting Your Workflow",
    description:
      "A step-by-step roadmap for rolling out contract automation tools without disrupting your team's existing processes.",
    type: "implementation",
    date: "2026-03-20",
    readTime: "10 min read",
    tags: ["Implementation", "Contracts", "Workflow"],
    color: "from-emerald-500 to-teal-600",
    published: true,
  },
  {
    slug: "ai-legal-research-guide",
    title: "AI-Powered Legal Research: A Step-by-Step Guide for Attorneys",
    description:
      "Learn how to use AI research tools effectively — from crafting queries to verifying citations and integrating findings into your briefs.",
    type: "how-to",
    date: "2026-01-29",
    readTime: "11 min read",
    tags: ["Legal Research", "How-To", "AI Tools"],
    color: "from-violet-500 to-purple-600",
    published: true,
  },
  {
    slug: "ai-contract-review-explained",
    title: "Understanding AI Contract Review: What It Catches and What It Misses",
    description:
      "An honest look at what AI contract review tools can and cannot do — so you know when to trust the technology and when to rely on human judgment.",
    type: "educational",
    date: "2026-02-11",
    readTime: "9 min read",
    tags: ["Contract Review", "Educational", "AI Accuracy"],
    color: "from-amber-500 to-orange-600",
    published: true,
  },
  {
    slug: "small-business-ai-legal-tools",
    title: "The Small Business Owner's Guide to AI Legal Tools",
    description:
      "No legal background needed. This guide walks small business owners through the AI tools that can help with contracts, compliance, and legal risk — without hiring a full-time lawyer.",
    type: "buyers-guide",
    date: "2026-01-14",
    readTime: "10 min read",
    tags: ["Small Business", "Getting Started", "Budget-Friendly"],
    color: "from-rose-500 to-pink-600",
    published: true,
  },
  {
    slug: "build-business-case-legal-technology",
    title: "How to Build a Business Case for Legal Technology Investment",
    description:
      "Convince your firm's leadership to invest in legal tech with a data-backed business case framework.",
    type: "implementation",
    date: "2026-03-26",
    readTime: "8 min read",
    tags: ["ROI", "Business Case", "Leadership"],
    color: "from-gray-600 to-gray-800",
    published: true,
  },
  {
    slug: "data-privacy-ai-legal-tools",
    title: "Data Privacy and AI Legal Tools: What You Need to Know",
    description:
      "Understand the data privacy implications of using AI legal tools — covering encryption, data residency, model training, and compliance with privacy regulations.",
    type: "educational",
    date: "2026-02-24",
    readTime: "9 min read",
    tags: ["Data Privacy", "Compliance", "Security"],
    color: "from-red-500 to-rose-600",
    published: true,
  },
  {
    slug: "manual-to-automated-contract-management",
    title: "Migrating from Manual to Automated Contract Management: A Practical Roadmap",
    description:
      "A phased approach to moving from spreadsheets and shared drives to a modern contract lifecycle management platform.",
    type: "implementation",
    date: "2026-04-03",
    readTime: "11 min read",
    tags: ["Contract Management", "Migration", "CLM"],
    color: "from-cyan-500 to-blue-600",
    published: true,
  },
  {
    slug: "ai-legal-assistants-vs-traditional-research",
    title: "AI Legal Assistants vs. Traditional Legal Research: An Honest Comparison",
    description:
      "A balanced comparison of AI-powered legal assistants and traditional research methods — covering speed, accuracy, cost, and where each approach excels.",
    type: "comparison",
    date: "2026-01-20",
    readTime: "10 min read",
    tags: ["Comparison", "Legal Research", "Traditional vs. AI"],
    color: "from-indigo-500 to-blue-600",
    published: true,
  },
  {
    slug: "free-tools-contract-audit",
    title: "How to Use Free Legal Tech Tools to Audit Your Business Contracts",
    description:
      "A practical walkthrough of using free AI tools to audit your existing contracts for risks, gaps, and opportunities.",
    type: "how-to",
    date: "2026-04-10",
    readTime: "8 min read",
    tags: ["Free Tools", "Contract Audit", "How-To"],
    color: "from-teal-500 to-emerald-600",
    published: true,
  },
];

export const guideTypeLabels: Record<Guide["type"], string> = {
  "buyers-guide": "Buyer's Guide",
  "how-to": "How-To",
  "educational": "Educational",
  "comparison": "Comparison",
  "implementation": "Implementation Guide",
};

export const guideTypeColors: Record<Guide["type"], string> = {
  "buyers-guide": "bg-blue-100 text-blue-700",
  "how-to": "bg-emerald-100 text-emerald-700",
  "educational": "bg-amber-100 text-amber-700",
  "comparison": "bg-violet-100 text-violet-700",
  "implementation": "bg-rose-100 text-rose-700",
};
