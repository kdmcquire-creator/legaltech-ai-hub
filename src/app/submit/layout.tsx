import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a Tool",
  description: "Submit an AI-powered legal tool for review and inclusion on LegalTech AI Hub.",
  alternates: { canonical: "/submit" },
  openGraph: {
    title: "Submit a Tool - LegalTech AI Hub",
    description: "Submit an AI-powered legal tool for review and inclusion on LegalTech AI Hub.",
    url: "https://legaltech-ai-hub.com/submit",
    siteName: "LegalTech AI Hub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Submit a Tool - LegalTech AI Hub",
    description: "Submit an AI-powered legal tool for review and inclusion on LegalTech AI Hub.",
  },
};

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
