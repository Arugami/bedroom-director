# Scene Canvas - Implementation Spec

**Source of Truth for Scene Canvas Development**
*Lightweight implementation guide. For strategic context, see: scene-canvas-strategic-analysis.md*

---

## 1. Quick Overview

**Scene Canvas** is a workspace-based prompt builder for multi-shot AI video/image projects. Creators build scenes (not chat), compile prompts per model, and track versions/snapshots. Solves: character consistency, workflow chaos, prompt complexity.

**Value:** Saves creators 16 hours/project (60% of 20-60 hour timelines). Justifies $29/mo pricing.

---

## 2. Key Decisions

### Architecture
- **Scene Canvas Hybrid** (combines JSON-first + persistent containers + visual IDE)
- React Context pattern (similar to `ComparisonContext`)
- localStorage for MVP → Supabase (Phase 2)
- JSON data files: `scene-templates.json`, stored projects in localStorage

### Data Flow
```
User creates project → SceneContext manages state → Scenes hold prompt slots →
Compile per model → Export to tool → Track versions/snapshots
```

### Monetization (Freemium from Day 1)
- **Free:** 3 projects, 10 templates, local storage, watermark
- **Pro ($29/mo):** Unlimited projects, 50+ templates, cloud sync, no watermark
- **Studio ($79/mo):** Team workspaces, collaboration
- **Enterprise (custom):** White-label, API access

### Integration
- New route: `/app/scene-canvas/page.tsx`
- Reuse: `DirectorSidebar`, model database, design system
- Add to Header navigation
- Freemium gate in UI (not hard block)

---

## 2.1 Workspace UX & Layout Principles

These rules keep Scene Canvas feeling like a unified directing workspace rather than “just another chat + form” screen.

### Stage-Based Mental Model
- The workspace should always reinforce a clear flow: **Director Chat → Reel Wall → Scene Inspector**.
- Each region should be visually distinct and labeled so new users instantly understand where to talk, where scenes appear, and where to refine details.

### First-Run & Empty States
- Auto-create an initial project name (done) and strongly consider auto-creating **Scene 1** so the canvas never feels “dead empty.”
- When the Reel Wall has no scenes, show a cinematic empty state card with:
  - 1–2 lines of copy explaining what the Reel Wall is.
  - A primary action (New Scene) and 1–2 suggested AI prompts (“Plan a 3-shot product reveal,” etc.).
- In Director Chat, always show a short “starter prompt” hint plus a few clickable chips tied to real workflows.

### Reel Wall (Primary Canvas)
- The Reel Wall is the **main visual surface**:
  - Use a **grid of real scene cards**, not just small numbered pills stacked in one corner.
  - Each card should include scene number, title, and a 1-line “what happens” summary.
  - New-scene cards should be the same size as populated scenes, with a dashed/ghost style.
- The active scene on the Reel Wall should be obvious:
  - Thicker border, subtle glow, and slight scale-up.
  - This state must match the active scene in the Timeline and Inspector.

### Timeline Rail (Navigator, Not Second Canvas)
- Treat the Timeline rail as a **scrub bar / navigator**, not a second Reel Wall:
  - Smaller, more compact cards; emphasize numbers and relative order.
  - Avoid duplicating big titles/descriptions that already live on the Reel Wall.
- Keep Timeline behavior in sync with the rest of the workspace:
  - Auto-scroll so the active scene stays visible.
  - Clicking a Timeline card updates the Reel Wall selection and Inspector.

### Scene Inspector (Right Rail)
- The inspector should feel powerful but not overwhelming:
  - Group CAMERA, LIGHTING, STYLE into clear sections with headings and subtle dividers.
  - Show a concise **summary line** at the top of each group (e.g., “Camera: Handheld + Dolly Zoom”) with a “Change” affordance.
  - Only expose the full grid of chips when the user is actively editing that group.
- Always display the current scene’s number and title at the top of the inspector so users feel anchored when moving between scenes.

### Visual References & Uploads
- The Visual References panel should communicate that it accepts drops:
  - When `isDragging` is true, show a brighter border, background tint, and “Drop images to add to the bible” copy.
- Upload progress must be visible but lightweight:
  - One inline progress bar per active upload with filename and %.
  - After upload + analysis, the reference tile should quickly update with AI-generated description/tags so the user sees the value.

### Active Scene Consistency
- At any moment, there should be **one clearly active scene**:
  - Highlighted card on the Reel Wall.
  - Highlighted card in the Timeline rail.
  - Matching title/number in the Inspector header.
- Scene selection must always be updated via a single source of truth in state (e.g., `activeSceneId` in `SceneContext`) so all three regions stay synchronized.

### Persona-Driven UX Rules (Mira, Eli, Sienna)

- **Source document:** See `scene-canvas-user-case-study-mira-eli-sienna.md` for detailed notes and before/after captures. Treat that file as the UX oracle for Scene Canvas.
- **Reel Wall as hero:** Reel Wall is the single primary representation of scenes. Cards must be large, cinematic frames with scene number, title, and a 1-line "what happens" summary that can double as a pitch board for clients.
- **Timeline as navigator only:** TimelineRail is strictly secondary navigation (scrub bar). Avoid duplicating full scene content; its job is to keep order and active scene context obvious.
- **Inspector as tamed power:** Inspector groups controls into readable sections with summaries first and chips/options second. It should never visually overpower the Reel Wall or become a second place to "do everything".
- **State & status clarity:** Scene status (exploring / refining / locked) and origin (AI-derived vs manual, client-ready vs rough) need visible cues on the scenes themselves (badges, copy, header), not just in hidden metadata.
- **Project/campaign context:** Expose basic project context (title, scenes count, and eventually brand/deliverable tags) in a header band so the workspace reads as a coherent campaign surface, not a generic sandbox.
- **Persona check before major UI changes:** For any significant Scene Canvas layout or interaction change, verify that Mira (tired solo filmmaker), Eli (workflow architect), and Sienna (client-facing creative) can still: (1) see where to start, (2) understand where the "film" lives, and (3) comfortably present a sequence of scenes using primarily the Reel Wall.

---

## 2.2 Visual Design & Film Aesthetic

**Last Updated:** November 19, 2025
**Status:** Active Improvements Based on UI Review

### Design Philosophy: Control Room, Not Form

Scene Canvas must feel like a **director's control room** (mixing board, film strip, inspector panels) rather than a form-filling SaaS dashboard. Every design decision reinforces this cinematic workspace metaphor.

---

### Layout Architecture

#### Current Issues (Identified Nov 19, 2025)
- **Grid layout** feels like Netflix thumbnails, not a film strip
- Scene cards too small (300px) - hard to see titles/content
- Too much darkness (95% pure black) without strategic lighting
- No visual hierarchy - Chat, Reel Wall, Inspector compete equally
- Empty state shows just darkness + one dashed card (no guidance)

#### Improved Layout: Horizontal Film Strip

**Switch from Grid to Horizontal Scroll:**

```tsx
// ❌ Current: 3-column wrapping grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// ✅ Better: Horizontal film strip with fixed-width cards
<div className="flex gap-6 overflow-x-auto pb-8 px-6 -mx-6 scrollbar-thin scrollbar-thumb-bedroom-purple/20 scrollbar-track-transparent">
  {project.scenes.map((scene, index) => (
    <div className="flex-shrink-0 w-[450px]"> {/* Fixed width for cinematic feel */}
```

**Why This Works:**
- Film reels are horizontal (mimics physical film strips)
- Larger cards (450px vs 300px) = better readability
- Scrolling feels like "running the film"
- Natural left-to-right narrative flow

---

### Scene Card Design

#### Film Frame Aesthetic

Each scene card should feel like a **film frame with a clapperboard slate**:

```tsx
<div className="flex-shrink-0 w-[450px]">
  <button
    onClick={() => setActiveScene(scene.id)}
    className={`
      group relative rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden
      ${activeSceneId === scene.id
        ? `
          border-bedroom-purple/60
          bg-bedroom-purple/5
          shadow-[0_0_60px_rgba(124,58,237,0.4)]
          ring-2 ring-bedroom-purple/30
          scale-[1.05]
          before:absolute before:inset-0
          before:bg-gradient-radial before:from-bedroom-purple/10 before:to-transparent
          before:pointer-events-none
        `
        : "border-white/5 hover:border-white/20 hover:bg-white/5 hover:shadow-2xl hover:-translate-y-2"
      }
    `}
  >
    {/* Film Frame with Sprocket Holes */}
    <div className="aspect-video bg-gradient-to-br from-zinc-900 to-black border-8 border-black rounded-xl relative overflow-hidden">

      {/* Optional: Sprocket holes for cinema feel */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-black flex flex-col justify-around py-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-bedroom-purple/30 rounded-full mx-auto" />
        ))}
      </div>

      {/* Scene Number Badge - MUCH BIGGER */}
      <div className="absolute top-6 left-8 bg-bedroom-purple text-screen-white text-4xl font-black px-6 py-3 rounded-2xl shadow-2xl shadow-bedroom-purple/30 border-2 border-bedroom-purple/50">
        {index + 1}
      </div>

      {/* Status Badge */}
      {scene.status === "locked" && (
        <div className="absolute top-6 right-6 bg-yellow-500/90 text-director-black p-3 rounded-xl">
          <Lock className="w-5 h-5" />
        </div>
      )}

      {/* Placeholder Visual / Future: Actual thumbnail */}
      <div className="absolute inset-0 flex items-center justify-center">
        {scene.generatedMedia.length > 0 ? (
          <div className="text-center">
            <div className="text-5xl font-black text-bedroom-purple mb-2">
              {scene.generatedMedia.length}
            </div>
            <div className="text-sm text-screen-white/60 uppercase tracking-wide">
              {scene.generatedMedia.length === 1 ? "Take" : "Takes"}
            </div>
          </div>
        ) : (
          <Film className="w-20 h-20 text-screen-white/10" />
        )}
      </div>

      {/* Active Scene Glow Overlay */}
      {scene.id === activeSceneId && (
        <div className="absolute inset-0 bg-bedroom-purple/10 pointer-events-none" />
      )}
    </div>

    {/* Film Slate Bottom (Clapperboard Style) */}
    <div className="absolute bottom-0 left-0 right-0 bg-black/95 border-t-4 border-bedroom-purple/30 p-6 backdrop-blur-sm">
      {/* Clapperboard diagonal stripes */}
      <div className="absolute top-0 right-0 w-16 h-1 bg-gradient-to-r from-white via-black to-white" />

      <h3 className={`font-black mb-2 truncate text-xl ${
        scene.id === activeSceneId ? "text-bedroom-purple" : "text-screen-white"
      }`}>
        {scene.title || `Scene ${index + 1}`}
      </h3>

      <p className="text-sm text-screen-white/50 line-clamp-2 min-h-[2.5rem]">
        {scene.compiledPrompt || "Click to direct this scene"}
      </p>

      {/* Meta Info Footer */}
      <div className="flex gap-4 mt-3 text-[10px] text-screen-white/40 uppercase tracking-wide">
        <span>{scene.generatedMedia.length} takes</span>
        <span>•</span>
        <span>{scene.status}</span>
      </div>
    </div>
  </button>
</div>
```

**Key Design Elements:**
- **8px black border** around frame (mimics film negative)
- **4xl scene numbers** (36px) - visible from across the room
- **Film slate bottom** with clapperboard stripes
- **Purple spotlight glow** on active scene (60px shadow + ring)
- **Sprocket holes** (optional) for vintage cinema feel

---

### Empty State Design

**Current:** Just darkness + one "New Scene" dashed card
**Problem:** No guidance, feels dead, unclear what to do next

**Improved Empty State:**

```tsx
{project.scenes.length === 0 && (
  <div className="max-w-2xl mx-auto text-center py-20 space-y-8">
    {/* Hero Icon */}
    <div className="space-y-4">
      <div className="w-24 h-24 mx-auto bg-bedroom-purple/10 rounded-3xl flex items-center justify-center border-2 border-bedroom-purple/20">
        <Film className="w-12 h-12 text-bedroom-purple animate-pulse" />
      </div>
      <h2 className="text-4xl font-black text-screen-white">
        Start Your First Scene
      </h2>
      <p className="text-screen-white/60 text-lg max-w-md mx-auto">
        Brain-dump your vision in the chat, or jump straight to directing
      </p>
    </div>

    {/* Starter Templates (3 cards) */}
    <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
      {[
        { title: "Opening Shot", desc: "Establish the world", icon: "🎬" },
        { title: "Main Beat", desc: "Core action sequence", icon: "⚡" },
        { title: "Closing Shot", desc: "Leave them wanting more", icon: "✨" }
      ].map((template) => (
        <button
          key={template.title}
          onClick={() => addScene(undefined, {
            title: template.title,
            notes: template.desc
          })}
          className="p-6 rounded-2xl border-2 border-dashed border-bedroom-purple/30 hover:border-bedroom-purple/60 bg-bedroom-purple/5 hover:bg-bedroom-purple/10 transition-all group"
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
            {template.icon}
          </div>
          <h3 className="font-bold text-screen-white mb-1">{template.title}</h3>
          <p className="text-xs text-screen-white/50">{template.desc}</p>
        </button>
      ))}
    </div>

    {/* Secondary CTA */}
    <p className="text-xs text-screen-white/40">
      Or describe your vision to the Director Chat →
    </p>
  </div>
)}
```

**Why This Works:**
- Clear call-to-action ("Start Your First Scene")
- 3 starter templates = low-friction entry (no blank canvas paralysis)
- Guides user to either chat OR manual scene creation
- Feels cinematic (film icon, emojis for personality)

---

### Color & Lighting Strategy

#### Current Issues
- Too much pure black (95% of screen)
- No strategic lighting or depth
- Purple accents underutilized

#### Improved Lighting Architecture

**Ambient Background Glow:**

```tsx
{/* Inside Reel Wall container */}
<div className="max-w-7xl mx-auto px-6 py-8 relative">
  {/* Radial purple glow (ambient studio lighting) */}
  <div className="absolute inset-0 bg-gradient-radial from-bedroom-purple/5 via-transparent to-transparent pointer-events-none" />

  {/* Film grain texture overlay */}
  <div className="absolute inset-0 grain-texture opacity-5 pointer-events-none mix-blend-overlay" />

  {/* Actual content */}
  <div className="relative z-10">
    {/* Reel Wall content here */}
  </div>
</div>
```

**Active Scene Spotlight:**

```tsx
{/* On active scene card */}
className={`
  ${activeSceneId === scene.id
    ? `
      shadow-[0_0_60px_rgba(124,58,237,0.4)]  // Larger glow
      ring-2 ring-bedroom-purple/30           // Subtle ring
      scale-[1.05]                            // Slight zoom

      // Radial gradient spotlight
      before:absolute before:inset-0
      before:bg-gradient-radial
      before:from-bedroom-purple/10
      before:to-transparent
      before:pointer-events-none
    `
    : "shadow-none"
  }
`}
```

**Color Breakdown:**
- **Background:** `bg-black/20` (not pure black - allows gradients to show)
- **Active Scene:** `bedroom-purple` with 60px glow + ring
- **Inactive Scenes:** `white/5` borders, `white/10` hovers
- **Ambient Light:** Radial gradients (`bedroom-purple/5`)
- **Film Grain:** 5% opacity overlay for texture

---

### Visual Hierarchy

**Problem:** Chat, Reel Wall, Inspector all compete for attention
**Solution:** Clear primary/secondary/tertiary hierarchy

```
PRIMARY (Brightest, Most Space):
  └─ Reel Wall (center canvas)
     - Largest cards (450px)
     - Ambient purple glow background
     - Active scene spotlight

SECONDARY (Receded, Support):
  └─ Director Chat (left panel)
     - Darker background (black/40)
     - Smaller text (text-xs)
     - Subtle borders (white/5)

TERTIARY (Slide-in, Contextual):
  └─ Inspector (right drawer)
     - Only visible when scene selected
     - Slides in with animation
     - Dark glass background (black/60 + backdrop-blur)
```

**Implementation:**

```tsx
{/* Director Chat - Receded */}
<aside className="w-[400px] bg-black/40 backdrop-blur-xl border-r border-white/5">

{/* Reel Wall - Primary Focus */}
<div className="flex-1 bg-black/20 relative">
  <div className="absolute inset-0 bg-gradient-radial from-bedroom-purple/5" />
  {/* Content */}
</div>

{/* Inspector - Contextual Drawer */}
<div className="fixed right-0 top-16 bottom-0 w-96 bg-black/60 backdrop-blur-2xl border-l border-bedroom-purple/20 shadow-2xl">
```

---

### Timeline Rail Demotion

**Problem:** Timeline Rail duplicates Reel Wall, creating "two equal modes for scenes" (Eli's feedback)

**User Need:** Timeline should be a **navigator, not a second canvas**

**Solution:** Demote Timeline to bottom scrubber bar with numbers only

**Implementation:**

```tsx
{/* Fixed Timeline Scrubber - Bottom of Screen */}
<div className="fixed bottom-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-xl border-t border-white/5 z-40">
  <div className="max-w-7xl mx-auto px-6 h-full flex items-center gap-4">

    {/* Label */}
    <div className="flex-shrink-0">
      <span className="text-xs text-screen-white/40 uppercase tracking-wide font-bold">
        Timeline
      </span>
    </div>

    {/* Scene Scrubber */}
    <div className="flex gap-2 overflow-x-auto flex-1 scrollbar-none">
      {scenes.map((scene, index) => (
        <button
          key={scene.id}
          onClick={() => setActiveScene(scene.id)}
          className={`
            flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
            text-sm font-bold transition-all
            ${scene.id === activeSceneId
              ? "bg-bedroom-purple text-screen-white scale-110 shadow-lg shadow-bedroom-purple/30"
              : "bg-white/5 text-white/60 hover:bg-bedroom-purple/20 hover:text-white"
            }
          `}
          title={scene.title || `Scene ${index + 1}`}
        >
          {index + 1}
        </button>
      ))}

      {/* Add Scene Button */}
      <button
        onClick={() => addScene()}
        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-white/5 hover:bg-bedroom-purple/20 text-white/40 hover:text-white transition-all border-2 border-dashed border-white/10 hover:border-bedroom-purple/40"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>

    {/* Scene Counter */}
    <div className="flex-shrink-0 text-xs text-screen-white/40">
      {activeSceneIndex + 1} / {scenes.length}
    </div>
  </div>
</div>

{/* Reel Wall - Add bottom padding for fixed Timeline */}
<div className="flex-1 bg-black/20 pb-24 relative"> {/* 96px padding = 80px Timeline + 16px spacing */}
  <div className="absolute inset-0 bg-gradient-radial from-bedroom-purple/5" />

  {/* Reel Wall content here */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
    {/* Horizontal film strip */}
  </div>
</div>
```

**Why This Works:**
- **Visually subordinate:** Small buttons (48px) vs large scene cards (450px)
- **Persistent navigation:** Always visible, fixed at bottom
- **No duplication:** Numbers only, no titles/descriptions (those live on Reel Wall)
- **Synced state:** `activeSceneId` highlights both Timeline button + Reel Wall card
- **Clear affordance:** "Add Scene" button lives in Timeline for quick access
- **Context aware:** Shows "X / Y" counter for orientation

**Comparison:**

| Element | Before | After |
|---------|--------|-------|
| **Timeline Position** | Top of Reel Wall | Fixed bottom scrubber |
| **Card Size** | Same as Reel Wall (~300px) | 48px buttons |
| **Content** | Number + title + description | Number only |
| **Mental Model** | Duplicate canvas | Navigation scrubber |
| **Visibility** | Scrolls away | Always visible |

---

### Inspector Content Organization

**Problem:** Inspector "feels like a form UI" with "too many controls at once" (Mira + Eli's feedback)

**User Need:** Powerful but tamed - summaries first, progressive disclosure

**Solution:** Collapsible sections with quick summary lines at top

**Implementation:**

```tsx
{/* Scene Inspector - Right Drawer */}
<div className="fixed right-0 top-16 bottom-20 w-96 bg-black/60 backdrop-blur-2xl border-l border-bedroom-purple/20 shadow-2xl overflow-hidden flex flex-col">

  {/* Inspector Header - Scene Context (Always Visible) */}
  <div className="p-6 border-b border-white/10 space-y-3 flex-shrink-0">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-black text-screen-white">
        Scene {activeSceneIndex + 1}
      </h2>

      {/* Status Badge */}
      <span className={`
        px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide
        ${scene.status === "locked" && "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"}
        ${scene.status === "refining" && "bg-bedroom-purple/20 text-bedroom-purple border border-bedroom-purple/30"}
        ${scene.status === "exploring" && "bg-white/10 text-white/60 border border-white/20"}
      `}>
        {scene.status}
      </span>
    </div>

    {/* Scene Title Input */}
    <input
      type="text"
      value={scene.title}
      onChange={(e) => updateScene({ title: e.target.value })}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-screen-white placeholder:text-white/30 focus:border-bedroom-purple/50 focus:ring-2 focus:ring-bedroom-purple/20 transition-all"
      placeholder="Scene title..."
    />

    {/* Quick Summary - Current Choices */}
    <div className="space-y-1 text-xs">
      <div className="flex justify-between items-center group">
        <span className="text-bedroom-purple font-bold">CAMERA</span>
        <span className="text-screen-white/60 group-hover:text-screen-white transition-colors">
          {scene.camera.angle} • {scene.camera.movement}
        </span>
      </div>
      <div className="flex justify-between items-center group">
        <span className="text-bedroom-purple font-bold">LIGHTING</span>
        <span className="text-screen-white/60 group-hover:text-screen-white transition-colors">
          {scene.lighting.mood} • {scene.lighting.direction}
        </span>
      </div>
      <div className="flex justify-between items-center group">
        <span className="text-bedroom-purple font-bold">STYLE</span>
        <span className="text-screen-white/60 group-hover:text-screen-white transition-colors">
          {scene.style.aesthetic}
        </span>
      </div>
    </div>
  </div>

  {/* Scrollable Collapsible Sections */}
  <div className="flex-1 overflow-y-auto">

    {/* Camera Section */}
    <details className="group border-b border-white/5" open={scene.status === "exploring"}>
      <summary className="cursor-pointer p-6 flex items-center justify-between hover:bg-white/5 transition-colors select-none">
        <div className="flex items-center gap-3">
          <Camera className="w-5 h-5 text-bedroom-purple" />
          <span className="font-black text-bedroom-purple">CAMERA</span>
        </div>
        <ChevronDown className="w-5 h-5 text-bedroom-purple group-open:rotate-180 transition-transform duration-200" />
      </summary>

      <div className="px-6 pb-6 space-y-4 bg-white/[0.02]">

        {/* Angle Chips */}
        <div>
          <label className="text-xs text-screen-white/40 uppercase mb-2 block tracking-wide">
            Angle
          </label>
          <div className="flex flex-wrap gap-2">
            {["Wide Shot", "Medium Shot", "Close-Up", "POV", "Bird's Eye", "Low Angle"].map(angle => (
              <button
                key={angle}
                onClick={() => updateCamera({ angle })}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${scene.camera.angle === angle
                    ? "bg-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/30"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                  }
                `}
              >
                {angle}
              </button>
            ))}
          </div>
        </div>

        {/* Movement Chips */}
        <div>
          <label className="text-xs text-screen-white/40 uppercase mb-2 block tracking-wide">
            Movement
          </label>
          <div className="flex flex-wrap gap-2">
            {["Static", "Tracking", "Dolly Zoom", "Handheld", "Crane", "Steadicam"].map(movement => (
              <button
                key={movement}
                onClick={() => updateCamera({ movement })}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${scene.camera.movement === movement
                    ? "bg-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/30"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                  }
                `}
              >
                {movement}
              </button>
            ))}
          </div>
        </div>

        {/* Lens Chips */}
        <div>
          <label className="text-xs text-screen-white/40 uppercase mb-2 block tracking-wide">
            Lens
          </label>
          <div className="flex flex-wrap gap-2">
            {["35mm", "50mm", "85mm", "Wide Angle", "Telephoto", "Fisheye"].map(lens => (
              <button
                key={lens}
                onClick={() => updateCamera({ lens })}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${scene.camera.lens === lens
                    ? "bg-bedroom-purple text-screen-white shadow-lg shadow-bedroom-purple/30"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                  }
                `}
              >
                {lens}
              </button>
            ))}
          </div>
        </div>
      </div>
    </details>

    {/* Lighting Section */}
    <details className="group border-b border-white/5">
      <summary className="cursor-pointer p-6 flex items-center justify-between hover:bg-white/5 transition-colors select-none">
        <div className="flex items-center gap-3">
          <Sun className="w-5 h-5 text-bedroom-purple" />
          <span className="font-black text-bedroom-purple">LIGHTING</span>
        </div>
        <ChevronDown className="w-5 h-5 text-bedroom-purple group-open:rotate-180 transition-transform duration-200" />
      </summary>

      <div className="px-6 pb-6 space-y-4 bg-white/[0.02]">
        {/* Mood, Direction, Color chips (similar pattern) */}
      </div>
    </details>

    {/* Style Section */}
    <details className="group border-b border-white/5">
      <summary className="cursor-pointer p-6 flex items-center justify-between hover:bg-white/5 transition-colors select-none">
        <div className="flex items-center gap-3">
          <Palette className="w-5 h-5 text-bedroom-purple" />
          <span className="font-black text-bedroom-purple">STYLE</span>
        </div>
        <ChevronDown className="w-5 h-5 text-bedroom-purple group-open:rotate-180 transition-transform duration-200" />
      </summary>

      <div className="px-6 pb-6 space-y-4 bg-white/[0.02]">
        {/* Aesthetic, Era, Influences chips (similar pattern) */}
      </div>
    </details>

    {/* Advanced Section (Collapsed by Default) */}
    <details className="group">
      <summary className="cursor-pointer p-6 flex items-center justify-between hover:bg-white/5 transition-colors select-none">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-bedroom-purple" />
          <span className="font-black text-bedroom-purple">ADVANCED</span>
        </div>
        <ChevronDown className="w-5 h-5 text-bedroom-purple group-open:rotate-180 transition-transform duration-200" />
      </summary>

      <div className="px-6 pb-6 space-y-4 bg-white/[0.02]">
        {/* Negative prompt, weights, etc. */}
      </div>
    </details>

  </div>

  {/* Action Footer (Always Visible) */}
  <div className="p-6 border-t border-white/10 space-y-2 flex-shrink-0 bg-black/40">
    <button className="w-full px-4 py-3 rounded-lg bg-bedroom-purple text-screen-white font-bold hover:bg-bedroom-purple/90 transition-all shadow-lg shadow-bedroom-purple/30">
      Compile Prompt
    </button>
    <button className="w-full px-4 py-3 rounded-lg border border-white/10 text-screen-white/60 hover:bg-white/5 hover:text-white transition-all text-sm">
      Save as Snapshot
    </button>
  </div>
</div>
```

**Why This Works:**
- **Summary first:** See all current choices at a glance (no need to expand sections)
- **Progressive disclosure:** Only expand section you're actively editing
- **Stage-aware:** "Exploring" scenes auto-expand Camera section
- **Grouped logically:** CAMERA → LIGHTING → STYLE workflow
- **Clear icons:** Visual affordance for each section type
- **Hover feedback:** Section headers highlight on hover
- **Fixed action footer:** Primary actions always accessible

**Comparison:**

| Element | Before | After |
|---------|--------|-------|
| **Layout** | Flat wall of chips | Collapsible sections |
| **Summary** | None | Quick glance at top |
| **Initial State** | All sections open | Camera open, rest collapsed |
| **Visual Weight** | Heavy (all visible) | Light (progressive disclosure) |
| **Scroll** | Long page | Compact, focused |

---

### Project Header Band

**Problem:** "Top-level project context not visible" - workspace feels like sandbox, not organized campaign (Sienna's feedback)

**User Need:** Client/brand context, scene count, presentation mode

**Solution:** Sticky header band with project info and actions

**Implementation:**

```tsx
{/* Project Header - Sticky Top */}
<div className="sticky top-16 z-30 bg-black/60 backdrop-blur-xl border-b border-bedroom-purple/20">
  <div className="max-w-7xl mx-auto px-8 py-4">

    <div className="flex items-center justify-between">

      {/* Project Info */}
      <div className="space-y-1">

        {/* Project Title */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-black text-screen-white">
            {project.title}
          </h1>

          {/* Edit Button */}
          <button
            onClick={() => setEditingProjectTitle(true)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/60 transition-all"
            title="Edit project title"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Meta Row */}
        <div className="flex gap-4 text-xs text-screen-white/50">

          {/* Scene Count */}
          <span className="flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5" />
            <strong className="text-screen-white/70">{project.scenes.length}</strong>
            {project.scenes.length === 1 ? "scene" : "scenes"}
          </span>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <>
              <span>•</span>
              <div className="flex gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-bedroom-purple/10 text-bedroom-purple border border-bedroom-purple/20">
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Modified Time */}
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Modified {formatRelativeTime(project.modified)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">

        {/* Export All Scenes */}
        <button className="px-4 py-2 rounded-lg bg-bedroom-purple/10 text-bedroom-purple hover:bg-bedroom-purple/20 transition-all font-bold text-sm flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export All Scenes
        </button>

        {/* Project Settings */}
        <button
          onClick={() => setShowProjectSettings(true)}
          className="p-2 rounded-lg border border-white/10 text-screen-white/60 hover:bg-white/5 hover:text-white transition-all"
          title="Project settings"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* More Menu */}
        <button className="p-2 rounded-lg border border-white/10 text-screen-white/60 hover:bg-white/5 hover:text-white transition-all">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</div>

{/* Main Workspace - Account for sticky header height */}
<div className="pt-4"> {/* Spacing below header */}
  {/* Director Chat + Reel Wall + Inspector */}
</div>
```

**Why This Works:**
- **Campaign context:** Title + scene count + tags = organized, professional feel
- **Presentation mode:** Can walk clients through with visible project name
- **Actions always accessible:** Export/Settings docked at top
- **Sticky positioning:** Stays visible when scrolling Reel Wall
- **Visual hierarchy:** Header recedes (black/60) while Reel Wall is brighter (black/20)
- **Tag badges:** Quick visual reference for project type/category
- **Relative timestamps:** "Modified 2 hours ago" feels more alive than static dates

**Additional Features:**

```tsx
{/* Project Settings Modal (Optional) */}
{showProjectSettings && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
    <div className="max-w-2xl w-full bg-black/95 border border-bedroom-purple/20 rounded-2xl p-8 space-y-6">

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-screen-white">Project Settings</h2>
        <button onClick={() => setShowProjectSettings(false)}>
          <X className="w-6 h-6 text-white/40 hover:text-white" />
        </button>
      </div>

      {/* Project Title */}
      <div>
        <label className="text-sm text-screen-white/60 mb-2 block">Project Title</label>
        <input
          type="text"
          value={project.title}
          onChange={(e) => updateProject({ title: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-screen-white"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="text-sm text-screen-white/60 mb-2 block">Tags</label>
        <input
          type="text"
          placeholder="product-video, brand-launch, q4-campaign"
          value={project.tags?.join(", ")}
          onChange={(e) => updateProject({ tags: e.target.value.split(",").map(t => t.trim()) })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-screen-white placeholder:text-white/30"
        />
        <p className="text-xs text-screen-white/40 mt-1">Separate multiple tags with commas</p>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-screen-white/60 mb-2 block">Description (Optional)</label>
        <textarea
          value={project.description}
          onChange={(e) => updateProject({ description: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-screen-white placeholder:text-white/30 h-24 resize-none"
          placeholder="Client brief, campaign goals, target audience..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={() => setShowProjectSettings(false)}
          className="flex-1 px-4 py-3 rounded-lg bg-bedroom-purple text-screen-white font-bold hover:bg-bedroom-purple/90"
        >
          Save Changes
        </button>
        <button
          onClick={() => setShowProjectSettings(false)}
          className="px-4 py-3 rounded-lg border border-white/10 text-white/60 hover:bg-white/5"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
```

**Comparison:**

| Element | Before | After |
|---------|--------|-------|
| **Project Title** | Only in sidebar | Prominent in header |
| **Scene Count** | None visible | Always visible |
| **Tags/Context** | None | Tag badges + metadata |
| **Actions** | Buried in menus | Docked in header |
| **Feel** | Sandbox/prototype | Organized campaign |

---

### Responsive Design Notes

**Desktop (1280px+):**
- Three-column layout: Chat (400px) | Reel Wall (flex-1) | Inspector (384px)
- Horizontal scroll for film strip
- Timeline Rail docked at bottom

**Tablet (768px - 1279px):**
- Two-column: Chat (collapsible) | Reel Wall + Inspector (stacked)
- Horizontal scroll maintained
- Timeline Rail remains visible

**Mobile (< 768px):**
- Single column with tab toggle: "Director Chat" | "Reel Wall"
- Inspector becomes full-screen modal
- Vertical scroll for scenes (no horizontal)
- Timeline Rail hidden (use dropdown instead)

---

### Animation & Motion

**Smooth Transitions:**

```tsx
// Scene card hover
className="transition-all duration-500 hover:-translate-y-2"

// Active scene scale
className="scale-[1.05] transition-transform duration-300"

// Inspector slide-in
className="transform transition-transform duration-300 ease-out"
style={{ transform: inspectorOpen ? 'translateX(0)' : 'translateX(100%)' }}
```

**Micro-interactions:**
- Scene cards lift on hover (`-translate-y-2`)
- Active scene scales up slightly (`scale-[1.05]`)
- Inspector drawer slides in from right
- Chip buttons have color transitions (300ms)
- Loading states use purple spinner (OpenRouter analysis)

---

### Summary of Changes

| Element | Current | Improved |
|---------|---------|----------|
| **Layout** | 3-col grid | Horizontal film strip |
| **Card Width** | ~300px | 450px (50% larger) |
| **Scene Numbers** | text-lg (18px) | text-4xl (36px) |
| **Active Glow** | 40px shadow | 60px shadow + ring + gradient |
| **Background** | Pure black | Black/20 + purple gradients |
| **Film Aesthetic** | Minimal | 8px borders + sprocket holes + slate |
| **Empty State** | One dashed card | Hero + 3 starter templates |
| **Visual Hierarchy** | Everything equal | Primary (Reel) > Secondary (Chat) > Tertiary (Inspector) |

 **Implementation Priority:**
 1. ✅ **Quick Wins (30min each):** Horizontal scroll, larger cards, bigger numbers
 2. 🎨 **Polish (1-2hr):** Film frame borders, purple spotlights, empty state
 3. 🔮 **Future:** Sprocket holes, clapperboard animations, thumbnail previews

 ### Design Considerations & Open Questions (Cascade Review – Nov 19, 2025)

 - **Component vs. Tailwind clusters:** Consider extracting patterns like `SceneCard`, `EmptyReelState`, and `ReelAmbientContainer` so Tailwind blobs live in reusable components instead of copy-paste.
 - **Responsive card sizing:** 450px width is ideal on desktop; for tablet and mobile, keep scenes readable by slightly reducing width (for example, 360–400px) and relying on the vertical stack on mobile as already described.
 - **Scrolling & snapping:** Optional enhancements: add horizontal `scroll-snap-x` / `snap-mandatory` for the film strip and consider wheel-to-horizontal scroll helpers on desktop for a more “timeline scrub” feel.
 - **Accessibility & motion:** Ensure clear focus rings and keyboard navigation for cards and inspector controls, maintain strong contrast for purple on dark backgrounds, and respect `prefers-reduced-motion` by toning down scale/large glows and slide animations when needed.
 - **Film grain performance:** Implement grain as a single, reusable overlay or utility so it can be disabled or simplified on low-power devices if performance becomes an issue.
 - **Inspector behavior:** Clarify whether the inspector is always open when a scene is selected versus user-closable, and how its open state relates to `activeSceneId` to avoid orphaned UI state.

 ---
 
 ## 3. Data Schemas

### Core Interfaces

```typescript
interface SceneProject {
  id: string;
  title: string;
  description?: string;
  created: Date;
  modified: Date;
  scenes: Scene[];
  globalStyle?: GlobalStyle;
  tags?: string[];
  isArchived?: boolean;
}

interface Scene {
  id: string;
  order: number;
  title: string;
  selectedModel: string; // Tool ID from models database
  promptSlots: PromptSlots;
  compiledPrompt: string;
  generatedMedia: GeneratedMedia[];
  status: "exploring" | "refining" | "locked";
  versions: SceneVersion[];
  snapshots: SceneSnapshot[];
  createdAt: Date;
  modifiedAt: Date;
  notes?: string;
}

interface PromptSlots {
  subject: string;
  camera: CameraOption;
  lighting: LightingOption;
  style: StyleOption;
  advanced?: {
    negativePrompt?: string;
    weights?: Record<string, number>;
  };
}

interface CameraOption {
  angle: string; // "wide shot", "close-up", "POV"
  movement: string; // "static", "tracking", "dolly zoom"
  lens: string; // "35mm", "50mm", "wide angle"
}

interface LightingOption {
  mood: string; // "golden hour", "neon noir"
  direction: string; // "front", "backlit", "rim light"
  color: string; // "warm", "cool", "vibrant"
}

interface StyleOption {
  aesthetic: string; // "cinematic", "documentary"
  era: string; // "modern", "80s", "retro futuristic"
  influences: string[]; // ["Wes Anderson", "Nolan"]
}

interface SceneVersion {
  id: string;
  prompt: string;
  thumbnail?: string;
  timestamp: Date;
  notes?: string;
}

interface SceneSnapshot {
  id: string;
  prompt: string;
  thumbnail?: string;
  notes: string;
  createdAt: Date;
  promptSlots: PromptSlots;
}

interface GeneratedMedia {
  id: string;
  url: string;
  timestamp: Date;
  status: "processing" | "completed" | "failed";
  metadata?: Record<string, any>;
}

interface GlobalStyle {
  palette?: string[];
  characterRefs?: { name: string; description: string; imageUrl?: string }[];
  brandGuidelines?: string;
  visualTheme?: string;
}

interface SceneTemplate {
  id: string;
  name: string;
  category: "video" | "image" | "animation" | "transition";
  description: string;
  thumbnail?: string;
  defaultPromptSlots: Partial<PromptSlots>;
  recommendedModels: string[];
  tags: string[];
  difficulty?: "beginner" | "intermediate" | "advanced";
  isPro?: boolean; // Freemium gate
}
```

---

## 4. MVP Roadmap (2-3 Weeks)

### Week 1: Core Infrastructure
- [ ] Create `/app/scene-canvas/page.tsx`
- [ ] Build `SceneContext` provider
- [ ] Create `scene-templates.json` (10 free templates)
- [ ] Implement localStorage persistence
- [ ] Add Studio link to Header navigation

### Week 2: Prompt Builder
- [ ] Model selector dropdown (from models database)
- [ ] Prompt slot inputs (subject, camera, lighting, style)
- [ ] Prompt compilation logic (per-model formatting)
- [ ] Live preview of compiled prompt
- [ ] Copy to clipboard + "Open in [Model]" buttons

### Week 3: Scene Management
- [ ] Scene list sidebar (add, reorder, delete)
- [ ] Scene status badges (exploring/refining/locked)
- [ ] Version history panel
- [ ] Snapshot creation (manual save points)
- [ ] Project save/load UI

### Phase 2 (Month 2-3)
- [ ] Supabase auth + cloud sync
- [ ] Stripe integration (freemium paywall)
- [ ] Advanced features (AI chat, ComfyUI export)
- [ ] Team collaboration (Studio tier)

---

## 5. Integration Points

### Reuse Existing Components
- **DirectorSidebar:** Scene list + project selector
- **ToolCard:** Model selector cards
- **Design System:** TailwindCSS colors, typography, film grain
- **Models Database:** `data/models.json` for tool metadata

### New Files to Create
```
/src/app/studio/
  page.tsx                    # Main Studio page
  layout.tsx                  # Studio-specific layout (if needed)

/src/contexts/
  SceneContext.tsx            # State management

/src/lib/types/
  scene.ts                    # TypeScript interfaces

/src/lib/
  sceneTemplates.ts           # Template loading logic
  promptCompiler.ts           # Per-model compilation

/data/
  scene-templates.json        # Template definitions
```

### Header Navigation Addition
```tsx
<Link href="/scene-canvas">Scene Canvas</Link>
```

---

## 6. Monetization Implementation

### Free Tier Limits (Enforce in UI)
- Max 3 active projects (show "Upgrade to Pro" when creating 4th)
- 10 scene templates (grey out Pro templates with lock icon)
- "Built with Bedroom Director" watermark on exported prompts
- localStorage only (no cloud sync button)

### Pro Tier Unlocks
- Unlimited projects
- 50+ premium templates
- Cloud sync enabled
- Remove watermark
- Advanced features (AI chat assistant)

### UI Patterns
```tsx
{isPro ? (
  <FeatureButton />
) : (
  <UpgradePrompt feature="Unlimited Projects" tier="Pro" price="$29/mo" />
)}
```

---

## 7. Tech Stack

### Current (MVP)
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** TailwindCSS + custom design system
- **State:** React Context API
- **Storage:** localStorage (JSON)
- **Data:** models.json (existing), scene-templates.json (new)

### Phase 2 (Cloud)
- **Backend:** Supabase (PostgreSQL + Auth)
- **Payments:** Stripe
- **Deployment:** Cloudflare Pages
- **AI Features:** OpenAI API (chat assistant)

---

## 8. Key User Flows

### Creating a New Project
1. Click "New Project" in Scene Canvas
2. Choose template (or start blank)
3. Name project → lands in Scene Canvas
4. First scene auto-created

### Building a Scene
1. Select model from dropdown (filtered by category)
2. Fill prompt slots (subject, camera, lighting, style)
3. See compiled prompt update live
4. Click "Copy Prompt" or "Open in Runway" (deep link)
5. Paste result thumbnail → attach to scene
6. Create snapshot if happy, or add version to iterate

### Managing Consistency
1. Set global style (character refs, palette, theme)
2. Referenced in all scene compilations
3. Lock scenes when final (prevents accidental edits)
4. Compare scenes side-by-side (reuse comparison UI?)

---

## 9. Success Metrics (MVP)

- **Activation:** 40% of visitors create a project (low friction)
- **Retention:** 25% return within 7 days (proves value)
- **Conversion:** 5% upgrade to Pro within 30 days (freemium validation)
- **Time Saved:** Self-reported 10+ hours/project (user surveys)

---

## 10. Open Questions

- [ ] Should we integrate direct API calls to models (Phase 2+)?
- [ ] ComfyUI JSON export format (Phase 2)?
- [ ] Collaboration: real-time or async?
- [ ] Mobile responsive priority? (MVP = desktop-first)

---

**Next Step:** Begin implementation with Week 1 tasks (route, context, templates, storage).

**Full Strategic Context:** See `scene-canvas-strategic-analysis.md` for research, alternatives, and detailed reasoning.
