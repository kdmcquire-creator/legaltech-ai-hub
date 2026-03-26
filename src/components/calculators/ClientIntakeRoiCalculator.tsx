"use client";

import React, { useState } from "react";

export default function ClientIntakeRoiCalculator() {
  const [leadsPerMonth, setLeadsPerMonth] = useState(100);
  const [currentConversionRate, setCurrentConversionRate] = useState(25);
  const [avgCaseValue, setAvgCaseValue] = useState(8000);
  const [timePerIntake, setTimePerIntake] = useState(45);
  const [aiConversionBoost, setAiConversionBoost] = useState(15);
  const [aiTimeReduction, setAiTimeReduction] = useState(60);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  // Current metrics
  const currentClientsPerMonth = Math.round(leadsPerMonth * (currentConversionRate / 100));
  const currentMonthlyRevenue = currentClientsPerMonth * avgCaseValue;
  const currentAnnualRevenue = currentMonthlyRevenue * 12;
  const currentTotalIntakeMinutes = leadsPerMonth * timePerIntake;
  const currentIntakeHours = currentTotalIntakeMinutes / 60;

  // AI-improved metrics
  const aiConversionRate = Math.min(100, currentConversionRate + aiConversionBoost);
  const aiClientsPerMonth = Math.round(leadsPerMonth * (aiConversionRate / 100));
  const aiMonthlyRevenue = aiClientsPerMonth * avgCaseValue;
  const aiAnnualRevenue = aiMonthlyRevenue * 12;
  const aiTimePerIntake = Math.round(timePerIntake * (1 - aiTimeReduction / 100));
  const aiTotalIntakeMinutes = leadsPerMonth * aiTimePerIntake;
  const aiIntakeHours = aiTotalIntakeMinutes / 60;

  // Uplift
  const monthlyUplift = aiMonthlyRevenue - currentMonthlyRevenue;
  const annualUplift = aiAnnualRevenue - currentAnnualRevenue;
  const timeSavedHours = currentIntakeHours - aiIntakeHours;
  const additionalClients = aiClientsPerMonth - currentClientsPerMonth;

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Leads per Month</label>
          <input
            type="number"
            min={1}
            value={leadsPerMonth}
            onChange={(e) => setLeadsPerMonth(Math.max(1, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Current Conversion Rate (%)</label>
          <input
            type="number"
            min={1}
            max={100}
            value={currentConversionRate}
            onChange={(e) => setCurrentConversionRate(Math.min(100, Math.max(1, Number(e.target.value))))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Avg. Case Value ($)</label>
          <input
            type="number"
            min={1}
            step={500}
            value={avgCaseValue}
            onChange={(e) => setAvgCaseValue(Math.max(1, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Time per Intake (minutes)</label>
          <input
            type="number"
            min={1}
            value={timePerIntake}
            onChange={(e) => setTimePerIntake(Math.max(1, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">AI Conversion Boost (% points)</label>
          <input
            type="number"
            min={0}
            max={50}
            value={aiConversionBoost}
            onChange={(e) => setAiConversionBoost(Math.min(50, Math.max(0, Number(e.target.value))))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">AI Time Reduction (%)</label>
          <input
            type="number"
            min={0}
            max={90}
            value={aiTimeReduction}
            onChange={(e) => setAiTimeReduction(Math.min(90, Math.max(0, Number(e.target.value))))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Current vs AI comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-slate-400" />
            <h3 className="text-lg font-bold text-slate-700">Current Process</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Conversion Rate</span>
              <span className="font-semibold text-slate-700">{currentConversionRate}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Clients / Month</span>
              <span className="font-semibold text-slate-700">{currentClientsPerMonth}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Monthly Revenue</span>
              <span className="font-semibold text-slate-700">{fmt(currentMonthlyRevenue)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Annual Revenue</span>
              <span className="font-semibold text-slate-700">{fmt(currentAnnualRevenue)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Intake Time / Month</span>
              <span className="font-semibold text-slate-700">{currentIntakeHours.toFixed(1)} hrs</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-blue-300 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <h3 className="text-lg font-bold text-blue-700">With AI Intake</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-blue-400">Conversion Rate</span>
              <span className="font-semibold text-blue-700">{aiConversionRate}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-400">Clients / Month</span>
              <span className="font-semibold text-blue-700">{aiClientsPerMonth} <span className="text-emerald-600 text-xs">(+{additionalClients})</span></span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-400">Monthly Revenue</span>
              <span className="font-semibold text-blue-700">{fmt(aiMonthlyRevenue)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-400">Annual Revenue</span>
              <span className="font-semibold text-blue-700">{fmt(aiAnnualRevenue)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-400">Intake Time / Month</span>
              <span className="font-semibold text-blue-700">{aiIntakeHours.toFixed(1)} hrs <span className="text-emerald-600 text-xs">(-{timeSavedHours.toFixed(1)})</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Uplift Summary */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6">
        <h3 className="text-lg font-bold text-emerald-800 mb-4">Revenue Uplift with AI Intake</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-emerald-200 text-center">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">Monthly Uplift</p>
            <p className="text-2xl font-bold text-emerald-700">{fmt(monthlyUplift)}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-emerald-200 text-center">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">Annual Uplift</p>
            <p className="text-2xl font-bold text-emerald-700">{fmt(annualUplift)}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-emerald-200 text-center">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">New Clients / Month</p>
            <p className="text-2xl font-bold text-emerald-700">+{additionalClients}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-emerald-200 text-center">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">Time Saved / Month</p>
            <p className="text-2xl font-bold text-emerald-700">{timeSavedHours.toFixed(1)} hrs</p>
          </div>
        </div>

        {/* Conversion funnel visual */}
        <div className="mt-6">
          <h4 className="text-sm font-bold text-emerald-700 mb-3">Conversion Funnel Comparison</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <span className="w-20 text-slate-500 text-xs font-medium">Current</span>
              <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-400 rounded-full" style={{ width: `${currentConversionRate}%` }} />
              </div>
              <span className="w-16 text-right text-xs text-slate-600">{currentConversionRate}%</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-20 text-blue-500 text-xs font-medium">With AI</span>
              <div className="flex-1 h-4 bg-blue-50 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${aiConversionRate}%` }} />
              </div>
              <span className="w-16 text-right text-xs text-blue-600">{aiConversionRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            window.location.href = `mailto:?subject=Client Intake ROI Analysis&body=Current Monthly Revenue: ${fmt(currentMonthlyRevenue)}%0AProjected with AI: ${fmt(aiMonthlyRevenue)}%0AMonthly Uplift: ${fmt(monthlyUplift)}%0AAnnual Uplift: ${fmt(annualUplift)}%0AAdditional Clients/Month: ${additionalClients}`;
          }}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors text-center"
        >
          Email My Results
        </button>
        <a
          href="/tools"
          className="flex-1 bg-slate-100 text-slate-700 py-3 px-6 rounded-lg font-semibold text-sm hover:bg-slate-200 transition-colors text-center border border-slate-200"
        >
          Explore AI Intake Tools
        </a>
      </div>
    </div>
  );
}
