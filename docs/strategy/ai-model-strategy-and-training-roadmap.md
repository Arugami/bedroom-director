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
