# Scene Canvas – Chat-First Director Workspace

> Working doc for the “you brain-dump, AI organizes” version of Scene Canvas.  
> This focuses on the *project chat as source of truth*, with the canvas as a structured view over that conversation.

---

## 1. Core Idea

- The user does **zero structural work up front**. They just talk to a director-assistant in natural language.
- The **project chat** becomes the canonical source of truth: brief, constraints, references, style, decisions.
- Scene Canvas is a **projection of that source of truth** into scenes, beats, prompts, and tool selections.
- All structured objects (Project, Scenes, Beats, Prompts) are either:
  - Created from chat suggestions the user accepts, or
  - Edited through the chat (e.g., “tighten Scene 3” modifies the scene entity, not just text).

---

## 2. Updated Mental Model

Old (current implementation spec):
- “Scene-first” workspace.
- You manually create scenes and fill prompt slots.

New (chat-first):
- **Project-level chat** is the entry point.
- AI extracts a proposed structure (scenes, beats, styles) from that chat.
- User approves / tweaks the structure → this creates Scene/Beat entities.
- Canvas view is a live, editable visualization of that structure.

The Scene Canvas page is no longer “a fancy scene editor.”  
It’s “a director’s brain, organized by an assistant, with scenes/beats as the visible outline.”

---

## 3. Key Flows

### 3.1 New Project → Chat → Structure

1. `New Project` (from navigation or Scene Canvas landing).
2. Land in **full-screen Director Chat**:
   - No canvas yet, just a title field + chat.
   - Prompt suggestions: “Describe your project in 3 sentences”, “Share references”, etc.
3. User brain-dumps:
   - Goals, vibes, constraints, deadlines, references, platforms, aspect ratio, budget, etc.
4. AI assistant:
   - Asks 3–5 focused questions to tighten the brief (not too many).
   - Builds an internal representation (potential scenes, characters, locations, style).
5. Once enough info exists, assistant proposes:
   - “I’d structure this as 6 scenes. Here’s a quick outline…”
   - Button: `Accept structure` (with option to edit counts/titles).
6. On acceptance:
   - System creates `Scene` + `Beat` entities.
   - UI transitions into split view (Chat + Canvas).

### 3.2 Chat-Driven Refinement

In split view:
- Left: **Project Chat** (always visible).
- Middle: **Scenes list** (columns or list).
- Right: **Selected Scene / Beat inspector**.

From the chat, user can:
- `Turn this into Scene 3` (per-message action).
- `Create scenes from this` (on a summary message).
- `Refine Scene 2 beats` → AI updates the beats for Scene 2.
- `Give a shot list for Beat 2.3` → creates/updates beat-level prompt/shot notes.

All of these:
- Produce structured changes to `Scene`, `Beat`, or `Prompt` entities.
- Append a summary message back into chat (“Updated Scene 2 beats: …”).

### 3.3 Tool / Prompt Integration

For each scene/beat:
- The system infers **target tools/models** from:
  - Project platform (e.g., TikTok, YouTube).
  - Desired modality (image, video, image-to-video).
  - Constraints (budget, speed, IP concerns).
- The inspector shows:
  - Recommended models (from tools catalog).
  - Pre-compiled prompts seeded from chat content.
  - One-click actions: `Copy prompt`, `Open tool`, `Save version`.

The creator should feel like:
- “I just talked it out, and Scene Canvas built the checklist + prompts + tool wiring for me.”

---

## 4. Data Model Alignment

We keep most of the existing types from **Scene Canvas – Implementation Spec**, but reinterpret how they’re created:

- `SceneProject`:
  - `title`, `description`, `tags` seeded from the **project chat**.
  - `globalStyle` inferred from tone, references, and explicit style answers.
- `Scene`:
  - Created from accepted outlines.
  - `notes` and `status` updated via chat (e.g., “lock Scene 4”).
- `Beat`:
  - Extracted from assistant’s breakdown or manually added in inspector.
  - Holds emotional beat + visual specifics from chat.
- `PromptSlots` / compiled prompts:
  - Derived from the combination of `Scene`, `Beat`, and project style info.

Additional entities:

```ts
interface ProjectChatMessage {
  id: string;
  projectId: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
  // Optional linkage to structured entities
  linkedSceneId?: string;
  linkedBeatId?: string;
  tags?: string[]; // e.g. ["brief", "style", "constraint", "reference"]
}

interface ExtractedOutlineSuggestion {
  id: string;
  projectId: string;
  summary: string;
  scenes: {
    title: string;
    description: string;
  }[];
  createdAt: string;
  acceptedAt?: string;
}
```

---

## 5. Concrete Refactor Plan for `scene-canvas/page.tsx`

Current state (high level):
- Auto-creates a project on first load.
- Shows `DirectorSidebar` with projects.
- Main area is **scene-first**: inspector for a single scene, prompt slots, camera/lighting/style controls.

Target state:
- **Step 1 – Chat panel scaffolding (no AI yet)**  
  - Add a left-hand `ProjectChatPanel` to `scene-canvas/page.tsx`:
    - Simple local message list + input.
    - Store in `SceneContext` as `projectChatMessages` keyed by `projectId`.
  - Layout: three columns:
    - Left: Chat (fixed width).
    - Middle: Scenes list.
    - Right: Selected scene inspector (existing UI).

- **Step 2 – Structure proposal UX (stubbed)**  
  - Add a `ProposeStructureButton` in the chat area:
    - For now, mock the outline suggestion (fixed 3–6 scenes from latest messages).
    - On `Accept`, create `Scene` entities using existing `addScene` API, with titles from the suggestion.
  - Visually show a lightweight “outline proposal” card above the chat history.

- **Step 3 – Wire inspector to chat-derived fields**  
  - Ensure scene title, notes, and main prompt field can be:
    - Seeded from accepted chat messages.
    - Linked back (store `linkedSceneId` on messages).
  - Add per-message actions in chat (UI only at first):
    - `Use as Scene Title`.
    - `Use as Scene Description`.

- **Step 4 – Clean up auto-create behavior**  
  - Revisit the `useEffect` that auto-creates a project with a random title:
    - Prefer: “Untitled Project” + immediate prompt to “Tell me about your project.”

Later (Phase 2):
- Swap the mocked structure proposal with a real AI call.
- Add commands like “lock this scene”, “make this more suspenseful” that update entity fields and log a summary message.

---

## 6. How This Doc Relates to Existing Specs

- **Scene Canvas – Strategic Analysis**  
  Stays valid; this doc narrows in on *interaction model*.

- **Scene Canvas – Implementation Spec**  
  Data types and monetization remain useful, but:
  - The **entry point** changes from scene-first to chat-first.
  - Some UI roadmap items (Scene list, prompt slots, versions) are now framed as *views on top of the chat-derived structure*.

We should treat this doc as the working reference whenever we implement or refactor anything in `src/app/scene-canvas` and `SceneContext`.

---

## 7. Design Notes & Open Questions (Assistant)

- **Chat as single source of truth**
  - Strong principle: every structured object (scenes, beats, prompts, styles) should trace back to one or more chat messages.
  - Implementation hint: store `linkedMessageIds: string[]` on `Scene` / `Beat` / `Prompt` so we can always show “where this came from.”

- **Minimal v1 for ProjectChatPanel**
  - No AI calls needed to ship the first version.
  - Focus on: message list, input box, per-message actions (`Use as Scene Title`, `Add as Beat`, `Pin as Style`), and a mocked `Propose Structure` helper.

- **UI modes vs. routes**
  - Keep a single route (`/scene-canvas`) with internal modes/tabs:
    - `Director Chat` (chat + slim structure sidebar)
    - `Scene Canvas` (Reel Wall + Inspector + chat column)
  - Avoid separate routes like `/director-chat` so we don’t fragment state.

- **Risk: complexity creep in chat UI**
  - Temptation: turn Director Chat into a full IDE (filters, threads, tags).
  - Guardrail: prioritize 3–4 obvious actions per message; defer advanced tooling until real users hit limits.

- **Open Questions**
  - Do we allow **multiple outline proposals** per project and version them (v1, v2), or treat the outline as always “current truth” once accepted?
  - How opinionated should the AI be about **tool selection** vs. just suggesting a shortlist from the catalog?
  - When users heavily edit scenes by hand, how much should future AI suggestions respect those edits vs. re‑writing from scratch?
