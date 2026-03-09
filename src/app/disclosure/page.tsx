import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "Transparency regarding our relationships with legal technology providers and affiliate links.",
};

export default function DisclosurePage() {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-8">Affiliate Disclosure</h1>
        <div className="prose prose-lg text-gray-600">
          <p>
            LegalTech AI Hub is a participant in various affiliate marketing programs. 
            This means that some of the links on this website are "affiliate links." 
            If you click on an affiliate link and make a purchase or sign up for a service, 
            we may receive a small commission at no additional cost to you.
          </p>
          <p>
            Our goal is to provide honest and helpful information about legal technology. 
            The inclusion of a tool in our directory or a link to a provider does not 
            necessarily constitute an endorsement. We research and select tools based on 
            their features, reputation, and relevance to legal professionals.
          </p>
          <p>
            These commissions help us maintain the website, update our content, and continue 
            researching the latest advancements in AI for the legal industry. We appreciate 
            your support which allows us to keep providing free resources to the community.
          </p>
          <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900">How It Affects You</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>No Extra Cost:</strong> Using our affiliate links never costs you extra money.</li>
            <li><strong>Unbiased Reviews:</strong> Our reviews and listings are independent of our affiliate relationships.</li>
            <li><strong>Transparency:</strong> We clearly mark pages with affiliate content or provide this disclosure for awareness.</li>
          </ul>
          <p className="mt-8">
            If you have any questions regarding this disclosure or our practices, please 
            contact us via our <a href="/about" className="text-blue-600 hover:underline">About</a> page.
          </p>
        </div>
      </div>
    </div>
  );
}
