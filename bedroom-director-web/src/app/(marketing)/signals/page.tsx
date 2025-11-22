"use client";

import React, { useState } from "react";

export default function SignalsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [source, setSource] = useState("x");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [approvalMessage, setApprovalMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError("Please choose a screenshot first.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("notes", notes);
      formData.append("source", source);

      const response = await fetch("/api/signals/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Failed to analyze signal.");
      }

      const payload = await response.json();
      setResult(payload);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-screen-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Signals Inbox
        </h1>
        <p className="text-sm text-screen-white/70 mb-6 max-w-xl">
          Upload screenshots of posts, product pages, or workflows. The
          backend will use OpenRouter to classify the signal and extract tools,
          models, and vendors so we can feed them into the curator or strategy
          docs later.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-lg bg-screen-black border border-white/10 rounded-xl p-4 sm:p-6"
        >
          <div>
            <label className="block text-xs font-semibold mb-1">
              Screenshot
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selected = e.target.files?.[0] || null;
                setFile(selected);
              }}
              className="block w-full text-xs text-screen-white/80 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-bedroom-purple file:text-white hover:file:bg-bedroom-purple/80"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              Source (optional)
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-md px-3 py-2 text-sm text-screen-white placeholder:text-screen-white/40 focus:outline-none focus:border-bedroom-purple/60"
              placeholder="x, discord, blog, etc."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">
              Notes / context (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full bg-black/60 border border-white/10 rounded-md px-3 py-2 text-sm text-screen-white placeholder:text-screen-white/40 focus:outline-none focus:border-bedroom-purple/60"
              placeholder="Why is this interesting? e.g. new Nano Banana workflow, new model, pricing, etc."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-bedroom-purple text-white text-sm font-semibold hover:bg-bedroom-purple/80 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Analyzing…" : "Upload & Analyze"}
          </button>

          {error && (
            <p className="text-xs text-red-400 mt-1">
              {error}
            </p>
          )}
        </form>

        {result && (
          <div className="mt-8 max-w-2xl bg-screen-black border border-white/10 rounded-xl p-4 sm:p-6">
            <h2 className="text-sm font-semibold mb-2">
              AI Analysis
            </h2>
            <pre className="text-xs bg-black/60 border border-white/5 rounded-md p-3 overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>

            {result?.id && (
              <div className="mt-4 flex flex-wrap gap-3 items-center">
                <span className="text-xs text-screen-white/60">
                  Mark this signal as:
                </span>
                <button
                  type="button"
                  onClick={async () => {
                    setApprovalMessage(null);
                    try {
                      const res = await fetch("/api/signals/approve", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          id: result.id,
                          status: "approved",
                        }),
                      });
                      if (!res.ok) {
                        const payload = await res.json().catch(() => ({}));
                        throw new Error(payload.error || "Failed to approve.");
                      }
                      setApprovalMessage("Marked as approved. It will be picked up by the curator/automation pipeline.");
                    } catch (err: any) {
                      setApprovalMessage(err.message || "Failed to approve.");
                    }
                  }}
                  className="px-3 py-1.5 rounded-md bg-green-600 text-xs font-semibold hover:bg-green-500"
                >
                  Approve for Catalog/Docs
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    setApprovalMessage(null);
                    try {
                      const res = await fetch("/api/signals/approve", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          id: result.id,
                          status: "rejected",
                        }),
                      });
                      if (!res.ok) {
                        const payload = await res.json().catch(() => ({}));
                        throw new Error(payload.error || "Failed to reject.");
                      }
                      setApprovalMessage("Marked as rejected. It will be ignored by automations.");
                    } catch (err: any) {
                      setApprovalMessage(err.message || "Failed to reject.");
                    }
                  }}
                  className="px-3 py-1.5 rounded-md bg-red-600 text-xs font-semibold hover:bg-red-500"
                >
                  Reject / Ignore
                </button>
              </div>
            )}

            {approvalMessage && (
              <p className="mt-3 text-xs text-screen-white/60">
                {approvalMessage}
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
