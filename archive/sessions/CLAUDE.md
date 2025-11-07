# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Bedroom Director** (bedroomdirector.com) is an AI creative tool discovery and education platform. The project maintains a comprehensive database of 156 AI tools across 8 categories (video, image, voice, music, lip sync, platform aggregators, post-processing, and API infrastructure).

**Positioning:** Discovery & education platform - we help bedroom creators find and learn to use AI tools effectively. Users create on external platforms (Sora, Midjourney, Runway, etc.); we guide them to choose wisely.

**Mission:** Democratizing filmmaking through AI - empowering bedroom creators to compete with big studios.

---

## Repository Structure

```
AI_Image_Video_App/
├── data/                    # Database files (CSV source of truth, JSON for web)
├── docs/                    # All documentation (user guides, schema, implementation)
├── research/               # Research materials, competitive analysis, strategy
├── scripts/                # Python maintenance scripts
│   ├── maintenance/        # CSV fixes and reorganization
│   ├── updates/           # Model addition scripts
│   └── utilities/         # Sync and conversion tools
├── website/               # Website design specs and architecture
├── notes/                 # Working notes, emerging models
└── archive/               # Deprecated files
```

---

## Common Development Commands

### Database Operations

**View database structure:**
```bash
head -5 data/ai_video_image_models.csv
```

**Count total entries:**
```bash
wc -l data/ai_video_image_models.csv
# Should return 157 (156 models + 1 header row)
```

**Count by category:**
```bash
grep "VIDEO_GEN" data/ai_video_image_models.csv | wc -l
grep "IMAGE_GEN" data/ai_video_image_models.csv | wc -l
```

**Find specific model:**
```bash
grep -i "sora" data/ai_video_image_models.csv
```

**Sync CSV to JSON:**
```bash
python3 scripts/utilities/sync_to_json.py
```

### Python Script Development

**Run maintenance scripts:**
```bash
python3 scripts/maintenance/fix_platform_availability.py
python3 scripts/maintenance/fix_duplicate_platforms.py
```

**Add new models:**
```bash
python3 scripts/updates/add_new_models_2025.py
```

All Python scripts automatically create backups in `data/backups/` before modifying the CSV.

---

## Database Architecture

### CSV Schema (19 columns)

**Metadata (6 columns):**
- Vendor
- Primary_Category (IMAGE_GEN, VIDEO_GEN, VOICE_AUDIO, MUSIC, LIP_SYNC, PLATFORM_AGGREGATOR, POST_PROCESSING, API_INFRASTRUCTURE)
- Model_Type (Native Model, Open-Source, Platform Aggregator, Hybrid)
- License_Type (Open-Source, Proprietary, Closed-Source, Mixed)
- Special_Flags (NSFW, Beta, etc.)
- Skill_Level (Beginner, Intermediate, Advanced)

**Data (13 columns):**
- Best_For, Model, Modality, Key Features, Duration/Resolution, Controls, Speed, Pricing, License, Update Cadence, Distinctive Edge, Drawbacks, Notable Sources

### Database as Source of Truth

The `data/ai_video_image_models.csv` file is the **single source of truth**. All scripts read from and write to this file. The JSON version (`data/models.json`) is generated from the CSV for web consumption.

### Critical Rules for Database Changes

1. **Always backup first** - Scripts handle this automatically via rolling backup to `data/backups/ai_video_image_models_BACKUP.csv`
2. **Verify row counts** before and after changes
3. **Update documentation** if categories or counts change (see `docs/03_MODEL_CATEGORIES.md`)
4. **Maintain consistent formatting** - review existing entries for style
5. **Include sources** - All pricing and feature claims need official source URLs with dates

---

## Brand Identity

### Core Messaging
- **Name:** Bedroom Director
- **Tagline:** "From bedroom to big screen"
- **Positioning:** Empowering bedroom creators to compete with studios through AI

### Visual Identity
```
Colors:
- Director Black:    #0F172A  (Background)
- Bedroom Purple:    #8B5CF6  (Primary)
- Screen White:      #F8FAFC  (Text)
- Spotlight Yellow:  #FCD34D  (Highlights)
- Action Red:        #EF4444  (CTAs)

Typography:
- Font: Inter (all weights)
- Headings: Bold (700)
- Body: Regular (400)
```

See `BRAND_IDENTITY.md` for complete guidelines and messaging framework.

---

## Tech Stack (Future Website)

**Frontend:**
- Next.js 14+ (App Router with Static Export)
- React 18+ with TypeScript
- TailwindCSS + shadcn/ui components
- Framer Motion for animations

**Database & Backend:**
- Supabase (PostgreSQL) - migrate from CSV
- Supabase Edge Functions for serverless

**Search:**
- Meilisearch or Supabase full-text search
- Fuzzy search with typo tolerance

**Deployment:**
- Cloudflare Pages (static hosting)
- Cloudflare Workers (AI features)
- GitHub for version control

See `website/TECHNICAL_ARCHITECTURE.md` for complete technical specifications.

---

## Working with Python Scripts

### Script Naming Convention
```
{action}_{target}.py
```
Examples: `fix_platform_availability.py`, `update_api_platform_availability.py`, `add_new_models_2025.py`

### Python Script Template Structure

When modifying database scripts:

1. **Import CSV safely** using `csv.DictReader`
2. **Create backup** before any modifications
3. **Track changes** with counter variables
4. **Verify data** before writing
5. **Update line numbers** if categories change
6. **Report results** clearly

Example pattern:
```python
import csv
import shutil
from datetime import datetime

# Backup first
shutil.copy('data/ai_video_image_models.csv',
            'data/backups/ai_video_image_models_BACKUP.csv')

# Read CSV
rows = []
with open('data/ai_video_image_models.csv', 'r') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

# Make changes
changes = 0
for row in rows:
    # ... modify row
    changes += 1

# Write back
with open('data/ai_video_image_models.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=reader.fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f"Updated {changes} entries")
```

---

## Documentation Standards

### Research Standards
- Prefer **official sources** (vendor websites, documentation, announcements)
- Include **publication dates** with all references
- Cross-reference **conflicting information**
- Note **regional differences** in pricing or availability
- Verify claims with **multiple sources** when possible

### Database Entry Quality Requirements

**Pricing:** Must include free tier if available, note regions, include verification date

**Features:** Specific capabilities, not marketing fluff

**Distinctive Edge:** Comparative information explaining "why this over competitors"

**Drawbacks:** Realistic limitations for balanced view

**Notable Sources:** Official URLs, benchmarks, dates. Format: `url1; url2; Available via API: platform1, platform2`

**Speed:** Comparable metrics (seconds, minutes, real-time)

**Resolution:** Specific dimensions or quality tiers

---

## Key Files Reference

**Project Management:**
- `MASTER_TODO.md` - Project task tracker and coordination hub
- `README.md` - Main project overview
- `READY_TO_BUILD.md` - Pre-development checklist

**Brand & Design:**
- `BRAND_IDENTITY.md` - Complete brand guidelines
- `LOGO_DESIGNER_BRIEF.md` - Logo specifications
- `website/DESIGN_SPEC.md` - Complete design system
- `website/VISUAL_MOCKUPS.md` - UI mockups

**Database:**
- `data/ai_video_image_models.csv` - Main database (156 entries)
- `data/models.json` - JSON version for web
- `docs/02_ENHANCED_SCHEMA.md` - Complete schema documentation
- `docs/03_MODEL_CATEGORIES.md` - Category breakdown with cross-platform matrix

**Implementation:**
- `website/TECHNICAL_ARCHITECTURE.md` - Technical specs and architecture
- `docs/06_WEBSITE_IMPLEMENTATION_GUIDE.md` - Website implementation roadmap
- `docs/04_USER_JOURNEY_GUIDE.md` - User journey maps and flows

---

## Multi-Agent Coordination

When multiple AI agents work on this project:

**Before starting work:**
1. Read `MASTER_TODO.md`
2. Check what's in progress
3. Mark your task as "in progress" with name/agent and timestamp
4. Note dependencies

**While working:**
1. Create detailed findings documents (format: `{TASK}_FINDINGS.md`)
2. Use consistent formatting
3. Note all sources with URLs and dates
4. Flag uncertainties clearly

**After completing:**
1. Update `MASTER_TODO.md` (mark complete, add completion date)
2. Link to findings document
3. Update database statistics if changed
4. Verify backups were created

---

## Quality Standards

### Adding New Models

When adding new AI models to the database:

1. **Research thoroughly** - Verify it's distinct, actively maintained, with unique capabilities
2. **Gather complete info** - Pricing (with tiers and dates), features, resolution, speed, distinctive edge, realistic drawbacks
3. **Find authoritative sources** - Official announcements, documentation, benchmarks
4. **Insert in correct category** - Follow existing category organization in CSV
5. **Update documentation** - Update line numbers in `docs/03_MODEL_CATEGORIES.md`
6. **Sync to JSON** - Run `python3 scripts/utilities/sync_to_json.py`

### Pricing Verification

- Include **currency** and **region**
- Note **free tier** availability and limits
- Document **subscription tiers** with exact pricing
- Add **API costs** if available
- Include **verification date** in Notable Sources
- Flag **regional differences** explicitly

### Code Quality (Future Website Development)

- Use **TypeScript** for type safety
- Follow **React best practices** (hooks, composition)
- Implement **accessible components** (ARIA, keyboard navigation)
- Optimize **performance** (lazy loading, code splitting, image optimization)
- Write **semantic HTML**
- Ensure **mobile responsiveness**

---

## Current Database Statistics (as of Nov 4, 2025)

- **Total:** 156 entries
- **IMAGE_GEN:** 39 entries
- **VIDEO_GEN:** 75 entries
- **VOICE_AUDIO:** 9 entries
- **MUSIC:** 6 entries
- **LIP_SYNC:** 5 entries
- **PLATFORM_AGGREGATOR:** 14 entries
- **POST_PROCESSING:** 2 entries
- **API_INFRASTRUCTURE:** 6 entries

**API Availability:** 34 models have fal.ai/Replicate API access documented

---

## Development Philosophy

### Positioning Clarity
This is a **discovery and education platform**, not a generation platform. We help users:
- **Find** the right AI tools for their needs
- **Learn** how to use tools effectively
- **Access** tools through official and third-party platforms
- **Compare** options with transparent, research-backed information

Users create on external platforms - we guide them to choose wisely and use tools effectively.

### User-First Design
- **Intent-based navigation** - Guide by what users want to create, not technical jargon
- **Multi-dimensional filtering** - Capability tags, skill levels, budgets, platforms
- **Platform access info** - Show WHERE to use each model
- **Warning system** - Prevent common mistakes before they happen
- **Verified research** - All claims backed by official sources

---

## Common Pitfalls to Avoid

1. **Don't modify CSV without backup** - Scripts handle this, but verify
2. **Don't skip documentation updates** - Category counts, line numbers must stay accurate
3. **Don't add unverified information** - Require official sources for all claims
4. **Don't mix positioning** - We are discovery/education, not a generation platform
5. **Don't create generic entries** - Each model needs specific, comparative distinctive edge
6. **Don't ignore drawbacks** - Balanced view builds trust
7. **Don't forget date stamps** - Pricing and features change; dates are critical

---

## Getting Help

**For documentation questions:**
- Start with `docs/00_INDEX.md` for navigation
- Check role-specific sections in `README.md`

**For implementation questions:**
- Review `website/TECHNICAL_ARCHITECTURE.md` for technical specs
- Check `docs/06_WEBSITE_IMPLEMENTATION_GUIDE.md` for roadmap

**For data questions:**
- Review `docs/02_ENHANCED_SCHEMA.md` for schema
- Check `docs/03_MODEL_CATEGORIES.md` for organization

**For brand questions:**
- Review `BRAND_IDENTITY.md` for complete guidelines
- Check `research/CREATIVE_PARTNERS_INDEX.md` for voice/tone guidance
