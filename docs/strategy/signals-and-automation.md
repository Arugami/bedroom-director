# Signals & Automation – Bedroom Director

**Date:** November 21, 2025  
**Owner:** Product / Data / AI  
**Purpose:** Document how we capture “signals” (screenshots, posts, features), how they flow into the catalog/strategy, and how automation + AI curator will work so everyone stays on the same page.

---

## 1. What “Signals” Are

Signals are any external hints that the AI landscape has changed in a way we care about:

- New model releases (e.g., Grok 4.1 Fast on OpenRouter).
- Platforms adding models (e.g., Nano Banana Pro on Higgsfield, Hedra).
- New features on existing tools (e.g., Midjourney Style Creator).
- Limited-time promos / pricing shifts.
- Standout creator workflows or brand campaigns we may want to showcase.
- UX patterns worth borrowing in Scene Canvas or Tool Catalog.

We treat signals as **raw intelligence**, not as source of truth. They feed:

- The **AI curator → Tool Catalog** pipeline.
- The **strategy docs** (model roadmap, UX roadmap).
- Future **Showcase** / “Director’s Inspiration” surfaces.

---

## 2. /signals – Upload & Analysis Flow (High-Level)

1. **You upload a screenshot**
   - Go to `/signals` (private/admin page).
   - Attach:
     - `file` (image screenshot).
     - Optional `source` (e.g., `"x"`, `"discord"`, `"blog"`).
     - Optional `notes` (why this is interesting).
     - (Future) Optional `link` to the original post or video.

2. **Backend saves + calls OpenRouter**
   - API route: `POST /api/signals/analyze`
   - Steps:
     - Saves the image under `data/signals/<uuid>_<name>.png`.
     - Builds a base64 data URL for the image.
     - Calls OpenRouter’s `/chat/completions` with an image-capable model (`openai/gpt-4o-mini` for now) and a structured system prompt.
     - The model returns a **single JSON object** that includes:
       - `type`: `model_release`, `workflow_pattern`, `new_platform`, `platform_model_add`, `platform_feature`, `platform_promo`, `pricing_change`, `ux_pattern`, `insight`, `other`.
       - `summary`, `tools`, `models`, `vendors`, `urls`.
       - `is_wrapper`, `underlying_models` (for platform wrappers like Nano Banana on Higgsfield).
       - `should_add_to_catalog`, `reason_catalog`.
       - `notes_for_catalog`, `notes_for_strategy`.
     - We append a record to `data/signals/signals.jsonl`:
       ```jsonc
       {
         "id": "<uuid>",
         "createdAt": "...",
         "notes": "...",
         "source": "x",
         "filePath": "data/signals/<file>",
         "status": "pending",
         "analysis": { /* structured object from OpenRouter */ }
       }
       ```

3. **You review & approve/reject**
   - The `/signals` page shows you the raw JSON analysis.
   - You can click:
     - **“Approve for Catalog/Docs”** → calls `POST /api/signals/approve` with `{ id, status: "approved" }`.
     - **“Reject / Ignore”** → same route with `status: "rejected"`.
   - The backend rewrites `signals.jsonl` so the chosen record gets `status: "approved"` or `"rejected"`.

At this point:

- Signals are **captured, structured, and triaged**.
- Only **approved** signals should be considered by downstream automations.

---

## 3. AI Curator & Catalog Integration (Planned)

We already have:

- `docs/strategy/ai-model-strategy-and-training-roadmap.md` section 12 – AI curator design.
- `scripts/updates/apply_ai_curator_results.py` – merges curated candidates into `data/ai_video_image_models.csv` and regenerates `data/models.json`.
- `data/ai_curator/README.md` – describes `curated_candidates.jsonl` format.

The missing glue is:

1. A job/script that reads **approved** signals from `data/signals/signals.jsonl`.
2. For each `analysis.type`:
   - `model_release` / `platform_model_add`:
     - Emit raw curator candidates (with base fields filled from `analysis` + any URLs).
   - `new_platform`:
     - Create a stub for competitive docs and/or a PLATFORM_AGGREGATOR candidate.
   - `platform_feature` / `insight` / `workflow_pattern`:
     - Append notes to the relevant strategy docs (UX roadmap, model strategy, workflows).
3. Run the AI curator (external or internal LLM process) to:
   - Normalize, dedupe, fit-score candidates.
   - Output `data/ai_curator/curated_candidates.jsonl` per the schema.
4. Run:
   ```bash
   python scripts/updates/apply_ai_curator_results.py
   ```
   to update the catalog + JSON.

Until that job is in place, `signals.jsonl` is a **reviewed inbox** feeding manual research and future automation.

---

## 4. Automation & Scheduling Options

We host on **Cloudflare**. There are two main ways to schedule these jobs:

### 4.1 Cloudflare Workers / Pages Scheduled Functions

Best for:

- Pure JS/TS tasks that can run inside the Cloudflare runtime.
- Lightweight periodic work (e.g., ping OpenRouter models list, append candidates).

We could:

- Write a Worker that runs daily:
  - Fetches OpenRouter models list and vendor RSS feeds.
  - Writes new “raw candidates” to a KV store or R2 bucket.
  - (Optionally) hits a backend route that triggers an AI curator hosted elsewhere.

### 4.2 GitHub Actions / Traditional Cron

Best for:

- Python scripts that operate on this repo (`scripts/monitoring`, `scripts/updates`, `scripts/utilities`).
- Heavy CSV/JSON work that doesn’t fit neatly into the Workers runtime.

We could:

- Add a nightly GitHub Action that:
  - Checks out the repo.
  - Runs a curator ingest script + `apply_ai_curator_results.py`.
  - Commits updated `data/` back to the repository (if desired) or just publishes artifacts.

**Current state:**  
No scheduled automation is wired up yet. All scripts are triggered manually. This doc clarifies the options so future work can pick the right path.

---

## 5. Showcase / Creator & Brand Videos (Planned)

Signals should also help us capture **inspiring outputs**:

- Creator reels built with tools we cover.
- Brand AI ads (e.g., Nano Banana Pro campaigns, TapNow film pieces).

Plan:

- Extend signals analysis with:
  - `has_video`, `post_url`, `video_type` (`creator_showcase`, `brand_ad`, etc.).
  - `candidate_showcase` (`yes | no | maybe`).
  - `showcase_notes`.
- Build a small `data/showcase.json` derived from **approved showcase signals**, containing:
  - `title`, `creator`, `sourcePlatform`, `postUrl`, `toolsUsed`, `modelsUsed`, `notes`.
- Use `postUrl` for embedding (X, YouTube, etc.) rather than downloading the raw video, at least in v1.

This keeps us aligned with our core mission: not just tracking models, but **showcasing what great directors are doing with them**.

---

## 6. Summary

- `/signals` is our **intake and triage** surface for everything you notice in the wild.
- The **AI analyzer** (via OpenRouter) structures those screenshots into actionable metadata.
- You stay in control: nothing flows into the catalog or docs **until you approve** a signal.
- The AI curator + `apply_ai_curator_results.py` form the bridge from approved signals to **live tool updates**.
- Scheduling (Cloudflare Workers vs GitHub Actions) is still to be wired, but the pipeline is now clear and documented.

