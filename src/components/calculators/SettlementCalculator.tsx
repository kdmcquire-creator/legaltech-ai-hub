"use client";

import React, { useState } from "react";

export default function SettlementCalculator() {
  const [claimedDamages, setClaimedDamages] = useState(500000);
  const [winProbability, setWinProbability] = useState(60);
  const [litigationCosts, setLitigationCosts] = useState(150000);
  const [timeToTrial, setTimeToTrial] = useState(18);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const winProb = winProbability / 100;
  const expectedValueIfWin = claimedDamages * winProb;
  const expectedValueOfTrial = expectedValueIfWin - litigationCosts;
  const costOfDelay = litigationCosts / Math.max(1, timeToTrial);
  const monthlyCostOfDelay = costOfDelay;

  const settlementLow = Math.round(expectedValueOfTrial * 0.8);
  const settlementHigh = Math.round(expectedValueOfTrial * 1.1);
  const settlementMid = Math.round(expectedValueOfTrial * 0.95);

  const discountRate = 0.05;
  const presentValue = expectedValueOfTrial / Math.pow(1 + discountRate, timeToTrial / 12);

  return (
    <div className="space-y-8">
      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
        <p className="font-semibold mb-1">Disclaimer</p>
        <p>
          This calculator is for <span className="font-semibold">educational and illustrative purposes only</span>.
          It does not constitute legal advice. Settlement decisions involve many factors not captured here.
          Always consult a licensed attorney before making litigation or settlement decisions.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Claimed Damages ($)</label>
          <input
            type="number"
            min={0}
            step={10000}
            value={claimedDamages}
            onChange={(e) => setClaimedDamages(Math.max(0, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Win Probability (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            value={winProbability}
            onChange={(e) => setWinProbability(Math.min(100, Math.max(0, Number(e.target.value))))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${winProbability}%` }} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Litigation Costs if Proceed ($)</label>
          <input
            type="number"
            min={0}
            step={5000}
            value={litigationCosts}
            onChange={(e) => setLitigationCosts(Math.max(0, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Time to Trial (months)</label>
          <input
            type="number"
            min={1}
            max={120}
            value={timeToTrial}
            onChange={(e) => setTimeToTrial(Math.min(120, Math.max(1, Number(e.target.value))))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Expected Value of Trial</p>
            <p className={`text-2xl font-bold ${expectedValueOfTrial >= 0 ? "text-blue-700" : "text-red-600"}`}>
              {fmt(expectedValueOfTrial)}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              ({fmt(claimedDamages)} x {winProbability}%) - {fmt(litigationCosts)}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Present Value (5% discount)</p>
            <p className="text-2xl font-bold text-slate-700">{fmt(presentValue)}</p>
            <p className="text-xs text-slate-400 mt-1">Accounting for {timeToTrial}-month delay</p>
          </div>
        </div>

        {/* Settlement Range */}
        <h4 className="text-sm font-bold text-slate-700 mb-3">Recommended Settlement Range</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Low End</p>
            <p className="text-xl font-bold text-slate-600">{fmt(Math.max(0, settlementLow))}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-blue-300 text-center shadow-sm">
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">Midpoint</p>
            <p className="text-xl font-bold text-blue-700">{fmt(Math.max(0, settlementMid))}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">High End</p>
            <p className="text-xl font-bold text-slate-600">{fmt(Math.max(0, settlementHigh))}</p>
          </div>
        </div>

        {/* Cost of Delay */}
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <h4 className="text-sm font-bold text-slate-700 mb-2">Cost of Delay</h4>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-slate-500">Monthly litigation burn rate</p>
              <p className="text-lg font-bold text-red-600">{fmt(monthlyCostOfDelay)}/mo</p>
            </div>
            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
              {Array.from({ length: Math.min(timeToTrial, 24) }).map((_, i) => (
                <div
                  key={i}
                  className="inline-block h-full bg-red-400"
                  style={{ width: `${100 / Math.min(timeToTrial, 24)}%`, opacity: 0.4 + (i / Math.min(timeToTrial, 24)) * 0.6 }}
                />
              ))}
            </div>
            <div>
              <p className="text-xs text-slate-500">Total over {timeToTrial} months</p>
              <p className="text-lg font-bold text-red-600">{fmt(litigationCosts)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            window.location.href = `mailto:?subject=Settlement Value Analysis&body=Claimed Damages: ${fmt(claimedDamages)}%0AWin Probability: ${winProbability}%25%0AExpected Value of Trial: ${fmt(expectedValueOfTrial)}%0ARecommended Settlement: ${fmt(Math.max(0, settlementLow))} - ${fmt(Math.max(0, settlementHigh))}%0A%0ADisclaimer: For educational purposes only. Not legal advice.`;
          }}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors text-center"
        >
          Email My Results
        </button>
        <a
          href="/tools"
          className="flex-1 bg-slate-100 text-slate-700 py-3 px-6 rounded-lg font-semibold text-sm hover:bg-slate-200 transition-colors text-center border border-slate-200"
        >
          Browse Legal AI Tools
        </a>
      </div>
    </div>
  );
}
