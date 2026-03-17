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
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Submit your LegalTech Tool</h1>

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
  );
}
