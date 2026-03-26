import Link from "next/link";
import { calculators, calculatorCategories } from "@/lib/calculators";

const ICONS: Record<string, React.ReactNode> = {
  dollar: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  briefcase: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  clock: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  document: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  scale: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  users: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  chart: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  funnel: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
};

export default function CalculatorsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-600 via-blue-600 to-indigo-700 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 text-white">
            Legal Calculators &amp; Estimators
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-blue-100 max-w-3xl">
            Free interactive tools to help legal professionals estimate fees,
            budget matters, forecast caseloads, and measure the ROI of legal
            technology. No signup required.
          </p>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {calculatorCategories.map((cat) => {
            const catCalcs = calculators.filter((c) => c.category === cat.slug);
            if (catCalcs.length === 0) return null;
            return (
              <div key={cat.slug} className="mb-12">
                <h2 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-3">
                  {cat.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {catCalcs.map((calc) => (
                    <Link
                      key={calc.slug}
                      href={`/tools/calculators/${calc.slug}`}
                      className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 block"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                          {ICONS[calc.icon] || ICONS.dollar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">
                            {calc.name}
                          </h3>
                          <p className="text-sm text-slate-500 leading-relaxed">
                            {calc.description}
                          </p>
                          <span className="inline-block mt-3 text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                            Open Calculator &rarr;
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs text-slate-500 leading-relaxed">
            <strong>Disclaimer:</strong> These calculators provide estimates for
            informational and educational purposes only. They do not constitute
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
