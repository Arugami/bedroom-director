# Persona: Mira – Exhausted AI Filmmaker / VFX Hybrid

**Role:** Indie director / VFX generalist  
**Primary Mode:** Deliverable-oriented (branded 30–60s spots, trailers, mood films)  
**Seniority:** 8–10 years production; 2–3 years deep in AI tools  
**Core Tools Today:** Runway / Pika / Luma, Midjourney / Flux, ComfyUI, DaVinci Resolve, Topaz Video AI, ElevenLabs, Hedra, Notion

---

## Goals

- Ship client-ready 30–60s videos that feel “real” enough for brands (4K, stable characters, acceptable motion).  
- Compress a 40–60 hour multi-tool pipeline into something closer to a focused 5–10 hours of *actual* directing.  
- Keep creative control (shots, pacing, mood) without drowning in node graphs and export/import hell.

---

## Current Workflow (Simplified)

1. **Brief & Script**
   - Receives loose brief (Notion / doc / email).
   - Uses ChatGPT/Claude to tighten script, brainstorm scenes and shots.
2. **Reference & Key Frames**
   - Moodboards in PureRef / Milanote; pulls stills from films, Pinterest, ArtStation.
   - Generates key images in Midjourney/Flux with IP-Adapter, ControlNet, LoRAs to lock characters.
3. **Image → Video**
   - Sends selected frames to Runway / Pika / Luma.
   - Tweaks motion strength, camera paths, duration; regenerates many times to fight artifacts.
4. **Fixes & Extensions**
   - Uses ComfyUI node graphs for extensions, inpainting, denoising.
   - Builds custom pipelines but pays the mental tax of maintaining them.
5. **Edit, Audio, Delivery**
   - Cuts in Resolve / Premiere, adds VO (ElevenLabs), music, and light grade.
   - Exports multiple aspect ratios, deals with platform quirks.

Total: 20–60 hours per 30-second piece; \<10% feels like “pure directing.”

---

## Pain Points (Mapped to Research)

- **Missing persistent memory**
  - Character and style drift when moving from image tools to video tools.
  - Has to rebuild “the look” with every new prompt and app.
- **Missing context across tools**
  - Chat with the LLM lives in one app, prompts in another, shots in a timeline.
  - No single space that remembers why a shot looks the way it does.
- **Tool fragmentation**
  - 6–10 apps per project; friction in moving assets and decisions between them.
- **Interface limitations**
  - Most image→video tools lack a real scene graph or timeline; feel like slot machines.
- **Decision fatigue**
  - 50–200 generations per usable clip; constant micro-decisions on prompts, sliders, retries.

---

## What Bedroom Director Must Do for Mira

- **Director Chat as her brain, not another tab**
  - Ingest script, brief, references and turn them into a clear scene list + beats.
  - Keep that context visible while she works (no “lost in scrollback”).
- **Scene Canvas as a true scene graph**
  - Scenes and beats that inherit prompts, style, and character info automatically.
  - Ability to see at a glance: “what’s locked, what’s experimental, what’s tied to which prompt.”
- **Persistent character + style memory**
  - Project-level style/character profiles that travel with every scene and prompt.
  - Clear links back to the chat messages that defined them.
- **Execution-friendly handoff**
  - For each beat: clear instructions and ready-to-run prompts for her preferred tools.
  - Eventually: direct links or API flows to Runway/Pika/Luma/ComfyUI instead of copy–paste.

---

## How Mira Can Help Us

- Co-design and critique Scene Canvas from a **real production** perspective (“would I actually use this on my next client job?”).  
- Provide 1–2 real project timelines that we can map into BD as end-to-end templates.  
- Stress-test whether Director Chat and Scene Canvas actually reduce friction, or just rearrange it.

