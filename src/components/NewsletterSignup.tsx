"use client";

import { useState, FormEvent } from "react";

type Props = {
  variant?: "inline" | "banner" | "compact";
  className?: string;
};

export default function NewsletterSignup({
  variant = "inline",
  className = "",
}: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
      setEmail("");
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  if (variant === "banner") {
    return (
      <section
        className={`w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-16 ${className}`}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Stay Ahead of Legal Tech
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
            Join legal professionals getting weekly insights on AI tools,
            industry trends, and practical implementation tips.
          </p>

          {success ? (
            <p className="text-white font-semibold text-lg">
              Subscribed! Check your inbox for a welcome email.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@lawfirm.com"
                required
                className="w-full sm:flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}

          {error && (
            <p className="text-red-200 text-sm mt-3">{error}</p>
          )}
        </div>
      </section>
    );
  }

  if (variant === "compact") {
    return (
      <div className={className}>
        {success ? (
          <p className="text-emerald-600 text-sm font-medium">Subscribed!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email for weekly insights"
              required
              className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? "..." : "Subscribe"}
            </button>
          </form>
        )}
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    );
  }

  // Default: "inline" variant
  return (
    <div
      className={`rounded-xl border border-emerald-200 bg-emerald-50 p-6 ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        Get Legal Tech Insights
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        Weekly analysis, tool reviews, and practical tips — delivered every
        Tuesday.
      </p>

      {success ? (
        <p className="text-emerald-700 font-medium">
          Subscribed! Check your inbox for a welcome email.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@lawfirm.com"
            required
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}
