export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  industry: string;
  metric: string;
  date: string;
  readTime: string;
  tags: string[];
  color: string;
  published: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "solo-attorney-contract-review-ai",
    title: "How a Solo Attorney Cut Contract Review Time by 70% with AI",
    description:
      "A solo practitioner specializing in commercial contracts shares how AI-powered review tools transformed her workflow and freed up time for higher-value work.",
    industry: "Solo Practice",
    metric: "70% time saved",
    date: "2026-01-08",
    readTime: "7 min read",
    tags: ["Solo Practice", "Contract Review", "Efficiency"],
    color: "from-blue-500 to-indigo-600",
    published: true,
  },
  {
    slug: "mid-size-firm-due-diligence-automation",
    title: "Mid-Size Firm Saves $200K/Year by Automating Due Diligence",
    description:
      "A 45-attorney firm replaced manual due diligence workflows with AI-powered document analysis, dramatically cutting costs on M&A transactions.",
    industry: "Mid-Size Firm",
    metric: "$200K saved annually",
    date: "2026-03-25",
    readTime: "9 min read",
    tags: ["Due Diligence", "Automation", "Cost Savings"],
    color: "from-emerald-500 to-teal-600",
    published: false,
  },
  {
    slug: "legal-aid-nonprofit-ai-tools",
    title: "How a Legal Aid Nonprofit Serves 3x More Clients with AI Tools",
    description:
      "A nonprofit legal aid organization leveraged free and low-cost AI tools to triple their client capacity without adding staff.",
    industry: "Nonprofit",
    metric: "3x client capacity",
    date: "2026-01-22",
    readTime: "8 min read",
    tags: ["Legal Aid", "Nonprofit", "Access to Justice"],
    color: "from-amber-500 to-orange-600",
    published: true,
  },
  {
    slug: "corporate-legal-clm-outside-counsel",
    title: "Corporate Legal Team Reduces Outside Counsel Spend 40% with CLM Software",
    description:
      "An in-house legal team at a Fortune 500 company deployed contract lifecycle management software to bring more work in-house and reduce reliance on outside firms.",
    industry: "In-House",
    metric: "40% spend reduction",
    date: "2026-03-31",
    readTime: "10 min read",
    tags: ["In-House", "CLM", "Cost Reduction"],
    color: "from-violet-500 to-purple-600",
    published: false,
  },
  {
    slug: "small-business-ai-employment-contracts",
    title: "Small Business Owner Uses AI to Draft Compliant Employment Contracts",
    description:
      "A growing e-commerce company used AI drafting tools to create legally compliant employment contracts across three states without hiring outside counsel.",
    industry: "Small Business",
    metric: "90% faster drafting",
    date: "2026-02-05",
    readTime: "6 min read",
    tags: ["Small Business", "Employment Law", "Drafting"],
    color: "from-rose-500 to-pink-600",
    published: true,
  },
  {
    slug: "ip-boutique-patent-research-ai",
    title: "How an IP Boutique Firm Transformed Patent Research with AI",
    description:
      "A seven-attorney IP boutique firm adopted AI-powered prior art search tools and cut patent research time by 80%.",
    industry: "IP Law",
    metric: "5x research speed",
    date: "2026-04-07",
    readTime: "8 min read",
    tags: ["Intellectual Property", "Patent Research", "AI Search"],
    color: "from-cyan-500 to-blue-600",
    published: false,
  },
  {
    slug: "real-estate-firm-lease-review-ai",
    title: "Real Estate Firm Processes 500+ Lease Reviews per Month with AI",
    description:
      "A commercial real estate firm scaled from 80 lease reviews per month to over 500 by implementing AI-powered document analysis.",
    industry: "Real Estate",
    metric: "500+ leases/month",
    date: "2026-02-19",
    readTime: "7 min read",
    tags: ["Real Estate", "Lease Review", "Volume Processing"],
    color: "from-teal-500 to-emerald-600",
    published: false,
  },
  {
    slug: "insurance-claims-review-automation",
    title: "Insurance Company Cuts Claims Review Time from Days to Hours",
    description:
      "A regional insurance carrier automated their claims review process with AI, reducing average review time from 3 days to under 4 hours.",
    industry: "Insurance",
    metric: "85% faster reviews",
    date: "2026-04-14",
    readTime: "8 min read",
    tags: ["Insurance", "Claims Review", "Automation"],
    color: "from-orange-500 to-red-600",
    published: false,
  },
  {
    slug: "startup-series-a-legal-free-tools",
    title: "Startup Founder Navigates Series A Legal Requirements Using Free Tools",
    description:
      "A first-time founder used free AI legal tools to prepare for a Series A round, saving $15K in legal fees while staying compliant.",
    industry: "Startup",
    metric: "$15K saved on legal",
    date: "2026-01-15",
    readTime: "7 min read",
    tags: ["Startup", "Fundraising", "Free Tools"],
    color: "from-indigo-500 to-blue-600",
    published: true,
  },
  {
    slug: "compliance-team-regulatory-monitoring",
    title: "How a Compliance Team Automated Regulatory Monitoring Across 12 Jurisdictions",
    description:
      "A fintech company's compliance team replaced manual regulatory tracking with AI-powered monitoring across 12 state and federal jurisdictions.",
    industry: "Compliance",
    metric: "12 jurisdictions covered",
    date: "2026-03-04",
    readTime: "9 min read",
    tags: ["Compliance", "Regulatory", "Multi-Jurisdiction"],
    color: "from-gray-600 to-gray-800",
    published: false,
  },
  {
    slug: "immigration-law-document-automation",
    title: "Immigration Law Practice Doubles Case Capacity with Document Automation",
    description:
      "A busy immigration law practice implemented document automation to handle twice as many cases without adding attorneys.",
    industry: "Immigration",
    metric: "2x case capacity",
    date: "2026-04-21",
    readTime: "7 min read",
    tags: ["Immigration Law", "Document Automation", "Efficiency"],
    color: "from-purple-500 to-indigo-600",
    published: false,
  },
  {
    slug: "litigation-firm-ediscovery-cost-savings",
    title: "E-Discovery Cost Reduction: How a Litigation Firm Saved $1.2M on a Single Case",
    description:
      "A litigation boutique used AI-powered e-discovery tools to review 2.3 million documents in a fraction of the time and cost of traditional review.",
    industry: "Litigation",
    metric: "$1.2M saved",
    date: "2026-02-26",
    readTime: "10 min read",
    tags: ["Litigation", "E-Discovery", "Cost Savings"],
    color: "from-red-500 to-rose-600",
    published: true,
  },
];

export const industryColors: Record<string, string> = {
  "Solo Practice": "bg-blue-100 text-blue-700",
  "Mid-Size Firm": "bg-emerald-100 text-emerald-700",
  "Nonprofit": "bg-amber-100 text-amber-700",
  "In-House": "bg-violet-100 text-violet-700",
  "Small Business": "bg-rose-100 text-rose-700",
  "IP Law": "bg-cyan-100 text-cyan-700",
  "Real Estate": "bg-teal-100 text-teal-700",
  "Insurance": "bg-orange-100 text-orange-700",
  "Startup": "bg-indigo-100 text-indigo-700",
  "Compliance": "bg-gray-100 text-gray-700",
  "Immigration": "bg-purple-100 text-purple-700",
  "Litigation": "bg-red-100 text-red-700",
};
