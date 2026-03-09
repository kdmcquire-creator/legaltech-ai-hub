import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="text-xl font-bold text-blue-600">LegalTech AI Hub</div>
              <nav className="space-x-4">
                <a href="/" className="hover:text-blue-500 font-medium">Home</a>
                <a href="/tools" className="hover:text-blue-500 font-medium">Tools</a>
                <a href="/about" className="hover:text-blue-500 font-medium">About</a>
                <a href="/submit" className="hover:text-blue-500 font-medium">Submit</a>
                <a href="/advertise" className="hover:text-blue-500 font-medium">Advertise</a>
              </nav>
            </div>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="bg-gray-100 border-t py-12">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <div className="text-xl font-bold text-blue-600">LegalTech AI Hub</div>
                  <p className="text-sm text-gray-500 mt-1">Empowering legal professionals with AI.</p>
                </div>
                <div className="flex space-x-6">
                  <a href="/about" className="text-gray-600 hover:text-blue-600 transition">About</a>
                  <a href="/disclosure" className="text-gray-600 hover:text-blue-600 transition">Affiliate Disclosure</a>
                  <a href="/privacy" className="text-gray-600 hover:text-blue-600 transition">Privacy Policy</a>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} LegalTech AI Hub. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
