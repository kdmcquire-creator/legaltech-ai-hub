import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Legal Readiness Assessment | LegalTech AI Hub",
  description:
    "Take our free legal readiness quiz to evaluate your business's legal health. Get a personalized score and action plan in under 5 minutes.",
  alternates: {
    canonical: "/legal-readiness",
  },
};

export default function LegalReadinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
