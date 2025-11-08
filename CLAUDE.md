# Claude Code Prompt - Bedroom Director

**For Claude Code (claude.ai/code) when working in this repository.**

---

## 🎯 Project Overview

**Bedroom Director** - AI creative tools discovery platform for bedroom filmmakers  
**Tagline:** "From bedroom to big screen"  
**Status:** Website in active development (Next.js 16 + TypeScript)  
**Database:** 156 AI tools (video, image, voice, music)  
**Server:** http://localhost:3000

**Critical:** Discovery/education platform (guide users to tools), NOT a generation platform.

---

## Database Commands

**View structure:**
```bash
head -5 data/ai_video_image_models.csv
```

**Count entries:**
```bash
wc -l data/ai_video_image_models.csv  # Should be 157 (156 + header)
grep "VIDEO_GEN" data/ai_video_image_models.csv | wc -l
```

**Sync CSV to JSON:**
```bash
python3 scripts/utilities/sync_to_json.py
```

---

## Critical Architecture Rules

1. **`data/ai_video_image_models.csv` is the single source of truth**
   - 19 columns: 6 metadata + 13 data fields
   - Categories: IMAGE_GEN, VIDEO_GEN, VOICE_AUDIO, MUSIC, LIP_SYNC, PLATFORM_AGGREGATOR, POST_PROCESSING, API_INFRASTRUCTURE
   - JSON (`data/models.json`) is generated from CSV

2. **Always backup before CSV changes**
   - Scripts auto-backup to `data/backups/ai_video_image_models_BACKUP.csv`
   - Verify row counts before/after

3. **Update docs when categories change**
   - Update line numbers in `docs/03_MODEL_CATEGORIES.md`

---

## Python Script Pattern

```python
import csv, shutil

# 1. Backup first
shutil.copy('data/ai_video_image_models.csv',
            'data/backups/ai_video_image_models_BACKUP.csv')

# 2. Read with DictReader
with open('data/ai_video_image_models.csv', 'r') as f:
    rows = list(csv.DictReader(f))

# 3. Modify rows
# ...

# 4. Write back
with open('data/ai_video_image_models.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=rows[0].keys())
    writer.writeheader()
    writer.writerows(rows)
```

---

## Database Entry Requirements

- **Pricing:** Include free tier, regions, verification date
- **Distinctive Edge:** Comparative (why this vs competitors)
- **Drawbacks:** Realistic limitations
- **Notable Sources:** Format: `url1; url2; Available via API: fal.ai, Replicate`
- **All claims:** Require official sources with dates

---

## Tech Stack

**Current:**
- Frontend: Next.js 16 + TypeScript + TailwindCSS
- Data: CSV → JSON (Papa Parse)
- Server: localhost:3000 (dev)

**Future:**
- Backend: Supabase (PostgreSQL)
- Deployment: Cloudflare Pages
- See `website/DESIGN_SPEC.md` for complete specs

---

## Brand Quick Reference

**Aesthetic:** "Hollywood Studios Florida noir meets Miami 80s twilight"

**Visual DNA:**
- 🌴 Palm trees (signature framing - Hollywood/Florida/Miami)
- 🌆 Purple twilight gradients
- ✨ Neon glow effects (practical, not overdone)
- 🪑 Director's chair imagery
- 🎬 Film grain texture (subtle)

**Colors:**
- Primary: Director Black #000000, Bedroom Purple #7C3AED
- Neons: Teal #00CED1, Orange #FF8C42, Yellow #FCD34D

**Full guidelines:** `BEDROOM_DIRECTOR_UNIVERSE.md` + `bedroom-director-universe/brand/VISUAL_IDENTITY.md`

---

## Visual Design Principles (Website)

**Core Aesthetic: "Theme park at twilight"**
That magical moment when neon signs turn on against a purple dusk sky. Think: Pulling into Universal Studios at 7pm - sun just set, neon glows, magic is about to happen.

**Design Philosophy:**
- ✅ **Palm tree silhouettes** - CRITICAL brand element. Always use as framing device. Creates Hollywood/Florida/Miami noir aesthetic (Scarface, Drive, Miami Vice). Not optional decoration - these are essential brand DNA.
- ✅ **Practical neon lighting** - Real glowing effects, visible halos, colored uplighting
- ✅ **Twilight atmosphere** - Purple/blue gradient skies, dusk/golden hour mood
- ✅ **Multi-color storytelling** - Cool tones (purple/blue) + warm accents (yellow/orange/green)
- ✅ **Theatrical presentation** - Like entering a theme park attraction
- ✅ **Cinematic depth** - Film grain, atmospheric haze, layered lighting
- ✅ **90s theme park elegance** - Hollywood Tower Hotel sophistication meets Blockbuster confidence

**What to AVOID:**
- ❌ Cheesy VHS glitches or over-the-top retro effects
- ❌ Flat modern minimalism (too 2025 SaaS)
- ❌ Garish bright colors or tacky neon
- ❌ Generic 90s nostalgia without sophistication

**Inspiration References:**
- Hollywood Tower Hotel neon signage at dusk
- Universal Studios Orlando at 7pm (palm trees + neon glow)
- Blockbuster Video exterior (confident chunky signage)
- Disney World entrance at twilight
- Theme park dark rides (theatrical colored lighting)
- Scarface, Drive, Miami Vice (80s Miami noir with palm tree silhouettes)

**Typography:**
- Headlines should feel **illuminated**, not flat
- Add neon text effects: glowing outlines, halos, colored shadows
- Mix chunky bold (Blockbuster) + elegant moments
- Think: Lit-up marquee letters, not printed text

**Colors Usage:**
- **Primary:** Director Black + Bedroom Purple (foundation)
- **Accent Neons:** Use Teal, Orange, Yellow sparingly for pops of warmth
- **Atmospheric:** Twilight gradients (purple/blue), not solid colors
- **Lighting:** Visible glows, halos, and color spill from light sources

---

## Key Documentation

- `MASTER_TODO.md` - Project status & tasks
- `ABOUT.md` - Mission/vision (2 paragraphs)
- `AGENTS.md` - Repo guidelines (for Codex)
- `BEDROOM_DIRECTOR_UNIVERSE.md` - Core aesthetic
- `docs/03_MODEL_CATEGORIES.md` - Database categories
- `website/DESIGN_SPEC.md` - Complete design system
- `bedroom-director-universe/brand/VISUAL_IDENTITY.md` - Full visual guide

---

## Common Pitfalls

1. Don't modify CSV without backup
2. Don't skip docs updates when categories change
3. Don't add unverified information (require official sources)
4. Don't forget: we're discovery/education, not a generator
5. Don't create generic entries (need specific comparative edge)
