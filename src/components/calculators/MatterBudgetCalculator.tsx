"use client";

import React, { useState } from "react";

interface Phase {
  id: number;
  name: string;
  hours: number;
  rate: number;
}

const DEFAULT_PHASES: Phase[] = [
  { id: 1, name: "Discovery", hours: 40, rate: 350 },
  { id: 2, name: "Depositions", hours: 25, rate: 400 },
  { id: 3, name: "Motions", hours: 30, rate: 375 },
  { id: 4, name: "Trial Prep", hours: 50, rate: 400 },
  { id: 5, name: "Trial", hours: 60, rate: 450 },
];

const PHASE_PRESETS = ["Discovery", "Depositions", "Motions", "Trial Prep", "Trial", "Mediation", "Appeals", "Compliance Review"];

let nextId = 6;

export default function MatterBudgetCalculator() {
  const [phases, setPhases] = useState<Phase[]>(DEFAULT_PHASES);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const totalBudget = phases.reduce((sum, p) => sum + p.hours * p.rate, 0);
  const totalHours = phases.reduce((sum, p) => sum + p.hours, 0);
  const highestPhase = phases.length > 0 ? phases.reduce((max, p) => (p.hours * p.rate > max.hours * max.rate ? p : max), phases[0]) : null;

  const updatePhase = (id: number, field: keyof Omit<Phase, "id">, value: string | number) => {
    setPhases((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: field === "name" ? value : Math.max(0, Number(value)) } : p))
    );
  };

  const addPhase = () => {
    setPhases((prev) => [...prev, { id: nextId++, name: "New Phase", hours: 10, rate: 350 }]);
  };

  const removePhase = (id: number) => {
    setPhases((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Phase Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">Budget Phases</h3>
          <button
            onClick={addPhase}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            + Add Phase
          </button>
        </div>

        <div className="space-y-3">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div className="col-span-4">Phase Name</div>
            <div className="col-span-2">Hours</div>
            <div className="col-span-2">Rate ($/hr)</div>
            <div className="col-span-3">Subtotal</div>
            <div className="col-span-1" />
          </div>

          {phases.map((phase) => {
            const subtotal = phase.hours * phase.rate;
            const isHighest = highestPhase !== null && phase.id === highestPhase.id;
            return (
              <div
                key={phase.id}
                className={`grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-lg border transition-all ${
                  isHighest ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white"
                }`}
              >
                <div className="md:col-span-4">
                  <select
                    value={PHASE_PRESETS.includes(phase.name) ? phase.name : "__custom"}
                    onChange={(e) => {
                      if (e.target.value !== "__custom") updatePhase(phase.id, "name", e.target.value);
                    }}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {PHASE_PRESETS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                    {!PHASE_PRESETS.includes(phase.name) && (
                      <option value="__custom">{phase.name}</option>
                    )}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <input
                    type="number"
                    min={0}
                    value={phase.hours}
                    onChange={(e) => updatePhase(phase.id, "hours", e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Hours"
                  />
                </div>
                <div className="md:col-span-2">
                  <input
                    type="number"
                    min={0}
                    value={phase.rate}
                    onChange={(e) => updatePhase(phase.id, "rate", e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="$/hr"
                  />
                </div>
                <div className="md:col-span-3 flex items-center">
                  <span className={`text-sm font-bold ${isHighest ? "text-amber-700" : "text-slate-700"}`}>
                    {fmt(subtotal)}
                    {isHighest && <span className="ml-2 text-xs font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Highest</span>}
                  </span>
                </div>
                <div className="md:col-span-1 flex items-center justify-end">
                  <button
                    onClick={() => removePhase(phase.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors text-sm"
                    aria-label="Remove phase"
                  >
                    &times;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Budget Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Total Budget</p>
            <p className="text-2xl font-bold text-blue-700">{fmt(totalBudget)}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Total Hours</p>
            <p className="text-2xl font-bold text-slate-700">{totalHours.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Blended Rate</p>
            <p className="text-2xl font-bold text-slate-700">
              {totalHours > 0 ? fmt(Math.round(totalBudget / totalHours)) : "$0"}/hr
            </p>
          </div>
        </div>

        {/* Cost per phase bars */}
        <h4 className="text-sm font-bold text-slate-700 mb-3">Cost per Phase</h4>
        <div className="space-y-2">
          {phases.map((phase) => {
            const subtotal = phase.hours * phase.rate;
            const pct = totalBudget > 0 ? (subtotal / totalBudget) * 100 : 0;
            const isHighest = highestPhase !== null && phase.id === highestPhase.id;
            return (
              <div key={phase.id} className="flex items-center gap-3 text-sm">
                <span className="w-28 truncate text-slate-600">{phase.name}</span>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isHighest ? "bg-amber-500" : "bg-blue-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-24 text-right text-xs text-slate-500">
                  {fmt(subtotal)} ({pct.toFixed(0)}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            const body = phases.map((p) => `${p.name}: ${p.hours}hrs x ${fmt(p.rate)}/hr = ${fmt(p.hours * p.rate)}`).join("%0A");
            window.location.href = `mailto:?subject=Matter Budget Estimate&body=Matter Budget Summary%0A%0A${body}%0A%0ATotal: ${fmt(totalBudget)} (${totalHours} hours)`;
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
