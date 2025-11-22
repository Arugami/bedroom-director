"use client";

import React, { useEffect, useState } from "react";

type ReasoningEffort = "high" | "medium" | "low" | "minimal" | "none";

interface DirectorConfig {
  textModel: string;
  reasoningEffort: ReasoningEffort;
  chatPromptExtra: string;
  chatPromptOverride: string;
  temperature: number;
  promptPreview?: string;
}

const MODEL_LABELS: Record<string, string> = {
  "x-ai/grok-4.1-fast-free": "Grok 4.1 Fast (free promo)",
  "x-ai/grok-4-fast": "Grok 4 Fast (standard)",
  "x-ai/grok-4.1-fast": "Grok 4.1 Fast (full)",
};

const DEFAULT_CONFIG: DirectorConfig = {
  textModel: "",
  reasoningEffort: "low",
  chatPromptExtra: "",
  chatPromptOverride: "",
  temperature: 0.7,
  promptPreview: "",
};

export default function DirectorLabPage() {
  const [config, setConfig] = useState<DirectorConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/director/config");
        if (!res.ok) {
          throw new Error("Failed to load config");
        }
        const data = (await res.json()) as DirectorConfig;
        setConfig((prev) => ({ ...prev, ...data }));
      } catch (err: any) {
        console.warn(
          "Director Lab: failed to load config from API, using defaults instead",
          err
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (
    field: keyof DirectorConfig,
    value: string | ReasoningEffort | number
  ) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsDirty(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

      try {
        const res = await fetch("/api/director/config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(config),
        });
        if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error || "Failed to save config");
      }
      const data = (await res.json()) as DirectorConfig;
      setConfig(data);
      setMessage("Director AI settings updated. New chats will use this config.");
      setIsDirty(false);
    } catch (err: any) {
      setError(err.message || "Failed to save config");
    } finally {
      setSaving(false);
    }
  };

  const buildPromptPreview = (cfg: DirectorConfig): string => {
    let base: string;

    if (cfg.chatPromptOverride && cfg.chatPromptOverride.trim()) {
      base = cfg.chatPromptOverride;
    } else {
      base = `You are an expert film director assistant called "Director AI". You are chatting with a user to help them develop their film idea inside Bedroom Director.

CONTEXT:
Project Title: Sample Project
Current Bible: {}

VISUAL REFERENCES:
None

GOAL:
1. Chat naturally with the user. Ask probing questions about characters, setting, and tone.
2. When the user gives new concrete details about characters, locations, or aesthetic, use the 'update_bible' tool to save them.
3. When the user has described their vision sufficiently (logline, key scenes, tone), use 'propose_structure' to suggest a complete project breakdown.
4. Keep responses concise, vivid, and cinematic. Prefer specific examples over generic advice.
5. Stay encouraging and collaborative—you're a creative partner, not a critic.`;
    }

    if (!cfg.chatPromptExtra || !cfg.chatPromptExtra.trim()) return base;
    return `${base}\n\nADDITIONAL STYLE GUIDELINES:\n${cfg.chatPromptExtra}`;
  };

  const overrideActive = !!config.chatPromptOverride?.trim();
  const modelLabel =
    MODEL_LABELS[config.textModel] || config.textModel || "Not set";

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-director-black to-black text-screen-white relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col-reverse lg:flex-row items-stretch lg:items-start gap-6 lg:gap-12">
          <div className="max-w-xl mt-6 lg:mt-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
              Director Lab
            </h1>
            <p className="text-sm text-screen-white/70 mb-3">
              Fine-tune how Director AI thinks and talks inside Scene Canvas.
              Changes here apply to new chats and structure runs.
            </p>
            <p className="text-xs text-screen-white/50">
              Use this space to experiment with Grok routing, reasoning effort,
              and tone before you lock choices into config and pricing tiers.
            </p>
          </div>

          <div className="w-full lg:max-w-xl">
            {loading ? (
              <p className="text-sm text-screen-white/60">Loading config…</p>
            ) : (
              <form
                onSubmit={handleSubmit}
                id="director-lab-form"
                className="space-y-6 bg-black/70 border border-white/10 rounded-xl p-4 sm:p-6 shadow-[0_18px_60px_rgba(0,0,0,0.75)] backdrop-blur-xl"
              >
                {/* Summary strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-screen-white/80">
                      Model: <span className="font-semibold">{modelLabel}</span>
                    </span>
                    <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-screen-white/80">
                      Effort: <span className="font-semibold">{config.reasoningEffort}</span>
                    </span>
                    <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-screen-white/80">
                      Temp: <span className="font-semibold">{config.temperature.toFixed(2)}</span>
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-[11px] border ${
                        overrideActive
                          ? "bg-amber-500/10 border-amber-400/60 text-amber-200"
                          : "bg-white/5 border-white/10 text-screen-white/70"
                      }`}
                    >
                      Override: {overrideActive ? "On" : "Off"}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-medium ${
                      isDirty
                        ? "text-amber-300"
                        : "text-screen-white/50"
                    }`}
                  >
                    {isDirty ? "Unsaved changes" : "All changes saved"}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Director Text Model
                  </label>
                  <select
                    value={config.textModel || "x-ai/grok-4.1-fast-free"}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleChange("textModel", e.target.value)
                    }
                    className="w-full bg-gradient-to-r from-black/70 via-black/60 to-black/70 border border-bedroom-purple/40 rounded-lg px-3 py-2.5 text-sm text-screen-white focus:outline-none focus:border-bedroom-purple/80 focus:ring-2 focus:ring-bedroom-purple/40 transition"
                  >
                    <option value="x-ai/grok-4.1-fast-free">
                      Grok 4.1 Fast (free promo)
                    </option>
                    <option value={config.textModel || "custom"}>
                      Custom… ({config.textModel || "set via env/config"})
                    </option>
                  </select>
                  <p className="mt-1 text-[11px] text-screen-white/50">
                    Use the free Grok promo model for Director Chat by default.
                    For any other model, set <code>DIRECTOR_TEXT_MODEL</code> in
                    env or edit <code>config.json</code>; it will appear here as
                    “Custom…”.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Grok Reasoning Effort
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={4}
                      step={1}
                      value={
                        ["none", "minimal", "low", "medium", "high"].indexOf(
                          config.reasoningEffort
                        ) || 0
                      }
                      onChange={(e) => {
                        const levels: ReasoningEffort[] = [
                          "none",
                          "minimal",
                          "low",
                          "medium",
                          "high",
                        ];
                        const idx = Number(e.target.value);
                        handleChange("reasoningEffort", levels[idx] || "low");
                      }}
                      className="flex-1"
                    />
                    <span className="text-[11px] text-screen-white/70 w-20">
                      {config.reasoningEffort}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-screen-white/50">
                    Controls Grok’s reasoning tokens via OpenRouter. Lower
                    effort = faster, higher effort = deeper thinking.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Temperature
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={200}
                      step={5}
                      value={Math.round(config.temperature * 100)}
                      onChange={(e) =>
                        handleChange(
                          "temperature",
                          Number(e.target.value) / 100
                        )
                      }
                      className="flex-1"
                    />
                    <span className="text-[11px] text-screen-white/70 w-16">
                      {config.temperature.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-screen-white/50">
                    0 = deterministic, 1 = more creative. Grok supports 0–2;
                    we clamp values into that range.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Extra Style Guidelines for Director Chat
                  </label>
                  <textarea
                    value={config.chatPromptExtra}
                    onChange={(e) =>
                      handleChange("chatPromptExtra", e.target.value)
                    }
                    rows={5}
                    className="w-full bg-black/60 border border-white/10 rounded-md px-3 py-2 text-sm text-screen-white placeholder:text-screen-white/40 focus:outline-none focus:border-bedroom-purple/60"
                    placeholder={
                      "Example:\n- Open with a short, punchy line.\n- Use concrete film references when helpful.\n- Keep answers under 4 sentences unless asked for more detail."
                    }
                  />
                  <p className="mt-1 text-[11px] text-screen-white/50">
                    This text is appended as “ADDITIONAL STYLE GUIDELINES” to
                    the Director Chat system prompt.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    System Prompt (Editable Override)
                  </label>
                  <textarea
                    value={config.chatPromptOverride}
                    onChange={(e) =>
                      handleChange("chatPromptOverride", e.target.value)
                    }
                    rows={8}
                    className={`w-full rounded-md px-3 py-2 text-[11px] text-screen-white/80 font-mono whitespace-pre-wrap border ${
                      overrideActive
                        ? "bg-amber-500/5 border-amber-400/70"
                        : "bg-black/60 border-white/10"
                    }`}
                  />
                  <p className="mt-1 text-[11px] text-screen-white/50">
                    If you fill this in, Director Chat will use it as the full
                    system prompt. Leave blank to use the default template plus
                    Extra Style Guidelines above.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Default Template (Preview)
                  </label>
                  <textarea
                    value={buildPromptPreview(config)}
                    readOnly
                    rows={8}
                    className="w-full bg-black/80 border border-white/15 rounded-md px-3 py-2 text-[11px] text-screen-white/80 font-mono whitespace-pre-wrap"
                  />
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <p className="text-[11px] text-screen-white/50">
                      This is the built-in Director Chat template for a sample
                      project, without overrides. Use it as a reference when
                      crafting variants.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        handleChange(
                          "chatPromptOverride",
                          buildPromptPreview({
                            ...config,
                            chatPromptOverride: "",
                            chatPromptExtra: "",
                          })
                        )
                      }
                      className="shrink-0 px-2.5 py-1 rounded-md border border-white/20 text-[11px] text-screen-white/80 hover:bg-white/5"
                    >
                      Copy to Override
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-bedroom-purple text-white text-sm font-semibold hover:bg-bedroom-purple/80 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving…" : "Save Director AI Settings"}
                </button>

                {message && (
                  <p className="text-xs text-green-400 mt-2">{message}</p>
                )}
                {error && (
                  <p className="text-xs text-red-400 mt-2">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
      {/* Mobile sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 md:hidden">
        <div className="mx-4 mb-4 rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl px-3 py-2 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-screen-white/80">
              {isDirty ? "Unsaved changes" : "All changes saved"}
            </span>
            <span className="text-[10px] text-screen-white/50">
              Director Lab · Affects new chats and structure runs
            </span>
          </div>
          <button
            type="submit"
            form="director-lab-form"
            disabled={saving}
            className="px-3 py-1.5 rounded-md bg-bedroom-purple text-white text-xs font-semibold hover:bg-bedroom-purple/80 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </main>
  );
}
