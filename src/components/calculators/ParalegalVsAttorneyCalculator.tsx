"use client";

import React, { useState } from "react";

interface Task {
  id: number;
  name: string;
  hours: number;
  canDelegate: boolean;
}

const DEFAULT_TASKS: Task[] = [
  { id: 1, name: "Legal Research", hours: 15, canDelegate: true },
  { id: 2, name: "Document Drafting", hours: 10, canDelegate: false },
  { id: 3, name: "Discovery Organization", hours: 20, canDelegate: true },
  { id: 4, name: "Client Communication", hours: 8, canDelegate: false },
  { id: 5, name: "Filing & Admin", hours: 12, canDelegate: true },
  { id: 6, name: "Court Appearances", hours: 6, canDelegate: false },
];

let nextTaskId = 7;

export default function ParalegalVsAttorneyCalculator() {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [paralegalRate, setParalegalRate] = useState(95);
  const [attorneyRate, setAttorneyRate] = useState(375);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const totalHours = tasks.reduce((s, t) => s + t.hours, 0);
  const delegatableHours = tasks.filter((t) => t.canDelegate).reduce((s, t) => s + t.hours, 0);
  const nonDelegatableHours = totalHours - delegatableHours;

  const attorneyOnlyCost = totalHours * attorneyRate;
  const blendedCost = nonDelegatableHours * attorneyRate + delegatableHours * paralegalRate;
  const savings = attorneyOnlyCost - blendedCost;
  const savingsPct = attorneyOnlyCost > 0 ? (savings / attorneyOnlyCost) * 100 : 0;

  const blendedRate = totalHours > 0 ? blendedCost / totalHours : 0;

  const updateTask = (id: number, field: keyof Omit<Task, "id">, value: string | number | boolean) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              [field]:
                field === "canDelegate" ? value : field === "name" ? value : Math.max(0, Number(value)),
            }
          : t
      )
    );
  };

  const addTask = () => {
    setTasks((prev) => [...prev, { id: nextTaskId++, name: "New Task", hours: 5, canDelegate: true }]);
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Rates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Paralegal Hourly Rate ($)</label>
          <input
            type="number"
            min={1}
            value={paralegalRate}
            onChange={(e) => setParalegalRate(Math.max(1, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Attorney Hourly Rate ($)</label>
          <input
            type="number"
            min={1}
            value={attorneyRate}
            onChange={(e) => setAttorneyRate(Math.max(1, Number(e.target.value)))}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Tasks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">Task Breakdown</h3>
          <button onClick={addTask} className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            + Add Task
          </button>
        </div>

        <div className="space-y-3">
          <div className="hidden md:grid grid-cols-12 gap-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div className="col-span-4">Task</div>
            <div className="col-span-2">Hours</div>
            <div className="col-span-3">Delegatable?</div>
            <div className="col-span-2">Assigned To</div>
            <div className="col-span-1" />
          </div>

          {tasks.map((task) => (
            <div key={task.id} className={`grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-lg border transition-all ${task.canDelegate ? "border-emerald-200 bg-emerald-50/50" : "border-slate-200 bg-white"}`}>
              <div className="md:col-span-4">
                <input
                  type="text"
                  value={task.name}
                  onChange={(e) => updateTask(task.id, "name", e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <input
                  type="number"
                  min={0}
                  value={task.hours}
                  onChange={(e) => updateTask(task.id, "hours", e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Hours"
                />
              </div>
              <div className="md:col-span-3 flex items-center">
                <button
                  onClick={() => updateTask(task.id, "canDelegate", !task.canDelegate)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    task.canDelegate
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                      : "bg-slate-100 text-slate-500 border border-slate-300"
                  }`}
                >
                  {task.canDelegate ? "Yes - Delegatable" : "No - Attorney Only"}
                </button>
              </div>
              <div className="md:col-span-2 flex items-center">
                <span className={`text-sm font-medium ${task.canDelegate ? "text-emerald-600" : "text-slate-600"}`}>
                  {task.canDelegate ? "Paralegal" : "Attorney"}
                </span>
              </div>
              <div className="md:col-span-1 flex items-center justify-end">
                <button onClick={() => removeTask(task.id)} className="text-slate-400 hover:text-red-500 transition-colors" aria-label="Remove task">
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border-2 border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-slate-400" />
            <h3 className="text-lg font-bold text-slate-700">Attorney-Only</h3>
          </div>
          <p className="text-3xl font-bold text-slate-800 mb-2">{fmt(attorneyOnlyCost)}</p>
          <p className="text-sm text-slate-500">{totalHours} hours x {fmt(attorneyRate)}/hr</p>
        </div>
        <div className="bg-white rounded-xl border-2 border-emerald-300 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <h3 className="text-lg font-bold text-emerald-700">Blended Team</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-700 mb-2">{fmt(blendedCost)}</p>
          <p className="text-sm text-emerald-600">
            {nonDelegatableHours} attorney hrs + {delegatableHours} paralegal hrs (blended {fmt(Math.round(blendedRate))}/hr)
          </p>
        </div>
      </div>

      {/* Savings */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6">
        <h3 className="text-lg font-bold text-emerald-800 mb-4">Delegation Savings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-emerald-200 text-center">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">Total Savings</p>
            <p className="text-2xl font-bold text-emerald-700">{fmt(savings)}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-emerald-200 text-center">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">Savings %</p>
            <p className="text-2xl font-bold text-emerald-700">{savingsPct.toFixed(1)}%</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-emerald-200 text-center">
            <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">Hours Delegated</p>
            <p className="text-2xl font-bold text-emerald-700">{delegatableHours}</p>
            <p className="text-xs text-emerald-500 mt-1">of {totalHours} total</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            window.location.href = `mailto:?subject=Paralegal vs Attorney Cost Analysis&body=Attorney-Only Cost: ${fmt(attorneyOnlyCost)}%0ABlended Team Cost: ${fmt(blendedCost)}%0ASavings: ${fmt(savings)} (${savingsPct.toFixed(1)}%25)%0ADelegatable Hours: ${delegatableHours} of ${totalHours}`;
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
