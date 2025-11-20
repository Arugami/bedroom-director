# STRATEGIC ANALYSIS - Scene-Based Prompt Studio for Bedroom Director

**Document Type:** Strategic Implementation Guide for AI Agents
**Created:** November 18, 2025
**Purpose:** Synthesize research and AI perspectives to guide Scene-Based Prompt Studio development
**Target Audience:** AI agents implementing this feature for Bedroom Director platform

---

## 1. Executive Summary

### The Opportunity

After analyzing multi-AI convergence research and comprehensive creator pain point studies, we've identified a critical gap in the AI creative tools market: **creators are drowning in powerful tools but lack the infrastructure to use them effectively.**

**The Core Problem:**
- 85% of creators struggle with character/style consistency
- 80% suffer from tool fragmentation and context loss
- 20-60 hour projects where <10% is actual "creative flow"
- 30-50% of time spent on undocumented "shadow workflows"

**The Solution:**
A Scene-Based Prompt Studio that treats AI generation as **project composition** rather than chat threads. This aligns perfectly with Bedroom Director's mission: democratizing filmmaking by making professional workflows accessible to bedroom creators.

**Strategic Timing:**
- Competitors (Weavy, Visla, Google Vids) focus on enterprise auto-generation
- No platform combines education + persistent workspace + multi-model support
- AI models are now mature enough for consistency (character training, style references)
- Creator demand is validated (85%+ pain points on consistency/fragmentation)

---

## 2. Research Synthesis: Convergent Themes

### 2.1 Four AI Perspectives, One Architecture

**Remarkable Finding:** ChatGPT, Claude, Kimi K2, and Grok independently converged on the same architectural pattern:

```
Project (the film/series)
  └── Scene (narrative unit)
      └── Shot (single generation)
          └── Prompt Object (structured data)
```

**Why This Matters:**
- Not a single vendor's opinion, but emergent consensus
- Pattern mirrors real filmmaking (industry-proven hierarchy)
- Solves root cause: chat threads are wrong abstraction for creative projects

### 2.2 Twenty-One Structural Problems with Chat Threads

From Scene-Based Prompt Studio analysis, current chat-based tools suffer from:

**State Management Issues:**
1. Loss of authoritative state
2. Non-deterministic iteration
3. Fragmentation across tools
4. No version control
5. Context contamination

**Cognitive Load Issues:**
6. Prompt repetition (character details every time)
7. Manual style consistency ("use the same lighting as...")
8. Tool-switching overhead (copy/paste workflows)
9. Reference management chaos (links, images scattered)
10. No project memory

**Workflow Breakdowns:**
11. Character consistency failures (85% of creators)
12. Style drift across generations
13. Lost context when switching models
14. No deterministic re-generation
15. Collaboration impossibility (can't share "project state")

**Creator Experience Problems:**
16. Cognitive overload (remembering what worked)
17. Manual labor disguised as creativity
18. No learning from past prompts
19. Testing in production (every prompt is "live")
20. No rollback capability
21. Asymmetric relationship (creator serves tool instead of vice versa)

### 2.3 Creator Research Validation

**Pain Point Rankings (from Image-to-Video Pipeline research):**

| Problem | Urgency | Impact | Frequency | Total Score |
|---------|---------|--------|-----------|-------------|
| Character/Style Consistency | 10 | 10 | 10 | 30 |
| Tool Fragmentation | 9 | 9 | 9 | 27 |
| Prompt Complexity | 8 | 8 | 9 | 25 |
| Context Loss | 9 | 8 | 7 | 24 |
| Iteration Speed | 7 | 7 | 8 | 22 |

**Key Insight:** The top 3 problems are **all solved by persistent workspace architecture.**

**Shadow Workflows Revealed:**
- Maintaining character reference docs (Google Docs + image folders)
- Manual prompt versioning (copying to notes)
- Excel sheets tracking what worked
- Notion databases for style guidelines
- Discord channels as project memory

**Translation:** Creators are already building their own Scene-Based Prompt Studios using duct tape. We're just formalizing it.

---

## 3. Strategic Alignment with Bedroom Director

### 3.1 Mission Fit: "From Bedroom to Big Screen"

**Why Scene Studio Amplifies Our Mission:**

1. **Democratization Through Education**
   - Current: "Here are the tools" (directory)
   - Scene Studio: "Here's how professionals use them" (workspace patterns)
   - Teaches project thinking, not just prompt writing

2. **Bedroom Creators = Studio Capabilities**
   - Real studios use shot lists, storyboards, asset management
   - Scene Studio brings same structure to solo creators
   - Levels the playing field through workflow, not budget

3. **Community Knowledge Graph**
   - Scene templates become shareable (like GitHub repos)
   - "Bedroom Director starter packs" for different genres
   - Community-contributed model profiles

### 3.2 Platform Evolution Path

**Current State:**
- Tools discovery platform (156 AI models cataloged)
- Educational content (guides, comparisons)
- Community showcase (trending creations)

**Scene Studio Addition:**
- **Complements, doesn't replace** existing platform
- Tools page → "Use this tool in Scene Studio" CTAs
- Showcase → "Remix this scene" buttons
- Creates stickiness (users return to work on projects)

**Strategic Positioning:**
```
Bedroom Director = The complete bedroom filmmaker platform

Discovery Layer: Find the right tools
Education Layer: Learn proven techniques
Creation Layer: Build projects with Scene Studio ← NEW
Community Layer: Share and learn from others
```

---

## 4. Core Architecture Proposal

### 4.1 Data Model: JSON-Based Prompt Objects

**Why JSON, Not Chat History:**

```typescript
// WRONG: Chat thread (ephemeral, unstructured)
{
  role: "user",
  content: "Create a noir detective in rain, cinematic lighting..."
}

// RIGHT: Prompt Object (authoritative, structured)
{
  id: "shot_001",
  sceneId: "scene_opening",
  projectId: "noir_short_film",

  prompt: {
    subject: "Detective Marcus Cole",
    setting: "Rain-soaked street, neon reflections",
    style: "Film noir, high contrast, Blade Runner aesthetic",
    camera: "Medium shot, 35mm, shallow depth of field",
    technical: "8k, photorealistic, cinematic lighting"
  },

  characterReferences: ["char_marcus_v3"],
  styleReferences: ["style_noir_palette", "ref_img_blade_runner"],
  modelProfile: "midjourney_v7_cinematic",

  metadata: {
    created: "2025-11-18T01:30:00Z",
    lastModified: "2025-11-18T02:15:00Z",
    version: 3,
    status: "approved"
  },

  generations: [
    {
      timestamp: "2025-11-18T01:30:15Z",
      model: "midjourney_v7",
      seed: 42,
      imageUrl: "https://...",
      parameters: { ar: "16:9", chaos: 0 }
    }
  ]
}
```

**Benefits:**
- ✅ Deterministic re-generation (same prompt object → same result)
- ✅ Version control (track changes over time)
- ✅ Model-agnostic (same structure works for MJ, DALL-E, Runway)
- ✅ Reference inheritance (scene-level styles flow to all shots)
- ✅ Collaboration-ready (export/import projects)

### 4.2 Hierarchy: Project → Scene → Shot

**Project Level:**
```json
{
  "name": "Neon Nights: A Cyberpunk Short",
  "type": "short_film",
  "globalReferences": {
    "characters": [...],
    "palette": [...],
    "world": [...]
  },
  "scenes": [...]
}
```

**Scene Level:**
```json
{
  "name": "Opening: Rain-Soaked Discovery",
  "description": "Detective finds mysterious artifact in alley",
  "duration": "30s",
  "styleGuide": {
    "mood": "tense, mysterious",
    "colorGrade": "cool_blue_orange_contrast",
    "references": ["blade_runner_alley_scene"]
  },
  "shots": [...]
}
```

**Shot Level:**
```json
{
  "name": "Wide establishing shot",
  "duration": "5s",
  "promptObject": { /* full prompt */ },
  "storyboardNotes": "Camera pulls back to reveal neon signs",
  "audioNotes": "Rain ambience, distant sirens"
}
```

**Why This Works:**
- Mirrors industry standard (screenplay → scene breakdown → shot list)
- Natural hierarchy for reference inheritance
- Easy mental model for creators
- Scales from solo projects to team collaboration

### 4.3 Key Features (MVP)

**1. Scene Timeline (Left Sidebar)**
```
📁 Neon Nights
  📂 Scene 1: Discovery
    🎬 Shot 1a: Wide establishing
    🎬 Shot 1b: Detective close-up
    🎬 Shot 1c: Artifact reveal
  📂 Scene 2: Chase
    🎬 Shot 2a: Running start
    ...
```

**2. Structured Prompt Editor (Main Panel)**
- **Structured Tab:** Form fields for subject, setting, style, camera, technical
- **Prompt Tab:** Auto-generated prompt string for copying
- **History Tab:** All generations for this shot

**3. Persistent Reference Panel (Right Sidebar)**
- Character locks (drag character → all shots inherit)
- Style references (mood boards, color palettes)
- World building (location consistency, props)

**4. Model Profile System**
- Templates for different models (Midjourney, Runway, Pika, Kling)
- Community-contributed profiles
- Auto-format prompt objects for target model

**5. Memory Across Sessions**
- Projects persist (not lost when closing tab)
- Return to exact state
- No "what did I do last time?" cognitive load

---

## 5. Implementation Phases

### Phase 1: MVP (Weeks 1-4)
**Goal:** Validate core hypothesis with minimal scope

**Features:**
- Single project support (no multi-project yet)
- Scene → Shot hierarchy (2 levels only)
- Basic prompt object structure (subject, setting, style fields)
- Local storage persistence (no backend yet)
- Midjourney model profile only
- Manual copy/paste to actual tools

**Success Metric:** 10 beta users complete a 3-scene project, report 50%+ time savings

**Technical Stack:**
- Next.js 16 frontend only
- LocalStorage for data
- No auth required
- Static export

### Phase 2: Multi-Model + Backend (Weeks 5-8)
**Goal:** Production-ready with real persistence

**Features:**
- Supabase backend (PostgreSQL + Auth)
- Multi-model profiles (Midjourney, Runway, Pika, DALL-E, Kling)
- Character/style reference uploads (image storage)
- Project export/import (JSON download)
- User accounts (save multiple projects)

**Success Metric:** 100 users, average 5 projects per user, 70% retention after 2 weeks

**Technical Stack:**
- Supabase (PostgreSQL, Auth, Storage)
- Next.js 16 with server actions
- Cloudflare Pages deployment

### Phase 3: Collaboration + Community (Weeks 9-12)
**Goal:** Network effects and content flywheel

**Features:**
- Shared projects (team collaboration)
- Public scene templates (community library)
- Remix functionality ("Fork this project")
- Model profile marketplace (community contributions)
- Integration with Showcase (publish finished projects)

**Success Metric:** 30% of projects use community templates, 500+ published scenes

### Phase 4: Advanced Features (Weeks 13-20)
**Goal:** Industry-leading capabilities

**Features:**
- API integrations (direct generation without copy/paste)
- Version control with visual diffs
- A/B testing interface (compare generations)
- Analytics (which prompts work best)
- AI assistant (suggest prompt improvements)
- Mobile companion app (reference on set)

**Success Metric:** 50% of Pro users activate advanced features

---

## 6. Technical Stack Recommendation

### 6.1 Frontend

**Next.js 16 with App Router**
- Already deployed for Bedroom Director
- Server components for performance
- Turbopack for fast iteration
- TypeScript for type safety

**State Management:**
- Zustand for client state (scene timeline, active shot)
- Server state via Supabase real-time
- LocalStorage fallback for offline work

**UI Components:**
- Existing Tailwind + shadcn/ui
- Custom Scene Timeline component
- Drag-and-drop for references (react-beautiful-dnd)

### 6.2 Backend

**Supabase (Recommended)**

**Why Supabase:**
- PostgreSQL (JSON columns for prompt objects)
- Built-in auth (user accounts)
- Real-time subscriptions (collaboration)
- Storage for images (character references)
- Row-level security (private projects)
- Edge functions (API integrations)

**Schema Proposal:**
```sql
-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT,
  data JSONB, -- Full project hierarchy
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Shared references (characters, styles)
CREATE TABLE references (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects,
  type TEXT, -- 'character', 'style', 'world'
  name TEXT,
  image_url TEXT,
  metadata JSONB,
  created_at TIMESTAMP
);

-- Model profiles (community templates)
CREATE TABLE model_profiles (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES auth.users,
  model_name TEXT, -- 'midjourney_v7', 'runway_gen3'
  template JSONB, -- Prompt formatting rules
  is_public BOOLEAN,
  uses_count INTEGER,
  created_at TIMESTAMP
);

-- Community scenes (templates)
CREATE TABLE scene_templates (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES auth.users,
  name TEXT,
  description TEXT,
  scene_data JSONB,
  downloads_count INTEGER,
  created_at TIMESTAMP
);
```

### 6.3 API Integrations (Phase 4)

**Replicate API:**
- Direct Flux, SDXL generation
- Webhook callbacks for long-running jobs

**Fal.ai API:**
- Fast image generation
- Video models (Kling, CogVideoX)

**OpenAI API:**
- DALL-E 3 for specific use cases
- GPT-4 for prompt assistance

**Cost Consideration:**
- APIs are usage-based (could be expensive)
- Phase 1-3: Manual copy/paste (zero cost)
- Phase 4: API integrations behind Pro tier only

---

## 7. Differentiation from Competitors

### 7.1 Competitive Landscape

| Platform | Focus | Model | Differentiator |
|----------|-------|-------|----------------|
| **Weavy** | Enterprise video | Auto-generation | B2B, high-cost, black box |
| **Visla** | Marketing teams | Template-based | Corporate, limited creativity |
| **Google Vids** | Workspace users | AI slide decks | Presentation tool, not filmmaking |
| **Runway Studio** | Pro creators | Gen-3 Alpha | Single model, no project structure |
| **Pika Canvas** | Casual users | Pika 2.0 | Single scene focus, no multi-shot |

**Gap in Market:**
- No platform combines **education + workspace + multi-model**
- No one targets **solo bedroom creators** specifically
- No persistent **project structure** for AI generation

### 7.2 Bedroom Director's Unique Position

**We Win On:**

1. **Authentic Voice**
   - "Bedroom to big screen" resonates with solo creators
   - Not enterprise, not corporate, not casual—**filmmakers**
   - Community understands the struggle (we solve real pain points)

2. **Education First**
   - Not just a tool, but **teaching professional workflows**
   - Model profiles = "Here's how pros use Midjourney for characters"
   - Scene templates = "Learn by example"

3. **Model Agnostic**
   - Competitors lock you into their model
   - We help you use **any tool better**
   - Aligns with existing platform (156+ tools)

4. **Community Content**
   - Scene templates become social (like GitHub)
   - Network effects (more users = more templates)
   - Competitors are closed ecosystems

5. **Cinematic Brand**
   - "Theme park at twilight" aesthetic
   - Emotional connection to filmmaking dream
   - Competitors are bland SaaS tools

---

## 8. Revenue Model Alignment

### 8.1 Freemium Tiers

**Free Tier:**
- 1 project (unlimited scenes/shots)
- Basic model profiles (5 pre-made)
- Local storage only
- Export to JSON
- Community template access (read-only)

**Pro Tier ($19/month):**
- Unlimited projects
- Cloud storage (Supabase sync)
- All model profiles (20+)
- Custom character references (50 images)
- Publish to community templates
- Priority support

**Studio Tier ($49/month):**
- Everything in Pro
- Team collaboration (5 seats)
- API integrations (direct generation)
- Advanced analytics
- Private team templates
- White-label export

### 8.2 Conversion Strategy

**Free → Pro:**
- Hit project limit ("Upgrade to start your next film")
- Lost work from local storage ("Never lose progress again")
- See community templates ("Publish yours to build following")

**Pro → Studio:**
- Hire collaborator ("Add your editor to the project")
- High generation volume ("Skip copy/paste, use API")
- Agency work ("White-label for client delivery")

**Projected Conversion:**
- 10% Free → Pro (industry standard)
- 20% Pro → Studio (higher, targets professionals)

### 8.3 Cost Structure

**Phase 1-3 Costs:**
- Supabase: $25/month (Starter tier, 50GB storage)
- Cloudflare Pages: $0 (free tier sufficient)
- Domain: $12/year
- **Total: <$30/month** until 1000+ users

**Phase 4 API Costs (User-Funded):**
- API calls only for Studio tier ($49/mo)
- ~100 generations/month = $5-10 cost
- Margin: $39-44/user/month
- APIs are luxury feature, not requirement

---

## 9. Success Metrics

### 9.1 MVP Validation Metrics (Phase 1)

**Primary:**
- **Time Savings:** 20-60hr workflows → 5-10hr (70%+ reduction)
- **Completion Rate:** 80%+ of beta users finish a 3-scene project
- **Retention:** 60%+ return within 7 days

**Secondary:**
- **Prompt Reuse:** Average 5+ shot variations per prompt object
- **Reference Usage:** 70%+ use character locks feature
- **Subjective:** 8/10+ satisfaction rating

### 9.2 Growth Metrics (Phase 2-3)

**Adoption:**
- 1,000 registered users by Month 3
- 5,000 users by Month 6
- 10% Free → Pro conversion

**Engagement:**
- Average 3 projects per user
- 15 scenes per project
- 5 shots per scene
- 3 sessions per week (stickiness)

**Community:**
- 500+ published scene templates
- 30% of projects use templates
- 100+ model profiles (community contributed)

### 9.3 Revenue Metrics (Phase 3-4)

**Month 6 Target:**
- 5,000 total users
- 500 Pro ($19/mo) = $9,500 MRR
- 50 Studio ($49/mo) = $2,450 MRR
- **Total: $12,000 MRR** (~$144K ARR)

**Month 12 Target:**
- 20,000 total users
- 2,000 Pro = $38,000 MRR
- 200 Studio = $9,800 MRR
- **Total: $48,000 MRR** (~$576K ARR)

### 9.4 Impact Metrics (Mission Alignment)

**Democratization:**
- User backgrounds: 60%+ have no film school education
- Project complexity: 50%+ creating 5+ scene narratives
- Tool adoption: Average 3+ different AI models per project

**Quality Improvement:**
- Character consistency: 85% → 95%+ (user-reported)
- Style coherence: 80% → 90%+
- Iteration efficiency: 10x faster variations

**Community Growth:**
- User-generated templates > official templates (by Month 6)
- Cross-pollination: 40%+ discover new tools via Scene Studio
- Showcase integration: 50%+ published works started in Scene Studio

---

## 10. Risk Analysis & Mitigation

### 10.1 Technical Risks

**Risk 1: Scope Creep**
- **Likelihood:** High
- **Impact:** High (delays, bloat)
- **Mitigation:**
  - Strict phase gates (no Phase 2 features in MVP)
  - User validation between phases
  - Kill features that don't move core metrics

**Risk 2: Performance (Large Projects)**
- **Likelihood:** Medium
- **Impact:** Medium (slow load times for 100+ shot projects)
- **Mitigation:**
  - Lazy loading (load scenes on demand)
  - Pagination in timeline
  - Optimize JSON storage (compress, index)

**Risk 3: Browser Storage Limits**
- **Likelihood:** Low (Phase 1 only)
- **Impact:** Low (Phase 2 solves with backend)
- **Mitigation:**
  - 5MB LocalStorage limit → ~50 shots (sufficient for MVP)
  - Clear migration path to Supabase

### 10.2 Market Risks

**Risk 4: Model APIs Change**
- **Likelihood:** High (Midjourney, Runway update constantly)
- **Impact:** Medium (profiles break)
- **Mitigation:**
  - Model profiles are community-editable
  - Version profiles (Midjourney v6 vs v7)
  - Abstract prompt structure (not model-specific)

**Risk 5: Direct Competition**
- **Likelihood:** Medium (Runway/Pika could add project structure)
- **Impact:** High (commoditization)
- **Mitigation:**
  - Speed to market (be first)
  - Community moat (templates, profiles)
  - Multi-model position (they're single-model)

**Risk 6: User Adoption**
- **Likelihood:** Medium
- **Impact:** High (product-market fit failure)
- **Mitigation:**
  - Heavy beta testing before launch
  - Gradual rollout (don't break existing platform)
  - Alternative: Keep as power-user feature (10% of users)

### 10.3 Business Risks

**Risk 7: API Cost Explosion (Phase 4)**
- **Likelihood:** Medium
- **Impact:** High (negative margins)
- **Mitigation:**
  - API integrations only in Studio tier ($49/mo)
  - Usage caps per user
  - Cost monitoring alerts
  - Fallback: Remove direct generation, keep workspace

**Risk 8: Supabase Lock-In**
- **Likelihood:** Low
- **Impact:** Medium (migration complexity)
- **Mitigation:**
  - PostgreSQL is standard (portable)
  - Regular JSON exports
  - Keep data model database-agnostic

**Risk 9: Cannibalization of Existing Platform**
- **Likelihood:** Low
- **Impact:** Medium (tools page traffic drops)
- **Mitigation:**
  - Scene Studio enhances tools page (CTAs to use tools)
  - Templates reference specific tools
  - Integrated experience, not replacement

---

## 11. Alignment with Bedroom Director Universe

### 11.1 Visual Identity Integration

**Brand Aesthetic: "Theme park at twilight"**

**Scene Studio UI Translation:**
- **Scene Timeline:** Dark background with purple twilight gradient
- **Prompt Editor:** Film grain texture overlay (subtle)
- **Reference Panel:** Neon glow on active references
- **Status Indicators:**
  - Draft shots: Dim orange glow
  - Approved shots: Bright purple glow
  - Generating: Animated teal pulse

**Palm Tree Signature:**
- Scene completion animation: Palm tree silhouette fades in
- Empty state: "Plant your first scene" with palm icon
- Project templates: Genre-specific palm silhouettes (noir, sci-fi, etc.)

**Cinematic Touches:**
- Shot thumbnails: Film strip border
- Scene cards: Vintage film slate design
- Drag-and-drop: Motion blur trail effect
- Transitions: Fade to black (classic film cut)

### 11.2 Voice & Messaging

**Keep "Bedroom to Big Screen" Energy:**

**UI Copy Examples:**
- **Empty project:** "Every epic starts with Scene 1. What's yours?"
- **First shot saved:** "Your bedroom just became a studio."
- **Character locked:** "Consistency locked in. Hollywood would be proud."
- **Scene template browsing:** "Steal from the masters. (We won't tell.)"
- **Project export:** "Pack your bags. This project's ready for the big screen."

**Educational Tone:**
- Not just "Add reference" → "Lock character details (so AI remembers)"
- Not just "Create shot" → "Frame your shot (like a real DP)"
- Not just "Model profile" → "How pros use Midjourney v7"

### 11.3 Community Integration

**Scene Studio ↔ Showcase:**
- Publish finished projects to Showcase
- "Made with Scene Studio" badge
- Behind-the-scenes: Show scene structure of published work

**Scene Studio ↔ Tools:**
- "Use Runway Gen-3 for this shot" CTAs
- Model profiles link to tool pages
- Discovery: "Users who built noir scenes also use..."

**Scene Studio ↔ Prompts Library:**
- Import prompts as shots
- Export shots as reusable prompts
- Community contributions flow both ways

---

## 12. Next Steps for AI Agents

### 12.1 Immediate Actions (Week 1)

**For Implementation Agents:**

1. **Set up Scene Studio route structure:**
   ```
   bedroom-director-web/
     src/
       app/
         studio/
           page.tsx          # Main Scene Studio interface
           layout.tsx        # Studio-specific layout
           components/
             SceneTimeline.tsx
             PromptEditor.tsx
             ReferencePanel.tsx
   ```

2. **Create TypeScript types:**
   ```typescript
   // types/scene-studio.ts
   export interface PromptObject {
     id: string;
     sceneId: string;
     projectId: string;
     prompt: {
       subject: string;
       setting: string;
       style: string;
       camera: string;
       technical: string;
     };
     characterReferences: string[];
     styleReferences: string[];
     modelProfile: string;
     metadata: {
       created: string;
       lastModified: string;
       version: number;
       status: 'draft' | 'generating' | 'approved';
     };
     generations: Generation[];
   }
   ```

3. **Build MVP UI skeleton:**
   - Three-column layout (Timeline | Editor | References)
   - Basic CRUD for projects/scenes/shots
   - LocalStorage persistence

### 12.2 Research Tasks (Week 1-2)

**For Research Agents:**

1. **Analyze competitor features:**
   - Sign up for Runway, Pika, Weavy trials
   - Document their project/workspace UX
   - Identify UI patterns to adopt/avoid

2. **Survey beta testers:**
   - Recruit 10 creators from Bedroom Director community
   - Interview about current workflows
   - Validate Scene Studio concept wireframes

3. **Model profile research:**
   - Document Midjourney v7 best practices
   - Test Runway Gen-3 prompt formats
   - Map Pika 2.0 parameter requirements

### 12.3 Design Tasks (Week 2-3)

**For Design Agents:**

1. **Create Scene Studio mockups:**
   - Apply "theme park at twilight" aesthetic
   - Design scene cards with film slate motif
   - Reference panel with neon glow states

2. **Animation specifications:**
   - Scene completion: Palm tree fade-in (1.5s)
   - Shot drag-and-drop: Motion blur trail
   - Status transitions: Purple/orange/teal glows (0.3s ease)

3. **Empty states & onboarding:**
   - First project wizard
   - Template selection screen
   - Interactive tutorial

### 12.4 Backend Preparation (Week 3-4)

**For Backend Agents:**

1. **Supabase setup:**
   - Create project on Supabase
   - Implement schema from Section 6.2
   - Configure Row-Level Security policies

2. **Authentication flow:**
   - Email + password (simple start)
   - Social auth (Google, GitHub) in Phase 2
   - Guest mode (try before signup)

3. **Storage buckets:**
   - `character-references/` (user uploads)
   - `style-references/` (mood boards)
   - Implement upload restrictions (5MB max, image types only)

### 12.5 Testing & Validation (Week 4)

**For QA Agents:**

1. **MVP acceptance criteria:**
   - [ ] Create project with 3 scenes
   - [ ] Add 5 shots per scene
   - [ ] Upload character reference
   - [ ] Lock character to scene (all shots inherit)
   - [ ] Generate prompt from structured fields
   - [ ] Save to LocalStorage
   - [ ] Reload page (state persists)
   - [ ] Export to JSON

2. **Performance benchmarks:**
   - Load 100-shot project < 2 seconds
   - Add new shot < 100ms
   - Drag-and-drop < 60fps

3. **Beta user testing:**
   - 10 users complete 3-scene project
   - Collect time-on-task data
   - NPS survey after completion

---

## Conclusion: The Strategic Imperative

**Scene-Based Prompt Studio is not a feature—it's the next evolution of Bedroom Director.**

- **Market Timing:** Validated pain points (85% consistency struggles) + mature AI models = perfect storm
- **Competitive Moat:** Multi-model + education + community = defensible position
- **Mission Alignment:** Democratizing professional workflows, not just access to tools
- **Revenue Potential:** $576K ARR within 12 months (conservative estimate)
- **Risk Profile:** Low-cost MVP, phased validation, clear kill criteria

**For AI agents implementing this:**
- Follow the phased roadmap strictly (resist scope creep)
- Validate with real users between phases
- Maintain Bedroom Director's authentic voice and cinematic brand
- Optimize for solo creators first, teams later
- Build for learning, not just generation

**The bedroom creators are ready. Let's give them the studio they deserve.**

---

**Document Version:** 1.0
**Last Updated:** November 18, 2025
**Next Review:** After MVP beta testing (Week 4)
