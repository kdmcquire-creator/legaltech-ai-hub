"use client";

import React, { useState } from "react";

export default function DocReviewCalculator() {
  const [numDocs, setNumDocs] = useState(10000);
  const [pagesPerDoc, setPagesPerDoc] = useState(5);
  const [reviewRate, setReviewRate] = useState(30);
  const [reviewerRate, setReviewerRate] = useState(75);

  const AI_SPEED_MULTIPLIER = 10;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  // Manual
  const manualHours = reviewRate > 0 ? numDocs / reviewRate : 0;
  const manualCost = manualHours * reviewerRate;
  const manualDays = manualHours / 8;

  // AI-assisted
  const aiHours = reviewRate > 0 ? numDocs / (reviewRate * AI_SPEED_MULTIPLIER) : 0;
  const aiCost = aiHours * reviewerRate;
  const aiDays = aiHours / 8;

  const savings = manualCost - aiCost;
  const savingsPct = manualCost > 0 ? (savings / manualCost) * 100 : 0;
  const timeSaved = manualHours - aiHours;

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Documents</label>
          <input
            type="number"
            min={1}
            value={numDocs}
            onChange={(e) => setNumDocs(Math.max(1, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Pages per Document</label>
          <input
            type="number"
            min={1}
            value={pagesPerDoc}
            onChange={(e) => setPagesPerDoc(Math.max(1, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Review Rate (docs/hr)</label>
          <input
            type="number"
            min={1}
            value={reviewRate}
            onChange={(e) => setReviewRate(Math.max(1, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Reviewer Rate ($/hr)</label>
          <input
            type="number"
            min={1}
            value={reviewerRate}
            onChange={(e) => setReviewerRate(Math.max(1, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Volume info */}
      <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 text-sm text-slate-600">
        Total volume: <span className="font-semibold text-slate-800">{(numDocs * pagesPerDoc).toLocaleString()}</span> pages across{" "}
        <span className="font-semibold text-slate-800">{numDocs.toLocaleString()}</span> documents.
        AI-assisted review assumes a <span className="font-semibold text-slate-800">{AI_SPEED_MULTIPLIER}x</span> speed improvement.
      </div>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manual */}
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-slate-400" />
            <h3 className="text-lg font-bold text-slate-700">Manual Review</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 uppercase font-medium">Total Cost</p>
              <p className="text-3xl font-bold text-slate-800">{fmt(manualCost)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-slate-500 uppercase font-medium">Hours</p>
                <p className="text-lg font-semibold text-slate-700">{manualHours.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-medium">Working Days</p>
                <p className="text-lg font-semibold text-slate-700">{manualDays.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI-assisted */}
        <div className="bg-white rounded-xl border-2 border-blue-300 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <h3 className="text-lg font-bold text-blue-700">AI-Assisted Review</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-blue-500 uppercase font-medium">Total Cost</p>
              <p className="text-3xl font-bold text-blue-700">{fmt(aiCost)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-blue-500 uppercase font-medium">Hours</p>
                <p className="text-lg font-semibold text-blue-700">{aiHours.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
              <div>
                <p className="text-xs text-blue-500 uppercase font-medium">Working Days</p>
                <p className="text-lg font-semibold text-blue-700">{aiDays.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Savings summary */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6">
        <h3 className="text-lg font-bold text-emerald-800 mb-4">Potential Savings with AI</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-emerald-200 text-center">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">Cost Savings</p>
            <p className="text-2xl font-bold text-emerald-700">{fmt(savings)}</p>
            <p className="text-xs text-emerald-500 mt-1">{savingsPct.toFixed(0)}% reduction</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-emerald-200 text-center">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">Time Saved</p>
            <p className="text-2xl font-bold text-emerald-700">{timeSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })} hrs</p>
            <p className="text-xs text-emerald-500 mt-1">{(timeSaved / 8).toFixed(1)} working days</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-emerald-200 text-center">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">Speed Improvement</p>
            <p className="text-2xl font-bold text-emerald-700">{AI_SPEED_MULTIPLIER}x</p>
            <p className="text-xs text-emerald-500 mt-1">faster review rate</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            window.location.href = `mailto:?subject=Document Review Cost Estimate&body=Documents: ${numDocs.toLocaleString()}%0AManual Cost: ${fmt(manualCost)} (${manualHours.toFixed(0)} hrs)%0AAI-Assisted Cost: ${fmt(aiCost)} (${aiHours.toFixed(0)} hrs)%0ASavings: ${fmt(savings)} (${savingsPct.toFixed(0)}%25)`;
          }}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors text-center"
        >
          Email My Results
        </button>
        <a
          href="/tools"
          className="flex-1 bg-slate-100 text-slate-700 py-3 px-6 rounded-lg font-semibold text-sm hover:bg-slate-200 transition-colors text-center border border-slate-200"
        >
          Explore AI Review Tools
        </a>
      </div>
    </div>
  );
}
