# Enhanced UX Vision v3.0: Discovery + Prompting + Community

> **Role:** Upstream UX/product vision for Bedroom Director’s core loop (Discover → Learn → Create → Share). This doc informs the UX roadmap and feature specs, especially for prompt library and community.  
> **See also:** `docs/strategy/ux-innovation-roadmap.md` for the current implementation roadmap and `docs/00-implementation-summary.md` for what’s shipped.

**Last Updated:** November 4, 2025

---

## 🎯 Core Innovation

**"Discover → Learn → Create (Elsewhere) → Share" Loop**

**IMPORTANT:** We are a discovery and education platform. Users create on external platforms (Sora, Midjourney, Runway, etc.). We help them:
1. **Discover** the right tool for their needs
2. **Learn** how to use it effectively with proven prompts
3. **Create** on the tool's official platform (we redirect)
4. **Share** their results and techniques in our community

Current (v2.0): Find models + Where to use them  
**Enhanced (v3.0)**: Find models + Learn to prompt + Create elsewhere + Share results + Community wisdom

---

## 🏗️ New Architecture

```
┌─────────────────────────────────────────────────┐
│  🔍 Discover  │  📝 Prompts  │  👥 Community  │  📚 Learn  │
└─────────────────────────────────────────────────┘
```

### 1. Discover Models (Existing + Enhanced)
- Model gallery, comparisons, decision wizard
- **NEW**: Each model has "Prompting" tab

### 2. Prompt Library (NEW!)
- Curated prompts by model & use case
- Community ratings (⭐ 4.8/5, 2.3K uses)
- One-click copy & customize
- JSON prompt builder for advanced users

### 3. Community (NEW!)
- User galleries with prompts
- Weekly challenges
- Discussion forums
- Creator profiles & badges

### 4. Learn (Enhanced)
- Model-specific prompting guides
- Video tutorials
- Common mistakes & fixes
- Interactive examples

---

## 📝 Prompt Library Features

### Prompt Card Design
```
┌────────────────────────────────────┐
│ 🎬 Cinematic Drone Reveal          │
│ by @filmmaker_pro • Sora 2 Pro     │
│ ────────────────────────────────   │
│ [Video Preview]                    │
│                                    │
│ 📝 THE PROMPT:                     │
│ "Aerial drone shot starting low    │
│ over misty forest canopy..."       │
│ [📋 Copy] [🎨 Customize] [▶️ Try]  │
│                                    │
│ 💡 PRO TIPS:                       │
│ • Use "slow ascent" for smooth     │
│ • Works best 8-10 seconds          │
│                                    │
│ ⭐ 4.8/5 (234 ratings) │ 2.3K uses │
└────────────────────────────────────┘
```

### Key Features
- **Smart Search**: "how to make product video"
- **Prompt Customizer**: Interactive tool to modify prompts
- **Templates**: Pre-built for each model
- **JSON Builder**: For advanced users
- **Collections**: Curated sets by creators

---

## 👥 Community Features

### 1. Community Gallery
- User creations with prompts
- Filter by model, style, trending
- "Featured This Week" section

### 2. Weekly Challenges
```
🏆 THIS WEEK: "Product Reveal Video"
📅 Deadline: Nov 11
🏅 Prize: Homepage feature + badge
📊 47 entries so far
```

### 3. User Profiles
```
@filmmaker_pro
📊 234 prompts • 12.3K uses • 4.8★
🏆 Top Contributor • Sora Expert
```

### 4. Discussion Forums
- General Discussion
- Model-Specific Tips
- Technical Help
- Show & Tell

---

## 📚 Enhanced Learn Section

### New Structure
```
LEARN:
├─ Getting Started
├─ 🎓 Prompting Masterclass (NEW!)
│  ├─ Fundamentals
│  ├─ Model-Specific Guides
│  │  ├─ Sora 2 Guide
│  │  ├─ Veo 3 Guide
│  │  └─ [All models...]
│  ├─ Advanced Techniques
│  │  ├─ JSON Prompting
│  │  ├─ Multi-Shot Sequences
│  │  └─ Character Consistency
│  └─ Common Mistakes
├─ Video Tutorials
└─ Best Practices
```

---

## 🎨 Model Detail Pages: New "Prompting" Tab

Every model now includes:

```
TABS:
├─ Overview
├─ Where to Use
├─ Pricing
├─ 📝 Prompting (NEW!)
│  ├─ Quick Start Guide
│  ├─ Top Community Prompts
│  ├─ Model-Specific Tips
│  ├─ Common Mistakes
│  └─ JSON/Advanced
├─ Technical Specs
└─ Examples
```

---

## 🔄 Complete User Journey

```
1. Land → "I want product video"
2. Discover → Find Sora 2
3. Prompting Tab → See top prompts
4. Prompt Library → Find "Product Showcase"
5. Customize → Adjust for my product
6. Try Now → Use on Sora 2
7. Share → Post to Community
8. Learn → Follow top creators
```

---

## 📊 Success Metrics

### Discovery (Existing)
- Time to find model < 2 min
- Wrong tool selection < 10%

### Prompting (NEW!)
- **Prompt usage > 40%**
- **Success rate with prompts > 75%**
- **Prompt sharing > 15%**

### Community (NEW!)
- **Active contributors > 5%**
- **Weekly challenge participation > 10%**
- **Return rate > 60%** (up from 30%)

---

## 🚀 Implementation

### Phase 1 (Weeks 1-4)
- Core discovery (existing)
- Basic prompt library
- Simple community gallery
- Model prompting tabs

### Phase 2 (Weeks 5-8)
- User accounts
- Prompt submissions
- Ratings & comments
- Weekly challenges

### Phase 3 (Weeks 9-12)
- JSON builder
- Interactive tutorials
- Prompt customizer
- Advanced search

---

## 💡 Why This Wins

1. **Only platform combining discovery + prompting**
2. **Community-driven learning** (real examples)
3. **Model-specific guidance** (not generic)
4. **Immediate actionability** (copy → try → share)
5. **Quality curation** (community ratings)

---

## 🎨 Design System Updates

### New Colors
- Prompts: Teal (#14B8A6)
- Community: Pink (#EC4899)
- Challenges: Orange (#F97316)

### New Components
- Prompt Card
- Creation Card
- Challenge Banner
- User Badge
- JSON Editor
- Customizer Interface

---

## 🔮 Future: AI-Powered Features

1. **Prompt Suggestions** - AI recommends best prompts
2. **Auto-Optimization** - AI improves your prompts
3. **Style Transfer** - "Make it like this example"
4. **Prompt Remixing** - Combine multiple techniques

---

**This transforms the platform from a directory into a complete creative ecosystem.**
