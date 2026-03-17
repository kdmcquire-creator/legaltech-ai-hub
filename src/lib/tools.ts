export type LegalTool = {
  slug: string;
  name: string;
  description: string;
  category: string;
  features: string[];
  affiliateUrl?: string;
  image?: string;
  color?: string;
  // Extended fields for editorial tool pages
  tagline?: string;
  pricing?: { tier: string; price: string; note?: string }[];
  useCases?: string[];
  pros?: string[];
  cons?: string[];
  websiteUrl?: string;
  isFree?: boolean;
  reviewSlug?: string;
  isOwnTool?: boolean;
  overview?: string;
  bestFor?: string;
};

export const categories = [
  { name: "Contract Analysis", slug: "contract-analysis", icon: "📄" },
  { name: "Legal Research", slug: "legal-research", icon: "🔍" },
  { name: "Legal AI Assistants", slug: "legal-ai-assistants", icon: "🤖" },
  { name: "Contract Lifecycle", slug: "contract-lifecycle", icon: "🔄" },
  { name: "E-Discovery", slug: "e-discovery", icon: "📂" },
  { name: "Document Drafting", slug: "document-drafting", icon: "📝" },
  { name: "Online Legal Services", slug: "online-legal-services", icon: "⚖️" },
  { name: "Free Tools", slug: "free-tools", icon: "🆓" },
];

export const tools: LegalTool[] = [
  // ─── OUR FREE TOOLS ────────────────────────────────────
  {
    slug: "legal-readiness-assessment",
    name: "Legal Readiness Assessment",
    description:
      "Free interactive quiz that evaluates your business's legal health across 6 categories and gives you a personalized score with actionable recommendations.",
    category: "free-tools",
    features: [
      "18-question assessment across 6 legal categories",
      "Instant scoring with percentage and letter grade",
      "Prioritized action items for every gap identified",
      "100% free — no signup required",
    ],
    color: "from-emerald-500 to-teal-600",
    tagline: "How legally protected is your business? Find out in under 5 minutes.",
    isFree: true,
    isOwnTool: true,
    websiteUrl: "/legal-readiness",
    bestFor: "Small business owners, startup founders, and freelancers who want a quick legal health check.",
    overview:
      "The Legal Readiness Assessment is a free tool built by LegalTech AI Hub. Answer 18 yes/no questions covering Business Formation, Contracts, Intellectual Property, Employment, Compliance, and Insurance. You get an instant score out of 100, a category-by-category breakdown, and a prioritized list of exactly what to fix first. No signup, no email capture — just useful results.",
    useCases: [
      "Startup founders preparing for their first funding round",
      "Freelancers and solopreneurs checking if they have basic protections in place",
      "Small business owners doing an annual legal checkup",
      "Anyone curious about where their legal blind spots are",
    ],
    pros: [
      "Completely free with no strings attached",
      "Takes less than 5 minutes to complete",
      "Actionable recommendations, not generic advice",
      "Runs in your browser — no data collected",
    ],
    cons: [
      "Cannot replace advice from a licensed attorney",
      "Covers common scenarios — may not address niche industry requirements",
    ],
    pricing: [{ tier: "Free", price: "$0", note: "Always free. No signup required." }],
  },
  {
    slug: "contract-clause-checker",
    name: "Contract Clause Checker",
    description:
      "Paste any contract and instantly see which of the 15 standard legal clauses are present or missing. Runs entirely in your browser — your text never leaves your device.",
    category: "free-tools",
    features: [
      "Detects 15 standard contract clauses via pattern matching",
      "Categorizes clauses by importance: critical, recommended, nice-to-have",
      "Shows excerpts of detected clauses for verification",
      "100% client-side — your contract text stays private",
    ],
    color: "from-blue-500 to-indigo-600",
    tagline: "Is your contract missing critical protections? Check in seconds.",
    isFree: true,
    isOwnTool: true,
    websiteUrl: "/clause-checker",
    bestFor: "Anyone reviewing a contract before signing — freelancers, small businesses, and legal professionals doing a quick sanity check.",
    overview:
      "The Contract Clause Checker is a free tool that scans your contract text for 15 standard legal clauses using intelligent pattern matching. It tells you which critical protections (like Limitation of Liability, Indemnification, and Termination) are present, which recommended clauses (like Force Majeure and IP rights) you might be missing, and provides specific recommendations for each gap. Everything runs in your browser — your contract text is never sent to any server.",
    useCases: [
      "Freelancers reviewing client contracts before signing",
      "Small businesses checking vendor agreements",
      "Legal professionals doing a quick clause inventory",
      "Anyone who wants a second pair of eyes on a contract",
    ],
    pros: [
      "Completely free and private — text never leaves your browser",
      "Instant results with clause-by-clause breakdown",
      "Clear importance ratings help you prioritize what matters",
      "Shows excerpts so you can verify detections",
    ],
    cons: [
      "Pattern matching is not as nuanced as AI-powered review",
      "May miss unusual clause phrasing or heavily negotiated language",
      "Does not evaluate clause quality — only presence",
    ],
    pricing: [{ tier: "Free", price: "$0", note: "Always free. Runs entirely in your browser." }],
  },

  // ─── REAL THIRD-PARTY TOOLS ─────────────────────────────
  {
    slug: "harvey-ai",
    name: "Harvey AI",
    description:
      "Enterprise AI platform purpose-built for legal professionals. Uses a custom large language model trained on legal data to assist with research, drafting, analysis, and due diligence.",
    category: "legal-ai-assistants",
    features: [
      "Custom legal LLM trained on law-specific data",
      "Contract analysis and due diligence workflows",
      "Legal research with citation support",
      "Document drafting and summarization",
      "Enterprise-grade security and compliance (SOC 2, encryption at rest)",
    ],
    color: "from-gray-800 to-gray-950",
    tagline: "The AI platform built for elite law firms.",
    websiteUrl: "https://www.harvey.ai",
    bestFor: "Large law firms and enterprise legal departments that need a general-purpose legal AI assistant with top-tier security.",
    overview:
      "Harvey AI has rapidly become one of the most talked-about tools in legal tech. Backed by significant funding and partnerships with firms like Allen & Overy (now A&O Shearman), Harvey offers a purpose-built legal AI that goes beyond generic ChatGPT wrappers. It is trained specifically on legal data, understands legal reasoning, and can assist with everything from M&A due diligence to regulatory analysis. The platform is designed for enterprise deployment with strict data privacy controls.",
    useCases: [
      "M&A due diligence — bulk document review and extraction",
      "Legal research across jurisdictions",
      "First-draft generation for memos, briefs, and client letters",
      "Regulatory analysis and compliance reviews",
    ],
    pros: [
      "Purpose-built legal AI — not a generic chatbot with a legal skin",
      "Strong partnerships with top-tier law firms validate quality",
      "Enterprise security: SOC 2 compliant, data never used for training",
      "Handles complex multi-step legal reasoning well",
    ],
    cons: [
      "Pricing is enterprise-only — not accessible to solo practitioners",
      "Requires firm-level onboarding and integration",
      "Relatively new — the product is evolving quickly",
    ],
    pricing: [
      { tier: "Enterprise", price: "Custom", note: "Contact sales. Pricing is per-seat, typically for firms of 50+ attorneys." },
    ],
  },
  {
    slug: "casetext-cocounsel",
    name: "CoCounsel by Thomson Reuters",
    description:
      "AI-powered legal research assistant built on GPT-4. Offers conversational legal research, document analysis, contract review, and brief drafting — all backed by Thomson Reuters' legal database.",
    category: "legal-research",
    features: [
      "Conversational legal research in plain English",
      "Document review and summarization",
      "Contract analysis with clause extraction",
      "Brief drafting assistance with citation support",
      "Deposition preparation and timeline generation",
    ],
    color: "from-indigo-600 to-blue-700",
    tagline: "Your AI legal research assistant, powered by Thomson Reuters.",
    websiteUrl: "https://casetext.com/cocounsel",
    bestFor: "Law firms of all sizes that want AI-powered legal research without leaving the Thomson Reuters ecosystem.",
    overview:
      "CoCounsel started as Casetext, one of the first legal research platforms to integrate GPT-4. After being acquired by Thomson Reuters, it now has access to one of the largest legal databases in the world. CoCounsel lets you ask legal questions in plain English, upload documents for analysis, and get AI-generated research memos with real citations. It is rapidly becoming the AI layer on top of Westlaw.",
    reviewSlug: "ai-legal-research-showdown",
    useCases: [
      "Legal research — ask questions, get answers with citations",
      "Uploaded document analysis and summarization",
      "Deposition preparation and witness research",
      "Contract review and key term extraction",
    ],
    pros: [
      "Conversational interface — ask follow-up questions naturally",
      "Backed by Thomson Reuters' comprehensive legal database",
      "Excellent document summarization for long filings",
      "Active development — new features shipping regularly",
    ],
    cons: [
      "Post-acquisition integration is ongoing — some features still evolving",
      "Higher price point than standalone Casetext was",
      "Best results require well-formed prompts",
    ],
    pricing: [
      { tier: "CoCounsel Core", price: "Included with Westlaw", note: "Available to Westlaw subscribers." },
      { tier: "CoCounsel Drafting", price: "Add-on", note: "Contact Thomson Reuters for pricing." },
    ],
  },
  {
    slug: "ironclad-ai",
    name: "Ironclad",
    description:
      "End-to-end contract lifecycle management platform with AI-powered review, redlining, and workflow automation. Used by companies like L'Oreal, Mastercard, and Staples.",
    category: "contract-lifecycle",
    features: [
      "AI-assisted contract review and redlining",
      "Automated workflow routing and approvals",
      "Clause library with smart suggestions",
      "Obligation tracking and renewal management",
      "Integrations with Salesforce, Slack, Google Drive, and more",
    ],
    color: "from-violet-600 to-purple-700",
    tagline: "The contract lifecycle platform that legal and business teams actually use.",
    websiteUrl: "https://ironcladapp.com",
    bestFor: "Mid-market and enterprise companies that want to manage the full contract lifecycle — from drafting to signature to renewal — in one platform.",
    overview:
      "Ironclad is a leading contract lifecycle management (CLM) platform that combines AI contract review with end-to-end workflow automation. Unlike pure-play contract review tools, Ironclad handles the entire lifecycle: drafting from templates, routing for internal approval, AI-assisted redlining, e-signature, and post-execution obligation tracking. Its AI features analyze incoming contracts against your company's playbook and suggest edits automatically.",
    reviewSlug: "best-ai-contract-review-tools-2026",
    useCases: [
      "Automating contract approval workflows across departments",
      "AI-powered redlining against your company's legal playbook",
      "Managing contract renewals and obligations at scale",
      "Standardizing contract templates across the organization",
    ],
    pros: [
      "True end-to-end CLM — review, approve, sign, and manage in one place",
      "AI redlining compares contracts to your playbook automatically",
      "Excellent integrations with business tools (Salesforce, Slack)",
      "Strong enterprise adoption — proven at scale",
    ],
    cons: [
      "Overkill if you only need contract review (not full CLM)",
      "Requires investment in setup and playbook configuration",
      "Enterprise pricing is not transparent",
    ],
    pricing: [
      { tier: "Team", price: "Custom", note: "For growing legal teams. Contact sales." },
      { tier: "Enterprise", price: "Custom", note: "Full platform with advanced AI and integrations." },
    ],
  },
  {
    slug: "spellbook",
    name: "Spellbook",
    description:
      "AI contract drafting assistant that lives inside Microsoft Word. Uses a legal language model to suggest, review, and draft contract clauses in real time as you work.",
    category: "document-drafting",
    features: [
      "AI clause suggestions as you draft in Word",
      "Contract review with risk flagging",
      "Trained on billions of legal data points",
      "Works natively inside Microsoft Word",
      "Clause library with community-sourced templates",
    ],
    color: "from-amber-500 to-orange-600",
    tagline: "Your AI co-pilot for contract drafting — right inside Microsoft Word.",
    websiteUrl: "https://www.spellbook.legal",
    bestFor: "Lawyers and legal professionals who draft contracts in Microsoft Word and want AI assistance without switching tools.",
    overview:
      "Spellbook (by Rally) is an AI-powered contract drafting tool that integrates directly into Microsoft Word. Instead of making you copy-paste into a separate platform, Spellbook works where you already work. As you draft, it suggests clauses, flags potential issues, and can generate entire sections based on context. It is trained on a proprietary legal language model with data from billions of legal data points, making its suggestions more legally relevant than generic AI tools.",
    useCases: [
      "Drafting new contracts with AI clause suggestions",
      "Reviewing existing contracts for missing or weak clauses",
      "Generating first drafts from natural language descriptions",
      "Standardizing language across a firm's contract templates",
    ],
    pros: [
      "Works inside Microsoft Word — no context switching",
      "Legal-specific language model (not generic GPT)",
      "Fast clause generation saves hours of drafting time",
      "Accessible pricing compared to enterprise CLM platforms",
    ],
    cons: [
      "Requires Microsoft Word (no Google Docs support yet)",
      "Suggestions still need attorney review — not a replacement for judgment",
      "Newer product — feature set is expanding but not as mature as Ironclad",
    ],
    pricing: [
      { tier: "Starter", price: "$100/mo", note: "Per user. Includes core drafting and review features." },
      { tier: "Business", price: "Custom", note: "For teams. Includes clause library and admin tools." },
    ],
  },
  {
    slug: "kira-systems",
    name: "Kira Systems (Litera)",
    description:
      "Machine learning-powered contract analysis platform specializing in due diligence and large-scale document review. Part of the Litera ecosystem.",
    category: "contract-analysis",
    features: [
      "800+ pre-built smart fields for clause extraction",
      "Bulk upload for due diligence review",
      "Custom model training on your document types",
      "Detailed audit trail and reporting",
      "Integration with document management systems",
    ],
    color: "from-blue-600 to-cyan-600",
    tagline: "The gold standard for AI-powered due diligence.",
    websiteUrl: "https://kirasystems.com",
    bestFor: "Law firms and corporate legal teams that handle M&A due diligence, lease abstraction, or any scenario requiring bulk contract analysis.",
    overview:
      "Kira Systems is one of the most established names in AI contract analysis. Now part of the Litera family, Kira uses proprietary machine learning models trained on millions of contracts to extract clauses, identify risks, and generate structured reports. Its standout strength is due diligence: upload hundreds of contracts and Kira will extract the specific data points you need (change of control provisions, assignment clauses, termination rights, etc.) with high accuracy. Many of the world's largest law firms use Kira for M&A transactions.",
    reviewSlug: "best-ai-contract-review-tools-2026",
    useCases: [
      "M&A due diligence — reviewing thousands of contracts quickly",
      "Lease abstraction for real estate portfolios",
      "Regulatory compliance review across contract portfolios",
      "Extracting specific clause types from legacy contracts",
    ],
    pros: [
      "800+ pre-built extraction models covering most clause types",
      "Proven at scale — trusted by Am Law 100 firms for major transactions",
      "Strong accuracy with confidence scoring",
      "Excellent audit trail for regulated industries",
    ],
    cons: [
      "Enterprise-only pricing — not accessible to small firms",
      "Steeper learning curve than newer AI tools",
      "Best suited for bulk review — overkill for single-contract analysis",
    ],
    pricing: [
      { tier: "Enterprise", price: "Custom", note: "Annual license. Contact sales for a quote based on volume." },
    ],
  },
  {
    slug: "everlaw",
    name: "Everlaw",
    description:
      "Cloud-native e-discovery platform with AI-powered predictive coding, document clustering, and advanced analytics. Built for litigation teams managing large-scale discovery.",
    category: "e-discovery",
    features: [
      "Predictive coding with continuous active learning",
      "AI-powered document clustering and categorization",
      "Near-duplicate detection",
      "Advanced search with concept-based queries",
      "Native cloud platform — no on-prem infrastructure needed",
    ],
    color: "from-purple-600 to-indigo-700",
    tagline: "E-discovery built for the cloud era.",
    websiteUrl: "https://www.everlaw.com",
    bestFor: "Litigation teams, corporate legal departments, and government agencies managing large-scale electronic discovery.",
    overview:
      "Everlaw is a cloud-native e-discovery platform that brings modern AI to one of legal's most data-intensive workflows. Its predictive coding uses continuous active learning — meaning the AI gets smarter as reviewers code documents, reducing the volume of manual review significantly. The platform handles everything from data processing and early case assessment to review, analysis, and production. Everlaw's clean interface and collaboration features have made it a favorite among litigation teams tired of clunky legacy e-discovery tools.",
    useCases: [
      "Large-scale litigation discovery with millions of documents",
      "Government investigations and regulatory responses",
      "Internal investigations with cross-team collaboration",
      "Early case assessment to estimate discovery scope and cost",
    ],
    pros: [
      "Cloud-native — no servers to manage, scales automatically",
      "Predictive coding with transparent, auditable AI models",
      "Clean UI that reviewers actually enjoy using",
      "Strong collaboration features for distributed teams",
    ],
    cons: [
      "Pricing scales with data volume — can get expensive for very large matters",
      "Learning curve for teams coming from Relativity",
      "Some advanced features require training to use effectively",
    ],
    pricing: [
      { tier: "Per-matter", price: "Custom", note: "Pricing based on data volume. Contact sales." },
      { tier: "Enterprise", price: "Custom", note: "Annual license with volume discounts." },
    ],
  },
  {
    slug: "luminance",
    name: "Luminance",
    description:
      "AI-powered platform for contract negotiation, review, and analysis. Uses proprietary Legal-Grade AI to read, understand, and negotiate contracts with minimal human input.",
    category: "contract-analysis",
    features: [
      "AI-powered contract negotiation in real time",
      "Automatic redlining against your playbook",
      "350+ languages supported",
      "Due diligence with bulk analysis",
      "Anomaly detection across contract portfolios",
    ],
    color: "from-sky-500 to-blue-700",
    tagline: "AI that negotiates contracts for you.",
    websiteUrl: "https://www.luminance.com",
    bestFor: "Legal teams that want AI to handle first-pass contract negotiation and review, not just analysis.",
    overview:
      "Luminance takes AI contract review a step further: it doesn't just flag issues, it negotiates. Its AI can read an incoming contract, compare it to your preferred positions, generate a redlined version with suggested changes, and even draft response language — all before a human lawyer touches it. The platform supports 350+ languages, making it particularly strong for international transactions. Luminance has moved beyond pure review into true AI-assisted negotiation.",
    useCases: [
      "First-pass contract negotiation — AI generates redlines automatically",
      "Cross-border contract review in multiple languages",
      "Portfolio-wide anomaly detection and risk assessment",
      "Accelerating NDA and vendor agreement turnaround times",
    ],
    pros: [
      "Goes beyond review — actually negotiates and suggests changes",
      "350+ language support is unmatched in the market",
      "Reduces contract turnaround from days to hours",
      "Strong anomaly detection across large portfolios",
    ],
    cons: [
      "Enterprise pricing only",
      "AI-generated redlines still need attorney review for complex deals",
      "Relatively new negotiation features — still maturing",
    ],
    pricing: [
      { tier: "Enterprise", price: "Custom", note: "Contact Luminance for pricing." },
    ],
  },
  {
    slug: "lex-machina",
    name: "Lex Machina",
    description:
      "Legal analytics platform by LexisNexis that uses AI and NLP to mine litigation data. Provides judge analytics, case outcomes, timing data, and competitive intelligence.",
    category: "legal-research",
    features: [
      "Judge analytics — rulings, tendencies, timing patterns",
      "Case outcome prediction based on historical data",
      "Competitive intelligence on opposing counsel",
      "Damages analysis across case types",
      "Practice-area-specific analytics (patent, IP, employment, etc.)",
    ],
    color: "from-orange-500 to-red-600",
    tagline: "Data-driven litigation strategy powered by legal analytics.",
    websiteUrl: "https://lexmachina.com",
    bestFor: "Litigators and litigation strategists who want data-driven insights on judges, opposing counsel, and likely case outcomes.",
    overview:
      "Lex Machina (a LexisNexis company) pioneered the field of legal analytics. Instead of helping you find case law (like traditional legal research), it helps you understand patterns: How does this judge rule on motion to dismiss? What is opposing counsel's win rate? What is the median damages award for this type of case in this district? This data-driven approach to litigation strategy has become indispensable for firms handling high-stakes litigation.",
    reviewSlug: "ai-legal-research-showdown",
    useCases: [
      "Pre-litigation strategy — choosing the right venue and approach",
      "Judge analytics for motion practice",
      "Competitive intelligence on opposing counsel track records",
      "Damages estimation and settlement valuation",
    ],
    pros: [
      "Unique data that you cannot get from traditional legal research",
      "Judge analytics are invaluable for litigation strategy",
      "Practice-area-specific coverage (patent, antitrust, employment, etc.)",
      "Part of the LexisNexis ecosystem — integrates with other tools",
    ],
    cons: [
      "Only covers federal courts and select state courts",
      "Requires a LexisNexis subscription or separate purchase",
      "Learning curve to interpret analytics effectively",
    ],
    pricing: [
      { tier: "Standard", price: "Custom", note: "Available as LexisNexis add-on or standalone. Contact sales." },
    ],
  },
  {
    slug: "lawgeex",
    name: "Lawgeex",
    description:
      "AI-powered contract review platform that automates the approval of routine business contracts. Compares incoming contracts against your legal policies and approves or flags them automatically.",
    category: "contract-analysis",
    features: [
      "Automated contract approval for routine agreements",
      "Policy-based review against your legal standards",
      "Issue flagging with severity ratings",
      "Workflow integration (Salesforce, Slack, email)",
      "Analytics dashboard for contract review metrics",
    ],
    color: "from-teal-500 to-emerald-600",
    tagline: "Automate routine contract approvals. Focus on the deals that matter.",
    websiteUrl: "https://www.lawgeex.com",
    bestFor: "In-house legal teams drowning in routine contract review (NDAs, vendor agreements, SaaS terms) who want to automate the low-risk stuff.",
    overview:
      "Lawgeex is built for a specific, high-impact use case: automating the review and approval of routine business contracts. Instead of having attorneys manually review every NDA and vendor agreement, Lawgeex compares incoming contracts against your legal policies and either auto-approves them or flags specific issues for human review. For in-house teams that handle hundreds of routine contracts per month, this can free up significant attorney time for more strategic work.",
    useCases: [
      "Auto-approving routine NDAs that meet your standards",
      "Flagging non-standard terms in vendor agreements",
      "Reducing contract review bottlenecks for sales teams",
      "Ensuring policy compliance across all incoming contracts",
    ],
    pros: [
      "Purpose-built for routine contract automation — does one thing very well",
      "Measurable ROI: tracks time saved and contracts auto-approved",
      "Good integrations with business workflows",
      "Reduces friction between legal and business teams",
    ],
    cons: [
      "Not designed for complex, bespoke contracts",
      "Requires upfront effort to configure your legal policies",
      "Less useful for firms that don't handle high volumes of similar contracts",
    ],
    pricing: [
      { tier: "Business", price: "Custom", note: "Based on contract volume. Contact sales." },
    ],
  },
  {
    slug: "relativity",
    name: "Relativity",
    description:
      "The industry-standard e-discovery platform used by most Am Law 200 firms. Offers AI-powered analytics, review workflows, and production tools for litigation and investigations.",
    category: "e-discovery",
    features: [
      "Relativity aiR — AI-powered review and analysis",
      "Active Learning for predictive coding",
      "Structured analytics (clustering, email threading, near-dupes)",
      "RelativityOne — fully cloud-hosted SaaS option",
      "Massive ecosystem of third-party integrations and add-ons",
    ],
    color: "from-rose-600 to-pink-700",
    tagline: "The e-discovery platform the industry is built on.",
    websiteUrl: "https://www.relativity.com",
    bestFor: "Large law firms, corporate legal departments, and service providers that need the most comprehensive and widely-adopted e-discovery platform.",
    overview:
      "Relativity is the dominant platform in e-discovery, used by most major law firms and corporate legal departments worldwide. Its latest cloud offering, RelativityOne, brings the full power of the platform to a SaaS model. The recently launched Relativity aiR adds generative AI capabilities on top of Relativity's established analytics, allowing reviewers to ask questions about documents in natural language. If your firm does significant litigation or investigation work, you will encounter Relativity — it is the industry standard.",
    useCases: [
      "Large-scale litigation discovery for complex cases",
      "Government investigations and regulatory compliance",
      "Internal investigations with privilege review",
      "Cross-border discovery with multi-language support",
    ],
    pros: [
      "Industry standard — opposing counsel, courts, and clients expect it",
      "Massive ecosystem of integrations and service providers",
      "RelativityOne makes cloud deployment straightforward",
      "New aiR features bring generative AI to established workflows",
    ],
    cons: [
      "Expensive — licensing, hosting, and data processing costs add up",
      "Complex platform with a significant learning curve",
      "Can be overkill for smaller matters or firms",
    ],
    pricing: [
      { tier: "RelativityOne", price: "Custom", note: "Cloud SaaS. Pricing based on data volume and users." },
      { tier: "Server", price: "Custom", note: "Self-hosted option. Annual license plus hosting costs." },
    ],
  },

  // ─── ONLINE LEGAL SERVICES ───────────────────────────────
  {
    slug: "legalzoom",
    name: "LegalZoom",
    description:
      "The largest online legal services platform in the U.S. Offers business formation (LLC, corporation), registered agent services, trademark registration, estate planning, and access to attorney consultations.",
    category: "online-legal-services",
    features: [
      "LLC and corporation formation in all 50 states",
      "Registered agent services",
      "Trademark search and registration",
      "Wills, trusts, and estate planning documents",
      "Access to a network of independent attorneys",
    ],
    color: "from-green-600 to-emerald-700",
    tagline: "The most recognized name in online legal services.",
    websiteUrl: "https://www.legalzoom.com",
    reviewSlug: "legalzoom-vs-lawdepot-vs-legalnature",
    bestFor: "Entrepreneurs and small business owners who want a trusted, well-known platform for business formation and basic legal documents.",
    overview:
      "LegalZoom has helped millions of Americans form businesses, create legal documents, and access legal advice since 2001. It is the most recognized brand in online legal services. While it is not the cheapest option, its scale means reliable processing, a large attorney network, and a polished user experience. LegalZoom is best for people who want the peace of mind that comes with a well-established platform, even if they pay a premium for it.",
    useCases: [
      "Forming an LLC or corporation quickly and correctly",
      "Filing a trademark application with USPTO",
      "Creating a will or living trust without visiting a lawyer",
      "Getting on-demand legal advice from a licensed attorney",
    ],
    pros: [
      "Most recognized and trusted brand in online legal services",
      "Comprehensive service catalog — formation, IP, estate, compliance",
      "Large attorney network for consultations",
      "Strong customer support with satisfaction guarantee",
    ],
    cons: [
      "Premium pricing compared to competitors",
      "Upsells can make the checkout process confusing",
      "Some services (like registered agent) are cheaper elsewhere",
    ],
    pricing: [
      { tier: "LLC Formation", price: "$0 + state fees", note: "Basic formation. Upsells for expedited processing and add-ons." },
      { tier: "Business Advisory Plan", price: "$33/mo", note: "Includes attorney consultations, compliance calendar, and more." },
    ],
  },
  {
    slug: "lawdepot",
    name: "LawDepot",
    description:
      "Online legal document platform with 100+ customizable templates for business, real estate, financial, and personal legal documents. Strong in Canada, U.S., U.K., and Australia.",
    category: "online-legal-services",
    features: [
      "100+ legal document templates",
      "Step-by-step document builder with plain-English questions",
      "Multi-jurisdiction support (U.S., Canada, U.K., Australia)",
      "Real estate lease and rental agreement templates",
      "Business contracts, NDAs, and employment agreements",
    ],
    color: "from-blue-500 to-blue-700",
    tagline: "Legal documents made simple — 100+ templates, no lawyer required.",
    websiteUrl: "https://www.lawdepot.com",
    reviewSlug: "legalzoom-vs-lawdepot-vs-legalnature",
    bestFor: "Individuals and small businesses who need affordable, customizable legal documents — especially landlords, freelancers, and small employers.",
    overview:
      "LawDepot (part of Draycott Law Inc.) is a legal document platform that lets you create customized legal documents by answering simple questions. It is particularly strong for everyday legal needs: residential leases, employment contracts, NDAs, wills, and power of attorney documents. Unlike LegalZoom, LawDepot focuses purely on document generation rather than full legal services, which keeps costs lower. It also has excellent multi-jurisdiction coverage across the U.S., Canada, U.K., and Australia.",
    useCases: [
      "Landlords creating state-specific lease agreements",
      "Freelancers and contractors drafting service agreements",
      "Small businesses creating employment contracts and NDAs",
      "Individuals creating wills and power of attorney documents",
    ],
    pros: [
      "Large template library covering most common document types",
      "Affordable — free trial plus reasonable subscription pricing",
      "Multi-jurisdiction coverage is excellent for international users",
      "Simple, guided document builder that anyone can use",
    ],
    cons: [
      "Does not offer business formation services",
      "No attorney consultation network",
      "Some templates may need additional customization for complex situations",
    ],
    pricing: [
      { tier: "Free Trial", price: "$0", note: "Create one document free. Full access requires subscription." },
      { tier: "Annual", price: "$7.99/mo", note: "Billed annually. Unlimited document access." },
    ],
  },
  {
    slug: "legalnature",
    name: "LegalNature",
    description:
      "Affordable online legal document service offering business formation, legal document templates, and compliance tools. Known for transparent pricing and no hidden fees.",
    category: "online-legal-services",
    features: [
      "LLC and corporation formation",
      "Legal document templates (contracts, wills, leases)",
      "Compliance alerts and annual report reminders",
      "Operating agreement and bylaws generation",
      "EIN registration assistance",
    ],
    color: "from-teal-500 to-cyan-600",
    tagline: "Affordable legal documents with transparent, no-surprise pricing.",
    websiteUrl: "https://www.legalnature.com",
    reviewSlug: "legalzoom-vs-lawdepot-vs-legalnature",
    bestFor: "Budget-conscious entrepreneurs and small business owners who want straightforward legal documents without the upsell pressure.",
    overview:
      "LegalNature positions itself as the affordable, no-nonsense alternative to LegalZoom. It offers business formation, legal document templates, and basic compliance tools at lower price points with transparent pricing. While it does not have the brand recognition or attorney network of LegalZoom, it delivers solid document quality and a clean user experience. LegalNature is a good choice for cost-conscious founders who know what they need and do not want to navigate upsells.",
    useCases: [
      "Forming an LLC on a budget",
      "Creating an operating agreement or corporate bylaws",
      "Generating basic legal documents (leases, contracts, wills)",
      "Staying on top of state compliance requirements",
    ],
    pros: [
      "Transparent, competitive pricing — no hidden fees",
      "Clean, straightforward user experience",
      "Good document quality for common legal needs",
      "Compliance reminders help you stay in good standing",
    ],
    cons: [
      "Smaller brand — less established than LegalZoom",
      "Narrower template library than LawDepot",
      "No attorney consultation services",
    ],
    pricing: [
      { tier: "LLC Formation", price: "$49 + state fees", note: "One-time fee. Includes operating agreement." },
      { tier: "Documents", price: "From $19", note: "Per document. No subscription required." },
    ],
  },
  {
    slug: "rocket-lawyer",
    name: "Rocket Lawyer",
    description:
      "Online legal services platform offering document creation, attorney consultations, and business formation. Combines DIY legal documents with on-demand access to real lawyers.",
    category: "online-legal-services",
    features: [
      "Legal document creation with e-signature",
      "On-demand attorney consultations (30-minute sessions)",
      "Business formation (LLC, corporation, nonprofit)",
      "Registered agent services",
      "Legal health check and document review by attorneys",
    ],
    color: "from-red-500 to-rose-600",
    tagline: "Legal documents plus real lawyers — when you need both.",
    websiteUrl: "https://www.rocketlawyer.com",
    bestFor: "Small business owners and individuals who want DIY legal documents but also want the option to consult a real attorney when things get complicated.",
    overview:
      "Rocket Lawyer bridges the gap between pure document platforms (like LawDepot) and full legal service providers. Its membership model gives you unlimited document creation plus access to on-demand attorney consultations. This makes it particularly valuable for small business owners who need ongoing legal support — not just a one-time document. Rocket Lawyer also offers business formation, registered agent services, and the ability to have attorneys review your documents before you finalize them.",
    useCases: [
      "Creating legal documents with the option to have an attorney review them",
      "Getting quick legal advice on business or personal matters",
      "Forming a business with ongoing legal support",
      "Sending contracts with built-in e-signature",
    ],
    pros: [
      "Combines DIY documents with real attorney access",
      "Membership model is cost-effective for ongoing legal needs",
      "Built-in e-signature on all documents",
      "Wide range of services — documents, formation, consultations",
    ],
    cons: [
      "Monthly membership required for best pricing",
      "Individual document prices are high without membership",
      "Attorney quality varies by location and availability",
    ],
    pricing: [
      { tier: "Free Trial", price: "$0", note: "7-day free trial with access to documents and one attorney consultation." },
      { tier: "Premium", price: "$39.99/mo", note: "Unlimited documents, e-signatures, and attorney consultations." },
    ],
  },
];
