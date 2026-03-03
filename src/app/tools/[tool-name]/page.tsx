import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const toolsData = {
  "contract-analyzer": {
    name: "Contract Analyzer",
    description: "AI-powered tool for comprehensive contract review and risk assessment.",
    category: "Contract Analysis",
    features: ["Automatic clause detection", "Risk scoring", "Obligation tracking"],
  },
  "legal-research-assistant": {
    name: "Legal Research Assistant",
    description: "Intelligent search and analysis for legal precedents and case law.",
    category: "Legal Research",
    features: ["Natural language queries", "Citation verification", "Summary generation"],
  },
  "case-management-pro": {
    name: "Case Management Pro",
    description: "Streamlined case tracking and deadline management for legal teams.",
    category: "Case Management",
    features: ["Deadline alerts", "Document linking", "Team collaboration"],
  },
  "document-automation-ai": {
    name: "Document Automation AI",
    description: "Automated legal document generation with AI-driven templates.",
    category: "Document Automation",
    features: ["Template library", "Auto-filling", "Customizable workflows"],
  },
  "e-discovery-scanner": {
    name: "E-Discovery Scanner",
    description: "Advanced scanning and categorization of electronic discovery data.",
    category: "E-Discovery",
    features: ["Large-scale data processing", "Duplicate detection", "Searchable indexing"],
  },
  "compliance-risk-checker": {
    name: "Compliance Risk Checker",
    description: "Automated assessment of regulatory compliance and risk exposure.",
    category: "Compliance & Risk",
    features: ["Regulatory updates", "Gap analysis", "Reporting dashboard"],
  },
  "intellectual-property-bot": {
    name: "Intellectual Property Bot",
    description: "AI assistant for trademark and patent research and monitoring.",
    category: "IP Management",
    features: ["TESS integration", "Status monitoring", "Alerting system"],
  },
  "litigation-predictor": {
    name: "Litigation Predictor",
    description: "AI analytics to predict litigation outcomes based on historical data.",
    category: "Legal Analytics",
    features: ["Historical data analysis", "Outcome probability", "Cost estimation"],
  },
  "notary-verification-tool": {
    name: "Notary Verification Tool",
    description: "Digital verification and authentication for notarized documents.",
    category: "Authentication",
    features: ["Blockchain verification", "Identity checks", "Tamper-evident logs"],
  },
  "legal-chat-assistant": {
    name: "Legal Chat Assistant",
    description: "24/7 AI-powered chat assistant for basic legal inquiries and triage.",
    category: "Customer Service",
    features: ["Instant responses", "Lead qualification", "Initial triage"],
  },
};

type Props = {
  params: { "tool-name": string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const toolName = params["tool-name"];
  const tool = toolsData[toolName as keyof typeof toolsData];

  if (!tool) {
    return {
      title: "Tool Not Found - LegalTech AI Hub",
    };
  }

  return {
    title: `${tool.name} - AI Legal Tool | LegalTech AI Hub`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} - AI Legal Tool`,
      description: tool.description,
    },
  };
}

export default function ToolPage({ params }: Props) {
  const toolName = params["tool-name"];
  const tool = toolsData[toolName as keyof typeof toolsData];

  if (!tool) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Tool Hero */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Link href="/" className="text-blue-200 hover:text-white transition">
              &larr; Back to Hub
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold mb-4">{tool.name}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">{tool.description}</p>
          <div className="mt-8">
            <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider border border-blue-400">
              {tool.category}
            </span>
          </div>
        </div>
      </section>

      {/* Tool Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <div className="prose prose-lg text-gray-600 mb-12">
                <p>
                  {tool.name} is a leading-edge solution in the {tool.category} space. 
                  Leveraging advanced AI models, it provides legal professionals with 
                  the tools they need to enhance efficiency, reduce errors, and deliver 
                  superior results for their clients.
                </p>
                <p>
                  The legal landscape is evolving rapidly, and tools like {tool.name} 
                  are at the forefront of this transformation. By automating repetitive 
                  tasks and providing deep insights into complex datasets, this tool 
                  empowers practitioners to focus on high-value strategic work.
                </p>
              </div>

              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <ul className="space-y-4 mb-12">
                {tool.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-3xl font-bold mb-6">Why Choose {tool.name}?</h2>
              <p className="text-gray-600 mb-8">
                In a competitive market, {tool.name} stands out for its accuracy, 
                ease of use, and robust security features. It has been built 
                from the ground up to meet the unique needs of legal departments 
                and law firms alike.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border h-fit">
              <h3 className="text-xl font-bold mb-4">Request Demo</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Want to see how {tool.name} can transform your practice? 
                Schedule a personalized walkthrough with our team.
              </p>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                Book Demo
              </button>
              <div className="mt-8 pt-8 border-t">
                <h4 className="font-bold mb-2">Pricing</h4>
                <p className="text-gray-600 text-sm">
                  Contact us for custom enterprise pricing tailored to your 
                  firm's specific requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
