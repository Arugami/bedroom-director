# AI Video & Image Database - Master TODO List

**Project Status**: Active Development - Website Live in Production
**Last Updated**: November 14, 2025 (8:52am)
**Brand Name**: Bedroom Director
**Domain**: bedroomdirector.com (+ bedroomdirector.ai)
**Production Site**: https://bedroom-director.pages.dev
**Current Database Size**: 156 models (JSON) | Dynamic data backend implemented
**Backup Strategy**: Rolling backups in `data/backups/` folder
**Positioning**: Discovery & education platform for bedroom creators (guide, not generator)
**Tagline**: "From bedroom to big screen"
**Creative Direction**: Hybrid approach (W+K + Chiat/Day + Jobs)

---

## 📋 Project Overview

Comprehensive database of AI creative tools (video, image, voice, music generation) with:
- **19 columns**: 6 metadata + 13 data fields
- **8 categories**: IMAGE_GEN, VIDEO_GEN, VOICE_AUDIO, MUSIC, LIP_SYNC, PLATFORM_AGGREGATOR, POST_PROCESSING, API_INFRASTRUCTURE
- **Documentation**: `03-model-categories.md` with cross-platform access matrix
- **Scripts**: Python scripts for database updates in `/Users/Arugami/Desktop/AI_Image_Video_App/`

---

## 🚧 ACTIVE & UPCOMING WORK

### Phase 5: Visual Polish & Consistency (Active)
**Last Updated**: November 14, 2025

**Focus**: Finish the sprint polish list while making the `/prompts` surface feel like the `/tools` homepage (currently the main landing page).

**Tasks**
- [x] Match hero treatment (video loop, twilight gradient, copy tone) between `/tools` and `/prompts` so the experience feels like one product.
- [ ] Elevate hero search CTA (tighter copy, larger field, surfaced on prompts page) and add "Popular Categories" quick tiles under the hero.
- [x] Standardize sticky filter interactions (shadow, backdrop blur, breakpoints) across tools + prompts via shared `StudioHero` + `StudioStickyBar` patterns.
- [ ] Add horizontally scrollable top categories on mobile so filters aren’t buried behind the sidebar.
- [ ] Make active filters stand out (chips/badges + clear-all) and mirror the state indicator on both pages.
- [x] Audit typography + copy (remove “Your Arsenal” / “The Arsenal”) and align to new naming: `Tools`, `Prompt Library`, `Scene Canvas`, `Showcase`.
- [ ] Performance + accessibility sweeps called out in `current-sprint.md` (hover states, keyboard support, lazy loading).
- [ ] Regression test the comparison tray after styling changes.
- [ ] Design richer empty states (illustrations + CTA to clear filters) for tools & prompts when no results match.
- [x] Unify studio shell across `/tools`, `/prompts`, and `/showcase` (shared `DirectorSidebar` + `Studio Navigation`).

### File Renaming and Link Correction (Paused)
Work stopped after the first document rename. Revisit once the sprint polish ships.

---

### Phase 18: Community Features 👥
**Why**: Build the "bedroom director" movement and foster community engagement  
**Time Estimate**: 8-10 hours  
**Impact**: High - creates sticky engagement and user-generated content

**Tasks:**
- [ ] **User Profiles System**
  - Design profile page layout
  - Fields: username, bio, avatar, location, portfolio link, social links
  - Showcase section: user's creations, prompts, favorite tools
  - Stats: total creations, prompts shared, community rank
  - Edit profile functionality
  - Public/private toggle for profile elements

- [ ] **Creator Spotlights Feature**
  - Design spotlight card/section
  - Featured bedroom director of the week/month
  - Interview format: Q&A, tools used, advice, portfolio
  - Rotation system for featuring different creators
  - Nomination/application process
  - Add to homepage and dedicated spotlights page

- [ ] **Discord Integration**
  - Set up Discord server for Bedroom Director community
  - Create channels: #introductions, #showcase, #prompts, #tools, #help
  - Add Discord widget to website
  - Implement Discord auth (optional)
  - Cross-post featured content to Discord
  - Add "Join Discord" CTAs throughout site

- [ ] **Share Functionality**
  - Share buttons for tools, prompts, creations
  - Generate share cards with Open Graph images
  - Copy link functionality
  - Social media share (Twitter, LinkedIn, Reddit)
  - Embed code for creations
  - Track share analytics

- [ ] **Upvoting & Favorites System**
  - Add upvote/like buttons to prompts and creations
  - Implement favorites/bookmarks functionality
  - "My Favorites" page for logged-in users
  - Sort by most upvoted/liked
  - Trending algorithm (upvotes + recency)
  - Display vote counts and trending badges

- [ ] **Community Guidelines & Moderation**
  - Create community guidelines page
  - Content moderation workflow
  - Report functionality for inappropriate content
  - User reputation system
  - Moderator tools and dashboard

- [ ] **Engagement Features**
  - Comments on creations and prompts
  - Follow other creators
  - Notifications for new content from followed creators
  - Activity feed showing community highlights
  - Leaderboard (top creators, most helpful prompts)

**Success Metrics:**
- 100+ Discord members at launch
- User profiles created and active
- 10+ creator spotlights published
- Upvoting system driving content curation
- Active sharing on social media

---

### Phase 19: Website Enhancement & Polish (Next Steps)
- [ ] Test website thoroughly on multiple devices
- [ ] Add mobile responsive optimizations
- [ ] Implement footer with links and social
- [ ] Create full About page with manifesto
- [ ] Configure custom domain (bedroomdirector.com) on Cloudflare Pages
- [ ] Add meta tags and SEO optimization
- [ ] Implement Open Graph images
- [ ] Add analytics (Plausible or PostHog)

---

### Phase 20: Scene Canvas – Chat-First Director Workspace (Planning & Buildout)
**Why**: Give bedroom directors a chat-first directing workspace where project chat is the source of truth for scenes, beats, and prompts.  
**Time Estimate**: 12–20 hours (MVP)  
**Impact**: Very High – becomes the place where projects actually live.

**Docs Source of Truth:**
- `scene-canvas-docs/scene-canvas-implementation-spec.md`
- `scene-canvas-docs/scene-canvas-strategic-analysis.md`
- `scene-canvas-docs/scene-canvas-chat-first-director-workspace.md`

**MVP Tasks:**
- [x] Add `ProjectChatPanel` to `/scene-canvas` with per-project message history in `SceneContext`.
- [x] Implement a stub `ProposeStructure` flow that turns recent chat into an outline and, on accept, creates `Scene` entities.
- [x] Wire the existing Reel Wall + Inspector to read/write chat-derived scene/beat fields (titles, notes, main prompt).
- [x] Ensure scenes, beats, and prompts store links back to originating chat messages for traceability.
- [x] Keep existing model selector + “Copy Prompt” + “Open Tool” flows as the execution layer.

**Additional Completed Tasks (Nov 19, 2025):**
- [x] Built `/api/director/chat` with OpenRouter integration and tool calling
- [x] Built `/api/director/structure` for AI-powered scene proposals
- [x] Built `/api/director/vision` for automatic image analysis
- [x] Integrated Supabase Storage for Visual Bible uploads
- [x] Created Timeline Rail with drag-and-drop reordering
- [x] Applied glassmorphism UI polish across entire workspace
- [x] Fixed chat persistence bug and scene creation logic

**Mode Experiments (Optional, behind a simple toggle):**
- [ ] Add internal modes inside Scene Canvas: `Director Chat` and `Scene Canvas` tabs (same route, different layout emphasis).
- [ ] Explore simple lenses like `Storyboard`, `Trailer Cut`, `Clips`, `Lookbook` as presets on top of the same chat-derived data.

**Success Criteria (MVP):**
- Creators can brain-dump into chat, accept a proposed structure, and then work in a canvas that stays in sync with that conversation.
- Scene Canvas feels consistent with the rest of the brand (colors, typography, W+K/Chiat/Day/Jobs hybrid voice) while clearly positioning itself as the “Director Chat + Canvas” workspace.

**Future Enhancements:**
- [ ] Configure Supabase project for user data
- [ ] Migrate to full database backend (Supabase)
- [ ] Add user authentication (email, social login)
- [ ] Implement advanced filtering (price range, skill level)
- [ ] Expand comparison experience (export, highlight differences toggle, save sets)
- [ ] Create tutorial/guide section
- [ ] Add newsletter signup and email campaigns

---

### Pricing & Feature Accuracy Audit (Ongoing w/ Gemini)
**Status**: Initial review completed Nov 4, 2025; Gemini is now extending the audit.  
**Deliverables so far**: `pricing-audit-findings.md`, refreshed Pika v2.2 pricing.

**Completed Checks:**
- Verified pricing + feature fields for Sora, Veo 3/3.1, Runway Gen-4/Turbo, Luma Dream Machine, Kling, Wan, Hailuo 02/2.3, Midjourney Video v1
- Updated Pika v2.2 pricing (Basic free, Standard $8/mo billed annually, etc.)
- Confirmed Kling + Seedance pricing remains partner-specific
- Added Gemini 2.5 Flash Image & Gemini 2.0 Flash Preview to the database

#### Phase 1 — Video Pricing Targets
- [ ] **Luma Ray 3** - Check Dream Machine pricing
- [ ] **Midjourney Video V1** - Verify included in existing subscriptions
- [ ] **Gen-3 Alpha Turbo** - Check Runway pricing vs Gen-4
- [ ] **PixVerse V5** - Verify free tier limits, Pro pricing
- [ ] **Seedance v1 Pro/Lite** - Check pricing differences
- [ ] **Jimeng AI 3.0** - Verify $10/mo, $90/year pricing accuracy
- [ ] **HunyuanVideo** - Check if still free, API pricing if available
- [ ] **Open-Sora 2.0** - Verify open-source status, compute costs
- [ ] **Mochi 1** - Check Genmo pricing
- [ ] **CogVideo-X** - Verify open-source availability
- [ ] **Firefly Video** - Check Adobe Creative Cloud integration pricing
- [ ] **Vidu Q2** - Verify Shengshu pricing
- [ ] **DoP I2V-01** - Check Higgsfield pricing

#### Phase 2 — Image Pricing Targets
- [ ] **FLUX 1.1 Pro/Ultra** - Verify Black Forest Labs API pricing
- [ ] **MAI-Image-1** - Check Azure/Copilot integration pricing (if announced)
- [ ] **Hunyuan Image 3.0** - Verify open-source, compute costs
- [ ] **Imagen 3/4** - Check Google AI Studio pricing
- [ ] **DALL-E 3** - Verify ChatGPT Plus pricing, API costs
- [ ] **Midjourney v7** - Check subscription tiers ($10/$30/$60)
- [ ] **Ideogram v3.0** - Verify pricing tiers
- [ ] **Recraft V3** - Check pricing
- [ ] **SD 3.5 Large/Medium** - Verify Stability AI pricing
- [ ] **Amazon Titan v2** - Check AWS Bedrock pay-per-use pricing
- [ ] **Firefly Image Model 5** - Verify Adobe subscription pricing
- [ ] **Leonardo Phoenix** - Check subscription vs free tier
- [ ] **SDXL** - Verify open-source, API platform pricing
- [ ] **gpt-image-1** - Check OpenAI API pricing
- [ ] **Playground v2.5** - Verify pricing

#### Phase 3 — Feature Accuracy Checks
- [ ] **Sora 2**: Verify max duration (20s Pro?), 4K showcase details
- [ ] **Veo 3.1**: Confirm 4K capability, audio features
- [ ] **Runway Gen-4**: Verify duration limits, resolution
- [ ] **FLUX 1.1 Kontext**: Confirm context-aware features
- [ ] **Kling 2.5 Turbo**: Verify "Turbo" speed improvements
- [ ] **Midjourney Video V1**: Confirm 5s limit, image-to-video only
- [ ] **NVIDIA Cosmos**: Verify 30s max, multi-view capabilities
- [ ] **Jimeng AI 3.0**: Confirm 2K resolution, 98% text accuracy claim
- [ ] **Hailuo 02**: Verify variant differences (Standard/Pro/Fast)
- [ ] **Wan 2.5**: Check improvements over 2.2
- [ ] **Ray 3**: Verify "reasoning video model" capabilities
- [ ] **Pika 2.2**: Confirm latest features
- [ ] **Luma Dream Machine**: Verify free tier limits
- [ ] **Stable Video 4D 2.0**: Confirm #1 benchmark claims
- [ ] **HunyuanVideo**: Verify open-source capabilities

#### Phase 4 — Documentation Updates
- [ ] Update CSV with corrected pricing (Pricing column)
- [ ] Add pricing notes to Notable Sources where needed
- [ ] Flag any discontinued models or pricing changes
- [ ] Create pricing comparison summary document (optional)

**Notes for Gemini**
- Use official sources: vendor websites, pricing pages, API documentation
- Note date of pricing verification in findings
- Flag uncertainty or conflicting information
- Capture both pay-per-use and subscription pricing
- Call out free tier limits and region-specific differences

**Output Format**
- Document everything in `pricing-audit-findings.md`
- Format: Model name, current CSV pricing, verified pricing, source URL, date checked
- Flag discrepancies with ⚠️ and suggest exact CSV text

---

## 🗂 BACKLOG & PLANNING

These are queued items that are not yet staffed. Prioritize based on user impact + data freshness before picking up anything outside Phase 18/19 or the pricing audit.

### Additional Model Research (Priority: Medium)
**Estimated Time**: 4-6 hours

**Models to Research & Potentially Add**:
- [ ] **Krea AI** - Real-time generation platform
- [ ] **Magnific AI** - Image upscaling (separate from Freepik integration)
- [ ] **Topaz Gigapixel AI** - Professional image upscaler
- [ ] **Artflow AI** - Character-consistent video generation
- [ ] **Viggle AI** - Character animation platform
- [ ] **Moonvalley** - Video generation (separate from Adobe Boards integration)
- [ ] **Hedra** - Character video generation
- [ ] **Any other major releases** from Oct 2024 - Jan 2025

**Research Requirements**:
- Verify it's a distinct platform/model (not just aggregator)
- Check if it has unique capabilities
- Confirm it's actively maintained
- Gather: pricing, features, resolution, speed, distinctive edge

### Consistency & Quality Audit (Priority: Medium)
**Estimated Time**: 6-8 hours

- [ ] **Column Formatting Standardization**
  - Review "Key Features" column for consistent formatting
  - Standardize "Controls" column descriptions
  - Ensure "Duration/Resolution" uses consistent units
  - Verify "Speed" column uses comparable metrics

- [ ] **Distinctive Edge Enhancement**
  - Review all entries for comparative information quality
  - Enhance entries that lack clear differentiation
  - Add competitive positioning where missing
  - Ensure "why choose this?" is clear

- [ ] **Drawbacks Completeness**
  - Check for entries missing drawbacks
  - Add realistic limitations
  - Balance against Distinctive Edge

- [ ] **Notable Sources Verification**
  - Verify URLs are accessible
  - Add dates where missing
  - Add authoritative sources (official announcements, benchmarks)
  - Flag any dead links

### Documentation Enhancements (Priority: Low)
**Estimated Time**: 2-3 hours

- [ ] Create visual comparison charts for major model families
- [ ] Add "Quick Start Guide" for database users
- [ ] Create pricing comparison tables by category
- [ ] Add model selection flowchart (which model for which use case?)
- [ ] Create API integration guide

### Database Structure Improvements (Priority: Low - Future)
**Estimated Time**: 8-10 hours

- [ ] Consider adding "Use Case Tags" column (marketing, film, social, enterprise, etc.)
- [ ] Add "API Availability" dedicated column (instead of Notable Sources note)
- [ ] Consider "Benchmark Scores" column for objective comparisons
- [ ] Add "Last Verified" date column for pricing accuracy tracking

---

## 📊 DATA SNAPSHOT

### Current Breakdown (156 entries):
- **IMAGE_GEN**: 39 entries
- **VIDEO_GEN**: 75 entries (+1: GEN3C-Cosmos-7B)
- **VOICE_AUDIO**: 9 entries (+2: Resemble.ai, Coqui TTS/XTTS)
- **MUSIC**: 6 entries
- **LIP_SYNC**: 5 entries
- **PLATFORM_AGGREGATOR**: 14 entries
- **POST_PROCESSING**: 2 entries
- **API_INFRASTRUCTURE**: 6 entries (updated: ComfyUI Cloud)

### Model Types:
- **Native Model**: ~97 entries
- **Platform Aggregator**: 14 entries
- **Hybrid**: Mix of both

### API Availability:
- **34 models** have fal.ai/Replicate API access noted
- Covers: VIDEO_GEN (27), IMAGE_GEN (4), VOICE_AUDIO (1), MUSIC (1), POST_PROCESSING (1)

---

## 🧭 OPERATIONS & REFERENCE

### Key Files & Scripts  
Full repo map lives in `agents.md` + `claude.md`; below are the essentials agents touch every day.
- **Database**: `data/ai_video_image_models.csv` (19 columns) with rolling backup in `data/backups/ai-video-image-models-backup.csv`.
- **Category & matrix doc**: `docs/core/03-model-categories.md` (counts + cross-platform tables).
- **Script suite** (all proven): `fix_platform_availability.py`, `update_api_platform_availability.py`, `fix_duplicate_platforms.py`, `add_new_models_2025.py`, `add_new_models_batch.py`.
- **Column Map**: Metadata → Vendor, Primary_Category, Model_Type, License_Type, Special_Flags, Skill_Level. Data → Best_For, Model, Modality, Key Features, Duration/Resolution, Controls, Speed, Pricing, License, Update Cadence, Distinctive Edge, Drawbacks, Notable Sources.

### Collaboration Workflow
1. **Before you start** – Read this doc, confirm no one else owns the task, log your name + start time.
2. **During execution** – Capture findings in a dedicated doc, track all sources/URLs/dates, and flag uncertainties loudly.
3. **After completion** – Update this TODO, link findings, refresh stats if counts changed, and note completion timestamps.
4. **When editing the DB** – Always create/verify a backup, test on a sample before bulk edits, document the delta, rerun counts, and update `docs/core/03-model-categories.md` if a category shifts.
5. **Naming conventions** – Scripts `{action}_{target}.py`, findings `{TASK}_FINDINGS.md`, backups `ai_video_image_models_BACKUP.csv`.

### Data Quality Checklist
- Pricing must cite free tier (if any), paid tiers, region, and verification date.
- Features focus on specific capabilities; avoid vague marketing copy.
- Distinctive Edge explains competitive advantage; Drawbacks highlight realistic trade-offs.
- Cite authoritative sources (vendor docs, announcements, benchmarks) with working URLs.
- Include measurable Speed + Duration/Resolution values.
- Cross-verify conflicting claims, capture regional differences, and log API availability consistently.

### Handy Commands & Snippets

**Add New Model**
```python
# Find last entry in category
# Insert new row after it
# Update documentation line numbers
# Update category counts
```

**Update Pricing**
```python
# Column index 13 (Pricing)
# Include free tier, paid tiers, API costs
# Note currency and region
# Add date to Notable Sources
```

**Add API Availability**
```python
# Append to Notable Sources (column 18)
# Format: "; Available via API: {platform names}"
# Update Cross-Platform Matrix if major model
```

**Common Queries**
```bash
# Count total entries
wc -l ai_video_image_models.csv

# Count by category
grep "VIDEO_GEN" ai_video_image_models.csv | wc -l

# Find specific model
grep -i "sora" ai_video_image_models.csv

# Check API availability
grep "Available via API" ai_video_image_models.csv
```

---

## ✅ COMPLETED PHASES

### Phase 17: Homepage & Tools Page UX Improvements (Nov 13-14, 2025)
**Status**: ✅ COMPLETED  
**Time Taken**: 2 hours  
**Impact**: High - improved user journey and consistent UX across site

**Homepage Layout Improvements:**
- ✅ **Reordered Sections for Better Story Flow**
  - New order: Hero → FeaturedTools → TrendingCreations → PromptLibraryTeaser → LatestDrops → BrandsUsingAI → AboutSection
  - Clear CTA journey: Vision → Action → Inspiration → Learning → Discovery → Credibility → Movement
  - Reduced "tool fatigue" by spacing out tool sections

- ✅ **Created PromptLibraryTeaser Component**
  - Showcases 3 featured prompts
  - "NEW!" badge to draw attention
  - "Steal These Prompts" heading (W+K energy)
  - Quick preview cards with hover actions
  - CTA: "Browse All Prompts"
  - Integrated into homepage flow

- ✅ **Made FeaturedTools More Compact**
  - Reduced padding (py-24 → py-16)
  - Smaller heading (text-5xl → text-4xl)
  - Renamed to "Your Arsenal" (consistent branding)
  - Tighter spacing for better pacing

- ✅ **Fixed Naming Conflicts**
  - FeaturedTools: "Your Arsenal" (weapons you use)
  - PromptLibraryTeaser: "Steal These Prompts" (instructions you copy)
  - Clear distinction between sections
  - W+K rebellious energy maintained

**Tools Page Layout Improvements:**
- ✅ **Compact Hero Section**
  - "Your Arsenal" title
  - Live stats: "140 AI creative tools. 6 new this week."
  - Twilight gradient background
  - Film grain texture

- ✅ **Sticky Filter Bar**
  - Stays at top while scrolling (below header)
  - Categories + Sort + Search in one compact bar
  - Quick category toggles (All, Video, Image, Voice, etc.)
  - Sort options: Featured, Newest, A-Z
  - Responsive: stacks on mobile, single row on desktop

- ✅ **Sort Functionality**
  - Featured (default - shows best tools first)
  - Newest (by date_added field)
  - Alphabetical (A-Z by model name)
  - Visual feedback with active states

- ✅ **Consistent UX with Prompts Page**
  - Same sticky filter pattern
  - Same compact hero approach
  - Same search bar styling
  - Familiar navigation experience

**Key Improvements:**
- ✅ Homepage tells a clear story (vision → action → inspiration)
- ✅ Prompt Library featured prominently on homepage
- ✅ Tools page matches Prompts page UX
- ✅ Sticky filters on both Tools and Prompts pages
- ✅ Consistent branding and naming across site
- ✅ Mobile responsive throughout

**Files Modified:**
- `bedroom-director-web/src/app/page.tsx` (homepage reorder)
- `bedroom-director-web/src/components/home/PromptLibraryTeaser.tsx` (new component)
- `bedroom-director-web/src/components/home/FeaturedTools.tsx` (compact version)
- `bedroom-director-web/src/components/tools/ToolsClient.tsx` (improved layout)

---

### Phase 16: Prompt Library MVP 📚 (Nov 13-14, 2025)
**Status**: ✅ COMPLETED  
**Time Taken**: 8 hours  
**Impact**: High - addresses primary user pain point (inspiration & learning)

**Completed Tasks:**
- ✅ **Prompt Data Structure**
  - Created JSON schema with comprehensive fields
  - Built `prompts.json` with 15 high-quality sample prompts
  - Fields: id, title, slug, prompt_text, result_image/video, category, tool_used, style_tags, outcome_type, settings, author, likes, views, date_added, featured, tips

- ✅ **Data Loader & Utilities**
  - Created `prompts.ts` with TypeScript interfaces
  - Built utility functions: getAllPrompts, getFeaturedPrompts, getPromptBySlug, searchPrompts, filtering by category/style/outcome
  - Sorting functions: newest, most liked, most viewed

- ✅ **Prompt Card Component**
  - Visual-first design (80% result preview, 20% metadata)
  - Hover magic: full prompt reveals with overlay
  - Social proof: "Tried by X" counters
  - Pro tip previews
  - One primary action: "Try This Prompt"
  - Featured badges and category color-coding

- ✅ **Prompt Library Page (/prompts)**
  - Compact hero: "The Arsenal" → "Steal These Prompts"
  - Sticky filter bar with categories + sort + search
  - Quick category toggles (All, Video, Image, Voice, Music)
  - Sort options: Newest, Most Liked, Most Viewed
  - Search functionality
  - Responsive grid layout
  - Results count display

- ✅ **Individual Prompt Detail Pages (/prompts/[slug])**
  - Full prompt display with result preview
  - Tool information and settings
  - Style tags and author info
  - Pro tips section
  - "Try This" CTA with auto-copy

- ✅ **"Try This" Functionality**
  - Auto-copy prompt to clipboard
  - Toast notifications for user feedback
  - Opens tool page in new tab after notification
  - Zero-friction workflow

- ✅ **UX Enhancements (Creative Team Recommendations)**
  - W+K Energy: "Steal These Prompts", "Tried by X" social proof
  - Jobs Clarity: One primary action, simplified card design
  - Chiat/Day Elegance: Pro tip previews, thoughtful spacing
  - Hybrid approach: Visual-first + zero-friction + social

- ✅ **Navigation Integration**
  - Added "Prompts" link to header (desktop + mobile)
  - Created PromptLibraryTeaser component for homepage
  - Integrated into homepage flow

- ✅ **Documentation**
  - Created `managing-prompts.md` comprehensive guide
  - Documented JSON schema and field explanations
  - Added best practices for curating prompts
  - Included submission guidelines

**Key Features Delivered:**
- 15 curated sample prompts
- Sticky filter bar (stays visible while scrolling)
- Toast notifications for copy/try actions
- Social proof counters ("Tried by X")
- Hover overlays with full prompt text
- One-click workflow from inspiration to creation
- Consistent UX with Tools page

**Git Commits:**
- Commit 5e26e7c: "feat: enhance Prompt Library UX with creative team recommendations"
- Commit 9587e9b: "feat: add quick category toggle buttons to Prompt Library"

---

### Phase 15: Homepage Refinement & Dynamic Data Backend (Nov 13, 2025 - 2:00pm)
- ✅ **Hero Section Mobile Optimization:**
  - Implemented scroll-triggered content reveal on mobile (video-first approach)
  - Added subtle fade-in effect on desktop for cinematic entrance
  - Hidden W+K copy and CTA buttons on mobile to let video breathe
  - Enhanced scroll indicator with text hint for better UX
  - Content stays visible once revealed (no disappearing on scroll up)

- ✅ **Homepage Content Strategy:**
  - Replaced SaaS-style StatsSection with "Trending AI Creations" (user research validated)
  - Added "Brands Using AI" section for social proof
  - Added "Latest Drops" section for freshness and discovery
  - Aligned all sections with "90s theme park at twilight" aesthetic

- ✅ **Trending AI Creations System:**
  - Created JSON data structure (`creations.json`) with 3 sample creations
  - Built TypeScript data loader with search/filter utilities
  - Implemented dynamic TrendingCreations component (pulls from JSON)
  - Created full showcase page (`/showcase`) with category filtering
  - Built individual creation detail pages (`/showcase/[slug]`)
  - Added comprehensive documentation (`managing-creations.md`)

- ✅ **Tools Database Refactor:**
  - Switched from CSV to JSON parsing (faster, cleaner)
  - Added `featured`, `date_added`, `is_new` fields to 140 models
  - Updated 7 tools as featured, 6 tools as new
  - Refactored data loader to use `models.json` directly
  - Removed Papa Parse dependency (no longer needed)

- ✅ **Dynamic Homepage Components:**
  - TrendingCreations: Pulls from `creations.json`
  - LatestDrops: Pulls newest tools from `models.json` (is_new flag)
  - FeaturedTools: Pulls featured tools from `models.json` (featured flag)
  - BrandsUsingAI: Placeholder structure for brand logos

- ✅ **Git Commits:**
  - Commit 3138aa4: "feat: implement dynamic data backend for trending creations and tools"
  - All changes pushed to GitHub

**Current Status:**
- ✅ Single source of truth: `models.json` for all tools/models
- ✅ No more hardcoded data in components
- ✅ Easy content management via JSON files
- ✅ Automatic featured and latest tools sections
- ✅ Full showcase system with detail pages

### Phase 14: Production Deployment & Pro Tips Integration (Nov 8, 2025 - 4:00pm - 8:30pm)
- ✅ **Pro Tips Feature Integration:**
  - Synced CSV with Pro Tips column to website (141 tools + 4 new models with Pro Tips)
  - Added `proTips` field to TypeScript Tool interface
  - Updated CSV data loader to parse Pro Tips column
  - Added Pro Tips display to tool detail pages (purple callout box with 💡 icon)
  - Added Pro Tips badge to tool cards (shows when tool has Pro Tips)
  - Example: Imagen 3 Nano Banana Pro Tip about character swap workflow

- ✅ **Cloudflare Pages Deployment - Build Fixes:**
  - Fixed Next.js 16 static export build errors:
    - Added Suspense wrapper for useSearchParams in `/app/tools/page.tsx`
    - Added `export const dynamic = 'force-static'` to `robots.ts` and `sitemap.ts`
    - Moved viewport/themeColor to separate export in `layout.tsx`
  - Successfully built 146 static pages locally (141 tools + 5 core pages)
  - Identified root cause: Cloudflare was deploying from old commit (fb5764b instead of latest)

- ✅ **Direct Deployment via Wrangler CLI:**
  - Compressed hero video: 33 MB → 5 MB (Cloudflare Pages 25 MB file limit)
  - Deployed successfully using Wrangler CLI (bypassed Git commit hash issue)
  - Live deployment: https://bedroom-director.pages.dev
  - Created comprehensive deployment documentation with troubleshooting guide

- ✅ **Bug Fixes & Asset Management:**
  - Fixed missing CSV file in `public/` folder (required for production build)
  - Fixed missing hero video issue (re-added compressed 5MB version)
  - Restored cinematic twilight director's chair video background on homepage

- ✅ **Documentation Updates:**
  - Created `deployment.md` with Git-based and Wrangler CLI deployment methods
  - Added troubleshooting section for common Cloudflare Pages errors
  - Documented exact build settings and requirements
  - Added step-by-step Wrangler CLI deployment instructions (recommended method)

- ✅ **Git Commits & Version Control:**
  - Commit 967d8e4: "Complete Phase 14: Production-ready deployment + Pro Tips feature"
  - Commit 24b07da: "Add troubleshooting guide for Cloudflare /tools prerender error"
  - Commit 0a6fab0: "Fix deployment: Add CSV data, compress hero video to 5MB (was 33MB)"
  - Commit 838017f: "Add Wrangler CLI deployment method to docs"
  - Commit 6358d2e: "Restore hero video (5MB compressed)"
  - All commits pushed to GitHub: `github.com/Arugami/bedroom-director`

**Current Website Status:**
- ✅ **Production Deployed:** https://bedroom-director.pages.dev
- ✅ **All Features Working:** 141 tools, Pro Tips, search, filtering, dynamic routes
- ✅ **Performance Optimized:** 5MB hero video, compressed images, static generation
- ✅ **Build Status:** 146 pages generated successfully (Next.js 16 static export)

---

### Phase 13: Website Foundation & Data Integration (Nov 8, 2025)
- ✅ **Git Repository Setup:**
  - Initialized git repository
  - Created proper .gitignore for Node.js + Python projects
  - Created public GitHub repository: `github.com/Arugami/bedroom-director`
  - Initial commit with all project files (189 files, 32,842 insertions)
  - Created GitHub-facing README with badges and project structure

- ✅ **CSV Database Integration:**
  - Connected 157 AI tools from CSV to Next.js website
  - Copied CSV to public folder for file system access
  - Updated data loader for production compatibility
  - Verified all 19 data fields loading correctly

- ✅ **Tool Listing & Filtering:**
  - Built category filtering system (8 categories)
  - Implemented search functionality (model name, vendor, features)
  - Created enhanced tool cards with pricing, speed, "best for" tags
  - Built comprehensive tool detail pages with all 19 fields
  - Added URL parameter support for search and category filters

- ✅ **Visual Design Refinements:**
  - Removed excessive neon text glows (stats, headings)
  - Removed palm tree silhouettes (didn't match aesthetic)
  - Simplified hero design to clean modern aesthetic
  - Replaced heavy neon effects with subtle purple accents
  - Improved visual hierarchy and content focus
  - Added atmospheric haze and gradient overlays

- ✅ **Component Updates:**
  - Enhanced Hero section with cleaner container design
  - Updated Header with subtle hover effects
  - Refined Stats section with minimal glow effects
  - Improved About section typography
  - Added responsive tool card grid layout

**Current Website Status:**
- Homepage: Complete with Hero, Stats, Featured Tools, About sections
- Tools Page: Fully functional with search, filtering, and real data
- Tool Detail Pages: Dynamic routes with comprehensive information
- Design: Clean, modern, purple-accented aesthetic
- Data: 157 tools from CSV fully integrated

**Tech Stack In Use:**
- Frontend: Next.js 16 + TypeScript + TailwindCSS
- UI Components: Lucide Icons + Custom components
- Data: CSV → JSON via Papa Parse
- Styling: Custom utilities + Tailwind + CSS effects

### Phase 12: Website Development & Asset Optimization (Nov 5, 2025 - 9:30pm - 9:56pm)
- ✅ **Image Compression:** Compressed 6 large PNG files (5.9MB-8.4MB) to JPEG (915KB-1.7MB)
  - Used macOS `sips` tool with 85% quality
  - All images now under 5MB API limit
  - Converted cinematic wallpaper images for web optimization
- ✅ **Image Implementation:**
  - Added director silhouette background to Hero section (40% opacity)
  - Added palm tree background to About section (20% opacity)
  - Added AI projector beam to Featured Tools section (30% opacity)
- ✅ **Strategic Image Placement:**
  - Hero: Director silhouette (dramatic, mysterious)
  - About: Palm tree (Hollywood/California vibes)
  - Featured Tools: AI projector beam (thematic match for AI tools)
- ✅ **Remaining Assets:** 3 additional images available for footer, blog headers, additional pages
- ✅ **Midjourney Prompts:** Created comprehensive prompt library for product photography
  - Energy drink cans (convenience store, dashboard, neon backdrop)
  - Slushie cups (car dashboard, drive-in, close-ups)
  - Lifestyle shots (bedroom studio, late night sessions, gas station)
  - BD Burger / Fast food mockups
  - Theme park attractions and posters
  - Movie posters and theater marquees

### Phase 11: World-Building & Universe Development (Nov 5, 2025 - 10:00am - 12:00pm)
- ✅ Created `bedroom-director-universe.md` - Complete world bible for brand universe
- ✅ **90s/Early 2000s Theme Park Aesthetic** - Universal Studios Florida circa 1998 inspiration
- ✅ **Visual Direction:** VHS grain, practical effects, neon signage, disposable camera quality
- ✅ **Color Palette Expansion:** Added Retro Teal, Sunset Orange to existing purple/pink/blue
- ✅ **Fictional Cinematic Universe:**
  - BD Burger / The Fuel Stop (fast food chain with "The Creator's Kit" Happy Meal)
  - The Premiere Theater (movie theater chain showing BD Studios films)
  - BD Rentals (Blockbuster-style rental store for tutorials/inspiration)
  - BD Studios Productions (fictional movie studio)
  - BD Convenience Store / Fuel Stop (24/7 creative supplies)
  - The Bedroom Director Drive-In (community screenings)
- ✅ **Bedroom Fuel Product Line:**
  - Energy drink cans (red/white/blue - 90s extreme sports aesthetic)
  - Slushie cups (purple/pink gradient - lifestyle aesthetic)
  - Four flavors: Purple Haze, Blue Hour, Golden Rush, Night Vision
- ✅ **Fictional Films:** "Purple Nights", "The Backlot", "Bedroom Fuel: Origins", "Final Cut"
- ✅ **Theme Park Attractions:**
  - "The Purple Nights Experience" (dark ride)
  - "The Backlot Tour" (boat ride through bedroom studios)
  - "Bedroom Fuel: The Ride" (roller coaster)
  - "From Bedroom to Big Screen" (3D/4D theater)
- ✅ **Roadside Advertising:** Billboard concepts for BD Burger, "Purple Nights", Bedroom Fuel
- ✅ **Photo Opportunities:** BD Studios entrance, character meet & greets, family vacation aesthetic
- ✅ **Typography Inspiration:** Blockbuster Video, Universal Studios, Nickelodeon, MTV, 90s WordArt

### Phase 10: Brand Identity & Arugami Integration (Nov 4, 2025 - 7:00pm - 7:40pm)
- ✅ Created `research/arugami-integration-strategy.md` - Complete integration strategy for Arugami Studios + Bedroom Director
- ✅ **Selected brand name:** "Bedroom Director" (bedroomdirector.com + bedroomdirector.ai)
- ✅ Created `brand-identity.md` - Complete brand guidelines, messaging, visual identity
- ✅ **Positioning:** "From bedroom to big screen" - Empowering bedroom creators to compete with studios
- ✅ **Integration plan:** Keep separate initially, test synergies, evaluate merger in 6-12 months
- ✅ **Created Creative Partner Documents:**
  - `research/creative-partner-wieden-kennedy.md` - Rebellion approach
  - `research/creative-partner-chiat-day.md` - Reverence approach
  - `research/creative-partner-steve-jobs.md` - Clarity approach (includes full keynote speech)
  - `research/creative-partner-hybrid.md` - Combined approach
  - `research/creative-partners-index.md` - Quick reference guide
- ✅ **Updated all website documentation** with Bedroom Director branding
- ✅ **Added Jobs' 5 Persuasion Principles** to `website/design-spec.md` with actionable copy examples
- ✅ **Project cleanup:** Organized files, archived temp docs, updated indexes

### Phase 9: Strategy & Research (Nov 4, 2025 - 6:35pm)
- ✅ Created `research/advisory-targets.md` - Who to consult (Reddit, influencers, model providers)
- ✅ Created `research/research-findings-live.md` - Live research on user pain points, Midjourney success, monetization
- ✅ Created `research/competitive-analysis.md` - Competitor analysis (Futurepedia, PromptHero, Civitai)
- ✅ Created `research/positioning-strategy.md` - "The AI Creative Studio" positioning
- ✅ Created `website/enhanced-ux-vision.md` - Complete UX strategy with prompt library + community
- ✅ Created `website/visual-mockups.md` - Detailed UI mockups
- ✅ **Clarified positioning:** Discovery & education platform (guide, not generator)
- ✅ **Updated all documentation** to reflect correct positioning

### Phase 8: Reve Video & Trending Module Prep (Nov 4, 2025 - 7:30pm)
- ✅ Added new rows for `Reve Video (Veo 3.1 powered)`, `Reve Fast Edit`, and `Reve Fast Remix` with pricing, controls, and source links (blog.reve.com, fal.ai).
- ✅ Logged distribution updates (Replicate MiniMax Hailuo 2.3 Fast, Freepik Spaces) in `notes/emerging-models.md`.
- ✅ Created `notes/trending-ads.md` to track headline AI campaigns (Coca-Cola 2025, Reve community showcases).
- ✅ Drafted `website/content/trending-module.md` outlining schema, workflow, and UX guidelines for the "Trending AI Ads & Shorts" section.
- ✅ **Database now at 156 entries total**

### Phase 7: Pricing & Feature Accuracy Audit (Nov 4, 2025 – 6:10 pm)
- ✅ Cross-checked pricing/feature fields for top video/image models
- ✅ Created `pricing-audit-findings.md` summarizing sources & status
- ✅ Updated `Pika v2.2` pricing to current plan details
- ✅ Confirmed existing entries for Sora, Veo, Runway, Luma, Wan, Hailuo, Midjourney remain accurate

### Phase 7: Platform Updates & Project Reorganization (Nov 4, 2025 - 4:45pm)
- ✅ Updated ComfyUI entry with Comfy Cloud public beta details (Nov 4, 2025)
  - $20/mo with NVIDIA A100 GPUs, 400+ models, 17 extensions
  - Browser-based access, no installation required
- ✅ Updated Veo 3.1 Fast with Gemini Ultra unlimited access
  - Google AI Ultra ($249.99/mo) offers true unlimited generation
  - No daily caps or throttling confirmed
- ✅ Added NVIDIA GEN3C-Cosmos-7B to VIDEO_GEN category (line 111)
  - 3D-informed video generation with precise 6DOF camera control
  - CVPR 2025 Highlight, open-source
- ✅ Added Qwen-Image-2509-MultipleAngles to EMERGING_MODELS.md
  - Camera angle control for single images
  - Tracked for future IMAGE_EDITING category
- ✅ **Full Project Reorganization:**
  - Created clean folder structure: `docs/`, `data/`, `scripts/`, `research/`
  - Moved all documentation to `docs/` folder
  - Moved Python scripts to `scripts/` (maintenance/, updates/, utilities/)
  - Moved database to `data/` folder
  - Moved backups to `data/backups/`
  - Created `docs/00-index.md` comprehensive documentation index
  - Updated README.md to v3.0 with new structure
- ✅ **Database now at 153 entries total**

### Phase 6: Final Voice Model Additions (Nov 4, 2025 - 4:25pm)
- ✅ Added Resemble.ai to VOICE_AUDIO category (line 121)
  - Real-time Speech-to-Speech voice conversion
  - Clone once, speak in 60+ languages
  - API-first platform with emotional control
- ✅ Added Coqui TTS/XTTS to VOICE_AUDIO category (line 122)
  - Open-source TTS toolkit (ex-Mozilla team)
  - Cross-lingual voice cloning (3-sec sample → 13+ languages)
  - Self-hostable, fine-tunable models
- ✅ Updated `docs/core/03-model-categories.md`:
  - Updated total count (150 → 152 entries)
  - Updated VOICE_AUDIO category (7 → 9 entries)
  - Updated all line number ranges for categories
  - Updated statistics section
- ✅ **Database now at 152 entries total**

### Phase 5: Executive Summary Review & Voice Model Research (Nov 4, 2025 - 4:20pm)
- ✅ Converted `research/executive-summary.md` to `research/Executive_Summary.md`
- ✅ Reviewed Executive Summary content for missing models
- ✅ Verified existing database coverage (most models already cataloged)
- ✅ Researched 3 potentially missing models:
  - Animate Anyone → Already in database as "Wan 2.2 Animate 14B" (Alibaba)
  - Resemble.ai → Confirmed relevant (real-time Speech-to-Speech capability)
  - Coqui TTS/XTTS → Confirmed relevant (open-source foundation, cross-lingual cloning)

### Phase 4: New Model Additions (Nov 4, 2025 - 3:00pm)
- ✅ Researched 7 new models from Nov 2024 - Jan 2025 releases
- ✅ Added 3 IMAGE_GEN models:
  - MAI-Image-1 (Microsoft - first in-house image generator)
  - Hunyuan Image 3.0 (Tencent - 80B params, world's largest open-source)
  - Amazon Titan Image Generator v2 (AWS Bedrock enterprise)
- ✅ Added 4 VIDEO_GEN models:
  - Midjourney Video V1 (first video model from Midjourney)
  - NVIDIA Cosmos Predict 2.5 (physical AI, 30s world simulation)
  - Jimeng AI 3.0 (ByteDance - 2K cinematic, DeepSeek R1)
  - Stable Video 4D 2.0 (Stability AI - #1 benchmark 4D generation)
- ✅ **Script**: `add_new_models_2025.py` (executed successfully)
- ✅ Updated documentation with new counts (143 → 150 entries)

### Phase 3: API Platform Research & Updates (Nov 4, 2025 - 2:00pm)
- ✅ Researched fal.ai platform (found 50+ video models)
- ✅ Researched Replicate platform (found 30+ video models with pricing benchmarks)
- ✅ Created API availability mapping for 34 models
- ✅ **Script**: `update_api_platform_availability.py` (executed successfully)
- ✅ **Script**: `fix_duplicate_platforms.py` (cleaned 5 entries with duplicate platform names)
- ✅ Added "Available via API: fal.ai, Replicate" to Notable Sources column
- ✅ Enhanced Cross-Platform Matrix with 4 new tables (Sora, Wan, Hailuo, FLUX families)
- ✅ **Total Updates**: 34 entries

### Phase 2: Cross-Platform Documentation (Nov 4, 2025 - 11:30am)
- ✅ Created comprehensive Cross-Platform Model Access Matrix
- ✅ Added 5 initial model family tables (Runway, Kling, Veo, Luma Ray, Multi-Model Aggregators)
- ✅ Enhanced platform descriptions with full model lists
- ✅ Updated `03_MODEL_CATEGORIES.md` with cross-platform insights

### Phase 1: Platform Availability Fixes (Nov 4, 2025 - 11:30am)
- ✅ Fixed Kling model availability (added Higgsfield platform notes - 4 entries)
- ✅ Fixed Runway model availability (added platform aggregator notes - 3 entries)
- ✅ Updated collaborative platform model lists (Freepik, Figma Weave, Flora - 4 entries)
- ✅ **Script**: `fix_platform_availability.py` (executed successfully)
- ✅ **Total Updates**: 11 entries

---

**END OF MASTER TODO**
**Next Update**: After Gemini completes pricing audit
**Contact**: User will coordinate between AI agents
