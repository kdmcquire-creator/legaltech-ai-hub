"use client";

import React, { useState } from "react";

export default function CaseVolumeCalculator() {
  const [currentCases, setCurrentCases] = useState(45);
  const [newCasesPerMonth, setNewCasesPerMonth] = useState(8);
  const [avgDuration, setAvgDuration] = useState(6);
  const [targetCapacity, setTargetCapacity] = useState(75);

  // Monthly projection over 12 months
  const projections: { month: number; active: number; newIn: number; resolved: number }[] = [];
  let runningCases = currentCases;

  for (let m = 1; m <= 12; m++) {
    const resolved = avgDuration > 0 ? Math.round(runningCases / avgDuration) : 0;
    const active = runningCases + newCasesPerMonth - resolved;
    projections.push({ month: m, active, newIn: newCasesPerMonth, resolved });
    runningCases = active;
  }

  const capacityReachedMonth = projections.find((p) => p.active >= targetCapacity);
  const maxCases = Math.max(...projections.map((p) => p.active), targetCapacity);
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Current Active Cases</label>
          <input
            type="number"
            min={0}
            value={currentCases}
            onChange={(e) => setCurrentCases(Math.max(0, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">New Cases / Month</label>
          <input
            type="number"
            min={0}
            value={newCasesPerMonth}
            onChange={(e) => setNewCasesPerMonth(Math.max(0, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Avg. Case Duration (months)</label>
          <input
            type="number"
            min={1}
            max={60}
            value={avgDuration}
            onChange={(e) => setAvgDuration(Math.min(60, Math.max(1, Number(e.target.value))))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Target Capacity</label>
          <input
            type="number"
            min={1}
            value={targetCapacity}
            onChange={(e) => setTargetCapacity(Math.max(1, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Capacity alert */}
      {capacityReachedMonth ? (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <p className="font-semibold">
            Capacity ({targetCapacity} cases) will be reached in Month {capacityReachedMonth.month} with{" "}
            {capacityReachedMonth.active} projected active cases.
          </p>
          <p className="mt-1 text-amber-600">
            Consider hiring additional staff or implementing efficiency tools before that point.
          </p>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-800">
          <p className="font-semibold">
            Caseload is projected to stay below your {targetCapacity}-case capacity for the next 12 months.
          </p>
        </div>
      )}

      {/* Visual bar chart */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">12-Month Caseload Projection</h3>
        <div className="flex items-end gap-2 h-48 mb-2">
          {projections.map((p) => {
            const heightPct = maxCases > 0 ? (p.active / maxCases) * 100 : 0;
            const overCapacity = p.active >= targetCapacity;
            return (
              <div key={p.month} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-xs font-semibold text-slate-600 mb-1">{p.active}</span>
                <div
                  className={`w-full rounded-t-md transition-all ${overCapacity ? "bg-amber-500" : "bg-blue-500"}`}
                  style={{ height: `${heightPct}%`, minHeight: "4px" }}
                />
              </div>
            );
          })}
        </div>
        {/* Capacity line reference */}
        <div className="relative mb-4">
          <div
            className="absolute w-full border-t-2 border-dashed border-red-400"
            style={{ bottom: `${maxCases > 0 ? (targetCapacity / maxCases) * 100 : 50}%` }}
          />
        </div>
        <div className="flex gap-2 justify-between text-xs text-slate-500">
          {projections.map((p) => (
            <div key={p.month} className="flex-1 text-center">{monthLabels[p.month - 1]}</div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-500" /> Under capacity</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-amber-500" /> At/over capacity</div>
          <div className="flex items-center gap-1.5"><div className="w-6 border-t-2 border-dashed border-red-400" /> Target ({targetCapacity})</div>
        </div>
      </div>

      {/* Projection Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="text-left px-4 py-2.5 font-semibold text-slate-600 border-b border-slate-200">Month</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 border-b border-slate-200">New Cases</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 border-b border-slate-200">Resolved</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 border-b border-slate-200">Active Cases</th>
              <th className="text-right px-4 py-2.5 font-semibold text-slate-600 border-b border-slate-200">vs Capacity</th>
            </tr>
          </thead>
          <tbody>
            {projections.map((p) => {
              const delta = p.active - targetCapacity;
              const overCapacity = delta >= 0;
              return (
                <tr key={p.month} className={overCapacity ? "bg-amber-50" : ""}>
                  <td className="px-4 py-2 border-b border-slate-100 font-medium text-slate-700">Month {p.month}</td>
                  <td className="px-4 py-2 border-b border-slate-100 text-right text-slate-600">+{p.newIn}</td>
                  <td className="px-4 py-2 border-b border-slate-100 text-right text-slate-600">-{p.resolved}</td>
                  <td className="px-4 py-2 border-b border-slate-100 text-right font-semibold text-slate-700">{p.active}</td>
                  <td className={`px-4 py-2 border-b border-slate-100 text-right font-semibold ${overCapacity ? "text-amber-600" : "text-emerald-600"}`}>
                    {delta >= 0 ? `+${delta}` : delta}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            const rows = projections.map((p) => `Month ${p.month}: ${p.active} active cases`).join("%0A");
            window.location.href = `mailto:?subject=Case Volume Forecast&body=12-Month Case Volume Projection%0A%0A${rows}%0A%0ACapacity Target: ${targetCapacity}`;
          }}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors text-center"
        >
          Email My Results
        </button>
        <a
          href="/tools"
          className="flex-1 bg-slate-100 text-slate-700 py-3 px-6 rounded-lg font-semibold text-sm hover:bg-slate-200 transition-colors text-center border border-slate-200"
        >
          Browse Practice Management Tools
        </a>
      </div>
    </div>
  );
}
