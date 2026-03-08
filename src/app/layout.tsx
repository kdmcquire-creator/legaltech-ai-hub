import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "LegalTech AI Hub - Discover the Future of Legal Services",
  description: "Comprehensive directory of AI-powered legal technology tools and solutions.",
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
                <a href="/" className="hover:text-blue-500">Home</a>
                <a href="/tools" className="hover:text-blue-500">Tools</a>
                <a href="/about" className="hover:text-blue-500">About</a>
          <a href="/submit" className="hover:text-blue-500">Submit</a>
          <a href="/advertise" className="hover:text-blue-500">Advertise</a>
              </nav>
            </div>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="bg-gray-100 border-t py-8">
