# 🎬 Bedroom Director

**"From bedroom to big screen"**

[![Website](https://img.shields.io/badge/Website-Coming%20Soon-7C3AED)](https://bedroom-director.com)
[![Database](https://img.shields.io/badge/Tools-156%2B-8B5CF6)](data/ai_video_image_models.csv)
[![License](https://img.shields.io/badge/License-TBD-000000)](LICENSE)

> **AI creative tool discovery & education platform** - Your guide to 156+ AI tools across video, image, voice, music, and more.

---

## 🎯 What Is This?

**Bedroom Director** is a discovery and education platform for independent creators who want to understand and find the best AI tools for their creative projects.

### We Are NOT a Generator
- ❌ Users do not create content on our site
- ❌ We don't compete with Sora, Midjourney, or Runway

### We ARE a Discovery Platform
- ✅ Curated database of 156+ verified AI tools
- ✅ Comparative analysis and honest reviews
- ✅ Guide users to the right platforms for their needs
- ✅ Education on capabilities, pricing, and tradeoffs

---

## 📊 Quick Stats

| Metric | Value |
|--------|-------|
| **AI Tools** | 156+ |
| **Categories** | 8 |
| **Data Points** | 19 per tool |
| **Source Format** | CSV → JSON |
| **Website Status** | In Development |

### Categories
- 🎥 **VIDEO_GEN** - Text/image to video generation
- 🖼️ **IMAGE_GEN** - Text to image generation
- 🎤 **VOICE_AUDIO** - Voice cloning & audio generation
- 🎵 **MUSIC** - AI music composition
- 💋 **LIP_SYNC** - Face animation & lip synchronization
- 🔧 **PLATFORM_AGGREGATOR** - Multi-model platforms
- ✨ **POST_PROCESSING** - Video upscaling & enhancement
- 🔌 **API_INFRASTRUCTURE** - Developer tools & APIs

---

## 🚀 Quick Start

### Explore the Database
```bash
# View structure
head -5 data/ai_video_image_models.csv

# Count tools by category
grep "VIDEO_GEN" data/ai_video_image_models.csv | wc -l

# Generate JSON from CSV
python3 scripts/utilities/sync_to_json.py
```

### Run the Website Locally
```bash
cd bedroom-director-web
npm install
npm run dev
# Open http://localhost:3000
```

---

## 🗂️ Project Structure

```
bedroom-director/
├── data/
│   ├── ai_video_image_models.csv    # 🔑 Single source of truth (156+ tools)
│   ├── models.json                  # Generated from CSV
│   └── backups/                     # Automatic backups
├── bedroom-director-web/            # Next.js website
│   ├── src/
│   │   ├── app/                     # App Router pages
│   │   ├── components/              # React components
│   │   └── lib/                     # Utilities & types
│   └── public/                      # Images & assets
├── docs/                            # Documentation
│   ├── 00_INDEX.md
│   ├── 01_QUICK_START_GUIDE.md
│   ├── 02_ENHANCED_SCHEMA.md        # Full schema docs
│   └── 03_MODEL_CATEGORIES.md       # Category definitions
├── scripts/                         # Python utilities
│   ├── utilities/                   # Data sync tools
│   ├── maintenance/                 # Cleanup scripts
│   └── updates/                     # Batch update tools
├── research/                        # Market research & strategy
└── website/                         # Design specs & architecture
```

---

## 🛠️ Tech Stack

### Current (Database + Static Site)
- **Data:** CSV → JSON pipeline
- **Frontend:** Next.js 16 + TypeScript + TailwindCSS
- **UI Components:** shadcn/ui + Lucide Icons
- **Scripts:** Python 3 for data management

### Planned (v2)
- **Backend:** Supabase (PostgreSQL)
- **Deployment:** Cloudflare Pages + Workers
- **Search:** Algolia or Typesense
- **Analytics:** Plausible or PostHog

See [`website/TECHNICAL_ARCHITECTURE.md`](website/TECHNICAL_ARCHITECTURE.md) for detailed specs.

---

## 🎨 Brand Identity

### Aesthetic: "Theme park at twilight"
That magical moment when neon signs turn on against a purple dusk sky.

**Colors:**
- 🖤 **Director Black** - `#000000`
- 💜 **Bedroom Purple** - `#7C3AED`
- ✨ **Purple Bloom** - `#8B5CF6`
- 🌴 **Accent Neons** - Retro Teal, Sunset Orange, Neon Yellow

**Design Principles:**
- Palm tree silhouettes (critical brand element)
- Practical neon lighting with visible glows
- Twilight atmosphere (purple/blue gradients)
- Cinematic depth with film grain
- 90s theme park elegance (not tacky retro)

See [`BRAND_IDENTITY.md`](BRAND_IDENTITY.md) for complete guidelines.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [`CLAUDE.md`](CLAUDE.md) | Quick reference for Claude Code |
| [`docs/00_INDEX.md`](docs/00_INDEX.md) | Documentation index |
| [`docs/01_QUICK_START_GUIDE.md`](docs/01_QUICK_START_GUIDE.md) | Getting started guide |
| [`docs/02_ENHANCED_SCHEMA.md`](docs/02_ENHANCED_SCHEMA.md) | Complete schema documentation |
| [`docs/03_MODEL_CATEGORIES.md`](docs/03_MODEL_CATEGORIES.md) | Category definitions & examples |
| [`BRAND_IDENTITY.md`](BRAND_IDENTITY.md) | Brand guidelines & visual identity |
| [`MASTER_TODO.md`](MASTER_TODO.md) | Development roadmap |

---

## 🤝 Contributing

### Database Contributions

**Critical Rules:**
1. `data/ai_video_image_models.csv` is the single source of truth
2. Always backup before changes (scripts auto-backup)
3. Require official sources with dates
4. Follow the 19-column schema
5. Run `python3 scripts/utilities/sync_to_json.py` after changes

**Entry Requirements:**
- **Pricing:** Include free tier, regions, verification date
- **Distinctive Edge:** Comparative (why this vs competitors)
- **Drawbacks:** Realistic limitations
- **Notable Sources:** Official sources with dates

See [`docs/02_ENHANCED_SCHEMA.md`](docs/02_ENHANCED_SCHEMA.md) for detailed schema.

---

## 🎯 Project Philosophy

### Discovery, Not Generation
We guide creators to the right tools. We don't compete with Sora, Midjourney, or Runway—we help users find them.

### Curator, Not Aggregator
Every entry is researched, verified, and includes honest comparative analysis. Quality over quantity.

### Empowerment Through Education
We provide the context creators need to make informed decisions about which tools to use and why.

---

## 📈 Roadmap

- [x] Build comprehensive CSV database (156+ tools)
- [x] Create brand identity & design system
- [x] Build Next.js website foundation
- [ ] Connect website to CSV data
- [ ] Add palm tree silhouettes to design
- [ ] Implement search & filtering
- [ ] Add tool comparison features
- [ ] Launch MVP
- [ ] Migrate to Supabase backend
- [ ] Add user accounts & saved tools
- [ ] Build email newsletter system

See [`MASTER_TODO.md`](MASTER_TODO.md) for detailed tasks.

---

## 📄 License

TBD - Project under active development

---

## 🔗 Links

- **Website:** Coming Soon
- **GitHub:** [github.com/Arugami/bedroom-director](https://github.com/Arugami/bedroom-director)

---

<p align="center">
  <sub>Built with ❤️ by independent creators, for independent creators</sub><br>
  <sub>Powered by <a href="https://claude.ai/code">Claude Code</a></sub>
</p>
