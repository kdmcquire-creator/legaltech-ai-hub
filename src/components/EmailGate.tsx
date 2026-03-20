"use client";

import { useState, FormEvent } from "react";

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export default function EmailGate({
  title = "Email your full report",
  description = "Enter your email to receive a detailed PDF report of your results — plus weekly legal tech insights.",
  children,
}: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if already unlocked
  if (typeof window !== "undefined" && sessionStorage.getItem("email-gate-unlocked")) {
    return <>{children}</>;
  }

  if (unlocked) {
    return <>{children}</>;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
        return;
      }
      setUnlocked(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("email-gate-unlocked", "true");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl">
        <div className="bg-white rounded-xl border-2 border-blue-200 shadow-lg p-6 max-w-sm w-full mx-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@lawfirm.com"
              required
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-3 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "..." : "Unlock Full Results"}
            </button>
          </form>
          {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
          <p className="text-gray-400 text-xs mt-3 text-center">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
