import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";

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
        <div className="flex flex-col min-h-screen">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                LegalTech AI Hub
              </Link>
              <nav className="space-x-4">
                <Link href="/" className="hover:text-blue-500 font-medium">Home</Link>
                <Link href="/tools" className="hover:text-blue-500 font-medium">Tools</Link>
                <Link href="/about" className="hover:text-blue-500 font-medium">About</Link>
                <Link href="/submit" className="hover:text-blue-500 font-medium">Submit Your Tool</Link>
              </nav>
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-50 border-t py-8">
            <div className="container mx-auto px-4 text-center">
              <div className="flex justify-center space-x-6 mb-4">
                <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
                <Link href="/disclosure" className="text-gray-600 hover:text-blue-600">Affiliate Disclosure</Link>
              </div>
              <p className="text-gray-500 text-sm">
                {"©"} {new Date().getFullYear()} LegalTech AI Hub. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
