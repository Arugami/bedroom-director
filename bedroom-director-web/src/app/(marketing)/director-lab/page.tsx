"use client";

import React, { useEffect, useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ChevronDown, ChevronRight, Save, AlertCircle, CheckCircle2, Settings2, Sparkles, Terminal } from "lucide-react";

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
  "x-ai/grok-4.1-fast:free": "Grok 4.1 Fast (Free Promo)", // Fixed ID
  "openai/gpt-4o-mini": "GPT-4o mini (OpenAI via OpenRouter)",
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

// Collapsible Section Component
const CollapsibleSection = ({
  title,
  children,
  icon: Icon,
  defaultOpen = false
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-white/5 rounded-lg bg-black/20 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-screen-white/90">
          {Icon && <Icon className="w-4 h-4 text-bedroom-purple" />}
          {title}
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-screen-white/50" />
        ) : (
          <ChevronRight className="w-4 h-4 text-screen-white/50" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-2 border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default function DirectorLabPage() {
  const [config, setConfig] = useState<DirectorConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const loadConfig = async () => {
    try {
      const res = await fetch("/api/director/config");
      if (!res.ok) {
        throw new Error("Failed to load config");
      }
      const data = (await res.json()) as DirectorConfig;
      setConfig((prev) => ({ ...prev, ...data }));
      setIsDirty(false);
    } catch (err: any) {
      console.warn(
        "Director Lab: failed to load config from API, using defaults instead",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
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
    setSuccess(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

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
      setIsDirty(false);
      setSuccess(true);

      // Clear success state after 2 seconds
      setTimeout(() => setSuccess(false), 2000);
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
  const modelLabel = MODEL_LABELS[config.textModel] || config.textModel || "Not set";

  return (
    <main className="min-h-screen bg-black text-screen-white relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-bedroom-purple/10 via-black to-black pointer-events-none" />
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto">

          {/* Header & Context - Left Side */}
          <div className="lg:w-1/3 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-bedroom-purple/20 flex items-center justify-center border border-bedroom-purple/30">
                  <Settings2 className="w-5 h-5 text-bedroom-purple" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  Director Lab
                </h1>
              </div>
              <p className="text-screen-white/70 leading-relaxed">
                Fine-tune the brain of your AI Director. Adjust reasoning depth, creativity, and personality to match your creative workflow.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Pro Tip
              </h3>
              <p className="text-xs text-screen-white/60 leading-relaxed">
                Use <strong>Low Effort</strong> for quick brainstorming chats. Switch to <strong>High Effort</strong> when you need deep structural analysis or complex scene breakdowns.
              </p>
            </div>

            {/* Status Indicators */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                <span className="text-screen-white/50">Active Model</span>
                <span className="font-mono text-bedroom-purple bg-bedroom-purple/10 px-2 py-0.5 rounded">
                  {modelLabel}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                <span className="text-screen-white/50">Reasoning</span>
                <span className="font-mono text-screen-white/80">
                  {config.reasoningEffort.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-white/5">
                <span className="text-screen-white/50">Creativity</span>
                <span className="font-mono text-screen-white/80">
                  {Math.round(config.temperature * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Configuration Form - Right Side */}
          <div className="lg:w-2/3">
            {loading ? (
              <GlassPanel className="h-96 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-6 h-6 border-2 border-bedroom-purple border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-screen-white/50">Loading configuration...</p>
                </div>
              </GlassPanel>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <GlassPanel title="Core Configuration">
                  <div className="space-y-6">
                    {/* Model Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-screen-white/80 uppercase tracking-wider">
                        Director Text Model
                      </label>
                      <div className="relative">
                        <select
                          value={config.textModel || "openai/gpt-4o-mini"}
                          onChange={(e) => handleChange("textModel", e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-screen-white focus:outline-none focus:border-bedroom-purple/50 focus:ring-1 focus:ring-bedroom-purple/50 transition-all appearance-none"
                        >
                          <option value="openai/gpt-4o-mini">GPT-4o mini (OpenAI via OpenRouter)</option>
                          <option value="x-ai/grok-4.1-fast:free">Grok 4.1 Fast (Free Promo)</option>
                          <option value={config.textModel || "custom"}>
                            Custom... ({config.textModel || "set via env/config"})
                          </option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-screen-white/30 pointer-events-none" />
                      </div>
                      <p className="text-[11px] text-screen-white/40">
                        Choose the primary text model for Director Chat. For advanced IDs, set <code>DIRECTOR_TEXT_MODEL</code> or update <code>config.json</code>; they0will appear here as <em>Custom...</em>.
                      </p>
                    </div>

                    {/* Reasoning Effort Slider */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-screen-white/80 uppercase tracking-wider">
                          Reasoning Effort
                        </label>
                        <span className="text-xs font-mono text-bedroom-purple bg-bedroom-purple/10 px-2 py-0.5 rounded">
                          {config.reasoningEffort}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={4}
                        step={1}
                        value={["none", "minimal", "low", "medium", "high"].indexOf(config.reasoningEffort) || 0}
                        onChange={(e) => {
                          const levels: ReasoningEffort[] = ["none", "minimal", "low", "medium", "high"];
                          handleChange("reasoningEffort", levels[Number(e.target.value)] || "low");
                        }}
                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-bedroom-purple hover:accent-bedroom-purple/80 transition-all"
                      />
                      <div className="flex justify-between text-[10px] text-screen-white/30 font-mono uppercase">
                        <span>None</span>
                        <span>High</span>
                      </div>
                    </div>

                    {/* Temperature Slider */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-screen-white/80 uppercase tracking-wider">
                          Temperature (Creativity)
                        </label>
                        <span className="text-xs font-mono text-bedroom-purple bg-bedroom-purple/10 px-2 py-0.5 rounded">
                          {config.temperature.toFixed(2)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={200}
                        step={5}
                        value={Math.round(config.temperature * 100)}
                        onChange={(e) => handleChange("temperature", Number(e.target.value) / 100)}
                        className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-bedroom-purple hover:accent-bedroom-purple/80 transition-all"
                      />
                      <div className="flex justify-between text-[10px] text-screen-white/30 font-mono uppercase">
                        <span>Deterministic</span>
                        <span>Creative</span>
                      </div>
                    </div>
                  </div>
                </GlassPanel>

                {/* Advanced Settings */}
                <div className="space-y-4">
                  <CollapsibleSection title="Style Guidelines" icon={Sparkles}>
                    <div className="space-y-2">
                      <p className="text-xs text-screen-white/50 mb-2">
                        Add specific instructions for the Director's personality and output style.
                      </p>
                      <textarea
                        value={config.chatPromptExtra}
                        onChange={(e) => handleChange("chatPromptExtra", e.target.value)}
                        rows={5}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-screen-white placeholder:text-screen-white/20 focus:outline-none focus:border-bedroom-purple/50 focus:ring-1 focus:ring-bedroom-purple/50 transition-all resize-none"
                        placeholder="e.g. Be sarcastic, use film noir metaphors, keep responses under 50 words..."
                      />
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="System Prompt Override" icon={Terminal}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${overrideActive ? "bg-amber-500" : "bg-white/20"}`} />
                          <span className="text-xs text-screen-white/50">
                            {overrideActive ? "Override Active" : "Using Default Template"}
                          </span>
                        </div>
                      </div>
                      <textarea
                        value={config.chatPromptOverride}
                        onChange={(e) => handleChange("chatPromptOverride", e.target.value)}
                        rows={10}
                        className={`w-full rounded-lg px-4 py-3 text-xs font-mono leading-relaxed focus:outline-none transition-all resize-y ${overrideActive
                          ? "bg-amber-950/20 border border-amber-500/30 text-amber-100/90 focus:border-amber-500/50"
                          : "bg-black/40 border border-white/10 text-screen-white/70 focus:border-bedroom-purple/50"
                          }`}
                        placeholder="Paste a full system prompt here to completely override the default behavior..."
                      />
                    </div>
                  </CollapsibleSection>

                  <CollapsibleSection title="Prompt Preview" icon={CheckCircle2}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-end mb-2">
                        <button
                          type="button"
                          onClick={() => handleChange(
                            "chatPromptOverride",
                            buildPromptPreview({ ...config, chatPromptOverride: "", chatPromptExtra: "" })
                          )}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-screen-white/70 hover:text-white text-[10px] font-medium rounded-md transition-all flex items-center gap-2"
                        >
                          <Terminal className="w-3 h-3" />
                          Copy to Override
                        </button>
                      </div>
                      <textarea
                        value={buildPromptPreview(config)}
                        readOnly
                        rows={10}
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-xs font-mono text-screen-white/60 resize-none focus:outline-none"
                      />
                    </div>
                  </CollapsibleSection>
                </div>

                {/* Sticky Action Bar */}
                <div className="sticky bottom-6 z-10">
                  <GlassPanel className="flex items-center justify-between py-3 px-6 bg-black/90 backdrop-blur-2xl border-bedroom-purple/20 shadow-[0_0_30px_rgba(124,58,237,0.1)]">
                    <div className="flex-1">
                      {/* Status Text */}
                      <div className="flex flex-col">
                        {isDirty ? (
                          <span className="text-xs font-medium text-amber-400 flex items-center gap-2">
                            <AlertCircle className="w-3 h-3" />
                            Unsaved changes
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-screen-white/50 flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3" />
                            All changes saved
                          </span>
                        )}
                        {error && (
                          <span className="text-[10px] text-red-400 mt-0.5">
                            {error}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 ml-8">
                      {isDirty && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm("Discard unsaved changes?")) {
                              loadConfig();
                            }
                          }}
                          className="px-3 py-1.5 text-xs text-screen-white/50 hover:text-white transition-colors"
                        >
                          Discard
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={saving || (!isDirty && !success)}
                        className={`flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-lg transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] ${success
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-bedroom-purple text-white hover:bg-bedroom-purple/90 disabled:opacity-50 disabled:cursor-not-allowed"
                          }`}
                      >
                        {saving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : success ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Saved!</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            <span>Save Changes</span>
                          </>
                        )}
                      </button>
                    </div>
                  </GlassPanel>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
