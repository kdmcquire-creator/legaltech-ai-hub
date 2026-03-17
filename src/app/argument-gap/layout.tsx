import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Legal Argument Gap Analyzer | LegalTech AI Hub",
  description:
    "Paste a legal argument or brief and get instant analysis of potential gaps — missing elements, unsupported claims, and structural weaknesses. Free, private, and runs entirely in your browser.",
  alternates: {
    canonical: "/argument-gap",
  },
};

export default function ArgumentGapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
