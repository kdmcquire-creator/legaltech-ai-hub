import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Legal Document Diff Checker | LegalTech AI Hub",
  description:
    "Compare two versions of a legal document side by side. See word-level changes highlighted with legal implications flagged. Free, private, and runs entirely in your browser.",
  alternates: {
    canonical: "/doc-diff",
  },
};

export default function DocDiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
