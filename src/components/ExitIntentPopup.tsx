"use client";

import { useState, useEffect, FormEvent } from "react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed or subscribed this session
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("exit-popup-dismissed")) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setShow(true);
      }
    };

    // Also trigger on mobile after 60s of engagement
    const mobileTimer = setTimeout(() => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && !sessionStorage.getItem("exit-popup-dismissed")) {
        setShow(true);
      }
    }, 60000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [dismissed]);

  function handleDismiss() {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("exit-popup-dismissed", "true");
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
      setSuccess(true);
      sessionStorage.setItem("exit-popup-dismissed", "true");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>

        {success ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">&#10003;</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              You&apos;re in!
            </h3>
            <p className="text-gray-600">
              Check your inbox for a welcome email with our best resources.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Before you go...
              </h3>
              <p className="text-gray-600">
                Get the <strong>2026 Legal AI Buyer&apos;s Checklist</strong> free
                — plus weekly insights on the tools reshaping legal practice.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@lawfirm.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Subscribing..." : "Get the Free Checklist"}
              </button>
            </form>

            {error && (
              <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            )}

            <p className="text-gray-400 text-xs text-center mt-4">
              No spam. Unsubscribe anytime. We respect your inbox.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
