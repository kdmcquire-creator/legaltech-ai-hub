import { notFound } from "next/navigation";
import Link from "next/link";
import { calculators, getCalculatorBySlug } from "@/lib/calculators";
import type { Metadata } from "next";

import LegalFeeEstimator from "@/components/calculators/LegalFeeEstimator";
import MatterBudgetCalculator from "@/components/calculators/MatterBudgetCalculator";
import BillableHoursCalculator from "@/components/calculators/BillableHoursCalculator";
import DocReviewCalculator from "@/components/calculators/DocReviewCalculator";
import SettlementCalculator from "@/components/calculators/SettlementCalculator";
import ParalegalVsAttorneyCalculator from "@/components/calculators/ParalegalVsAttorneyCalculator";
import CaseVolumeCalculator from "@/components/calculators/CaseVolumeCalculator";
import ClientIntakeRoiCalculator from "@/components/calculators/ClientIntakeRoiCalculator";

const CALCULATOR_COMPONENTS: Record<string, React.ComponentType> = {
  "legal-fee-estimator": LegalFeeEstimator,
  "matter-budget-calculator": MatterBudgetCalculator,
  "billable-hours-calculator": BillableHoursCalculator,
  "document-review-cost-estimator": DocReviewCalculator,
  "settlement-value-calculator": SettlementCalculator,
  "paralegal-vs-attorney-cost": ParalegalVsAttorneyCalculator,
  "case-volume-forecaster": CaseVolumeCalculator,
  "client-intake-roi": ClientIntakeRoiCalculator,
};

export async function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) return {};
  return {
    title: `${calc.name} | Legal Calculators`,
    description: calc.description,
    alternates: { canonical: `/tools/calculators/${calc.slug}` },
    openGraph: {
      title: `${calc.name} | LegalTech AI Hub`,
      description: calc.description,
    },
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) notFound();

  const Component = CALCULATOR_COMPONENTS[slug];
  if (!Component) notFound();

  // Find related calculators
  const related = calculators.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-600 via-blue-600 to-indigo-700 py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav className="mb-4 text-sm text-blue-200">
            <Link href="/tools" className="hover:text-white transition-colors">
              Tools
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/tools/calculators"
              className="hover:text-white transition-colors"
            >
              Calculators
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{calc.name}</span>
          </nav>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 text-white">
            {calc.name}
          </h1>
          <p className="text-base md:text-lg text-blue-100 max-w-3xl">
            {calc.description}
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
            <Component />
          </div>
        </div>
      </section>

      {/* Related Calculators */}
      <section className="pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Other Calculators You Might Find Useful
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/tools/calculators/${r.slug}`}
                className="group bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-blue-300 transition-all block"
              >
                <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-1 text-sm">
                  {r.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {r.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-500 leading-relaxed">
            <strong>Disclaimer:</strong> This calculator provides estimates for
            informational and educational purposes only. It does not constitute
            legal, financial, or professional advice. Actual costs, outcomes, and
            timelines vary significantly based on jurisdiction, case specifics,
            and other factors. Always consult a qualified professional for
            decisions affecting your practice or clients.
          </div>
        </div>
      </section>
    </div>
  );
}
