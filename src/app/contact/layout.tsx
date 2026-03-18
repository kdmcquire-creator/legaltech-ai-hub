import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with LegalTech AI Hub. Questions, partnerships, tool submissions, and feedback welcome.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us - LegalTech AI Hub",
    description: "Get in touch with LegalTech AI Hub. Questions, partnerships, tool submissions, and feedback welcome.",
    url: "https://legaltech-ai-hub.com/contact",
    siteName: "LegalTech AI Hub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us - LegalTech AI Hub",
    description: "Get in touch with LegalTech AI Hub.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
