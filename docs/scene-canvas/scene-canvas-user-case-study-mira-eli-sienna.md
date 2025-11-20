# Scene Canvas Case Study – Personas & UI Feedback

**Last Updated:** November 19, 2025  
**Scope:** Early Scene Canvas UI (Director Chat + Reel Wall + Inspector)

This document captures how our three core personas read the current Scene Canvas workspace and what they expect from it. Treat this as the first “user case study” for the Scene Canvas control room — any major UI change should be cross‑checked against these notes.

Personas referenced:
- `research/personas/mira-ai-filmmaker.md`
- `research/personas/eli-ai-ux-architect.md`
- `research/personas/sienna-agency-creative-technologist.md`

---

## 1. Context: What They’re Looking At

Current Scene Canvas (v0.1) shows:
- **Left:** Director Sidebar + Director Chat + Visual References (project bible).
- **Center:** Reel Wall with a “New Scene” card and small scene pills once scenes exist.
- **Right:** TimelineRail across the top + a dense Scene Inspector rail (camera, lighting, style chips).

The implementation spec now also defines:
- `2.1 Workspace UX & Layout Principles` – Chat → Reel Wall → Inspector mental model.
- `2.2 Visual Design & Film Aesthetic` – “control room, not form”; Reel Wall as the hero.

This case study evaluates how that reality + target spec land for three different users.

---

## 2. Mira – Exhausted AI Filmmaker

**Reference:** `research/personas/mira-ai-filmmaker.md`

### 2.1 What Works for Mira
- Likes having **Director Chat + Reel Wall + Inspector** in one place — feels closer to a real scene graph than slot‑machine UIs she’s used to.
- Appreciates the **Visual References** area as a project bible; maps directly to her current “prompt bible” hacks.
- Sees potential in “Propose structure from chat” to turn late‑night brain‑dumps into a concrete scene list.

### 2.2 Friction / Concerns
- The Reel Wall, once multiple scenes exist, looks like **tiny numbered pills in space**, not a “real reel.” Hard to parse quickly when she’s tired.
- **Duplication between Reel Wall and TimelineRail** is confusing — two visually similar representations of scenes with slightly different layouts.
- The Scene Inspector feels like a **form UI**, not a directing surface; it’s powerful, but visually heavy and text‑dense.

### 2.3 Implications for Design
- Reel Wall cards must become **big, cinematic frames** with clear titles and one‑line “what happens” summaries.
- There should be **one primary representation** of scenes (Reel Wall); the Timeline should be subordinate navigation.
- Status (exploring / refining / locked) should be visible **directly on the scene cards**, not only in metadata on the right.

---

## 3. Eli – AI Workflow UX Architect

**Reference:** `research/personas/eli-ai-ux-architect.md`

### 3.1 What Works for Eli
- Likes the explicit commitment to a single mental model: **Director Chat as source of truth, Scene Canvas as structured state**.
- Appreciates the emphasis on **visual hierarchy** and “control room, not form” in sections `2.1` and `2.2` of the implementation spec.
- Sees the potential of `activeSceneId` and global context to keep all three regions in sync.

### 3.2 Friction / Concerns
- The current UI still presents **two equal modes for scenes** (Reel Wall vs TimelineRail). Mental model is “duplicated surface” rather than “canvas + navigator.”
- The Scene Inspector exposes **too many controls at once**; it risks becoming the place users “do everything,” defeating the staged workflow idea.
- State transitions (ideation → outline → locked scene) are not clearly surfaced; users may not know if they are “just chatting” or editing a stable project state.

### 3.3 Implications for Design
- Make the **Reel Wall the single primary canvas**; TimelineRail should be visually and functionally demoted to navigation.
- Group inspector controls into **stage‑appropriate sections** (quick summary vs deep options), and prefer summaries over full parameter grids.
- Use clear state cues (badges, section headers, copy) to signal “this is derived from chat,” “this is manually edited,” and “this is locked.”

---

## 4. Sienna – Agency Creative Technologist

**Reference:** `research/personas/sienna-agency-creative-technologist.md`

### 4.1 What Works for Sienna
- Project list in the left sidebar maps neatly to **client campaigns**; Scene Canvas feels like a plausible “campaign board.”
- Camera / lighting / style chips in the inspector look like something she can use to **explain decisions to clients** (“we chose handheld + neon night + music video style”).
- The idea of Reel Wall + Inspector could become a **presentation view** for walking clients through scenes 1–5.

### 4.2 Friction / Concerns
- The current multi‑scene state doesn’t yet feel **presentation‑ready**; small pills and lots of black space look more like a prototype than a deck.
- She wants to be able to walk a client through a project **using only the Reel Wall** (scene cards with titles, descriptions, maybe thumbnails), without relying on the inspector.
- Top‑level project context (brand, deliverable type, platforms) is not sufficiently visible; the workspace feels like a sandbox, not a branded campaign view.

### 4.3 Implications for Design
- Design the Reel Wall to double as a **pitch board**: big cards, clear titles, concise “what happens” copy, and eventual thumbnails.
- Add a **project header band** with client/brand, deliverable type, and status so the workspace feels like an organized campaign surface.
- Consider a lightweight “presentation mode” (or at least a decluttered variant) where the Reel Wall can be screen‑shared cleanly.

---

## 5. Cross‑Cut Themes

Across Mira, Eli, and Sienna:

- **Reel Wall must be the hero.**  
  Everyone is implicitly asking for larger, clearer scene cards and a single, authoritative surface for “what’s in this project.”

- **Timeline should become a navigator, not a twin canvas.**  
  The current duplication confuses state; all three personas want clarity about where “the film” lives.

- **Inspector needs to be powerful but tamed.**  
  It should summarize choices and allow edits, not feel like a giant form that competes visually with the Reel Wall.

- **State and status must be visually obvious.**  
  Locked vs exploring, AI‑derived vs manual, client‑ready vs rough — all need concrete, visible cues on the canvases, not just in copy.

---

## 6. Action Checklist (v0.2–v0.3)

Use this checklist when iterating on the Scene Canvas UI:

- [ ] Reel Wall uses **large, cinematic cards** with scene number, title, and 1‑line summary.  
- [ ] There is exactly **one primary representation** of scenes; TimelineRail is clearly secondary navigation.  
- [ ] A **single active scene** is visibly highlighted on Reel Wall, Timeline, and Inspector header.  
- [ ] Empty state shows a **hero + starter templates + chat CTA**, not just a dashed card.  
- [ ] Inspector is grouped with summaries and collapsible controls, not a flat wall of chips.  
- [ ] Project header exposes campaign context (title, scenes count, maybe brand/deliverable tags).  
- [ ] All changes remain consistent with `2.1 Workspace UX & Layout Principles` and `2.2 Visual Design & Film Aesthetic`.

This document should evolve as we run real tests with users; when we change the Scene Canvas layout meaningfully, update this case study with before/after captures and notes.

