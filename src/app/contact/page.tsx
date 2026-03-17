"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setStatus("sent");
        setErrorDetail("");
        (e.target as HTMLFormElement).reset();
      } else {
        let detail = `HTTP ${res.status}`;
        try {
          const data = await res.json();
          if (data.detail) detail = data.detail;
          else if (data.error) detail = data.error;
        } catch {
          const text = await res.text().catch(() => "");
          if (text) detail = text.slice(0, 200);
        }
        setErrorDetail(detail);
        setStatus("error");
      }
    } catch (err) {
      setErrorDetail(err instanceof Error ? err.message : "Network error");
      setStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      <p className="mb-6">
        If you have any questions, suggestions, or feedback regarding LegalTech AI Hub, we would love to hear from you.
      </p>

      {status === "sent" ? (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded p-4">
          Thank you for your message! We aim to respond within 48 hours.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input name="name" required className="w-full p-2 border rounded text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input name="email" type="email" required className="w-full p-2 border rounded text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea name="message" required className="w-full p-2 border rounded text-black" rows={5}></textarea>
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "error" && (
            <div className="text-red-600 text-sm">
              <p>Failed to send. Please try again later.</p>
              {errorDetail && (
                <p className="mt-1 text-xs text-red-500">Error: {errorDetail}</p>
              )}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
