export type LegalTool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  features: string[];
  affiliateUrl?: string;
  image?: string;
  color?: string;
};

export const categories = [
  { name: "Contract Analysis", slug: "contract-analysis", icon: "📄" },
  { name: "Legal Research", slug: "legal-research", icon: "🔍" },
  { name: "Case Management", slug: "case-management", icon: "💼" },
  { name: "Document Automation", slug: "document-automation", icon: "📝" },
  { name: "E-Discovery", slug: "e-discovery", icon: "📂" },
  { name: "Compliance & Risk", slug: "compliance-risk", icon: "⚖️" },
];

export const tools: LegalTool[] = [
  {
    slug: "contract-analyzer",
    name: "Contract Analyzer",
    description: "AI-powered tool for comprehensive contract review and risk assessment.",
    category: "contract-analysis",
    features: ["Automatic clause detection", "Risk scoring", "Obligation tracking"],
    affiliateUrl: "https://legaltech-ai-hub.com/disclosure",
    color: "from-blue-500 to-blue-700",
  },
  {
    slug: "legal-research-assistant",
    name: "Legal Research Assistant",
    description: "Intelligent search and analysis for legal precedents and case law.",
    category: "legal-research",
    features: ["Natural language queries", "Citation verification", "Summary generation"],
    affiliateUrl: "https://legaltech-ai-hub.com/disclosure",
    color: "from-indigo-500 to-indigo-700",
  },
  {
    slug: "case-management-pro",
    name: "Case Management Pro",
    description: "Streamlined case tracking and deadline management for legal teams.",
    category: "case-management",
    features: ["Deadline alerts", "Document linking", "Team collaboration"],
    affiliateUrl: "https://legaltech-ai-hub.com/disclosure",
    color: "from-emerald-500 to-emerald-700",
  },
  {
    slug: "document-automation-ai",
    name: "Document Automation AI",
    description: "Automated legal document generation with AI-driven templates.",
    category: "document-automation",
    features: ["Template library", "Auto-filling", "Customizable workflows"],
    affiliateUrl: "https://legaltech-ai-hub.com/disclosure",
    color: "from-amber-500 to-amber-700",
  },
  {
    slug: "e-discovery-scanner",
    name: "E-Discovery Scanner",
    description: "Advanced scanning and categorization of electronic discovery data.",
    category: "e-discovery",
    features: ["Large-scale data processing", "Duplicate detection", "Searchable indexing"],
    affiliateUrl: "https://legaltech-ai-hub.com/disclosure",
    color: "from-purple-500 to-purple-700",
  },
  {
    slug: "compliance-risk-checker",
    name: "Compliance Risk Checker",
    description: "Automated assessment of regulatory compliance and risk exposure.",
    category: "compliance-risk",
    features: ["Regulatory updates", "Gap analysis", "Reporting dashboard"],
    affiliateUrl: "https://legaltech-ai-hub.com/disclosure",
    color: "from-rose-500 to-rose-700",
  },
  {
    slug: "intellectual-property-bot",
    name: "Intellectual Property Bot",
    description: "AI assistant for trademark and patent research and monitoring.",
    category: "case-management",
    features: ["TESS integration", "Status monitoring", "Alerting system"],
    color: "from-teal-500 to-teal-700",
  },
  {
    slug: "litigation-predictor",
    name: "Litigation Predictor",
    description: "AI analytics to predict litigation outcomes based on historical data.",
    category: "legal-research",
    features: ["Historical data analysis", "Outcome probability", "Cost estimation"],
    color: "from-orange-500 to-orange-700",
  },
  {
    slug: "notary-verification-tool",
    name: "Notary Verification Tool",
    description: "Digital verification and authentication for notarized documents.",
    category: "document-automation",
    features: ["Blockchain verification", "Identity checks", "Tamper-evident logs"],
    color: "from-cyan-500 to-cyan-700",
  },
  {
    slug: "legal-chat-assistant",
    name: "Legal Chat Assistant",
    description: "24/7 AI-powered chat assistant for basic legal inquiries and triage.",
    category: "compliance-risk",
    features: ["Instant responses", "Lead qualification", "Initial triage"],
    color: "from-violet-500 to-violet-700",
  },
];
