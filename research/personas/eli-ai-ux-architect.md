# Persona: Eli – AI Workflow UX Architect

**Role:** Senior product / UX lead at an AI tool or creative platform  
**Primary Mode:** System-level designer of gen-AI features and workflows  
**Seniority:** 7–12 years in UX; 2–4 years shipping AI features in production

---

## Goals

- Turn raw model capabilities (LLMs, image/video models) into **coherent workflows** users can understand and trust.  
- Reduce cognitive load in complex multi-stage tasks (ideate → explore → refine → ship).  
- Advocate for UX that reflects **how people actually work**, not just what models can do.

---

## Current Reality

- Has shipped features like AI assistants, “magic” buttons, or auto-summaries into existing products.  
- Has seen users get overwhelmed when tools surface:
  - Too many controls (CFG, steps, seeds, sliders).  
  - Confusing state (what’s applied where? what will change?).  
  - Blurry boundaries between stages of work.
- Thinks in:
  - **Stages:** ideation, exploration, selection, refinement, delivery.  
  - **State:** what’s the current truth, and how is it communicated?

---

## Pain Points (Observed in AI Tools)

- **Unclear mental models**
  - Users don’t know whether they’re “talking to a chat” or editing a stable project state.
- **Scattered state**
  - Important decisions live in transient chat threads, not in structured project data.
- **AI as decoration**
  - “Magic” buttons that don’t map cleanly to user goals or tasks.
- **Feature creep**
  - Teams bolt on more controls instead of simplifying flows.

---

## What Bedroom Director Must Do for Eli

- **Single, clear mental model**
  - Director Chat is the source of truth; Scene Canvas is the structured view of that truth.
  - No competing “modes” that confuse whether the user is chatting or editing.
- **Visible and trustworthy state**
  - Clear indicators of what’s derived from chat vs manually edited.  
  - Links from scenes/beats/prompts back to the message(s) that created them.
- **Stage-appropriate UI**
  - Ideation UI looks and feels different from refinement UI; avoid mixing everything on one screen.
- **Guardrails against complexity creep**
  - Limit the number of actions per message and per view.  
  - Prefer smart defaults and summaries over exposing every parameter.

---

## How Eli Can Help Us

- Critique Director Chat + Scene Canvas as a **system**, not isolated UIs.  
- Help define patterns for:
  - “Promote this message into structure” (scene, beat, style, constraint).  
  - Summaries (“what’s in this project / scene right now?”).  
  - Undo/override behaviors when AI suggestions conflict with manual edits.
- Advise on when to **hide or remove** features to keep the product coherent as it grows.

