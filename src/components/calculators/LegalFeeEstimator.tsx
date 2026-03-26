"use client";

import React, { useState } from "react";

const PRACTICE_AREAS: Record<
  string,
  { label: string; lowRate: number; highRate: number; nationalAvg: number }
> = {
  corporate: { label: "Corporate / M&A", lowRate: 250, highRate: 600, nationalAvg: 400 },
  litigation: { label: "Litigation", lowRate: 200, highRate: 550, nationalAvg: 350 },
  ip: { label: "Intellectual Property", lowRate: 275, highRate: 650, nationalAvg: 425 },
  "real-estate": { label: "Real Estate", lowRate: 175, highRate: 450, nationalAvg: 300 },
  family: { label: "Family Law", lowRate: 150, highRate: 400, nationalAvg: 275 },
};

const COMPLEXITY_MULTIPLIERS: Record<string, { label: string; multiplier: number }> = {
  low: { label: "Low", multiplier: 0.8 },
  medium: { label: "Medium", multiplier: 1.0 },
  high: { label: "High", multiplier: 1.35 },
};

export default function LegalFeeEstimator() {
  const [area, setArea] = useState("litigation");
  const [complexity, setComplexity] = useState("medium");
  const [hours, setHours] = useState(20);

  const practice = PRACTICE_AREAS[area];
  const mult = COMPLEXITY_MULTIPLIERS[complexity].multiplier;

  const lowEstimate = Math.round(practice.lowRate * mult * hours);
  const highEstimate = Math.round(practice.highRate * mult * hours);
  const nationalEstimate = Math.round(practice.nationalAvg * mult * hours);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Practice Area</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {Object.entries(PRACTICE_AREAS).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Complexity</label>
          <div className="flex gap-2">
            {Object.entries(COMPLEXITY_MULTIPLIERS).map(([key, val]) => (
              <button
                key={key}
                onClick={() => setComplexity(key)}
                className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium border transition-all ${
                  complexity === key
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-300 hover:border-blue-300"
                }`}
              >
                {val.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Estimated Hours</label>
          <input
            type="number"
            min={1}
            max={5000}
            value={hours}
            onChange={(e) => setHours(Math.max(1, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Estimated Fee Range</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Low Estimate</p>
            <p className="text-2xl font-bold text-slate-700">{fmt(lowEstimate)}</p>
            <p className="text-xs text-slate-400 mt-1">{fmt(Math.round(practice.lowRate * mult))}/hr</p>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-blue-300 text-center shadow-sm">
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">National Average</p>
            <p className="text-2xl font-bold text-blue-700">{fmt(nationalEstimate)}</p>
            <p className="text-xs text-blue-400 mt-1">{fmt(Math.round(practice.nationalAvg * mult))}/hr</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">High Estimate</p>
            <p className="text-2xl font-bold text-slate-700">{fmt(highEstimate)}</p>
            <p className="text-xs text-slate-400 mt-1">{fmt(Math.round(practice.highRate * mult))}/hr</p>
          </div>
        </div>

        {/* Visual bar */}
        <div className="mb-6">
          <p className="text-xs font-medium text-slate-500 mb-2">Fee Range Visualization</p>
          <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              style={{ width: "100%" }}
            />
            <div
              className="absolute inset-y-0 bg-blue-800 rounded-full w-1"
              style={{ left: `${((nationalEstimate - lowEstimate) / (highEstimate - lowEstimate)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>{fmt(lowEstimate)}</span>
            <span>{fmt(highEstimate)}</span>
          </div>
        </div>

        {/* Hourly Rate Benchmarks */}
        <h4 className="text-sm font-bold text-slate-700 mb-3">Hourly Rate Benchmarks by Practice Area</h4>
        <div className="space-y-2">
          {Object.entries(PRACTICE_AREAS).map(([key, val]) => {
            const isSelected = key === area;
            return (
              <div key={key} className={`flex items-center gap-3 text-sm ${isSelected ? "font-semibold text-blue-700" : "text-slate-600"}`}>
                <span className="w-40 truncate">{val.label}</span>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isSelected ? "bg-blue-600" : "bg-slate-300"}`}
                    style={{ width: `${(val.nationalAvg / 650) * 100}%` }}
                  />
                </div>
                <span className="w-20 text-right text-xs">{fmt(val.lowRate)} - {fmt(val.highRate)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => window.location.href = `mailto:?subject=Legal Fee Estimate&body=Practice Area: ${practice.label}%0AComplexity: ${COMPLEXITY_MULTIPLIERS[complexity].label}%0AHours: ${hours}%0AEstimated Range: ${fmt(lowEstimate)} - ${fmt(highEstimate)}%0ANational Average: ${fmt(nationalEstimate)}`}
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
