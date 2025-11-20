# Scene-Based Prompt Studio: Strategic Analysis for Bedroom Director

**Document Purpose:** Synthesize multiple AI perspectives, creator research, and architectural approaches to recommend a strategic implementation path for a Scene-Based Prompt Studio tool within Bedroom Director.

**Status:** Strategic Planning Document
**Date:** 2025-11-18
**Context:** Bedroom Director is a discovery/education platform for AI creative tools, not a generator. This tool should align with that mission.

---

## Executive Summary

### The Core Problem
AI creators working in image-to-video pipelines face three catastrophic failure modes:
1. **Context decay** - Losing creative direction across multiple chat sessions
2. **Cognitive overload** - Juggling 6-10 tools with manual copy-paste between them
3. **Consistency collapse** - Characters, styles, and continuity breaking between shots

Current solutions force creators into shadow workflows: maintaining personal "prompt bibles" in spreadsheets, running 50+ browser tabs, manually versioning in Notion, and spending 60% of project time on friction mitigation rather than creative work.

### Four Architectural Perspectives Analyzed
Four different AI systems proposed distinct solutions to this problem:

| Perspective | Core Philosophy | Key Innovation |
|-------------|----------------|----------------|
| **ChatGPT** | Stateful workspace (not chat) | JSON-first prompt objects with template compilation |
| **Claude** | Persistent scene containers | Smart context management with version control |
| **Kimi** | Prompt Forge IDE | Model-specific compiler + ComfyUI bridge |
| **Grok** | Viral product positioning | Infinite canvas + monetization focus |

### Strategic Recommendation
**Build a "Scene Canvas" hybrid** that combines:
- ChatGPT's structured prompt templates (model profiles)
- Claude's persistent memory system (no context loss)
- Kimi's visual-first approach (less text, more intuition)
- Grok's positioning insight (but as discovery tool, not SaaS product)

**Critical Alignment:** This must be a **prompt education and workflow tool** that guides users to the right AI generators, NOT a generator itself. It teaches users how to craft better prompts while connecting them to Bedroom Director's 156-tool database.

---

## 1. Problem Space: What Creators Actually Face

### 1.1 Top 10 Pain Points (From 2025 Creator Research)

| Rank | Pain Point | Prevalence | Impact on Workflow |
|------|-----------|------------|-------------------|
| 1 | **Character & style consistency** | 85% | Hours wasted regenerating; identity drift makes multi-shot sequences impossible |
| 2 | **Tool fragmentation & context loss** | 80% | 6-10 apps per project; prompts manually copied; chat history expires |
| 3 | **Prompt complexity & unpredictability** | 75% | "Prompt archaeology" to recover old styles; models ignore 30% of instructions |
| 4 | **Short clip length & continuity** | 70% | Most models limited to 5-25s; stitching creates visible seams |
| 5 | **Cognitive load & decision fatigue** | 65% | Managing 50-200 iterations per shot; which variant is "best"? |
| 6 | **Cost vs speed trade-offs** | 60% | Sora 2 Pro = quality but slow/expensive; Kling = fast but limited |
| 7 | **Lack of native editing** | 55% | Generate → download → re-upload → lose metadata |
| 8 | **Model-specific quirks** | 50% | Each model has different prompt syntax; must re-learn constantly |
| 9 | **No persistent character/style libraries** | 48% | Can't save "working" character definitions for reuse |
| 10 | **Iteration time overhead** | 45% | 30-60s per generation × 50-200 attempts = hours waiting |

### 1.2 Workflow Breakdown: Where Creators Lose Time

Typical 30-second branded spot timeline:
- **Total time:** 20-60 hours
- **Actual creative flow:** <10% (2-6 hours)
- **Friction mitigation:** >60% (12-36 hours)

**Shadow labor breakdown:**
- Screenshotting prompts + seeds into Notion/Obsidian (2-4h)
- Maintaining personal "prompt bible" spreadsheets (2-3h)
- Manual file renaming: `character_v12_consistent_final_really_this_time_v2.png` (1-2h)
- Copy-pasting between Discord bots and local UI (3-5h)
- Multi-tab coordination (50+ tabs, constant context switching) (4-8h)
- Finishing in Photoshop/After Effects (manual compositing, fixes) (5-10h)

### 1.3 The 21 Structural Problems (From Scene-Based Prompt Studio Doc)

**Categorized by severity:**

**Critical (System Killers):**
1. Loss of authoritative state
2. Non-deterministic iteration loops
3. Inconsistent constraint enforcement
4. Context contamination
5. Reference interpretation failure

**High Impact (Workflow Blockers):**
6. Ambiguous feedback structure
7. No prompt diffing/versioning
8. No global style bible enforcement
9. No separation between ideation and production
10. Zero continuity across shots in sequence

**Medium Impact (Efficiency Drains):**
11. Manual model switching cost
12. Cognitive overload balancing multiple campaigns
13. No bridge between still prompt and video prompt
14. Uncontrolled proliferation of variants
15. No automation for recurring patterns

**Technical Debt:**
16. No prompt debugger
17. No style/character identity locks
18. Weak integration between ideation and production tools
19. No project-memory lifecycle
20. No conversion of creative intent into machine constraints
21. Scaling yourself becomes impossible

**Key Insight:** Problems 1-10 are existential. Solving even 5 of these would 10× creator productivity.

---

## 2. Architectural Approaches: Detailed Comparison

### 2.1 ChatGPT's Approach: "Stateful JSON Workspace"

**Core Philosophy:**
"Replace chat windows with structured prompt objects. The LLM is just a compiler for that object."

**Key Features:**
```json
{
  "project_id": "cubita_campaign_01",
  "scene_id": "scene_truck_intro",
  "shot_id": "shot_001_close_truck",
  "model": "seedream-4",
  "template_profile": "seedream_v4_cinematic",
  "slots": {
    "environment": "Nutley main street...",
    "subject": "Cubita truck close-up...",
    "camera": { "lens": "35mm", "framing": "three-quarter" },
    "lighting": "late afternoon, warm",
    "style": "handheld realism, grain"
  },
  "history": [...]
}
```

**Architecture:**
- Strict JSON schema for every shot
- Model-specific template profiles (format strings)
- LLM fills missing fields, compiles prompts
- Version history baked into object
- No chat needed—send full state every call

**Strengths:**
- ✅ Eliminates context decay (JSON is source of truth)
- ✅ Enforces structure (no ambiguous prompts)
- ✅ Model-agnostic (swap profiles, keep scene data)
- ✅ Perfect for technical users (developers, VFX artists)

**Weaknesses:**
- ❌ High learning curve (JSON intimidates beginners)
- ❌ Feels like coding, not creating
- ❌ Rigid structure may stifle exploration
- ❌ Requires backend API to manage state

**Implementation Complexity:** High (8/10)
- Need: Supabase DB, API endpoints, JSON validation, template engine

**Fit for Bedroom Director:** **6/10**
- Too technical for target audience ("bedroom directors")
- Could power backend, but needs visual frontend

---

### 2.2 Claude's Approach: "Persistent Scene Containers"

**Core Philosophy:**
"Each scene is its own isolated workspace with full conversation history."

**Key Features:**
- Scene = isolated workspace
- Full chat history preserved per scene
- Image evolution timeline (all iterations visible)
- Locked prompt context (docs/style guides stay injected)
- Split-screen for multi-scene work
- Version control with diff view

**Architecture:**
- Scene-based memory partitions
- Context budget tracker (know when losing details)
- Model-agnostic integration layer
- Snapshot feature (freeze good iteration, explore variants)
- Canvas view showing all scenes at once

**Strengths:**
- ✅ Intuitive (familiar chat interface)
- ✅ Low learning curve
- ✅ Flexible (exploration-friendly)
- ✅ Solves context loss without forcing structure

**Weaknesses:**
- ❌ Can still accumulate clutter within scene
- ❌ No enforcement of consistency (relies on user)
- ❌ Less precise than JSON approach
- ❌ Harder to automate (unstructured data)

**Implementation Complexity:** Medium (6/10)
- Need: Scene state management, chat UI, snapshot system

**Fit for Bedroom Director:** **8/10**
- Accessible to beginners
- Familiar interaction model
- Could integrate with tool recommendations

---

### 2.3 Kimi's Approach: "Prompt Forge IDE"

**Core Philosophy:**
"Treat prompts like code—versioned, structured, and executable."

**Key Features:**
- Markdown-based prompt files with YAML frontmatter
- Local "Prompt Library" (searchable snippets)
- Visual Prompt Tools (upload references instead of text)
- ComfyUI bridge (send prompts directly to local workflows)
- Multi-model orchestration (parallel pipelines)

**Example:**
```yaml
---
scene: "Forest Hero"
model: midjourney-v6
version: 4
tags: [lighting-test, foggy]
---
[subject: armored knight], [lighting: golden hour], ...
```

**Architecture:**
- Markdown + YAML for portability
- Local-first (SQLite or JSON files)
- Ripgrep for fuzzy search
- Direct ComfyUI HTTP API integration
- Screenshot-to-prompt (OCR existing prompts)

**Strengths:**
- ✅ Developer-friendly (git-compatible)
- ✅ Powerful search/organization
- ✅ Bridges to ComfyUI (huge for power users)
- ✅ Visual prompting option (for non-text thinkers)

**Weaknesses:**
- ❌ Markdown intimidates non-technical users
- ❌ ComfyUI focus = niche audience
- ❌ Assumes local workflows (not cloud tools)
- ❌ No real-time collaboration

**Implementation Complexity:** Medium-High (7/10)
- Need: File system, markdown parser, ComfyUI integration

**Fit for Bedroom Director:** **5/10**
- Too technical for mainstream
- Could be "Pro Mode" for advanced users
- Doesn't fit education mission (feels like power tool)

---

### 2.4 Grok's Approach: "Infinite Canvas + Viral Positioning"

**Core Philosophy:**
"BedroomDirector.com should be THE tool, not 'a tool.' Build the empire."

**Key Features:**
- Infinite Prompt Canvas™ (one page, zero tabs)
- Live-updating dashboard (draggable scene cards)
- "Ask the Director" AI chat bar (project-aware)
- Built-in upscaler + frame interpolator queue
- Collaborate: share project link, co-direct in real-time
- "Viral Mode": one-click post to X

**Monetization:**
- Freemium: 3 projects free
- Pro: $49/mo (export to Runway/Kling batch)
- Lifetime Founder: $299 (first 500 users)

**Architecture:**
- Next.js + Tailwind + Supabase
- Vercel deployment
- Grok API for "Ask the Director"

**Strengths:**
- ✅ Strong product positioning
- ✅ Clear monetization strategy
- ✅ Viral built-in (social sharing)
- ✅ Simple, beautiful UI

**Weaknesses:**
- ❌ Focuses on building SaaS product (not aligned with BD mission)
- ❌ Monetization conflicts with discovery platform
- ❌ "Build everything" scope creep
- ❌ Ignores deeper structural problems

**Implementation Complexity:** Medium (6/10)
- Need: Full-stack app, user auth, billing

**Fit for Bedroom Director:** **3/10**
- Wrong business model (BD is discovery, not SaaS)
- Visual ideas are good, but positioning is off
- Treats BD as competitor to Runway/Kling (it's not)

---

## 3. Strategic Recommendation: The "Scene Canvas" Hybrid

### 3.1 What to Take from Each Perspective

**From ChatGPT (20%):**
- ✅ Model-specific prompt templates (pre-loaded profiles for Seedream, Flux, Kling, etc.)
- ✅ Structured slots (subject, camera, lighting, style)
- ✅ Template compilation (show users "why this prompt works for this model")

**From Claude (40%):**
- ✅ Scene-based workspace architecture
- ✅ Persistent memory (no context loss)
- ✅ Version history with visual timeline
- ✅ Snapshot system (freeze good variants)
- ✅ Intuitive chat-like interaction

**From Kimi (25%):**
- ✅ Visual prompt tools (upload references)
- ✅ Searchable snippet library
- ✅ "Show, don't tell" philosophy
- ✅ Optional ComfyUI export (for advanced users)

**From Grok (15%):**
- ✅ Beautiful UI/UX inspiration
- ✅ Infinite canvas concept (spatial organization)
- ✅ Social sharing (portfolio export)
- ❌ Reject: SaaS monetization, competitive positioning

### 3.2 Core Feature Set (MVP)

**Primary Interface: "Scene Canvas"**

```
┌─────────────────────────────────────────────────────┐
│ 🎬 Bedroom Director Scene Studio                   │
│ [Home] [Tools] [Prompts] [Showcase] [Studio] ◄─NEW │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🎨 Scene 1: Hero Shot        📦 Scene 2: B-Roll  │
│  ┌───────────────┐            ┌───────────────┐   │
│  │  [Thumbnail]  │            │  [Thumbnail]  │   │
│  │   or          │            │   or          │   │
│  │  [Video]      │            │  [Placeholder]│   │
│  └───────────────┘            └───────────────┘   │
│  Model: Seedream-4            Model: Not chosen   │
│  Status: ✓ Locked             Status: Exploring   │
│  [Edit Prompt] [Try Tool →]   [Build Prompt]      │
│                                                     │
│  + Add Scene                                        │
│                                                     │
├─────────────────────────────────────────────────────┤
│ 💬 Ask: "Make scene 2 match hero shot lighting"    │
└─────────────────────────────────────────────────────┘
```

**Scene Card Components:**
1. **Thumbnail/Video preview** (shows generated result OR inspiration image)
2. **Model badge** (links to Bedroom Director tool page)
3. **Status indicator** (Exploring / Refining / Locked)
4. **Prompt editor** (structured slots OR freeform text)
5. **"Try Tool →" button** (opens actual generator in new tab)
6. **Version history** (thumbnails of all iterations)

**Left Sidebar: Scene Templates**
```
┌─ TEMPLATES ─────────┐
│ 🎥 Product Launch   │
│ 🏃 Action Sequence  │
│ 🌆 Urban Noir       │
│ 🧪 Sci-Fi Lab       │
│ 🎨 Custom           │
└─────────────────────┘
```

**Right Panel: Prompt Builder**
```
┌─ BUILD PROMPT ──────────────┐
│ Model: [Seedream-4 ▾]       │
│ (Auto-loads prompt format)  │
│                             │
│ Subject:                    │
│ [Text or upload ref image]  │
│                             │
│ Camera:                     │
│ [Dropdown: Close-up, Wide,  │
│  Drone, Handheld...]        │
│                             │
│ Lighting:                   │
│ [Golden hour / Blue hour /  │
│  Neon night / Studio...]    │
│                             │
│ Style:                      │
│ [Film grain / Clean /       │
│  Cinematic / Retro VHS...]  │
│                             │
│ ⚙️ Advanced (Optional)      │
│ [Negative prompts, weights] │
│                             │
│ ✨ [Generate Prompt]        │
│ 📋 [Copy Prompt]            │
│ 🚀 [Try in Seedream →]      │
└─────────────────────────────┘
```

### 3.3 How This Solves Top 5 Creator Pain Points

| Pain Point | Solution in Scene Canvas |
|-----------|-------------------------|
| **1. Character/style consistency** | Scene templates lock shared elements (character refs, color palettes, camera style). All scenes inherit base settings. |
| **2. Tool fragmentation** | Centralized workspace. Generate prompt here → Try Tool button opens generator → Upload result back to scene card. No tab hell. |
| **3. Prompt complexity** | Model-specific templates pre-loaded. User fills slots, system compiles. Shows "why this works for Seedream" education. |
| **4. Continuity issues** | Side-by-side scene view. Visual diff shows where scenes diverge. AI chat suggests continuity fixes. |
| **5. Cognitive load** | Snapshot system saves "good" variants. Version history visible. Reduce "which iteration was best?" anxiety. |

### 3.4 Alignment with Bedroom Director Mission

**Mission:** "Discovery and education platform for bedroom filmmakers"
**NOT:** "Another AI video generator"

**How Scene Canvas Fits:**
1. **Education-First:**
   - Shows users *how* to prompt different models
   - Explains model-specific quirks (Seedream likes full sentences, Flux wants brevity)
   - "Prompt anatomy" tooltips (why we structure subject → camera → lighting)

2. **Discovery Tool:**
   - Every scene card links to tool page in BD database
   - "Try Tool →" opens actual generator (not built-in generation)
   - Side panel shows "Best Tools for This Scene Type"

3. **Workflow Helper:**
   - Organizes creative process (ideation → prompt → generate → refine)
   - Doesn't replace generators—enhances their use
   - Teaches better prompting through structured templates

4. **Community Resource:**
   - Share scene collections (like Pinterest boards)
   - Export as prompt library entries
   - "This scene used by 47 creators"

**Key Distinction:**
- **Runway/Kling:** "Generate your video here"
- **Bedroom Director:** "Learn how to prompt better, then go generate"
- **Scene Canvas:** "Plan your project, build perfect prompts, connect to right tools"

---

## 4. Integration with Bedroom Director Architecture

### 4.1 New Page Structure

**Recommended URL:** `/studio` or `/scene-builder`

**Why not enhance `/prompts`?**
- Prompts page = community library (consumption)
- Studio = creative workspace (production)
- Different mental models, better to separate

**Navigation addition:**
```
[Home] [Tools] [Prompts] [Showcase] [Studio] [About]
                                    ^^^^^^^^ NEW
```

### 4.2 Reusable Components

**Leverage existing:**
1. **DirectorSidebar** → Adapt for scene templates sidebar
2. **Toast notifications** → Feedback for "Prompt copied" / "Scene saved"
3. **ToolCard styling** → Scene template cards (same 16:9 visual language)
4. **ComparisonContext pattern** → Create `SceneContext` for managing scenes
5. **Cinematic design system** → Carry through twilight gradients, film grain, neon glows

**New components to create:**
```typescript
/components/studio/
├── SceneCanvas.tsx          // Main workspace
├── SceneCard.tsx            // Individual scene display
├── SceneTemplateCard.tsx    // Pre-built scene templates
├── PromptBuilder.tsx        // Right panel (structured prompt editor)
├── ModelSelector.tsx        // Dropdown with BD tool links
├── VersionHistory.tsx       // Timeline of iterations
├── SnapshotGallery.tsx      // Saved "good" variants
└── SceneExporter.tsx        // Export to JSON/clipboard
```

### 4.3 Data Architecture

**New JSON files:**
```
/src/data/
├── models.json              // (Existing: 156 tools)
├── prompts.json             // (Existing: community prompts)
├── scene-templates.json     // NEW: Pre-built scene types
└── scene-projects.json      // NEW: User-saved projects (local storage)
```

**Scene Template Interface:**
```typescript
interface SceneTemplate {
  id: string;
  title: string;
  category: 'product' | 'narrative' | 'abstract' | 'cinematic';
  description: string;
  thumbnail: string;

  // Pre-filled prompt slots
  defaultSlots: {
    subject?: string;
    camera?: CameraOption;
    lighting?: LightingOption;
    style?: StyleOption;
  };

  // Recommended tools from BD database
  suggestedTools: string[];  // tool slugs: ['seedream-4', 'kling-2-1']

  // Educational content
  tips: string[];
  commonMistakes: string[];
}
```

**Scene Project Interface:**
```typescript
interface SceneProject {
  id: string;
  title: string;
  created: Date;
  modified: Date;

  scenes: Scene[];

  // Global project settings
  globalStyle?: {
    palette?: string[];
    characterRefs?: string[];  // image URLs
    brandGuidelines?: string;
  };
}

interface Scene {
  id: string;
  order: number;
  title: string;

  // Model selection
  selectedModel: string;  // tool slug from BD database

  // Prompt data
  promptSlots: {
    subject: string;
    camera: CameraOption;
    lighting: LightingOption;
    style: StyleOption;
    advanced?: {
      negativePrompt?: string;
      weights?: Record<string, number>;
    };
  };

  // Compiled output
  compiledPrompt: string;

  // Results
  generatedMedia?: {
    url: string;
    timestamp: Date;
    metadata?: Record<string, any>;
  }[];

  // State
  status: 'exploring' | 'refining' | 'locked';

  // History
  versions: {
    prompt: string;
    thumbnail?: string;
    timestamp: Date;
    notes?: string;
  }[];

  // Snapshots (saved "good" variants)
  snapshots: {
    id: string;
    prompt: string;
    thumbnail?: string;
    notes: string;
  }[];
}
```

### 4.4 State Management

**Create new context:**
```typescript
// /contexts/SceneContext.tsx
const SceneContext = createContext<{
  project: SceneProject | null;
  scenes: Scene[];
  activeSceneId: string | null;

  // Project actions
  createProject: (title: string) => void;
  loadProject: (id: string) => void;
  saveProject: () => void;

  // Scene actions
  addScene: (template?: SceneTemplate) => void;
  updateScene: (id: string, updates: Partial<Scene>) => void;
  deleteScene: (id: string) => void;
  reorderScenes: (oldIndex: number, newIndex: number) => void;

  // Prompt actions
  updatePromptSlots: (sceneId: string, slots: Partial<PromptSlots>) => void;
  compilePrompt: (sceneId: string) => string;

  // Version actions
  addVersion: (sceneId: string, prompt: string, thumbnail?: string) => void;
  createSnapshot: (sceneId: string, notes: string) => void;
  restoreSnapshot: (sceneId: string, snapshotId: string) => void;
}>(null);
```

**Storage strategy:**
- **Local Storage** (MVP): Use `localStorage` for scene projects
- **Future (Phase 2):** Supabase for cloud sync + collaboration

### 4.5 Integration with Tool Database

**Model selector dropdown:**
```typescript
// /components/studio/ModelSelector.tsx
const ModelSelector = ({ selectedModel, onChange }) => {
  const tools = getTools({ category: 'VIDEO_GEN' });

  return (
    <select value={selectedModel} onChange={onChange}>
      {tools.map(tool => (
        <option value={tool.slug} key={tool.id}>
          {tool.vendor} - {tool.model}
          {tool.pricing.includes('Free') && ' 🎁'}
        </option>
      ))}
    </select>
  );
};
```

**"Try Tool →" button logic:**
```typescript
const handleTryTool = (toolSlug: string) => {
  const tool = getTool(toolSlug);

  // Copy compiled prompt to clipboard
  navigator.clipboard.writeText(compiledPrompt);

  // Show toast
  showToast({
    title: 'Prompt copied!',
    message: `Opening ${tool.vendor} in new tab`,
  });

  // Open tool's official site
  window.open(tool.notableSources.split(';')[0], '_blank');
};
```

### 4.6 UI/UX Design Consistency

**Match Bedroom Director aesthetic:**

**Colors:**
```css
/* Studio-specific tokens */
--studio-canvas: #000000;           /* Director black background */
--studio-card: #1a1a1a;             /* Scene card background */
--studio-accent: #7C3AED;           /* Bedroom purple (CTAs) */
--studio-glow: rgba(124, 58, 237, 0.3);  /* Purple neon glow */
--studio-border: rgba(255, 255, 255, 0.1);  /* Subtle borders */
```

**Visual treatments:**
- Film grain texture on canvas background
- Purple neon glows on active scene cards
- Twilight gradient on header/hero
- Palm tree silhouettes (optional: in empty states)
- Smooth transitions (300ms ease-in-out)

**Typography:**
```css
/* Scene titles */
.scene-title {
  font-family: Inter, sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  text-shadow: 0 0 20px rgba(124, 58, 237, 0.5);  /* Neon glow */
}

/* Prompt text */
.prompt-text {
  font-family: 'JetBrains Mono', monospace;  /* Code-like for prompts */
  font-size: 0.875rem;
  line-height: 1.6;
}
```

**Empty states:**
```
┌────────────────────────────────────────┐
│                                        │
│        🎬                              │
│     [Palm tree                         │
│      silhouette]                       │
│                                        │
│   Your canvas awaits                   │
│   Start with a scene template          │
│   or build from scratch                │
│                                        │
│   [Browse Templates] [Start Blank]     │
│                                        │
└────────────────────────────────────────┘
```

---

## 5. Implementation Roadmap

### Phase 1: MVP (2-3 weeks)

**Week 1: Core Infrastructure**
- [ ] Create `/app/studio/page.tsx` route
- [ ] Build `SceneContext` with localStorage persistence
- [ ] Design scene template JSON schema
- [ ] Create 5-10 starter templates (product, portrait, landscape, abstract, cinematic)
- [ ] Build `SceneCanvas` main layout component

**Week 2: Prompt Builder**
- [ ] Build `PromptBuilder` component (structured slots)
- [ ] Implement model selector (pull from BD tools database)
- [ ] Create prompt compilation logic (model-specific templates)
- [ ] Build tooltip system ("Why this works for Seedream-4")
- [ ] Implement "Copy Prompt" + "Try Tool →" workflow

**Week 3: Scene Management**
- [ ] Build `SceneCard` component (thumbnail, status, actions)
- [ ] Implement add/delete/reorder scenes
- [ ] Build version history timeline
- [ ] Create snapshot system (save good variants)
- [ ] Polish UI (film grain, neon glows, transitions)

**MVP Feature Set:**
- ✅ Create multi-scene projects
- ✅ Build prompts using structured templates
- ✅ Choose from 156 BD tools (video/image generators)
- ✅ See prompt anatomy explained (educational)
- ✅ Copy prompt + open tool in new tab
- ✅ Save projects to localStorage
- ✅ Version history per scene
- ✅ Snapshot good variants
- ❌ No cloud sync (local only)
- ❌ No collaboration (single-user)
- ❌ No AI chat assistant (future)
- ❌ No actual generation (links out only)

### Phase 2: Enhanced Features (Future)

**Educational Enhancements:**
- Model comparison view (same prompt, 3 different tools)
- "Prompt lab" (A/B test different prompt structures)
- Video tutorials ("How to prompt Seedream vs Kling")
- Community prompt patterns (searchable)

**Workflow Improvements:**
- AI chat assistant ("Make scene 2 match scene 1 lighting")
- Drag-and-drop reference images
- Auto-suggest tools based on scene type
- Export to PDF storyboard
- Print-friendly shot list

**Collaboration (Supabase):**
- Cloud sync (work across devices)
- Share project links (portfolio)
- Team workspaces (agencies)
- Comments on scenes
- Version control (like GitHub for prompts)

**Power User Features:**
- ComfyUI export (JSON workflow)
- Batch prompt generation (10 variants)
- LoRA/embedding recommendations
- Advanced negative prompt library
- Custom template creation

---

## 6. Open Questions & Decisions Needed

### 6.1 Product Strategy

**Q1: Should we build generation capabilities in Studio?**
- **Option A:** No generation—pure workflow tool (aligned with mission)
- **Option B:** Add generation for select tools (Replicate API)
- **Option C:** Partner with one tool (e.g., Fal.ai) for "Try Here" demos

**Recommendation:** **Option A** for MVP. Stay true to discovery mission. Consider Option C for Phase 2 if partnership makes sense.

---

**Q2: Monetization strategy?**

**DECISION: Freemium from Day 1**

**Why Monetize Scene Studio:**

The research proves massive value creation:
- Creators spend **20-60 hours** per 30-second video
- **60% of that time** is friction mitigation (not creative work)
- If Scene Studio saves 16 hours/project at $75-150/hr rates = **$1,200-2,400 value per project**
- Creators already pay **$300-600/month** for tools (Runway, Midjourney, Topaz, Notion)
- Adding $29-49/month for workflow salvation is an easy ROI decision

**Freemium Model:**

**Free Tier (Discovery Focus):**
- 3 active projects (generous validation period)
- 10 scene templates
- All core features (prompt builder, version history, snapshots)
- Local storage only
- "Built with Bedroom Director" watermark on exports
- **Goal:** Drive tool discovery, prove value, convert to paid

**Pro Tier ($29/month or $249/year):**
- **Unlimited projects**
- 50+ premium templates
- **Cloud sync** (Supabase - work across devices)
- Remove watermark
- Priority in tool recommendations
- Advanced features (AI chat assistant, ComfyUI export)
- Email support
- **Target:** Serious freelancers, indie filmmakers

**Studio Tier ($79/month):**
- Everything in Pro
- **Team workspaces** (5 seats included)
- Collaboration features (comments, shared assets)
- Usage analytics
- Video call support
- Custom branding
- **Target:** Agencies, small studios

**Enterprise (Custom pricing, $500-2000/month):**
- White-label Scene Studio
- API access
- SSO/SAML
- Dedicated account manager
- Custom integrations
- **Target:** Production companies, large agencies

**Revenue Projections:**

```
Month 1-3 (Beta):
→ 500 free users
→ 20 paid ($29) = $580/mo

Month 4-6 (Launch):
→ 2,000 free users
→ 100 paid ($29) = $2,900/mo
→ 5 Studio ($79) = $395/mo
→ Total: $3,295/mo

Month 7-12 (Growth):
→ 5,000 free users
→ 300 paid ($29) = $8,700/mo
→ 20 Studio ($79) = $1,580/mo
→ 2 Enterprise ($500) = $1,000/mo
→ Total: $11,280/mo = $135K/year

Year 2 (Scale):
→ 15,000 free users
→ 800 paid = $23,200/mo
→ 50 Studio = $3,950/mo
→ 10 Enterprise = $5,000/mo
→ Total: $32,150/mo = $386K/year
```

**Plus:** Tool affiliate revenue stacks on top (5-10% click-through at $20-100 commission = additional $10-50K/year)

**Why This Aligns with BD Mission:**
- Free tier validates tools → drives discovery ✓
- Paid tier solves workflow hell → captures fair value ✓
- Enterprise serves studios → premium market ✓
- Freemium model = more users = more tool discovery = more affiliate revenue

---

**Q3: User accounts required?**
- **Option A:** No accounts—localStorage only (frictionless)
- **Option B:** Optional accounts (cloud sync opt-in)
- **Option C:** Required accounts (community features)

**Recommendation:** **Option A** for MVP. Add Option B in Phase 2 when cloud sync is built.

---

### 6.2 Technical Decisions

**Q4: How do we handle model-specific prompt formats?**
- **Approach:** JSON template files per model
- **Example:**

```json
// /src/data/model-templates/seedream-4.json
{
  "id": "seedream-4",
  "name": "Seedream 4",
  "vendor": "Tencent",
  "promptFormat": "{subject}. {camera}. {lighting}. {style}.",
  "guidelines": [
    "Use full sentences, not keyword lists",
    "Always include explicit camera metadata",
    "Order: Subject → Camera → Lighting → Style"
  ],
  "examples": [
    {
      "subject": "Close-up of Cubita food truck",
      "camera": "35mm lens, three-quarter angle",
      "lighting": "Late afternoon, warm shadows",
      "style": "Handheld realism, film grain",
      "compiled": "Close-up of Cubita food truck. 35mm lens, three-quarter angle. Late afternoon, warm shadows. Handheld realism, film grain."
    }
  ]
}
```

---

**Q5: How do we educate users on prompting without overwhelming?**
- **Progressive disclosure:**
  - Default: Simple slots (subject, camera, lighting, style)
  - "Learn More" tooltips (show format explanation)
  - "Advanced" collapsible section (negative prompts, weights)
  - "View Examples" modal (gallery of good prompts)

---

**Q6: Where do generated images/videos live?**
- **MVP:** User uploads manually to scene card (file picker)
- **Future:** Direct API integration (Replicate, Fal.ai)
- **Never:** Don't build storage/hosting (cost/complexity)

---

### 6.3 Community & Content

**Q7: Should scene projects be shareable?**
- **Yes, but carefully:**
  - Export as JSON (import/export between users)
  - Generate public link (read-only view)
  - Gallery of featured projects (curated)
  - **Don't:** Build social network (scope creep)

---

**Q8: How do we seed scene templates?**
- **Initial set (10-15 templates):**
  - Product launch (e-commerce, clean)
  - Character portrait (centered, dramatic)
  - Urban noir (cyberpunk, neon)
  - Nature/landscape (wide, golden hour)
  - Action sequence (dynamic, motion blur)
  - Retro VHS (lo-fi, nostalgic)
  - Studio professional (clean, corporate)
  - Abstract/experimental (artistic, surreal)

- **Future:** Community-submitted templates (like prompt library)

---

## 7. Success Metrics

### MVP Success Criteria (3 months post-launch)

**Usage:**
- 500+ unique users create projects
- 2,000+ scenes built
- 50+ repeat users (3+ projects)

**Engagement:**
- Avg. 3-5 scenes per project
- 60%+ users click "Try Tool →" (conversion to generators)
- 30%+ users return within 7 days

**Education Impact:**
- 40%+ users view "Learn More" tooltips
- 20%+ users try 2+ different models
- 15%+ users share projects (export/link)

**Business Alignment:**
- 25%+ increase in tool page visits (from Studio referrals)
- 10%+ increase in affiliate link clicks
- 5+ creator testimonials ("Studio helped me learn...")

### Long-Term Vision (12 months)

**Community:**
- 5,000+ active users
- 500+ community-submitted templates
- 100+ featured projects in gallery

**Platform Integration:**
- Partnerships with 3-5 tool vendors (Seedream, Kling, etc.)
- API integrations for direct generation
- Featured in tool vendor docs ("Learn prompting with BD Studio")

**Content Ecosystem:**
- Tutorial videos (YouTube series)
- Prompt pattern library (searchable)
- Weekly "Scene of the Week" showcase

---

## 8. Conclusion: The Path Forward

### Why This Approach Works

**1. Stays True to Bedroom Director Mission**
- Discovery tool, not competitor to generators
- Education-first (teaches prompting)
- Connects users to 156-tool database
- No monetization conflict

**2. Solves Real Creator Pain Points**
- Eliminates context loss (persistent scenes)
- Reduces tool fragmentation (centralized workspace)
- Lowers cognitive load (structured templates)
- Teaches consistency (global style settings)
- Provides versioning (snapshot system)

**3. Technically Feasible for MVP**
- Builds on existing BD architecture
- Reuses components (sidebar, cards, toast)
- No complex backend (localStorage MVP)
- No generation infrastructure (links out)
- 2-3 week timeline is realistic

**4. Scalable for Future**
- Easy to add Supabase later (cloud sync)
- Can integrate APIs when ready (Replicate, Fal)
- Community features bolt on cleanly
- Educational content grows organically

### The Hybrid Advantage

By combining the best ideas from four different perspectives, we avoid their individual weaknesses:

- **Not too rigid** (ChatGPT's JSON-only)
- **Not too loose** (Claude's pure chat)
- **Not too technical** (Kimi's developer focus)
- **Not too commercial** (Grok's SaaS positioning)

Instead, we get:
- **Structured but intuitive** (templates with flexibility)
- **Persistent but accessible** (memory without complexity)
- **Visual but educational** (show, then explain)
- **Free but valuable** (drives BD's core mission)

### Next Steps

1. **Validate with users** (show mockups to 5-10 creators)
2. **Refine data schemas** (scene templates, project structure)
3. **Begin MVP implementation** (Week 1: infrastructure)
4. **Create 10 starter templates** (diverse use cases)
5. **Build educational content** (tooltips, examples, tips)
6. **Soft launch to community** (beta test with BD users)
7. **Iterate based on feedback** (watch usage patterns)
8. **Plan Phase 2 features** (cloud sync, AI chat, collaboration)

---

**Scene Canvas isn't just a tool—it's a teaching platform that happens to organize creative workflows. It's the missing link between "I have an idea" and "I know how to prompt 156 different AI tools to bring it to life."**

**And it's exactly what Bedroom Director should build next.**

---

## Appendix: Quick Reference

### Key Takeaways by Stakeholder

**For Developers:**
- Build on Next.js 16 + TypeScript (existing stack)
- Start with localStorage, migrate to Supabase later
- Reuse DirectorSidebar, ToolCard, Toast components
- New context: `SceneContext` (similar to `ComparisonContext`)
- No backend APIs needed for MVP

**For Designers:**
- Carry through twilight aesthetic (purple gradients, film grain, neon)
- Scene cards = 16:9 thumbnails (like tool cards)
- Empty states = palm tree silhouettes + inspiring copy
- Prompt builder = structured form (dropdowns + text areas)
- Version history = horizontal timeline (thumbnail strip)

**For Product/Strategy:**
- MVP = 2-3 weeks (achievable)
- No accounts required (frictionless onboarding)
- Free forever (aligns with discovery mission)
- Links out to generators (no generation in-house)
- Success = increased tool page traffic + education

**For Content/Community:**
- Create 10 starter templates (diverse use cases)
- Write educational tooltips (explain prompt anatomy)
- Curate tool recommendations (per scene type)
- Plan tutorial videos (YouTube series)
- Featured projects gallery (community showcase)

---

**Document Version:** 1.0
**Last Updated:** 2025-11-18
**Authors:** Claude (Anthropic) + Research Synthesis
**Status:** Ready for Stakeholder Review
