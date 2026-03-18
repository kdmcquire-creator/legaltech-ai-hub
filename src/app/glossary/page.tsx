import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Tech Glossary",
  description:
    "A comprehensive glossary of legal technology terms, concepts, and acronyms. From AI contract review to zero-knowledge proofs, find clear definitions for every legal tech term you need to know.",
  alternates: {
    canonical: "/glossary",
  },
};

type GlossaryTerm = {
  term: string;
  definition: string;
  relatedLink?: { label: string; href: string };
};

const glossaryTerms: GlossaryTerm[] = [
  // A
  {
    term: "AI Contract Review",
    definition:
      "The use of artificial intelligence to analyze, flag, and suggest edits within legal contracts. AI contract review tools can identify risky clauses, missing provisions, and deviations from standard language in seconds rather than hours.",
    relatedLink: { label: "Try our Clause Checker", href: "/clause-checker" },
  },
  {
    term: "API (Application Programming Interface)",
    definition:
      "A set of protocols that allows different software applications to communicate with each other. In legal tech, APIs enable tools to integrate with existing systems such as document management platforms, CRMs, and billing software.",
  },
  {
    term: "Automated Document Assembly",
    definition:
      "Software that generates legal documents by filling in templates with client-specific data. This reduces drafting time and minimizes human error in routine documents like NDAs, leases, and engagement letters.",
  },
  {
    term: "Alternative Legal Service Provider (ALSP)",
    definition:
      "A non-traditional provider of legal services that uses technology, process optimization, or specialized staffing to deliver legal work. ALSPs often handle tasks such as document review, compliance, and contract management at lower cost than traditional law firms.",
  },
  {
    term: "Audit Trail",
    definition:
      "A chronological record of all actions taken on a document or within a system. In legal tech, audit trails are critical for compliance, dispute resolution, and demonstrating chain of custody for electronic evidence.",
  },
  // B
  {
    term: "Blockchain in Legal",
    definition:
      "The application of distributed ledger technology to legal processes such as smart contracts, intellectual property registration, and secure evidence storage. Blockchain provides tamper-proof records that can be independently verified.",
  },
  {
    term: "Billing Automation",
    definition:
      "Software that automates the creation, tracking, and submission of legal invoices. These tools enforce billing guidelines, flag errors, and streamline the invoicing process for both law firms and corporate legal departments.",
  },
  {
    term: "Boolean Search",
    definition:
      "A search method that uses logical operators such as AND, OR, and NOT to combine or exclude keywords. Boolean search is foundational to legal research platforms like Westlaw and LexisNexis, enabling precise retrieval of relevant case law and statutes.",
  },
  {
    term: "Benchmarking (Legal Tech)",
    definition:
      "The practice of comparing a legal department or firm&apos;s performance metrics against industry standards or peers. Legal tech benchmarking tools analyze spending, staffing, and cycle times to identify areas for improvement.",
  },
  // C
  {
    term: "CLM (Contract Lifecycle Management)",
    definition:
      "A category of software that manages contracts from initiation through negotiation, execution, compliance, and renewal. CLM platforms centralize contract data and automate key workflows to reduce risk and improve efficiency.",
    relatedLink: { label: "Browse CLM tools", href: "/tools" },
  },
  {
    term: "Clause Detection",
    definition:
      "An AI-powered capability that identifies specific types of clauses within contracts, such as indemnification, limitation of liability, or force majeure. Clause detection enables faster review and comparison across large volumes of agreements.",
    relatedLink: { label: "Try our Clause Checker", href: "/clause-checker" },
  },
  {
    term: "Compliance Automation",
    definition:
      "Technology that automates the monitoring, reporting, and enforcement of regulatory requirements. Compliance automation tools help legal teams stay current with changing regulations and reduce the risk of non-compliance.",
  },
  {
    term: "Conversational AI",
    definition:
      "AI systems that can engage in dialogue with users through natural language. In legal tech, conversational AI powers chatbots for client intake, internal knowledge queries, and guided legal workflows.",
  },
  {
    term: "Citation Verification",
    definition:
      "The automated process of checking whether legal citations are accurate, current, and properly formatted. AI-powered citation verification tools can flag overruled cases, incorrect pinpoint citations, and formatting errors.",
  },
  {
    term: "Cloud-Based Legal Software",
    definition:
      "Legal technology delivered over the internet rather than installed on local servers. Cloud-based solutions offer remote access, automatic updates, and reduced IT overhead for law firms and legal departments.",
  },
  // D
  {
    term: "Document Automation",
    definition:
      "The use of technology to create, populate, and manage legal documents with minimal manual input. Document automation tools use templates, conditional logic, and data integrations to produce accurate documents at scale.",
  },
  {
    term: "Due Diligence",
    definition:
      "A systematic investigation of a business or individual prior to a transaction such as a merger, acquisition, or investment. Legal tech tools accelerate due diligence by automating document review, risk identification, and data extraction.",
  },
  {
    term: "Data Room",
    definition:
      "A secure online repository used to store and share confidential documents during transactions, litigation, or audits. Virtual data rooms provide granular access controls, activity tracking, and document watermarking.",
  },
  {
    term: "Document Management System (DMS)",
    definition:
      "Software that organizes, stores, and tracks electronic documents and files. In legal settings, a DMS provides version control, access permissions, and full-text search to help teams manage large volumes of case files and contracts.",
  },
  // E
  {
    term: "E-Discovery",
    definition:
      "The process of identifying, collecting, and producing electronically stored information (ESI) in response to litigation or regulatory requests. E-discovery tools use AI to reduce review time and costs by prioritizing relevant documents.",
  },
  {
    term: "E-Signature",
    definition:
      "An electronic method of signing documents that is legally binding in most jurisdictions. E-signature platforms streamline contract execution by eliminating the need for printing, scanning, and mailing physical documents.",
  },
  {
    term: "Entity Extraction",
    definition:
      "A natural language processing technique that identifies and classifies named entities such as people, organizations, dates, and monetary amounts within text. In legal tech, entity extraction powers contract analysis and due diligence workflows.",
  },
  {
    term: "Ethical AI",
    definition:
      "The practice of designing and deploying AI systems that are fair, transparent, accountable, and respectful of privacy. In the legal industry, ethical AI considerations include bias mitigation, explainability of outputs, and responsible use of client data.",
    relatedLink: { label: "Explore our AI readiness assessment", href: "/legal-readiness" },
  },
  // F
  {
    term: "FinTech-Legal Integration",
    definition:
      "The convergence of financial technology and legal technology to address overlapping needs such as regulatory compliance, contract management for financial products, and automated KYC (Know Your Customer) processes.",
  },
  {
    term: "Full-Text Search",
    definition:
      "A search capability that scans the entire content of documents rather than just metadata or titles. Full-text search is essential in legal research and e-discovery for finding specific language across thousands of files.",
  },
  // G
  {
    term: "Generative AI",
    definition:
      "AI models that can create new content such as text, summaries, or draft documents based on patterns learned from training data. In legal tech, generative AI is used for drafting contracts, summarizing case law, and producing research memos.",
    relatedLink: { label: "Read our AI guides", href: "/guides/ai-contract-review" },
  },
  {
    term: "GRC (Governance, Risk, and Compliance)",
    definition:
      "A framework that aligns IT, security, and legal operations to manage governance obligations, enterprise risk, and regulatory compliance. GRC platforms help organizations coordinate policies, assess risk, and demonstrate compliance across departments.",
  },
  // H
  {
    term: "Hallucination (AI)",
    definition:
      "A phenomenon where an AI model generates information that appears plausible but is factually incorrect or fabricated. In legal contexts, AI hallucinations pose serious risks when tools produce fake case citations or inaccurate regulatory references.",
    relatedLink: { label: "Check arguments for gaps", href: "/argument-gap" },
  },
  {
    term: "Hybrid Cloud",
    definition:
      "A computing environment that combines on-premises infrastructure with cloud services. Many law firms use hybrid cloud deployments to keep sensitive client data on local servers while leveraging cloud tools for collaboration and less sensitive workloads.",
  },
  // I
  {
    term: "Intelligent Document Processing",
    definition:
      "Technology that combines OCR, natural language processing, and machine learning to extract, classify, and validate data from unstructured documents. IDP is widely used in legal for processing contracts, court filings, and regulatory submissions.",
  },
  {
    term: "IP Management Software",
    definition:
      "Tools designed to manage intellectual property portfolios, including patents, trademarks, and copyrights. IP management software tracks filing deadlines, renewal dates, and prosecution histories across multiple jurisdictions.",
  },
  // J
  {
    term: "JSON (in Legal APIs)",
    definition:
      "JavaScript Object Notation, a lightweight data interchange format commonly used in legal technology APIs. JSON enables structured data exchange between legal software systems, making integrations faster and more reliable.",
  },
  {
    term: "Jurisdiction Mapping",
    definition:
      "The process of identifying which laws, regulations, and courts apply to a given legal matter based on geographic and subject-matter factors. Legal tech tools automate jurisdiction mapping to help firms manage multi-jurisdictional compliance.",
  },
  // K
  {
    term: "Knowledge Management (Legal)",
    definition:
      "Systems and practices for capturing, organizing, and sharing institutional knowledge within a law firm or legal department. Legal knowledge management platforms store precedent documents, research memos, and best practices for easy retrieval.",
  },
  {
    term: "Key Term Extraction",
    definition:
      "An NLP technique that automatically identifies the most important terms and phrases within legal documents. Key term extraction is used in contract review, litigation coding, and document summarization workflows.",
  },
  // L
  {
    term: "Legal Analytics",
    definition:
      "The use of data analysis and visualization to gain insights into legal outcomes, judge behavior, opposing counsel strategies, and case timelines. Legal analytics tools help lawyers make more informed strategic decisions.",
    relatedLink: { label: "View case studies", href: "/case-studies" },
  },
  {
    term: "Legal Ops",
    definition:
      "Short for legal operations, this discipline focuses on optimizing the business of delivering legal services through technology, process improvement, and data-driven decision making. Legal ops teams often lead legal tech procurement and implementation.",
  },
  {
    term: "Legal Process Outsourcing (LPO)",
    definition:
      "The practice of delegating legal tasks to external providers, often in lower-cost locations. LPO services commonly include document review, contract management, legal research, and compliance support, frequently enhanced by technology.",
  },
  {
    term: "LLM (Large Language Model)",
    definition:
      "A type of AI model trained on vast amounts of text data that can understand and generate human-like language. LLMs such as GPT-4 and Claude power many modern legal tech applications, from contract drafting to legal research assistants.",
  },
  // M
  {
    term: "Machine Learning",
    definition:
      "A subset of artificial intelligence where algorithms improve their performance through exposure to data rather than explicit programming. In legal tech, machine learning powers predictive coding, contract analysis, and risk scoring.",
  },
  {
    term: "Matter Management",
    definition:
      "Software that tracks and organizes all aspects of legal matters, including tasks, deadlines, documents, budgets, and communications. Matter management systems give legal departments visibility into workload and spending across their entire portfolio.",
  },
  {
    term: "Metadata Extraction",
    definition:
      "The automated process of pulling structured information such as dates, parties, and document properties from files. In legal tech, metadata extraction is used in e-discovery, contract management, and regulatory compliance to organize and classify large document sets.",
  },
  // N
  {
    term: "Natural Language Processing (NLP)",
    definition:
      "A branch of AI that enables computers to understand, interpret, and generate human language. NLP is the foundation of many legal tech capabilities including contract analysis, legal research, sentiment analysis, and document summarization.",
  },
  {
    term: "Natural Language Query",
    definition:
      "The ability to search databases and document collections using everyday language rather than structured query syntax. Legal research tools increasingly support natural language queries, allowing users to ask questions as they would to a colleague.",
  },
  {
    term: "No-Code Legal Tools",
    definition:
      "Software platforms that allow legal professionals to build workflows, forms, and applications without writing any code. No-code tools democratize legal tech by enabling non-technical users to automate processes and create client-facing solutions.",
  },
  // O
  {
    term: "Obligation Tracking",
    definition:
      "The systematic monitoring of contractual obligations, deadlines, and deliverables. Obligation tracking tools extract commitments from contracts and create alerts to ensure that parties meet their responsibilities on time.",
  },
  {
    term: "OCR (Optical Character Recognition)",
    definition:
      "Technology that converts scanned documents, images, or PDFs into machine-readable text. OCR is a critical first step in digitizing paper-based legal records for search, analysis, and storage in document management systems.",
  },
  {
    term: "Outside Counsel Management",
    definition:
      "The processes and technology used by corporate legal departments to select, manage, and evaluate external law firms. Outside counsel management platforms track performance, enforce billing guidelines, and consolidate spend data across multiple firms.",
  },
  // P
  {
    term: "Playbook (Contract)",
    definition:
      "A set of pre-approved rules and fallback positions that guide how contracts should be negotiated. Contract playbooks are increasingly embedded in AI review tools to automate the comparison of incoming terms against organizational standards.",
  },
  {
    term: "Predictive Coding",
    definition:
      "A machine learning technique used in e-discovery where an algorithm is trained on a sample of human-reviewed documents to predict the relevance of remaining documents. Predictive coding dramatically reduces the volume of documents requiring manual review.",
  },
  {
    term: "Practice Management Software",
    definition:
      "An all-in-one platform that helps law firms manage daily operations including calendaring, client intake, time tracking, billing, and document storage. Modern practice management tools increasingly incorporate AI-powered features.",
    relatedLink: { label: "Browse legal tech tools", href: "/tools" },
  },
  {
    term: "Prompt Engineering",
    definition:
      "The practice of crafting effective inputs to AI models to produce desired outputs. In legal tech, prompt engineering is essential for getting accurate and useful results from generative AI tools used in research, drafting, and analysis.",
  },
  // Q
  {
    term: "Quality Assurance (Legal AI)",
    definition:
      "The processes and checks used to verify that AI-generated legal outputs are accurate, complete, and reliable. QA in legal AI includes human-in-the-loop review, output validation against known benchmarks, and systematic testing for bias or errors.",
  },
  // R
  {
    term: "Redlining",
    definition:
      "The process of marking proposed changes, additions, and deletions in a legal document during negotiation. Digital redlining tools track edits from multiple parties and maintain a clear history of all modifications.",
    relatedLink: { label: "Try our Doc Diff tool", href: "/doc-diff" },
  },
  {
    term: "RegTech",
    definition:
      "Technology designed to help organizations comply with regulatory requirements more efficiently. RegTech solutions use automation, data analytics, and AI to monitor regulatory changes, manage compliance workflows, and generate reports.",
  },
  {
    term: "Risk Scoring",
    definition:
      "An automated method of assigning numerical risk ratings to contracts, matters, or entities based on predefined criteria. Risk scoring helps legal teams prioritize their review efforts and allocate resources to the highest-risk items.",
  },
  {
    term: "Robotic Process Automation (RPA)",
    definition:
      "Software robots that automate repetitive, rule-based tasks such as data entry, file transfers, and report generation. In legal departments, RPA handles routine administrative work so that professionals can focus on higher-value activities.",
  },
  // S
  {
    term: "Smart Contracts",
    definition:
      "Self-executing agreements where the terms are written directly into code on a blockchain. Smart contracts automatically enforce obligations when predetermined conditions are met, reducing the need for intermediaries in certain transaction types.",
  },
  {
    term: "Spend Management (Legal)",
    definition:
      "The practice of tracking, analyzing, and optimizing legal expenditures across internal and external resources. Legal spend management tools provide dashboards, benchmarking, and forecasting to help departments control costs.",
  },
  {
    term: "Structured Data Extraction",
    definition:
      "The process of converting unstructured information from documents into organized, machine-readable formats such as tables or databases. In legal tech, structured data extraction transforms contracts and filings into analyzable datasets.",
  },
  {
    term: "SaaS (Software as a Service)",
    definition:
      "A software delivery model where applications are hosted in the cloud and accessed via the internet on a subscription basis. Most modern legal tech solutions are delivered as SaaS, offering scalability, automatic updates, and lower upfront costs.",
  },
  // T
  {
    term: "Template Management",
    definition:
      "A system for creating, storing, versioning, and distributing standardized document templates. Template management ensures that all team members use current, approved templates and reduces the risk of errors from outdated forms.",
  },
  {
    term: "Technology-Assisted Review (TAR)",
    definition:
      "A broad category of tools that use machine learning to accelerate document review in litigation and investigations. TAR encompasses predictive coding, active learning, and other AI-driven approaches that reduce manual review effort.",
  },
  {
    term: "Tokenization",
    definition:
      "In NLP, the process of breaking text into smaller units called tokens for analysis. In legal data security, tokenization replaces sensitive information with non-sensitive placeholders, protecting client data while preserving its usability in analytics.",
  },
  // U
  {
    term: "Unified Legal Platform",
    definition:
      "An integrated software suite that combines multiple legal functions such as matter management, contract management, billing, and analytics into a single platform. Unified platforms reduce data silos and streamline workflows across legal teams.",
  },
  {
    term: "Unstructured Data",
    definition:
      "Information that does not follow a predefined data model, such as emails, PDFs, scanned documents, and free-form text. The majority of legal data is unstructured, making AI and NLP tools essential for extracting insights at scale.",
  },
  // V
  {
    term: "Virtual Law Firm",
    definition:
      "A law practice that operates primarily or entirely through digital infrastructure rather than physical offices. Virtual firms leverage cloud-based legal tech, video conferencing, and collaboration tools to deliver legal services remotely.",
  },
  {
    term: "Vendor Management (Legal Tech)",
    definition:
      "The process of evaluating, selecting, onboarding, and monitoring legal technology vendors. Effective vendor management ensures that tools meet security, compliance, and performance requirements while delivering value to the organization.",
  },
  // W
  {
    term: "Workflow Automation",
    definition:
      "Technology that automates multi-step business processes by defining triggers, actions, and conditions. In legal settings, workflow automation handles tasks like approval routing, deadline reminders, document generation, and status notifications.",
  },
  {
    term: "Westlaw",
    definition:
      "A widely used legal research platform developed by Thomson Reuters that provides access to case law, statutes, regulations, and secondary sources. Westlaw has increasingly incorporated AI features such as litigation analytics and AI-assisted research.",
  },
  // X
  {
    term: "XML (in Legal Documents)",
    definition:
      "Extensible Markup Language, a format used to structure and tag legal documents for machine readability. XML standards like Akoma Ntoso and LegalDocML enable courts and legislatures to publish structured, interoperable legal content.",
  },
  // Y
  {
    term: "Year-over-Year Analytics",
    definition:
      "The comparison of legal metrics across consecutive years to identify trends, measure progress, and inform strategic decisions. Legal departments use year-over-year analytics to track spending, matter volume, cycle times, and vendor performance.",
  },
  // Z
  {
    term: "Zero-Knowledge Proofs (in Legal Tech)",
    definition:
      "A cryptographic method that allows one party to prove they possess certain information without revealing the information itself. In legal tech, zero-knowledge proofs enable privacy-preserving identity verification, compliance checks, and secure data sharing.",
  },
];

function groupTermsByLetter(terms: GlossaryTerm[]): Record<string, GlossaryTerm[]> {
  const grouped: Record<string, GlossaryTerm[]> = {};
  for (const term of terms) {
    const letter = term.term[0].toUpperCase();
    if (!grouped[letter]) {
      grouped[letter] = [];
    }
    grouped[letter].push(term);
  }
  // Sort terms within each letter
  for (const letter of Object.keys(grouped)) {
    grouped[letter].sort((a, b) => a.term.localeCompare(b.term));
  }
  return grouped;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryPage() {
  const grouped = groupTermsByLetter(glossaryTerms);
  const activeLetters = new Set(Object.keys(grouped));

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Legal Tech Glossary
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-amber-100 max-w-2xl mx-auto">
            A comprehensive reference of legal technology terms, concepts, and
            acronyms — from AI contract review to zero-knowledge proofs.
          </p>
        </div>
      </section>

      {/* Alphabet Navigation */}
      <section className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 max-w-4xl py-3">
          <nav
            aria-label="Alphabet navigation"
            className="flex flex-wrap justify-center gap-1.5"
          >
            {alphabet.map((letter) => {
              const isActive = activeLetters.has(letter);
              return isActive ? (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  {letter}
                </a>
              ) : (
                <span
                  key={letter}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-semibold text-gray-300 bg-gray-50 cursor-default"
                >
                  {letter}
                </span>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {alphabet.map((letter) => {
            const terms = grouped[letter];
            if (!terms) return null;

            return (
              <div key={letter} id={`letter-${letter}`} className="mb-12 scroll-mt-20">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 pb-2 border-b-2 border-blue-100">
                  {letter}
                </h2>
                <div className="space-y-4">
                  {terms.map((item) => (
                    <div
                      key={item.term}
                      className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {item.term}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.definition}
                      </p>
                      {item.relatedLink && (
                        <Link
                          href={item.relatedLink.href}
                          className="inline-block mt-3 text-sm text-blue-600 hover:underline font-medium"
                        >
                          {item.relatedLink.label} &rarr;
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-6 text-center">
            <p className="text-gray-800 font-semibold mb-1">
              New terms added regularly
            </p>
            <p className="text-gray-600 text-sm">
              Subscribe to our newsletter to stay current with the latest legal
              tech terminology and trends.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can&apos;t find a term?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Our glossary is regularly updated with new legal technology terms. If
            there&apos;s a term you&apos;d like us to add, let us know.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Suggest a Term
          </Link>
        </div>
      </section>
    </div>
  );
}
