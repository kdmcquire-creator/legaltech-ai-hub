import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Calculators & Estimators",
  description:
    "Free interactive calculators for legal professionals. Estimate fees, budget matters, forecast caseloads, and calculate ROI on legal technology investments.",
  alternates: {
    canonical: "/tools/calculators",
  },
  openGraph: {
    title: "Legal Calculators & Estimators | LegalTech AI Hub",
    description:
      "Free interactive calculators for legal professionals. Estimate fees, budget matters, forecast caseloads, and calculate ROI.",
  },
};

export default function CalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
