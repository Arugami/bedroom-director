/**
 * Director AI configuration
 *
 * Central place to tweak:
 * - Which models Director uses (text + vision)
 * - How much Grok "reasoning" effort we request
 * - Base system prompts for Director Chat / Structure
 *
 * This reads from /data/director_ai/config.json when present so we can
 * adjust settings from a dashboard without changing code. Env vars provide
 * defaults and safe fallbacks.
 */

import fs from "fs";
import path from "path";

export type ReasoningEffort = "high" | "medium" | "low" | "minimal" | "none";

export interface DirectorAiConfigFile {
  textModel?: string;
  visionModel?: string;
  reasoningEffort?: ReasoningEffort;
  chatPromptExtra?: string;
  chatPromptOverride?: string;
  temperature?: number;
}

const DATA_ROOT = path.join(process.cwd(), "..", "data");
const CONFIG_DIR = path.join(DATA_ROOT, "director_ai");
const CONFIG_PATH = path.join(CONFIG_DIR, "config.json");

function readConfigFile(): DirectorAiConfigFile | null {
  try {
    if (!fs.existsSync(CONFIG_PATH)) return null;
    const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(raw) as DirectorAiConfigFile;
  } catch {
    return null;
  }
}

const fileConfig = readConfigFile();

export const DIRECTOR_TEXT_MODEL =
  fileConfig?.textModel || process.env.DIRECTOR_TEXT_MODEL || "x-ai/grok-4-fast";

export const DIRECTOR_VISION_MODEL =
  fileConfig?.visionModel ||
  process.env.DIRECTOR_VISION_MODEL ||
  "google/gemini-2.5-flash";

/**
 * How hard Grok should "think" for Director text routes.
 *
 * Valid values (OpenRouter reasoning.effort):
 *   "high" | "medium" | "low" | "minimal" | "none"
 *
 * - "none"    → disables reasoning entirely (fastest, cheapest)
 * - "minimal" → very light reasoning
 * - "low"     → default for conversational / tool-calling flows
 */
export const DIRECTOR_TEXT_REASONING_EFFORT: ReasoningEffort =
  fileConfig?.reasoningEffort ||
  ((process.env.DIRECTOR_TEXT_REASONING_EFFORT as ReasoningEffort) || "low");

export const DIRECTOR_CHAT_PROMPT_EXTRA =
  fileConfig?.chatPromptExtra || "";

function clampTemperature(value: number): number {
  if (Number.isNaN(value)) return 0.7;
  if (value < 0) return 0;
  if (value > 2) return 2;
  return value;
}

export const DIRECTOR_TEXT_TEMPERATURE: number = (() => {
  if (typeof fileConfig?.temperature === "number") {
    return clampTemperature(fileConfig.temperature);
  }
  if (process.env.DIRECTOR_TEXT_TEMPERATURE) {
    return clampTemperature(Number(process.env.DIRECTOR_TEXT_TEMPERATURE));
  }
  return 0.7;
})();

export function getDirectorAiConfig(): Required<DirectorAiConfigFile> {
  return {
    textModel: DIRECTOR_TEXT_MODEL,
    visionModel: DIRECTOR_VISION_MODEL,
    reasoningEffort: DIRECTOR_TEXT_REASONING_EFFORT,
    chatPromptExtra: DIRECTOR_CHAT_PROMPT_EXTRA,
    chatPromptOverride: fileConfig?.chatPromptOverride || "",
    temperature: DIRECTOR_TEXT_TEMPERATURE,
  };
}

/**
 * Build the system prompt for Director Chat, given a project context.
 * Kept here so it's easy to iterate on the persona and behavior.
 */
export function buildDirectorChatSystemPrompt(projectContext: {
  title: string;
  bible: any;
}) {
  let base: string;

  // If there is an explicit override in config, use it as the base.
  if (fileConfig?.chatPromptOverride && fileConfig.chatPromptOverride.trim()) {
    base = fileConfig.chatPromptOverride;
  } else {
    base = `You are an expert film director assistant called "Director AI". You are chatting with a user to help them develop their film idea inside Bedroom Director.

CONTEXT:
Project Title: ${projectContext.title}
Current Bible: ${JSON.stringify(projectContext.bible)}

VISUAL REFERENCES:
${
  projectContext.bible?.visualAssets
    ?.map(
      (a: any) =>
        `[${(a.category || "").toUpperCase()}] ${a.label}: ${a.description}`
    )
    .join("\n") || "None"
}

GOAL:
1. Chat naturally with the user. Ask probing questions about characters, setting, and tone.
2. When the user gives new concrete details about characters, locations, or aesthetic, use the 'update_bible' tool to save them.
3. When the user has described their vision sufficiently (logline, key scenes, tone), use 'propose_structure' to suggest a complete project breakdown.
4. Keep responses concise, vivid, and cinematic. Prefer specific examples over generic advice.
5. Stay encouraging and collaborative—you're a creative partner, not a critic.`;
  }

  if (!DIRECTOR_CHAT_PROMPT_EXTRA) return base;

  return `${base}\n\nADDITIONAL STYLE GUIDELINES:\n${DIRECTOR_CHAT_PROMPT_EXTRA}`;
}

/**
 * Build a preview of the current Director Chat system prompt for the dashboard.
 * Uses a placeholder project context.
 */
export function buildDirectorChatPromptPreview(): string {
  return buildDirectorChatSystemPrompt({
    title: "Sample Project",
    bible: { visualAssets: [] },
  });
}
