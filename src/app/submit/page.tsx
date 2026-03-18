"use client";

import React, { useState } from "react";

export default function SubmitPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name"),
      url: formData.get("url"),
      description: formData.get("description"),
    };

    try {
      const res = await fetch("/api/submit-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setStatus("sent");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 via-emerald-600 to-green-700 py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4">
            Submit Your LegalTech Tool
          </h1>
          <p className="text-base md:text-lg text-emerald-100 max-w-xl mx-auto">
            Know a great AI-powered legal tool that should be in our directory? Tell us about it and we&apos;ll review it for inclusion.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto py-12 px-4">

      {status === "sent" ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded p-4">
          Thank you! Your tool submission has been received. We will review it shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tool Name</label>
            <input name="name" required className="w-full p-2 border rounded text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tool URL</label>
            <input name="url" type="url" required className="w-full p-2 border rounded text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" required className="w-full p-2 border rounded text-black" rows={4}></textarea>
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {status === "sending" ? "Submitting..." : "Submit Tool"}
          </button>
          {status === "error" && (
            <p className="text-red-600 text-sm">Failed to submit. Please try again later.</p>
          )}
        </form>
      )}
      </div>
    </div>
  );
}
