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
