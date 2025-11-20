# Scene-Based Prompt Studio – Strategy for Bedroom Director

This document synthesizes the earlier Scene-Based Prompt Studio notes with creator pain‑point research around image→video pipelines, scoped to what we should actually build into the Bedroom Director website.

---

## 1. Product Vision

- Build a **scene-first directing cockpit** where the main object is a shot, not a chat thread.
- Give creators **one place** to define, iterate, and package prompts for both **images and image→video tools**, without losing context across tabs and models.
- Treat the LLM as a **prompt compiler and editor** that operates over structured scene data, not as the “place where work lives.”

---

## 2. Who This Is For

- **Solo creators & small teams** doing TikToks, music videos, UGC ads, short films—people currently juggling ChatGPT, Midjourney, Runway/Kling/Pika, and Notion/Google Docs.
- **Deliverable-oriented creators** (client work, brand campaigns) who care about continuity, shot lists, and approvals, not just cool one-off generations.
- **Experimenters & “bedroom directors”** who want cinematic control without deep technical knowledge of every model’s quirks.

Key constraints from research:

- Tight deadlines; little time to rebuild prompts from scratch for each tool.
- Cognitive overload from **writing many variations**, remembering model syntax, and tracking versions.
- Fragmented pipelines: LLM for ideas → image tool for frames → separate tools for edits → video model for motion → manual compositing.

---

## 3. Core Problems to Solve

From the Scene-Based Prompt Studio notes and pipeline research, the main problems are:

1. **Context Decay & Fragmentation**
   - Long chats lose the relevant context; people copy‑paste partial prompts between tools.
   - Each tool “remembers” different things; the true state of the project is spread across chats, browser tabs, and files.

2. **Cognitive Load of Prompting**
   - Writing 20–80 images per concept is normal; doing this manually is exhausting.
   - Users struggle to systematically explore variations (camera, lighting, style, motion) and keep track of what changed.

3. **Lack of Structured Continuity**
   - Image→video workflows need **consistent characters, locations, and style** across shots.
   - Today this is often done by “vibes” and screenshots, not structured constraints the AI can reuse.

4. **Poor Handoff Between Stages**
   - Ideation → keyframes → animation → editing is a pipeline, but the artifacts are not packaged together.
   - There’s no “prompt pack” that cleanly hands a shot off to Runway/Kling/Pika or an editor.

The Scene-Based Prompt Studio for Bedroom Director should directly attack these four.

---

## 4. Design Principles

- **Scene-first, not chat-first**
  - The primary unit is: **Project → Scene → Shot → Prompt Object → Assets (images/video)**.
  - Chats (“Ask the Director”) operate *on top of* these objects, not as the source of truth.

- **State as Data, Not History**
  - Every shot has a structured schema: brief, environment, subject, camera, motion, lighting, style, text constraints, negatives, references, status, and history.
  - We always send the full current state to the LLM; we never rely on a long backscroll.

- **Low-friction iteration**
  - One-click duplication, variants, and status changes (“explore → refine → locked”).
  - Quick keyboard-friendly flows to add scenes/shots and tweak fields.

- **Model-aware, model-agnostic**
  - Use **model profiles/templates** so users don’t relearn syntax: we encode “how to talk to Kling/Runway/Pika” once.
  - The same scene/shot structure can target multiple models with different template compilers.

- **Explainable prompts**
  - Users can see how slots (subject, camera, motion, etc.) are compiled into a prompt string.
  - The system can propose variations by explicitly changing slots (“same shot, but handheld, shorter focal length, more neon”).

---

## 5. User Journey in Bedroom Director

### 5.1 Project Setup

- User creates a **Project** on Bedroom Director (e.g., “Cubita Truck Launch Spot”, “Music Video – Neon Tunnel”, “UGC Ad – Fitness App”).
- They optionally select:
  - Target **image models** and **video models** from the Bedroom Director catalog.
  - A **visual style profile** (e.g., “cinematic realism”, “anime storyboard”, “product shoot”).

### 5.2 Scene & Shot Breakdown

- Inside a project, the user creates **Scenes** and **Shots**, ideally matching cinematic structure:
  - Scene: “Truck Arrives in Town”
  - Shot 001: “Wide establishing of truck entering main street”
  - Shot 002: “Close-up of logo as truck passes camera”
- Each Shot has structured fields:
  - **Brief** (one-sentence intent)
  - **Environment** (location, time of day, weather)
  - **Subject** (characters, props, product)
  - **Camera** (lens, angle, movement, framing)
  - **Motion** (for video: speed, direction, camera vs subject movement)
  - **Lighting**
  - **Style** (reference artists, film looks, texture)
  - **Text constraints** (logos, URL, brand words)
  - **Negative constraints** (things to avoid)
  - **References** (uploaded or linked stills/frames)

### 5.3 “Ask the Director” Prompt Compilation

- User can click **“Ask the Director”** or type into a bottom dock:
  - Example: “Make this scene more cyberpunk and faster-paced, but keep the truck and brand text identical.”
- The LLM:
  - Reads the current Project + Scene + Shot state.
  - Proposes updates to the **structured slots** (e.g., change lighting and style, keep subject and text constraints locked).
  - Compiles a **model-specific prompt** using the selected template (e.g., “Kling_v1_storyboard”, “Runway_gen2_cinematic”).
- The user can:
  - Accept suggested changes wholesale.
  - Or inspect a diff: slot-by-slot changes highlighted.

### 5.4 Image Exploration & Selection

- For image stages (keyframes, storyboards, style frames):
  - Tool sends compiled prompt to the chosen **image model** (or simply outputs it for copy‑paste if we are not integrating APIs yet).
  - User generates multiple variants and marks:
    - **Winner** frame for continuity.
    - **Maybe** frames.
  - The tool stores **history**: prompt text, seed (if available), model version, chosen flags, and thumbnail.
- The winning frames become **canonical reference images** for the corresponding shot.

### 5.5 Video Handoff & Continuity

- When user is ready for video:
  - They mark a Shot as **“Ready for Video”**.
  - The tool assembles a **Video Prompt Pack**:
    - Compiled video prompt (with motion description).
    - Reference image(s) and seeds.
    - Negative constraints.
    - Duration, resolution, aspect ratio.
    - Any model-specific switches (e.g., “camera follow,” “smooth motion,” “loopable clip”).
  - Initially, this may be presented as a **structured export**:
    - Copyable prompt text tailored to a specific video model.
    - Downloadable JSON/markdown bundle.
  - Later, we can integrate **direct API calls** to supported video models.

### 5.6 Review, Feedback, and Locking

- Users can:
  - Leave **notes** on shots (“client hates the green, keep framing but change palette”).
  - Flip status per shot: `explore → refine → client_review → locked`.
  - Track which video version is approved, with links or thumbnails.

---

## 6. Feature Milestones

### 6.1 MVP (v1) – “Scene Board”

Goal: ship a **lightweight, opinionated scene workspace** inside the Bedroom Director website.

- Project/Scene/Shot structure with drag‑and‑drop reordering.
- Structured fields for a Shot:
  - brief, environment, subject, camera, lighting, style, notes, status.
- Manual **prompt compilation**:
  - LLM side panel (“Ask the Director”) that reads the structured fields and spits out a single prompt string.
  - Users copy that prompt into their image/video tools.
- Basic **history log** for a Shot:
  - Stored prompt strings + user notes (“v2: changed from day to night”).
- No image or video integration required yet; images can be added as URLs or uploads purely for visual context.

### 6.2 v2 – “Image & Prompt Packs”

Add the minimal workflow to support **image→video pipelines** without owning the heavy lifting:

- Ability to **attach keyframes** to shots (upload image thumbnails or paste links).
- Model Profiles:
  - At least 2–3 prompt templates for popular tools (e.g., “Runway Gen-3 image→video”, “Kling cinematic keyframe”, “Pika stylized”).
- Prompt Pack export:
  - One-click export per shot: prompt + constraints + image URLs as markdown/JSON + copy‑ready text instructions.
- Simple **continuity helpers**:
  - “Make this shot match Scene 1’s style and character.”
  - The LLM uses the earlier scenes’ slots as context and proposes changes that preserve identity/style.

### 6.3 v3 – “Connected Pipelines”

Once the MVPs are validated:

- Optional OAuth/API integration with select tools, so:
  - Bedroom Director can send prompt packs directly to the video model.
  - We can fetch back thumbnails or job status.
- Timeline view:
  - See shots laid out on a timeline with statuses and thumbnails.
- Collaboration:
  - Comments per shot, simple mentions, shareable read-only views for clients.

---

## 7. Conceptual Data Model

We don’t need to lock in implementation details yet, but concepts should be clear:

- **Project**
  - `id`, `name`, `description`, `created_at`, `owner`, `target_models[]`, `style_profile_id`.

- **Scene**
  - `id`, `project_id`, `order`, `name`, `beat_description`.

- **Shot**
  - `id`, `scene_id`, `order`, `status`, and structured slots:
    - `brief`, `environment`, `subject`, `camera`, `motion`, `lighting`, `style`, `text_constraints[]`, `negatives[]`.
    - `references[]` (images or URLs).
  - `history[]` of:
    - `timestamp`, `prompt_text`, `model_id`, `seed`, `notes`, `asset_ids[]`.

- **ModelProfile**
  - `id`, `model_name`, `provider`, `capabilities` (`image`, `image_to_video`, etc.).
  - `system_rules[]`, `format_string`, `default_negatives[]`.

- **Asset**
  - `id`, `shot_id`, `type` (`image`, `video`), `url`, `thumbnail_url`, `source_model_id`, `metadata`.

Bedroom Director’s existing model catalog can map directly into `ModelProfile` records and enrich them (pricing, strengths, constraints).

---

## 8. Integration into Bedroom Director Website

- **Navigation & Positioning**
  - Add a “Scene Studio” or “Prompt Studio” section as a primary app entry in the Bedroom Director UI.
  - Model detail pages get a **“Open in Scene Studio”** button that:
    - Creates a new Project seeded with that model as default.
    - Or opens an existing Project with that model pre-selected for new shots.

- **Leveraging the Model Catalog**
  - The shot editor can use Bedroom Director’s existing **model metadata**:
    - Filter to models that support image→video.
    - Show recommended resolution, maximum clip length, known quirks.
  - When a user chooses a model, we plug in the right **ModelProfile** and format.

- **Content & Education**
  - Tutorials and guides on the site can deep-link into pre-built Projects:
    - “Cyberpunk Alley Tutorial” → opens a project with scenes/shots and starter prompts.
  - This turns educational content into **live workspaces**, not static blog posts.

---

## 9. Hypotheses & Validation

We should treat the first release as an experiment and validate:

- **H1 – Scene structure reduces overwhelm**
  - Users report less confusion versus using raw chats and notes; they can find and reuse prompts faster.

- **H2 – Prompt Packs speed up pipelines**
  - Time from idea → acceptable video clip decreases, especially for multi-shot projects.

- **H3 – Continuity helpers matter**
  - Creators find it significantly easier to keep characters/locations consistent across shots.

Metrics to track (once wired):

- Projects created per user; scenes/shots per project.
- Reuse of prompts across models (how often a shot’s prompt feeds both image and video tools).
- Time between first shot and first exported prompt pack.

---

## 10. Non-Goals for Now

- We are **not** trying to replace full NLEs (Premiere, Resolve) or heavy compositing tools; this is about **prompt and scene orchestration**, not frame-accurate editing.
- We are **not** building our own image/video models; we focus on model selection, prompting, and pipeline UX.
- We will avoid complex, multi-user project management until the single‑director workflow is proven valuable.

If we execute on this scope, Bedroom Director becomes the place where AI film projects actually “live”: a structured scene board that sits above the chaos of individual tools, and a practical bridge between inspiration, keyframes, and final motion.

