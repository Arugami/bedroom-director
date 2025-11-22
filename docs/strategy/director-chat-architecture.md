# Director Chat Architecture & Config – Bedroom Director

**Date:** November 21, 2025  
**Owner:** Product / AI Engineering  
**Purpose:** Document how Director Chat works end‑to‑end (models, prompts, tools), and how to tweak behavior (Grok reasoning, system prompts) without hunting through code.

---

## 1. High-Level Flow

**User Experience (Scene Canvas):**

1. User types into the Director Chat input on `scene-canvas/page.tsx`.
2. Frontend appends the message to `chatMessages` and calls:
   - `POST /api/director/chat` with:
     - `messages`: full chat history (`[{ role, content }]`).
     - `projectContext`: `{ title, scenes, bible }` from the current project.
3. Backend calls OpenRouter → Grok → returns:
   - The assistant’s `content`.
   - Any `tool_calls` (e.g., `propose_structure`).
4. Frontend:
   - If `propose_structure` was called:
     - Parses the returned JSON.
     - Opens a **proposal modal** with the suggested structure.
     - Adds a chat message announcing that a structure is ready.
   - Otherwise:
     - Appends the assistant’s reply directly into chat.

Future work: wire `update_bible` tool calls into `SceneContext` so the Bible updates automatically as you chat.

---

## 2. Models & Endpoints

We currently use three main models via OpenRouter:

- **Text / Tool Calling (Chat + Structure)**
  - Model: **Grok 4.1 Fast** (xAI)
  - ID: configured via `DIRECTOR_TEXT_MODEL` (default: `"x-ai/grok-4-fast"` or `"x-ai/grok-4.1-fast"` depending on OpenRouter naming).
  - Context: 2M tokens.
  - Reasoning: configurable via `DIRECTOR_TEXT_REASONING_EFFORT` (see below).

- **Vision (Visual Bible)**
  - Model: **Gemini 2.5 Flash** (Google)
  - ID: `DIRECTOR_VISION_MODEL` (default: `"google/gemini-2.5-flash"`).

- **Signals Analyzer (Screenshots)**
  - Model: `openai/gpt-4o-mini` (via OpenRouter) because we need robust image understanding and JSON output for the `/signals` pipeline.

All requests go through OpenRouter’s `/chat/completions` endpoint with a consistent pattern for `messages`, `tools`, and `response_format`.

---

## 3. Config File – Where to Tweak Things

File: `bedroom-director-web/src/lib/directorAiConfig.ts`

Exports:

```ts
export type ReasoningEffort = "high" | "medium" | "low" | "minimal" | "none";

export interface DirectorAiConfigFile {
  textModel?: string;
  visionModel?: string;
  reasoningEffort?: ReasoningEffort;
  chatPromptExtra?: string;
}

export const DIRECTOR_TEXT_MODEL: string;
export const DIRECTOR_VISION_MODEL: string;
export const DIRECTOR_TEXT_REASONING_EFFORT: ReasoningEffort;
export const DIRECTOR_CHAT_PROMPT_EXTRA: string;

export function getDirectorAiConfig(): Required<DirectorAiConfigFile>;
export function buildDirectorChatSystemPrompt(projectContext: {
  title: string;
  bible: any;
}): string;
```

**Where values come from:**

- On the server, we read `data/director_ai/config.json` first.
- If a field is not present there, we fall back to env vars and defaults:
  - `textModel` → `DIRECTOR_TEXT_MODEL` (default `x-ai/grok-4-fast`).
  - `visionModel` → `DIRECTOR_VISION_MODEL` (default `google/gemini-2.5-flash`).
  - `reasoningEffort` → `DIRECTOR_TEXT_REASONING_EFFORT` (default `"low"`).
  - `chatPromptExtra` → `DIRECTOR_CHAT_PROMPT_EXTRA` (default `""`).

Text routes pass:

```ts
reasoning: {
  effort: DIRECTOR_TEXT_REASONING_EFFORT,
  exclude: true,
}
```

so Grok’s reasoning effort is always explicit, and can be tuned via the config/dashboard.

**Director Lab (`/director-lab`):**

- `GET /api/director/config` → returns `getDirectorAiConfig()` for the form.
- `POST /api/director/config` → validates fields and writes `config.json`, then returns the merged config.
- The form lets you edit:
  - Text model ID.
  - Vision model ID.
  - Reasoning effort (`none|minimal|low|medium|high`).
  - Extra style guidelines appended to the system prompt.

---

## 4. System Prompt for Director Chat

Defined in `buildDirectorChatSystemPrompt(projectContext)`:

- Persona:
  - “Expert film director assistant called ‘Director AI’.”
  - Collaborative, encouraging, not a critic.
- Context included:
  - `Project Title`
  - The serialized `ProjectBible` (characters, locations, aesthetic, visual assets).
  - Visual references rendered as lines like `[CHARACTER] Nina: fearless but anxious…`.
- Goals:
  1. Chat naturally, ask probing questions about characters, setting, tone.
  2. When new concrete details appear, call `update_bible`.
  3. When the vision is fleshed out (logline/key scenes), call `propose_structure`.
  4. Keep responses concise, vivid, cinematic (specific examples over generic advice).
  5. Stay “in the zone” – creative partner vibe.

To tweak the tone or structure of Director Chat, you only need to edit this function.

---

## 5. Tools (Function Calling)

Defined in `src/app/api/director/chat/route.ts`:

1. **`update_bible`**
   - Used to add/update:
     - `characters: [{ name, description }]`
     - `locations: [{ name, description }]`
     - `aesthetic: { mood: string[], palette: string[], era: string }`
   - Currently not applied yet; the frontend ignores this tool and we just log chat.

2. **`propose_structure`**
   - Produces:
     - `suggestedTitle`
     - `logline`
     - `scenes: [{ title, notes, duration? }]`
     - Optional `bibleNotes` (characters, locations, aesthetic).
   - The frontend:
     - Detects this tool call.
     - Parses the JSON.
     - Opens the structure preview modal.

Future improvements:

- Implement a small handler that:
  - Applies `update_bible` calls to `SceneContext`.
  - Logs a short “Bible updated” system message in chat.

---

## 6. Performance & Reasoning Notes (Grok 4.1 Fast)

From OpenRouter docs:

- Grok 4 Fast supports OpenRouter’s unified `reasoning` config:
  - `reasoning.effort`: `"high" | "medium" | "low" | "minimal" | "none"`.
  - `reasoning.exclude`: omit reasoning tokens from the response.
- Default (if unspecified) tends to use **medium** reasoning, which can be slower.

Our default:

- `DIRECTOR_TEXT_REASONING_EFFORT = "low"` – keeps Grok’s tool calling strong while reducing latency.
- `exclude: true` – we don’t need to show the internal chain-of-thought to users; we just want better decisions.

If chat feels too slow or “overthinking”:

- Set `DIRECTOR_TEXT_REASONING_EFFORT="minimal"` or `"none"` in env for a faster, snappier experience.

---

## 7. Future Improvements

- **Prompt Tuning UI:**  
  Eventually we can expose a small admin UI that:
  - Shows the current system prompt.
  - Allows safe edits saved to a config file or DB.
  - Lets us A/B test different personas or behaviors.

- **Tiered Model Stack:**  
  - Free users: Grok 4.1 Fast (free promo) + GPT‑4o‑mini for vision.
  - Pro users: paid Grok 4 Fast / higher‑tier text + Gemini 2.5 Flash for vision.

- **Observability:**  
  - Log model/params per request for later analysis (e.g., which reasoning effort feels best).
  - Capture user feedback (“helpful / not helpful”) at the message level.

This document should be updated whenever we:

- Swap models for Director Chat / Structure / Vision.
- Change the default reasoning setting.
- Make significant prompt updates or add/remove tools.
