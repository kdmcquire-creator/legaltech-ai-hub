import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools } from "@/lib/tools";

type Props = {
  params: { "tool-name": string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const toolSlug = params["tool-name"];
  const tool = tools.find((t) => t.slug === toolSlug);

  if (!tool) {
    return {
      title: "Tool Not Found - LegalTech AI Hub",
    };
  }

  return {
    title: `${tool.name} - AI Legal Tool | LegalTech AI Hub`,
    description: tool.description,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.name} - AI Legal Tool`,
      description: tool.description,
    },
  };
}

export default function ToolPage({ params }: Props) {
  const toolSlug = params["tool-name"];
  const tool = tools.find((t) => t.slug === toolSlug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Tool Hero */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Link href="/tools" className="text-blue-200 hover:text-white transition">
              &larr; Back to Hub
            </Link>
          </div>
          <h1 className="text-4xl font-extrabold mb-4">{tool.name}</h1>
          <p className="text-xl text-blue-100 max-w-3xl">{tool.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider border border-blue-400">
              {tool.category.replace("-", " ")}
            </span>
            {tool.affiliateUrl ? (
              <a 
                href={tool.affiliateUrl} 
                target="_blank" 
                rel="nofollow noopener" 
                className="bg-white text-blue-600 px-8 py-2 rounded-lg font-bold hover:bg-blue-50 transition"
              >
                Visit Website &rarr;
              </a>
            ) : (
              <button className="bg-blue-500 text-blue-100 px-8 py-2 rounded-lg font-bold cursor-not-allowed border border-blue-400">
                Official Site
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Tool Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 text-gray-800">
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <div className="prose prose-lg text-gray-600 mb-12">
                <p>
                  {tool.name} is a leading-edge solution in the {tool.category.replace("-", " ")} space. 
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

            <div className="bg-gray-50 p-8 rounded-xl border h-fit sticky top-24">
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
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-xs text-yellow-800">
                <strong>Disclosure:</strong> This page may contain affiliate links. We may earn a commission if you make a purchase through these links at no extra cost to you.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
