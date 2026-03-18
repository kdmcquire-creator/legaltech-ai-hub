import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://legaltech-ai-hub.com"),
  title: {
    default: "LegalTech AI Hub - Discover the Future of Legal Services",
    template: "%s | LegalTech AI Hub",
  },
  description: "Comprehensive directory of AI-powered legal technology tools and solutions.",
  alternates: {
    canonical: "/",
  },
  verification: {
    other: {
      "google-adsense-account": ["ca-pub-5995172189982724"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5995172189982724"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        <div className="flex flex-col min-h-screen">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                LegalTech AI Hub
              </Link>
              <nav className="space-x-4">
                <Link href="/" className="text-gray-700 hover:text-blue-500 font-medium">Home</Link>
                <Link href="/tools" className="text-gray-700 hover:text-blue-500 font-medium">Tools</Link>
                <Link href="/reviews" className="text-gray-700 hover:text-blue-500 font-medium">Reviews</Link>
                <Link href="/guides" className="text-gray-700 hover:text-blue-500 font-medium">Guides</Link>
                <Link href="/case-studies" className="text-gray-700 hover:text-blue-500 font-medium">Case Studies</Link>
                <Link href="/glossary" className="text-gray-700 hover:text-blue-500 font-medium">Glossary</Link>
                <Link href="/legal-readiness" className="hover:text-emerald-600 font-medium text-emerald-700">Free Quiz</Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-500 font-medium">About</Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-500 font-medium">Contact</Link>
              </nav>
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-50 border-t py-8">
            <div className="container mx-auto px-4">
              {/* Footer columns */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Tools</h4>
                  <div className="space-y-2">
                    <Link href="/tools" className="block text-gray-600 hover:text-blue-600 text-sm">Browse All Tools</Link>
                    <Link href="/legal-readiness" className="block text-gray-600 hover:text-blue-600 text-sm">Legal Readiness Quiz</Link>
                    <Link href="/clause-checker" className="block text-gray-600 hover:text-blue-600 text-sm">Contract Checker</Link>
                    <Link href="/doc-diff" className="block text-gray-600 hover:text-blue-600 text-sm">Document Diff</Link>
                    <Link href="/argument-gap" className="block text-gray-600 hover:text-blue-600 text-sm">Argument Gap Analyzer</Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Content</h4>
                  <div className="space-y-2">
                    <Link href="/reviews" className="block text-gray-600 hover:text-blue-600 text-sm">Reviews</Link>
                    <Link href="/guides" className="block text-gray-600 hover:text-blue-600 text-sm">Guides</Link>
                    <Link href="/case-studies" className="block text-gray-600 hover:text-blue-600 text-sm">Case Studies</Link>
                    <Link href="/glossary" className="block text-gray-600 hover:text-blue-600 text-sm">Glossary</Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Company</h4>
                  <div className="space-y-2">
                    <Link href="/about" className="block text-gray-600 hover:text-blue-600 text-sm">About</Link>
                    <Link href="/contact" className="block text-gray-600 hover:text-blue-600 text-sm">Contact</Link>
                    <Link href="/submit" className="block text-gray-600 hover:text-blue-600 text-sm">Submit a Tool</Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Legal</h4>
                  <div className="space-y-2">
                    <Link href="/privacy" className="block text-gray-600 hover:text-blue-600 text-sm">Privacy Policy</Link>
                    <Link href="/terms" className="block text-gray-600 hover:text-blue-600 text-sm">Terms of Service</Link>
                    <Link href="/disclosure" className="block text-gray-600 hover:text-blue-600 text-sm">Affiliate Disclosure</Link>
                  </div>
                </div>
              </div>

              {/* Disclaimer + copyright */}
              <div className="border-t pt-6 text-center">
                <p className="text-gray-400 text-xs max-w-2xl mx-auto mb-4">
                  <strong>Legal Disclaimer:</strong> LegalTech AI Hub provides informational content and tools only. Nothing on this site constitutes legal advice. Our free tools use pattern matching and automated analysis that may produce inaccurate or incomplete results — always verify outputs independently. Consult a licensed attorney for advice specific to your situation. Use of this site is subject to our{" "}
                  <Link href="/terms" className="underline hover:text-blue-600">Terms of Service</Link>.
                </p>
                <p className="text-gray-500 text-sm">
                  {"©"} {new Date().getFullYear()} LegalTech AI Hub. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
