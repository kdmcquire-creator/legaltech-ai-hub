import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MobileNav from "@/components/MobileNav";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import BackToTop from "@/components/BackToTop";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://legaltech-ai-hub.com"),
  title: {
    default: "LegalTech AI Hub - Discover the Future of Legal Services",
    template: "%s | LegalTech AI Hub",
  },
  description:
    "Comprehensive directory of AI-powered legal technology tools and solutions. Honest reviews, free tools, and practical guides for legal professionals.",
  keywords: [
    "legal technology",
    "AI legal tools",
    "legaltech",
    "contract review AI",
    "legal AI software",
    "law firm technology",
    "legal automation",
    "AI for lawyers",
    "legal document review",
    "legal practice management",
  ],
  authors: [{ name: "LegalTech AI Hub", url: "https://legaltech-ai-hub.com" }],
  creator: "LegalTech AI Hub",
  publisher: "LegalTech AI Hub",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://legaltech-ai-hub.com",
    siteName: "LegalTech AI Hub",
    title: "LegalTech AI Hub - Discover the Future of Legal Services",
    description:
      "Comprehensive directory of AI-powered legal technology tools and solutions. Honest reviews, free tools, and practical guides for legal professionals.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "LegalTech AI Hub - AI-Powered Legal Technology Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LegalTech AI Hub - Discover the Future of Legal Services",
    description:
      "Comprehensive directory of AI-powered legal technology tools and solutions. Honest reviews, free tools, and practical guides.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    other: {
      "google-adsense-account": ["ca-pub-5995172189982724", "ca-pub-1776667288690686"],
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://legaltech-ai-hub.com/#organization",
      name: "LegalTech AI Hub",
      url: "https://legaltech-ai-hub.com",
      description:
        "Comprehensive directory of AI-powered legal technology tools and solutions",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        email: "contact@legaltech-ai-hub.com",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://legaltech-ai-hub.com/#website",
      url: "https://legaltech-ai-hub.com",
      name: "LegalTech AI Hub",
      description:
        "Discover, compare, and use the best AI-powered legal technology tools",
      publisher: {
        "@id": "https://legaltech-ai-hub.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://legaltech-ai-hub.com/tools?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script id="gtm-head" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5995172189982724"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <GoogleAnalytics />
        <ExitIntentPopup />
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-30">
            <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
              <Link
                href="/"
                className="text-lg md:text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                LegalTech AI Hub
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
                <Link href="/" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all">Home</Link>
                <Link href="/tools" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all">Tools</Link>
                <Link href="/reviews" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all">Reviews</Link>
                <Link href="/guides" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all">Guides</Link>
                <Link href="/case-studies" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all">Case Studies</Link>
                <Link href="/glossary" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all">Glossary</Link>
                <Link href="/legal-readiness" className="px-3 py-2 rounded-lg text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition-all">Free Quiz</Link>
                <Link href="/about" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all">About</Link>
                <Link href="/contact" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all">Contact</Link>
              </nav>

              {/* Mobile Nav */}
              <MobileNav />
            </div>
          </header>

          <main className="flex-grow">{children}</main>

          {/* Footer */}
          <footer className="bg-gray-50 border-t border-gray-200 py-10 md:py-12">
            <div className="container mx-auto px-4">
              {/* Footer columns */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                    Tools
                  </h4>
                  <div className="space-y-2.5">
                    <Link href="/tools" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Browse All Tools</Link>
                    <Link href="/legal-readiness" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Legal Readiness Quiz</Link>
                    <Link href="/clause-checker" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Contract Checker</Link>
                    <Link href="/doc-diff" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Document Diff</Link>
                    <Link href="/argument-gap" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Argument Gap Analyzer</Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                    Content
                  </h4>
                  <div className="space-y-2.5">
                    <Link href="/reviews" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Reviews</Link>
                    <Link href="/guides" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Guides</Link>
                    <Link href="/case-studies" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Case Studies</Link>
                    <Link href="/glossary" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Glossary</Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                    Company
                  </h4>
                  <div className="space-y-2.5">
                    <Link href="/about" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">About</Link>
                    <Link href="/contact" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Contact</Link>
                    <Link href="/submit" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Submit a Tool</Link>
                    <Link href="/advertise" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Advertise</Link>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                    Legal
                  </h4>
                  <div className="space-y-2.5">
                    <Link href="/privacy" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Terms of Service</Link>
                    <Link href="/disclosure" className="block text-gray-500 hover:text-blue-600 text-sm transition-colors">Affiliate Disclosure</Link>
                  </div>
                </div>
              </div>

              {/* Disclaimer + copyright */}
              <div className="border-t border-gray-200 pt-8 text-center">
                <p className="text-gray-400 text-xs max-w-2xl mx-auto mb-4 leading-relaxed">
                  <strong>Legal Disclaimer:</strong> LegalTech AI Hub provides
                  informational content and tools only. Nothing on this site
                  constitutes legal advice. Our free tools use pattern matching and
                  automated analysis that may produce inaccurate or incomplete
                  results — always verify outputs independently. Consult a licensed
                  attorney for advice specific to your situation. Use of this site
                  is subject to our{" "}
                  <Link
                    href="/terms"
                    className="underline hover:text-blue-600 transition-colors"
                  >
                    Terms of Service
                  </Link>
                  .
                </p>
                <p className="text-gray-500 text-sm">
                  {"©"} {new Date().getFullYear()} LegalTech AI Hub. All rights
                  reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
        <BackToTop />
      </body>
    </html>
  );
}
