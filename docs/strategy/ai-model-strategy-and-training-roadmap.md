# AI Model Strategy & Training Roadmap – Bedroom Director

> **Role:** Long-term AI usage, training, and architecture strategy for Bedroom Director. Describes how we use models (schemas, Prompt Compiler, retrieval, fine-tuning), independent of specific model IDs.  
> **Canonical model choices:** `docs/strategy/bedroom-director-model-recommendations.md`  
> **Pricing tiers & subscriptions:** `docs/strategy/bedroom-director-pricing-tiers.md`  
> **Raw per-model research:** `research/models/openrouter-model-research-bedroom-director.md`

**Date:** November 20, 2025  
**Owner:** AI Engineering  
**Purpose:** Source of truth for how Bedroom Director turns commodity models into a proprietary, cinematic directing system.

This doc is about **how** we use models, not which specific model IDs we pick. For concrete model choices and pricing, see:

- `research/models/openrouter-model-research-bedroom-director.md`
- `docs/strategy/bedroom-director-model-recommendations.md`
- `docs/strategy/bedroom-director-pricing-tiers.md`

---

## 1. Core Principle – Schema as the Source of Truth

Bedroom Director already has strong structured data:

- **Tool catalog:** CSV/JSON in `data/`, surfaced as `models.json`.
- **Scene graph:** `SceneProject`, `Scene`, `PromptSlots`, `GlobalStyle`, `ProjectBible`, etc. (see `scene-canvas-docs/scene-canvas-implementation-spec.md`).

Guiding principle:

- Treat these schemas as the **“model of record”**.
- LLMs **compile into** these structures instead of improvising free-form text.

Implications:

- Director Chat and Vision APIs should primarily:
  - Propose **updates to structured objects** (`ProjectBible`, `Scene[]`, `PromptSlots`).
  - Use tool calls / structured outputs wherever possible.
- Storage (localStorage now, Supabase later) holds the canonical state of:
  - Projects, scenes, bible, style, and prompt slots.
  - LLMs operate as stateless compilers on top of that state.

This gives us persistence, determinism, and clear upgrade paths regardless of which base model we use.

---

## 2. Prompt Compiler – Model-Specific Prompt Generation

Goal: Build a **Prompt Compiler** that turns Bedroom Director’s scene structures into model-specific prompts for external tools.

Inputs:

- `PromptSlots` (subject, camera, lighting, style, advanced settings).
- `GlobalStyle` (palette, influences, era, aesthetic).
- `ProjectBible` (characters, locations, aesthetic, visual assets).

Outputs:

- Concrete prompts ready for:
  - Video models (Sora, Veo, Gen-4, Kling, etc.).
  - Image models (Midjourney, Flux, SD3.5, etc.).
  - Post-processing and voice tools as needed.

Strategy:

- Define a small **intermediate language (IL)**:
  - Slots like: `camera_angle`, `camera_movement`, `lighting_mood`, `color_palette`, `character_ref`, `shot_type`, `duration`, `aspect_ratio`, `motion_strength`.
- For each external tool/model:
  - Maintain a **prompt template** mapping IL → that tool’s best-practice syntax.
  - Encode negatives, seeds, aspect ratios, and quirks per tool.
- Use LLMs for:
  - Filling missing slots (e.g. infer camera from previous scene).
  - Translating loose user language (“more kinetic”, “trailer cut”) into slot deltas.

This compiler becomes proprietary infrastructure that is hard to copy and improves steadily as we learn real world patterns.

---

## 3. Proprietary Training – “Director Data” as a Moat

Over time we will accumulate:

- Projects and scenes (including which ones are **locked**).
- Final prompts used per scene & per tool.
- Which suggestions users **accepted vs edited**.
- Which tool/model choices succeeded for specific goals.

We can use this data to train or fine-tune models that reflect **our** taste and user behavior.

### 3.1 Supervised Fine-Tuning (SFT)

Examples:

- Input: (ProjectBible, GlobalStyle, recent chat, existing scenes)  
  Output: `Scene[]` outline JSON  
  → Teacher: best outputs from frontier models (GPT‑5.1 / Claude 4.5 / Gemini 3 Pro).

- Input: (Scene, PromptSlots, ProjectBible)  
  Output: Compiled model-specific prompt(s) for a chosen tool  
  → Teacher: current Prompt Compiler + curated examples.

Use-cases:

- Train a mid-tier model (e.g., Gemini Flash, Kimi K2, Llama 3.1) to perform **Scene Canvas operations** within our schema.

### 3.2 Preference Learning & Ranking

Signals:

- Accept vs edit of outlines and suggestions.
- Scenes that get “locked” vs discarded.
- Tools/prompts that lead to finished projects.

Approach:

- Build pairwise preference data (A vs B) for scenes, outlines, and prompts.
- Train a **small ranking model** (or fine-tune a base model) to prefer structures and prompts that historically worked for creators.

Outcome:

- A “Bedroom Director Scene Model” that encodes learned taste and workflow, not just generic LLM behavior.

---

## 4. Retrieval – Using Our Own Knowledge Base

We have two primary knowledge sources:

1. **Tool Catalog**
   - Models, pricing, capabilities, platform access (see `docs/core/02-enhanced-schema.md`).
2. **Project & Prompt History**
   - Anonymized scenes, prompts, and project bibles that led to successful outputs.

We should build a **retrieval layer** on top of these:

- Train or choose embeddings tuned for:
  - AI creative tools & pricing.
  - Cinematic scenes, structure, and “director language”.
- For Director Chat:
  - Retrieve similar tools, tradeoffs, and pricing.
  - Retrieve similar past projects/scenes/prompts.
  - Feed them into the LLM as grounded context.
- For Scene Canvas:
  - Retrieve “closest matching” project templates and scenes for a new project.

This makes recommendations feel specific and grounded, and makes our growing corpus a defensible asset.

---

## 5. Director Styles & Profiles

We want Bedroom Director to feel like a **style-aware** directing OS.

Concept:

- Every finished project can be distilled into a **Director Style vector**:
  - Derived from: ProjectBible, GlobalStyle, Scene sequence, PromptSlots, and outputs.
- Let users:
  - Save these as named **Director Profiles** (“Neo-Noir Product”, “Retro Anime Commercial”, “Jobs/Chiat Hybrid”).
  - Apply them to new projects as starting points.

Implementation ideas:

- Compute an embedding over:
  - Key bible fields (characters, locations, influences).
  - GlobalStyle + scene-level camera/lighting/style distributions.
- Train a small model or projection layer that:
  - Maps high-level labels (“Jobs voice”, “W+K”, “Film school noir”) to slot biases.
  - Helps propose PromptSlots and copy consistent with that style.

Result:

- A reusable, composable style layer that sits on top of commodity models but feels uniquely “Bedroom Director”.

---

## 6. Teacher–Worker Model Pattern

We can keep costs manageable while still benefitting from frontier models by using a **teacher/worker** setup.

Pattern:

- Use **frontier models** (GPT‑5.1, Claude 4.5, Gemini 3 Pro) as **teachers**:
  - For offline/batch generation of:
    - Gold-standard outlines for sample projects.
    - Ideal bible updates and prompt slots.
    - High-quality prompt compilation examples.
- Fine-tune or prompt-engineer **smaller/cheaper models**:
  - Gemini 2.5 Flash/Flash Lite, Llama 3.1, Kimi K2.
- At runtime:
  - Small models handle 80–90% of calls.
  - Teachers are used sparingly for:
    - Very complex projects.
    - Explicit “Boost quality” actions.
    - Background upgrades of templates and case studies.

This gives us frontier quality where it matters, and a sustainable cost base for everyday use.

---

## 7. Evaluation & Feedback Loop

To make all of this robust, we need continuous evaluation:

- **Logging:**
  - Which suggestions users accept/edit/discard.
  - How often users lock scenes vs regenerate.
  - Latency and cost per request by model and route.
- **Offline evals:**
  - Run the same project context through different stacks (Starter vs Pro vs Premium).
  - Compare:
    - Outline coherence.
    - Number of manual edits.
    - User feedback (thumbs up/down, or proxy metrics like “time to lock scene”).
- **A/B tests:**
  - For model swaps on `/chat`, `/structure`, `/vision` inside each tier.

This lets us justify model changes and training investments with data, not gut feel.

---

## 8. Productized Capabilities (User-Facing Names)

Internally, we juggle schemas, models, embeddings, and fine-tunes. Externally, users should see named capabilities:

- **Director Memory** – Persistent project bible + style that survives across tools and sessions.
- **Reel Compiler** – One action that turns chat + references into a structured Reel Wall + prompts for chosen tools.
- **Visual Bible** – Drag-and-drop visual references that are analyzed into mood, palette, tags, and prompt-ready phrasing.
- **Studio Styles** – Saved director profiles that bundle style, tool preferences, and prompt behavior.

These features are where our model strategy becomes “magic” for users and a moat for Bedroom Director.

---

## 9. Next Steps (Engineering Tasks)

Short-term, high-impact tasks:

1. **Lock in schemas as API contracts** for `/chat`, `/structure`, `/vision`:
   - Ensure all routes accept/emit structured types (`ProjectBible`, `Scene[]`, etc.).
2. **Build v1 Prompt Compiler**:
   - Hard-code templates for 3–5 key tools using `PromptSlots` + `GlobalStyle`.
3. **Add basic retrieval**:
   - Use existing tool catalog + project templates; start with off-the-shelf embeddings.
4. **Log accept/edit/lock events**:
   - Store in Supabase for future training and evaluation.

Medium-term:

5. Run a **teacher–worker experiment**:
   - Use a frontier model to generate ideal outlines for a small set of projects.
   - Train or prompt-tune a cheaper model to match within our schema.
6. Prototype **Director Profiles**:
   - Allow users to save and reapply a project’s style to new projects.

This roadmap should evolve as we learn from real creator behavior, but it anchors how we turn OpenRouter models into a proprietary Bedroom Director directing engine.

---

## 10. v2 Runtime Stack & Tier Strategy (Working Draft)

This section captures a concrete **v2 launch combo** and tier strategy, so we have a default stack to implement against. Final per-model choices and prices still live in:

- `docs/strategy/bedroom-director-model-recommendations.md`
- `docs/strategy/bedroom-director-pricing-tiers.md`

### 10.1 v2 Model Stack (Best-Guess Launch Configuration)

For the first Scene Canvas production release, we assume a **Gemini-centric value stack**:

- **Director Chat (primary UX)**
  - Runtime model: `google/gemini-2.5-flash`
  - Rationale: 1M context, strong reasoning, good tool use, reasonable cost vs frontier.

- **Structure / Outline (high-volume, background)**
  - Runtime model: `google/gemini-2.5-flash-lite`
  - Rationale: Cheaper than `openai/gpt-4o-mini` with 1M context, ideal for frequent JSON generation.

- **Vision / Visual Bible**
  - Runtime model: `google/gemini-2.5-flash`
  - Rationale: Good multimodal reasoning and descriptions, 1M context, simpler to keep Chat + Vision on the same workhorse.

Implementation notes:

- All three routes (`/chat`, `/structure`, `/vision`) should read their model IDs from a **single config object**, not hard-coded strings, so we can pivot stacks per tier or per A/B test without rewriting logic.
- `/structure` in particular should be tuned for **fast, cheap JSON** using Flash Lite, since it will see the highest call volume.

### 10.2 Tier Shape & Usage Caps (Experience vs Profitability)

To balance **user experience** with **cost control**, we assume:

- **Free Tier (loss leader)**
  - Model stack: free/cheap models (e.g., Grok + `gpt-oss-20b` + `openai/gpt-4o-mini`) as defined in the pricing document.
  - Hard limits (example working numbers):
    - ~0.5M tokens/month total across all APIs.
    - ~50 images/month.
    - 3 projects, 20 scenes.
  - Goal: let creators feel Scene Canvas and Director Chat without running full productions.

- **Pro Tier (single paid plan at launch)**
  - Under the hood: the **Gemini Flash / Flash Lite stack** above.
  - Price target: on the order of **$19/month** for early v2.
  - Included quota (working numbers to refine once we see telemetry):
    - ~2M tokens/month across Chat + Structure + Vision.
    - ~200 images/month.
  - Overages (rough shape, not final pricing):
    - Additional blocks of ~1M tokens billed separately.
    - Additional blocks of ~500 images billed separately.
  - Principle: "good experience by default" with a **clear ceiling**, so heavy usage is handled by overages, not silent subsidy.

These caps are intentionally conservative; we should revisit them once we have real usage data. The important part for v2 is that:

- The codebase is wired to **read token/image quotas per tier** from config.
- We can **track usage per project/user** and enforce soft or hard limits.

### 10.3 Why This v2 Stack is Pivot-Friendly

- All runtime logic flows through:
  - Our **schemas** (`SceneProject`, `Scene`, `ProjectBible`, `PromptSlots`, etc.).
  - The **Prompt Compiler** for external model prompts.
  - A small, typed **model/tier config**.
- Swapping `google/gemini-2.5-flash` for `openai/gpt-4o-mini`, `anthropic/claude-sonnet-4.5`, or `meta/llama-3.1-8b` later becomes:
  - Update config + prompt templates.
  - Optionally adjust caps/overages in pricing.

This keeps the **Scene Canvas experience stable** while we iterate on provider, cost structure, and tier offerings behind the scenes.

---

## 11. Emerging Multi-Frame & Storyboard Workflows (Nano Banana Pro Case Study)

> These notes capture *patterns* we are seeing in the wild with Nano Banana Pro and related tools. The goal is to turn them into reusable Scene Canvas workflows and prompt-compiler capabilities, not to lock ourselves to a single model ID.

### 11.1 What Creators Are Actually Doing

From November 2025 field research (Twitter/X threads, Higgsfield / Flow by Google demos):

- **Character Bible Pass**
  - Prompt Nano Banana Pro to generate **character sheets** (turnarounds + expression grids) for key characters.
  - Store them as persistent references in Flow/Higgsfield and reuse them across scenes.
  - These sheets effectively *are* the visual character bible.

- **Split Stack – Shot Coverage in One Generation**
  - In a 9:16 or grid layout, ask the model to produce **4–12 stacked frames** of a *single* environment with consistent characters.
  - Each frame = different coverage of the same beat (wide, medium, close-up, over-shoulder, insert).
  - Creators report **4-up** is the sweet spot for quality vs variety.

- **Extraction + Variant Pass**
  - After generating a stacked frame, flip back to landscape and ask the tool to **extract a specific frame** as its own image.
  - While extracting, creators *also* prompt for changes per frame (expression shift, weather change, added effects) without re-uploading the reference.

- **Time Stack – Micro-Timeline Around a Moment**
  - Starting from a “hero” frame, prompt:  
    > “What does this scene look like 300ms before, 100ms after, 1 second later?”
  - Nano Banana Pro returns multiple frames of the *same* moment at different times → effectively a **micro story beat**.

- **Storyboard / Comic Page Generation**
  - Given a reference image + text, creators ask NB Pro (sometimes in combination with Firefly Boards) to:
    - Analyze the image.
    - Generate a **timeline of events before/after** the moment.
    - Lay those events out as comic panels or storyboard frames.

- **Layout & Typography Strength**
  - NB Pro is being used for:
    - Glossy magazine spreads (long text + images + layout).
    - Infographics, menus, wedding invites, logo grids.
    - Comic strips with text balloons.
  - This is more like having a **layout/graphics department** than a pure image model.

- **High-Consistency Ensemble Shots**
  - Demonstrated ability to keep **up to ~14 characters** consistent in a single ensemble image.
  - Great for “cast posters” or group shots derived from existing reference sheets.

- **Downstream Audio/Video Stack**
  - Visuals often flow into:
    - Veo 3.x (or similar) for shot-based animation.
    - Epidemic Sound / music tools for score & sound design.
    - ElevenLabs or similar for voice passes.
  - The workflow is **pipeline-based**, not a single “generate my film” button.

### 11.2 How We Should Package This in Scene Canvas

We should treat these as **named workflows** that Scene Canvas can scaffold:

1. **Character Sheet → Visual Bible Workflow**
   - In Scene Canvas:
     - “Generate Character Sheet” action from a text description.
     - Call Prompt Compiler → image model (e.g., NB Pro) to make a 4–8 pose sheet.
     - Auto-ingest outputs into `ProjectBible.visualAssets` under a `character_sheet` category.
   - Downstream:
     - Prompt Compiler reuses those sheets as **visual refs** whenever that character is mentioned in later scenes.

2. **Shot Stack (Split Stack) Workflow**
   - In Scene Canvas:
     - For a selected scene, “Generate Shot Stack (x4)” button.
     - Prompt Compiler asks the image model for **four frames of the same beat** with explicit coverage labels.
     - We then:
       - Slice the stacked output into four images.
       - Attach them either as:
         - Four candidate shots under one Scene, or
         - Four micro-scenes under a “Beat” container.
   - UX:
     - A mini strip UI to pick which frames become canonical shots vs alternates.

3. **Time Stack Workflow**
   - For any hero frame in the Visual Bible or a Scene:
     - “Explore Beat Over Time” → Prompt Compiler asks for frames at t-Δ, t0, t+Δ, t+2Δ.
   - We map returned frames to a **micro-timeline** under that Scene:
     - Could inform animation later (Veo prompt seeds).
     - Gives directors a clear sense of how the moment evolves.

4. **Storyboard / Comic Page from Still or Logline**
   - Entry points:
     - “Storyboard from Photo” — analyze an uploaded still (childhood photo, key frame).
     - “Storyboard from Logline” — text-only brief.
   - LLM + image model combo:
     - LLM proposes a timeline of events / beats.
     - Prompt Compiler generates **panel images** or rough boards with NB Pro.
   - We ingest:
     - Panels into a new `Storyboard` view mapped directly onto Scene Canvas scenes.
     - Text captions into `Scene.description` or per-shot notes.

5. **Key Art / Poster & Layout Pass**
   - From an existing project:
     - “Generate Poster / One-Sheet / Launch Graphic” actions.
   - Prompt Compiler:
     - Uses project title, logline, and a few key frames as references.
     - Targets a **layout-heavy prompt** (magazine spread, poster, thumbnail strip) for NB Pro.
   - This becomes a “Marketing Assets” tab linked to each project.

### 11.3 Implications for Prompt Compiler, Schema, and Training

To support these workflows cleanly we should:

- **Extend the intermediate language (IL):**
  - Add slots like:
    - `frame_index`, `frame_count`
    - `time_offset_ms`
    - `panel_layout` (grid, 4-up vertical, 3×3, etc.)
    - `coverage_type` (wide, medium, close-up, insert, over-shoulder)
    - `typography_brief` (headline, body copy density, brand tone)
  - These map directly onto NB Pro-style prompts but stay model-agnostic.

- **Extend Scene/Project schema where needed:**
  - Optionally introduce:
    - `Shot` or `Beat` entities nested under `Scene`.
    - `StoryboardPanel` linked to either a Scene or a Beat.
    - A `marketingAssets` collection under `SceneProject` for posters/graphics.

- **Log workflows for future training:**
  - Store:
    - The IL → prompt → output chain for Shot Stacks, Time Stacks, and Storyboards.
    - Which frames users keep, delete, or promote to “canonical”.
  - Later:
    - Use these traces as teacher data for SFT:
      - “Given (Scene, Bible, frame) → propose a 4-frame Shot Stack.”
      - “Given a key frame → propose time offsets & descriptions.”

- **Operational TODO:**  
  - Keep `data/models.json` and `ai_video_image_models.csv` updated with Nano Banana Pro and related releases (including new multi-frame / layout capabilities), then re-run:
    - `python scripts/utilities/sync_to_json.py`
  - This ensures the Tool Catalog and Prompt Compiler stay aligned with the latest model options.

These workflows are where commodity models start to feel like **cinematography departments**. Scene Canvas should treat “Split Stack”, “Time Stack”, and “Storyboard from Still” as first-class features, not just clever prompt recipes living on social media.

### 11.4 Additional Out-of-the-Box Opportunities

Beyond the explicit Split/Time/Storyboard flows, Nano Banana–style models open up several more speculative but high-leverage features:

1. **Shot Grammar Presets (“Lenses”)**
   - Concept:
     - Turn Shot Stack configurations into reusable **shot grammars** (e.g., “Spielberg Wonder”, “Horror Reveal”, “Slow Push-In”).
   - Implementation sketch:
     - Each preset defines:
       - Coverage pattern (wide → medium → close-up → insert).
       - Approximate framing / lens feel (35mm, 85mm portrait, etc.).
       - Optional mood/lighting tags.
     - Directors apply a preset to any beat; Prompt Compiler fills IL slots and calls the image model to generate a matched stack.
   - Long-term:
     - Learn which grammars users favor by genre and recommend “house styles” per project.

2. **Emotional Beat Explorer**
   - Concept:
     - Use Time Stack + LLM analysis to map each beat to an **emotion curve** over a few frames.
   - Implementation sketch:
     - For a key frame:
       - Generate a Time Stack (t-Δ, t0, t+Δ, t+2Δ).
       - Ask LLM/vision model to rate each frame along axes (tension, intimacy, threat, wonder).
     - UI:
       - A small scrubber below the Scene showing both frames and emotion values.
   - Benefit:
     - Gives directors a quick visual of how tension rises/falls around key moments without needing full animation.

3. **Continuity Guardian**
   - Concept:
     - Use NB Pro-level perception to run **continuity checks** across the Visual Bible and scenes.
   - Implementation sketch:
     - Periodically batch scenes through a vision model:
       - Detect wardrobe, props, key features for each character/location.
       - Flag inconsistencies (missing backpack, wrong jacket color, hair length, etc.).
     - Present as:
       - A “Continuity” panel in Scene Canvas with inline fix suggestions (e.g., “Regenerate with rain jacket on”).
   - Training angle:
     - Use human resolutions of continuity warnings as training data for stricter, more film-aware checks.

4. **Layout Modes: Story / Board / Poster**
   - Concept:
     - Any scene or project can be “rendered” in alternate layout modes—Storyboard grid, Comic page, Poster, Thumbnail strip—without re-prompting.
   - Implementation sketch:
     - Prompt Compiler interprets the same IL and Scene data through:
       - `layout_mode: "storyboard" | "comic" | "poster" | "thumbnail_strip"`.
     - NB Pro (or equivalent) handles graphic design + typography.
   - UX:
     - Toggle modes in a “Layout” dropdown; Scene Canvas updates the representation while underlying beats/scenes stay the same.

5. **Beat Packs from a Single Still**
   - Concept:
     - Drop any reference still (film frame, photo, concept art) and auto-generate three artifacts:
       - A **Before/After Beat Pack** (Time Stack).
       - A **Coverage Pack** (Split Stack).
       - A short **Storyboard Strip** (3–6 mini-beats).
   - Implementation sketch:
     - Entry: “Explode This Frame” action on any asset.
     - LLM decides which flows to apply (time vs coverage vs both) and maps outputs directly into new Scenes/Beats.

6. **Multi-Character Blocking Assistant**
   - Concept:
     - Use high-consistency ensemble capability (e.g., 14 characters) to auto-generate **blocking diagrams** for ensemble scenes.
   - Implementation sketch:
     - From a textual beat describing a group:
       - Generate top-down blocking diagrams (floor plan style).
       - Generate 2–3 key frames matching that blocking.
     - Attach these to Scenes as “Blocking Notes” that later inform animation prompts (Veo, Runway, etc.).

7. **Director’s Graphics Kit**
   - Concept:
     - With almost no extra work, produce a **marketing kit** for each project using NB Pro’s layout strength.
   - Implementation sketch:
     - One click: “Generate Graphics Kit”.
     - Uses title, logline, key scenes, character sheets:
       - Poster / one-sheet.
       - Social thumbnails (YouTube, TikTok).
       - Title cards and lower thirds.
     - Assets saved under `marketingAssets` and exposed in a dedicated tab.

8. **“What If?” Variant Reel**
   - Concept:
     - For any canonical shot, offer a **variant reel** of different style/era/mood interpretations.
   - Implementation sketch:
     - Prompt Compiler holds a library of style deltas (“1980s VHS”, “Noir”, “Studio Sitcom”, “Anime TV”).
     - Apply them to the IL for that shot to generate alternatives.
   - UX:
     - Side-by-side slider or grid; directors can pin favorites or spin another variant batch.

9. **Story Health Check**
   - Concept:
     - Combine scene text + boards to evaluate **coverage health** across the project.
   - Implementation sketch:
     - LLM + vision model scan the whole project:
       - Identify missing coverage (no close-ups of antagonist, no establishing shot of key location, no reaction shot after big event).
       - Suggest new shots or scenes.
     - Present as a “Story Health” report with actionable suggestions.

10. **Creator Recipe Marketplace (Longer-Term)**
  - Concept:
    - Let advanced users save entire NB Pro workflows (IL + prompt templates + sequence) as **recipes** that others can apply.
  - Implementation sketch:
    - A Recipe = metadata + Prompt Compiler config + minimal UI description.
    - Directors can:
      - Apply recipes to their Scenes.
      - Fork and customize them.
  - Strategic upside:
    - Moves Bedroom Director toward a “workflow platform” where the community co-invents new cinematic patterns on top of commodity models.

---

## 12. Automatic Model & Tool Updates – AI Curator

> Goal: Keep the Tool Catalog and model stack **fresh, de‑duplicated, and on‑brand** without requiring manual updates for every new model release.

### 12.1 High-Level Flow

1. **Ingest**
   - On a schedule (daily/weekly), pull *candidate* tools/models from:
     - Aggregator APIs (e.g., OpenRouter, Fal, Replicate).
     - Direct vendor APIs where available.
     - Light web scrapes of trusted vendor/model pages.
   - Store raw results in a `candidates` bucket (JSON), separate from our canonical CSV/JSON.

2. **Normalize (AI Normalizer)**
   - An LLM transforms raw provider data into our internal schema:
     - `name`, `vendor`, `category`, `modality`, `pricing`, `context_window`, `api_available`, `best_for`, `limitations`, `notable_sources`, etc.
   - Outputs a `normalized` object plus extraction confidence scores.

3. **De‑duplicate (AI Deduper)**
   - Use embeddings + a small LLM pass to compare the candidate to existing tools:
     - If strongly similar → mark as `duplicate_of` or `platform_wrapper_of` another entry.
     - If clearly distinct → `distinct`.
   - This prevents us from adding noise (white‑label copies, trivial wrappers) as new tools.

4. **Fit Scoring (AI Fit Scorer)**
   - A second model evaluates whether the tool **belongs in Bedroom Director** based on a short scope brief:
     - Prioritize film, video, image, audio, and storytelling tools.
     - De‑prioritize generic productivity SaaS, infra not relevant to directors, scammy offerings.
   - Output:
     - `fit_score` (0–1), `recommended_bd_category`, and a short natural‑language explanation.

5. **Decision**
   - Simple rules turn the curator’s output into an automated decision:
     - `fit_score >= 0.8` and `dedupe_status == "distinct"` → **accept** into main catalog.
     - `0.5–0.8` and distinct → mark as **experimental** (shows in “Lab” views, not core catalog).
     - else → **reject** but keep a record for audit.

6. **Apply**
   - For accepted/experimental tools:
     - Append or update row in `data/ai_video_image_models.csv`.
     - Set provenance fields (`source`, `fit_score`, `dedupe_status`, `last_checked_at`).
     - Re-run `scripts/utilities/sync_to_json.py` to refresh `models.json`.
   - For Scene Canvas / Tool Catalog:
     - Use `last_updated_at` to power “New this week” and “Recently updated” rails.
     - Surface subtle “Auto‑indexed from X days ago” hints in the UI.

7. **Periodic Human Audit (Optional)**
   - Humans don’t gate each update, but can periodically:
     - Review low‑confidence `experimental` tools.
     - Spot‑check rejections that appear in a lot of external chatter.

### 12.2 AI Curator Output Schema (Implementation Sketch)

The curator can operate against a simple, explicit schema so we can swap models or hosts later without code churn:

```jsonc
{
  "candidate_id": "openrouter:google_nano-banana-pro",
  "raw_source": {
    "provider": "openrouter",
    "fetched_at": "2025-11-20T18:32:00Z",
    "payload": { /* raw API response */ }
  },
  "normalized": {
    "name": "Nano Banana Pro",
    "vendor": "Google DeepMind",
    "modality": "IMAGE_GEN",
    "category": "IMAGE_GEN",
    "short_description": "High-consistency character & layout model...",
    "best_for": "Character sheets, split stacks, layout-heavy frames",
    "limitations": "Detail loss at >4-way splits, sensitive to typography...",
    "pricing": {
      "unit": "per_1k_tokens_or_equiv",
      "approx_usd": 0.30
    },
    "api_available": true,
    "context_window": 1048576,
    "notable_sources": [
      "developers.googleblog.com/...",
      "ai.google.dev/gemini-api/..."
    ]
  },
  "dedupe": {
    "status": "distinct",          // "duplicate", "platform_wrapper", "distinct"
    "duplicate_of": null,
    "similarity_score": 0.21
  },
  "fit": {
    "fit_score": 0.93,
    "recommended_bd_category": "IMAGE_GEN",
    "reason": "High-quality visual model explicitly positioned for cinematic, storyboard, and layout use cases. Directly useful to directors and storyboard artists."
  },
  "decision": {
    "action": "accept",            // "accept", "experimental", "reject"
    "reason": "Distinct model aligned with cinematic workflows; strong fit score and no close duplicate."
  }
}
```

### 12.3 UX Touchpoints for “Freshness”

To make this pipeline visible and valuable to directors (without overwhelming them):

- **Tool Catalog**
  - “New this week” and “Recently updated pricing” rails driven from `last_updated_at`.
  - Small “Auto‑curated from [source] · [N] days ago” line in the tool detail view.
  - Ability to filter by `experimental` to explore the bleeding edge.

- **Scene Canvas**
  - When opening a workflow that references deprecated or renamed models:
    - Show a non-blocking banner suggesting an updated stack (e.g., “Kling 2.1 is now Kling 2.5 – update workflow?”).

- **Internal Ops / Strategy**
  - Dashboard listing:
    - New accepted tools this month.
    - Top rejected tools (by external buzz).
    - Coverage gaps (e.g., “We have no tools tagged for live multi‑cam switching,” etc.).

This AI Curator layer lets Bedroom Director keep pace with a chaotic model landscape while preserving our **taste, focus, and schema quality**—and without burying you in manual CSV edits.
