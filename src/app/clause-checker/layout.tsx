import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Contract Clause Checker | LegalTech AI Hub",
  description:
    "Paste your contract text and instantly see which standard legal clauses are present or missing. Free, private, and runs entirely in your browser.",
  alternates: {
    canonical: "/clause-checker",
  },
};

export default function ClauseCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
