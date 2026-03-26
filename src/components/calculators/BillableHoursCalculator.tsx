"use client";

import React, { useState } from "react";

export default function BillableHoursCalculator() {
  const [targetRevenue, setTargetRevenue] = useState(500000);
  const [hourlyRate, setHourlyRate] = useState(350);
  const [targetUtilization, setTargetUtilization] = useState(80);
  const [currentUtilization, setCurrentUtilization] = useState(65);
  const [workingDays, setWorkingDays] = useState(250);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const requiredBillableHours = hourlyRate > 0 ? Math.ceil(targetRevenue / hourlyRate) : 0;
  const hoursPerDay = workingDays > 0 ? requiredBillableHours / workingDays : 0;
  const hoursPerWeek = hoursPerDay * 5;
  const totalAvailableHours = workingDays * 8;
  const requiredUtilization = totalAvailableHours > 0 ? (requiredBillableHours / totalAvailableHours) * 100 : 0;

  const currentBillableHours = Math.round(totalAvailableHours * (currentUtilization / 100));
  const currentRevenue = currentBillableHours * hourlyRate;
  const revenueLost = targetRevenue - currentRevenue;
  const hoursGap = requiredBillableHours - currentBillableHours;

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Target Annual Revenue</label>
          <input
            type="number"
            min={0}
            step={10000}
            value={targetRevenue}
            onChange={(e) => setTargetRevenue(Math.max(0, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Hourly Rate ($)</label>
          <input
            type="number"
            min={1}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Math.max(1, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Target Utilization Rate (%)</label>
          <input
            type="number"
            min={1}
            max={100}
            value={targetUtilization}
            onChange={(e) => setTargetUtilization(Math.min(100, Math.max(1, Number(e.target.value))))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Current Utilization Rate (%)</label>
          <input
            type="number"
            min={1}
            max={100}
            value={currentUtilization}
            onChange={(e) => setCurrentUtilization(Math.min(100, Math.max(1, Number(e.target.value))))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Working Days / Year</label>
          <input
            type="number"
            min={1}
            max={365}
            value={workingDays}
            onChange={(e) => setWorkingDays(Math.min(365, Math.max(1, Number(e.target.value))))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Required Billable Hours</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Hours / Year</p>
            <p className="text-2xl font-bold text-blue-700">{requiredBillableHours.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Hours / Week</p>
            <p className="text-2xl font-bold text-slate-700">{hoursPerWeek.toFixed(1)}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200 text-center">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Hours / Day</p>
            <p className="text-2xl font-bold text-slate-700">{hoursPerDay.toFixed(1)}</p>
          </div>
        </div>

        {/* Utilization gauge */}
        <div className="mb-6">
          <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
            <span>Required Utilization: {requiredUtilization.toFixed(1)}%</span>
            <span>Current: {currentUtilization}%</span>
          </div>
          <div className="relative h-5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-slate-400 rounded-full transition-all"
              style={{ width: `${Math.min(100, currentUtilization)}%` }}
            />
            <div
              className="absolute inset-y-0 left-0 bg-blue-600 rounded-full transition-all opacity-40"
              style={{ width: `${Math.min(100, requiredUtilization)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Gap Analysis */}
        <h3 className="text-lg font-bold text-slate-800 mb-4">Gap Analysis</h3>
        <div className={`rounded-xl p-5 border ${revenueLost > 0 ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-200"}`}>
          {revenueLost > 0 ? (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold">!</span>
                <div>
                  <p className="font-semibold text-red-800">
                    You are leaving {fmt(revenueLost)} on the table annually.
                  </p>
                  <p className="text-sm text-red-600 mt-1">
                    At your current {currentUtilization}% utilization, you bill {currentBillableHours.toLocaleString()} hours/year
                    generating {fmt(currentRevenue)}. You need {hoursGap.toLocaleString()} more billable hours to hit your target.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="bg-white rounded-lg p-3 border border-red-200 text-center">
                  <p className="text-xs text-red-500 font-medium uppercase">Revenue Gap</p>
                  <p className="text-xl font-bold text-red-700">{fmt(revenueLost)}</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-red-200 text-center">
                  <p className="text-xs text-red-500 font-medium uppercase">Hours Gap</p>
                  <p className="text-xl font-bold text-red-700">{hoursGap.toLocaleString()} hrs</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <span className="text-emerald-500 text-lg font-bold">&#10003;</span>
              <div>
                <p className="font-semibold text-emerald-800">You are on track or exceeding your target.</p>
                <p className="text-sm text-emerald-600 mt-1">
                  At {currentUtilization}% utilization you generate {fmt(currentRevenue)} annually, meeting your {fmt(targetRevenue)} goal.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            window.location.href = `mailto:?subject=Billable Hours Analysis&body=Target Revenue: ${fmt(targetRevenue)}%0AHourly Rate: ${fmt(hourlyRate)}%0ARequired Hours/Year: ${requiredBillableHours}%0AHours/Day: ${hoursPerDay.toFixed(1)}%0ACurrent Utilization: ${currentUtilization}%25%0ARevenue Gap: ${fmt(Math.max(0, revenueLost))}`;
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
